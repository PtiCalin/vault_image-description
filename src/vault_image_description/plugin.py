from pathlib import Path
from typing import Iterable

from .engine import generate
from .modes import Mode


def describe_images(image_paths: Iterable[str], mode: Mode = Mode.BRIEF, model: str = "llava") -> dict:
    results = {}
    for path in image_paths:
        try:
            results[path] = generate(path, mode, model=model)
        except Exception as e:
            results[path] = f"Error: {e}"
    return results


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Generate image descriptions with Ollama")
    parser.add_argument("images", nargs="+", help="Image file paths")
    parser.add_argument("--mode", default=Mode.BRIEF.value, choices=[m.value for m in Mode])
    parser.add_argument("--model", default="llava", help="Ollama model name")
    args = parser.parse_args()

    mode = Mode(args.mode)
    results = describe_images(args.images, mode=mode, model=args.model)
    for path, desc in results.items():
        print(f"{path}:\n{desc}\n")


if __name__ == "__main__":
    main()
