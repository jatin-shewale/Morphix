from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.services.storage_service import get_latest_output_path, get_output_path

router = APIRouter()


@router.get("/download/{job_id}/{output}")
def download_output(job_id: str, output: str) -> FileResponse:
    try:
        path = get_output_path(job_id=job_id, output_name=output)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    if not path.exists():
        raise HTTPException(status_code=404, detail="Output not found. Run /process first.")

    return FileResponse(path, media_type="image/png", filename=f"{output}.png")


@router.get("/download/{output}")
def download_latest_output(output: str) -> FileResponse:
    try:
        path = get_latest_output_path(output_name=output)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    if not path.exists():
        raise HTTPException(status_code=404, detail="Output not found. Run /process first.")

    return FileResponse(path, media_type="image/png", filename=f"{output}.png")
