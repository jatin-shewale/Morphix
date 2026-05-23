from pydantic import BaseModel


class ProcessResponse(BaseModel):
    job_id: str
    silhouette: str
    border: str
    grayscale: str
    email_status: str
    recipient_email: str | None = None
    downloads: dict[str, str]

