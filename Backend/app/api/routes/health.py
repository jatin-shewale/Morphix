from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def root_health() -> dict[str, str]:
    return {"status": "ok", "service": "Morphix API"}


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "Morphix API"}

