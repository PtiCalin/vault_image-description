# =======================================
#  Vault Image Description Engine
# ---------------------------------------
#  Dependencies: Pillow, pytesseract, ollama
#  Output: OCR text or alt text strings from Ollama
# =======================================

import base64
import io
from pathlib import Path
from typing import Optional

from PIL import Image
import ollama
import pytesseract

from .modes import Mode, PROMPTS


def encode_image(path: Path) -> str:
    """🔒 Encode an image in base64.

    Parameters
    ----------
    path : Path
        📁 Location of the image file.

    Returns
    -------
    str
        🎨 Base64 string ready for Ollama.
    """

    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()


def extract_text(image_path: Path) -> str:
    """📝 Grab visible text from an image.

    Parameters
    ----------
    image_path : Path
        📷 Path to the image we want to read.

    Returns
    -------
    str
        🖨️ Text spotted in the picture.
    """

    image = Image.open(image_path)
    return pytesseract.image_to_string(image)


def generate(image_path: str, mode: Mode, model: str = "llava") -> str:
    """✨ Produce a description using Ollama.

    Parameters
    ----------
    image_path : str
        📍 File system path to the image.
    mode : Mode
        🎚️ Desired description mode.
    model : str, optional
        🤖 Ollama model name, by default "llava".

    Returns
    -------
    str
        📜 Generated alt text or extracted text.
    """

    path = Path(image_path)
    if not path.exists():
        raise FileNotFoundError(
            f"Image not found at '{path}'. Please check the path and try again."
        )

    if mode == Mode.EXTRACT_TEXT:
        return extract_text(path)

    image_data = encode_image(path)
    prompt = PROMPTS[mode]
    messages = [
        {"role": "user", "content": prompt},
        {"role": "user", "content": image_data, "images": [image_data]},
    ]
    response = ollama.chat(model=model, messages=messages)
    return response["message"]["content"].strip()
