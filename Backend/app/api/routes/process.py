from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.core.config import settings
from app.schemas.responses import ProcessResponse
from app.services.email_service import send_processed_outputs
from app.services.image_service import load_image_from_bytes, process_logo_image
from app.services.storage_service import save_outputs
from app.utils.validators import resolve_recipient_email, validate_upload

router = APIRouter()


@router.post("/process", response_model=ProcessResponse)
async def process_image(
    image: UploadFile = File(...),
    recipient_email: str | None = Form(default=None),
) -> ProcessResponse:
    raw_bytes = await image.read()
    validate_upload(image=image, raw_bytes=raw_bytes, max_file_size=settings.max_file_size)

    try:
        pil_image = load_image_from_bytes(raw_bytes)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    try:
        outputs = process_logo_image(pil_image)
        stored = save_outputs(outputs)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Processing error: {exc}") from exc

    email_to = resolve_recipient_email(recipient_email, settings.default_recipient_email)
    email_status = "not_configured"

    if email_to:
        try:
            send_processed_outputs(recipient=email_to, attachments=stored.filepaths)
            email_status = "sent"
        except Exception as exc:
            email_status = f"failed: {exc}"

    return ProcessResponse(
        job_id=stored.job_id,
        silhouette="generated",
        border="generated",
        grayscale="generated",
        email_status=email_status,
        recipient_email=email_to,
        downloads={
            name: f"/download/{stored.job_id}/{name}"
            for name in stored.filepaths
        },
    )
