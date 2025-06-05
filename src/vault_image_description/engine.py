import base64
import io
from pathlib import Path
from typing import Optional

from PIL import Image
import ollama
import pytesseract

from .modes import Mode, PROMPTS


def encode_image(path: Path) -> str:
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()


def extract_text(image_path: Path) -> str:
    image = Image.open(image_path)
    return pytesseract.image_to_string(image)


def generate(image_path: str, mode: Mode, model: str = "llava") -> str:
    path = Path(image_path)
    if not path.exists():
        raise FileNotFoundError(path)

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
