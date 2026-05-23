import os
from dataclasses import dataclass
from pathlib import Path


def _load_env_file() -> None:
    env_path = Path(__file__).resolve().parents[2] / ".env"
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


_load_env_file()


def _csv_env(name: str, default: str) -> list[str]:
    value = os.getenv(name, default)
    return [_normalize_origin(item) for item in value.split(",") if item.strip()]


def _normalize_origin(origin: str) -> str:
    cleaned = origin.strip()
    return cleaned.rstrip("/") if cleaned else cleaned


def _bool_env(name: str, default: bool) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


@dataclass(frozen=True)
class Settings:
    app_name: str = "Morphix API"
    app_version: str = "2.0.0"
    max_file_size: int = 5 * 1024 * 1024
    smtp_host: str = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port: int = int(os.getenv("SMTP_PORT", "587"))
    smtp_user: str = os.getenv("SMTP_USER", "")
    smtp_password: str = os.getenv("SMTP_PASSWORD", "")
    default_recipient_email: str = os.getenv("RECIPIENT_EMAIL", "")
    cors_origins: list[str] = None  # type: ignore[assignment]
    cors_allow_all: bool = _bool_env("CORS_ALLOW_ALL", True)
    cors_origin_regex: str = os.getenv(
        "CORS_ORIGIN_REGEX",
        r"https://.*\.vercel\.app",
    )
    output_dir_name: str = "morphix_outputs"

    def __post_init__(self) -> None:
        if self.cors_origins is None:
            object.__setattr__(
                self,
                "cors_origins",
                _csv_env(
                    "CORS_ORIGINS",
                    "http://localhost:5173,https://morphix-ochre.vercel.app",
                ),
            )


settings = Settings()
