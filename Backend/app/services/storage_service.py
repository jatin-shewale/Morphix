import shutil
import tempfile
from dataclasses import dataclass
from pathlib import Path
from uuid import uuid4

from app.core.config import settings
from app.core.constants import OUTPUT_NAMES
from app.services.image_service import ProcessedOutputs

OUTPUT_ROOT = Path(tempfile.gettempdir()) / settings.output_dir_name
OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)


@dataclass(frozen=True)
class StoredOutputs:
    job_id: str
    directory: Path
    filepaths: dict[str, Path]


def save_outputs(outputs: ProcessedOutputs) -> StoredOutputs:
    job_id = uuid4().hex
    directory = OUTPUT_ROOT / job_id
    directory.mkdir(parents=True, exist_ok=True)

    generated = {
        "silhouette": outputs.silhouette,
        "border": outputs.border,
        "grayscale": outputs.grayscale,
    }

    filepaths: dict[str, Path] = {}
    for output_name in OUTPUT_NAMES:
        path = directory / f"{output_name}.png"
        generated[output_name].save(path)
        filepaths[output_name] = path
        shutil.copyfile(path, OUTPUT_ROOT / f"{output_name}.png")

    return StoredOutputs(job_id=job_id, directory=directory, filepaths=filepaths)


def get_output_path(job_id: str, output_name: str) -> Path:
    _validate_output_name(output_name)
    return OUTPUT_ROOT / job_id / f"{output_name}.png"


def get_latest_output_path(output_name: str) -> Path:
    _validate_output_name(output_name)
    return OUTPUT_ROOT / f"{output_name}.png"


def _validate_output_name(output_name: str) -> None:
    if output_name not in OUTPUT_NAMES:
        allowed = ", ".join(OUTPUT_NAMES)
        raise ValueError(f"Unknown output '{output_name}'. Choose from: {allowed}")
