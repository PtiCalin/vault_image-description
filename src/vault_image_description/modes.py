# =======================================
#  Vault Image Description Modes
# ---------------------------------------
#  Enumerates the ways PtiCalin can chat
#  about an image. Each mode selects a
#  prompt for Ollama so your alt text has
#  just the right style.
# =======================================

from enum import Enum

class Mode(Enum):
    PINTEREST_PIN = "pinterest_pin"  # 📌 Trendy pin title and caption.
    STABLE_DIFFUSION_PROMPT = "stable_diffusion_prompt"  # 🎨 Prompt fit for image generation.
    EKPHRASIS = "ekphrasis"  # 🖋️ A poetic take on the picture.
    BRIEF = "brief"  # ✂️ Short alt text that gets to the point.
    DETAILED = "detailed"  # 🔍 Longer description with extra nuance.
    EXTRACT_TEXT = "extract_text"  # 🔡 Pull out any visible text.
    MIDJOURNEY_PROMPT = "midjourney_prompt"  # 🚀 Prompt tailored for Midjourney.
    TECHNICAL_ARTSTYLE = "technical_artstyle"  # 📐 Notes on art techniques and style.
    ANALYSIS = "analysis"  # 🎓 Academic commentary on the image.

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
