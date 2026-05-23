import re
from pathlib import Path

from fastapi import HTTPException, UploadFile

from app.core.constants import ALLOWED_CONTENT_TYPES, ALLOWED_EXTENSIONS

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def validate_upload(image: UploadFile, raw_bytes: bytes, max_file_size: int) -> None:
    content_type = (image.content_type or "").lower()
    extension = Path(image.filename or "").suffix.lower()

    if content_type not in ALLOWED_CONTENT_TYPES and extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{image.content_type}'. Use PNG or JPG.",
        )

    if not raw_bytes:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    if len(raw_bytes) > max_file_size:
        raise HTTPException(status_code=413, detail="File exceeds 5 MB limit.")


def resolve_recipient_email(request_email: str | None, fallback_email: str | None) -> str | None:
    email = (request_email or fallback_email or "").strip()
    if not email:
        return None

    if not EMAIL_PATTERN.match(email):
        raise HTTPException(status_code=400, detail="Recipient email is invalid.")

    return email

