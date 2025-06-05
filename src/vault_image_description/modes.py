from enum import Enum

class Mode(Enum):
    PINTEREST_PIN = "pinterest_pin"
    STABLE_DIFFUSION_PROMPT = "stable_diffusion_prompt"
    EKPHRASIS = "ekphrasis"
    BRIEF = "brief"
    DETAILED = "detailed"
    EXTRACT_TEXT = "extract_text"
    MIDJOURNEY_PROMPT = "midjourney_prompt"
    TECHNICAL_ARTSTYLE = "technical_artstyle"
    ANALYSIS = "analysis"

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
