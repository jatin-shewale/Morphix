from dataclasses import dataclass
from io import BytesIO

import cv2
import numpy as np
from PIL import Image


@dataclass(frozen=True)
class ProcessedOutputs:
    silhouette: Image.Image
    border: Image.Image
    grayscale: Image.Image


def load_image_from_bytes(raw_bytes: bytes) -> Image.Image:
    try:
        image = Image.open(BytesIO(raw_bytes))
        image.load()
    except Exception as exc:
        raise ValueError(f"Could not decode image: {exc}") from exc

    return image.convert("RGBA") if "A" in image.getbands() else image.convert("RGB")


def process_logo_image(pil_image: Image.Image) -> ProcessedOutputs:
    img_array = np.array(pil_image)
    return ProcessedOutputs(
        silhouette=Image.fromarray(make_silhouette(img_array)),
        border=Image.fromarray(make_border(img_array)),
        grayscale=make_grayscale(pil_image),
    )


def make_silhouette(img_array: np.ndarray) -> np.ndarray:
    if img_array.shape[2] == 4:
        alpha = img_array[:, :, 3]
        _, mask = cv2.threshold(alpha, 10, 255, cv2.THRESH_BINARY)
    else:
        gray = cv2.cvtColor(img_array[:, :, :3], cv2.COLOR_RGB2GRAY)
        _, mask = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

    result = np.full((img_array.shape[0], img_array.shape[1], 3), 255, dtype=np.uint8)
    result[mask > 0] = [0, 0, 0]
    return result


def make_border(img_array: np.ndarray) -> np.ndarray:
    gray = cv2.cvtColor(img_array[:, :, :3], cv2.COLOR_RGB2GRAY)
    blurred = cv2.GaussianBlur(gray, (3, 3), 0)
    edges = cv2.Canny(blurred, threshold1=30, threshold2=100)

    result = np.full_like(img_array[:, :, :3], 255)
    result[edges > 0] = [0, 0, 0]
    return result


def make_grayscale(pil_image: Image.Image) -> Image.Image:
    if pil_image.mode == "RGBA":
        r, g, b, alpha = pil_image.split()
        gray = Image.merge("RGB", (r, g, b)).convert("L")
        return Image.merge("LA", (gray, alpha))

    return pil_image.convert("L")

