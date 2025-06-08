# =======================================
#  Vault Image Description Plugin
# ---------------------------------------
#  Purpose: small CLI wrapper that calls the engine to
#           generate alt text or OCR text for images via
#           locally running Ollama models.
#  Dependencies: argparse, Pillow, pytesseract, ollama
# =======================================

from typing import Iterable

from .engine import generate
from .modes import Mode


def describe_images(
    image_paths: Iterable[str],
    mode: Mode = Mode.BRIEF,
    model: str = "llava",
) -> dict:
    """Generate text for each image path.

    Parameters
    ----------
    image_paths : Iterable[str]
        🖼️ Paths to the images to describe.
    mode : Mode, optional
        🎚️ Style of description, defaults to ``Mode.BRIEF``.
    model : str, optional
        🤖 Ollama model to chat with, by default ``"llava"``.

    Returns
    -------
    dict
        📦 Mapping of ``path`` → ``description``.
    """

    results = {}
    for path in image_paths:
        results[path] = generate(path, mode, model=model)
    return results


def main() -> None:
    """Run the image description CLI.

    Parses arguments, generates descriptions and prints them. On failure a
    colorful message is shown before the exception is re-raised so the calling
    shell can still react accordingly.
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
            print(
                f"💥 Oops! Couldn't describe '{path}'. {exc}\n"
                "👉 Please verify the image path and dependencies.",
                file=sys.stderr,
            )
            raise
        else:
            print(f"{path}:\n{desc}\n")


if __name__ == "__main__":
    main()
