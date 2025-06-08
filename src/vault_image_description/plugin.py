# =======================================
#  Vault Image Description Plugin
# ---------------------------------------
#  Purpose: Provide a small CLI helper that calls the engine
#           to generate alt text for images.
#  Dependencies: argparse, Pillow, pytesseract, ollama
# =======================================

from typing import Iterable

from .engine import generate
from .modes import Mode


def describe_images(image_paths: Iterable[str], mode: Mode = Mode.BRIEF, model: str = "llava") -> dict:
    """Create descriptions for a list of images.

    Parameters
    ----------
    image_paths : Iterable[str]
        🖼️ Paths to images that will be described.
    mode : Mode, optional
        🎚️ Description style to use, by default ``Mode.BRIEF``.
    model : str, optional
        🤖 Ollama model name, by default ``"llava"``.

    Returns
    -------
    dict
        📦 Mapping of image path to generated text.
    """

    results = {}
    for path in image_paths:
        results[path] = generate(path, mode, model=model)
    return results


def main():
    """CLI for describing images with a bit of flair.

    Parses arguments, generates descriptions and prints them. Any failure is
    reported with a friendly emoji before the exception is re-raised.
    """

    import argparse
    import sys

    parser = argparse.ArgumentParser(description="Generate image descriptions with Ollama")
    parser.add_argument("images", nargs="+", help="Image file paths")
    parser.add_argument("--mode", default=Mode.BRIEF.value, choices=[m.value for m in Mode])
    parser.add_argument("--model", default="llava", help="Ollama model name")
    args = parser.parse_args()

    mode = Mode(args.mode)

    for path in args.images:
        try:
            desc = generate(path, mode, model=args.model)
        except Exception as exc:
            print(f"❌ Failed to describe '{path}': {exc}", file=sys.stderr)
            raise
        else:
            print(f"{path}:\n{desc}\n")


if __name__ == "__main__":
    main()
