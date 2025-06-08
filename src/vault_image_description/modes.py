# =======================================
#  Vault Image Description Modes
# ---------------------------------------
#  Purpose: enumerates PtiCalin's friendly
#           ways to describe an image.
#           Each option chooses a prompt so
#           your alt text matches the style.
# =======================================

from enum import Enum


class Mode(Enum):
    """Ways PtiCalin can describe an image."""

    def __new__(cls, value: str, doc: str):
        obj = object.__new__(cls)
        obj._value_ = value
        obj.__doc__ = doc
        return obj

    PINTEREST_PIN = (
        "pinterest_pin",
        "📌 Title, catchy caption, and hashtags for a stylish pin.",
    )
    STABLE_DIFFUSION_PROMPT = (
        "stable_diffusion_prompt",
        "🎨 Prompt ready for image generation software.",
    )
    EKPHRASIS = (
        "ekphrasis",
        "🖋️ Poetic lines describing what the picture evokes.",
    )
    BRIEF = (
        "brief",
        "✂️ Quick alt text that gets right to the point.",
    )
    DETAILED = (
        "detailed",
        "🔍 Longer description with extra nuance.",
    )
    EXTRACT_TEXT = (
        "extract_text",
        "🔡 Pulls out any visible text from the image.",
    )
    MIDJOURNEY_PROMPT = (
        "midjourney_prompt",
        "🚀 Prompt tailored for Midjourney.",
    )
    TECHNICAL_ARTSTYLE = (
        "technical_artstyle",
        "📐 Notes on techniques and art style.",
    )
    ANALYSIS = (
        "analysis",
        "🎓 A thoughtful academic take on the image.",
    )

PROMPTS = {
    Mode.PINTEREST_PIN: (
        "You are PtiCalin. Generate a trendy Pinterest pin. Provide a short title,"
        " a catchy caption in the PtiCalin voice, and several aesthetic hashtags."),
    Mode.STABLE_DIFFUSION_PROMPT: (
        "Describe this image as a stable diffusion prompt."),
    Mode.EKPHRASIS: (
        "Write an ekphrastic description of this image."),
    Mode.BRIEF: (
        "Describe this image briefly."),
    Mode.DETAILED: (
        "Provide a detailed description of this image."),
    Mode.EXTRACT_TEXT: (
        "Extract any text visible in the image."),
    Mode.MIDJOURNEY_PROMPT: (
        "Describe this image as a Midjourney prompt."),
    Mode.TECHNICAL_ARTSTYLE: (
        "Explain the technical art style used in this image."),
    Mode.ANALYSIS: (
        "Provide an academic analysis of this image."),
}
