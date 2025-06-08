# 🔌 Vault Image Description Plugin

> _Generate helpful image alt text right inside Obsidian._

Welcome to the **Vault Image Description** plugin. This project adds automatic
image descriptions to your notes so you can keep your vault accessible and
searchable. It is built with the same modular philosophy as VaultOS but focuses
specifically on enriching images with descriptive text.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status: WIP](https://img.shields.io/badge/status-WIP-yellow.svg)](WIP)
[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./.github/PULL_REQUEST_TEMPLATE.md)
[![GitHub Discussions](https://img.shields.io/badge/💬-Discussions-blueviolet?logo=github)](https://github.com/your-username/vault-image-description/discussions)
[![Sponsor PtiCalin](https://img.shields.io/badge/Sponsor-💖-f06292.svg?logo=githubsponsors)](https://github.com/sponsors/your-username)

---

## 🧰 Features

- 🖼️ Generates alt text for images in your vault
- 🤖 Uses Ollama to generate descriptions with local models
- 📑 Stores results alongside the original image reference
- ⚙️ Written in Python and designed for a VaultOS-friendly layout
- 💬 GitHub Actions and community links for collaboration
- 🔄 Several generation modes (Pinterest Pin, Stable Diffusion prompt, ekphrasis, brief, detailed, text extraction, Midjourney prompt, technical art style, academic analysis)

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/vault-image-description.git
cd vault-image-description
./setup.sh
```

### 🛠 Local Setup

```bash
./setup.sh

# Offline mode
OFFLINE=1 ./setup.sh # or ./setup.sh --offline
```

Run the `vault_image_description` plugin from your vault directory:

```bash
python -m vault_image_description.plugin <path-to-image>
```

### 📦 Building the Obsidian Plugin

The UI portion of the plugin lives in `src/main.ts` and needs to be compiled to
JavaScript before loading it in Obsidian.

```bash
npm install               # install TypeScript and build tools
npm run tsc               # compiles src/main.ts -> main.js in the repo root
```

After compiling, copy `src/manifest.json` and `src/styles.css` to the repository
root alongside the generated `main.js` so Obsidian can detect the plugin files.

---

## 🧱 Folder Structure

```plaintext
src/           → Python package containing the plugin
dist/          → Compiled output or scripts for Obsidian (optional)
ops/           → Plugin orchestration logic
config/        → Static metadata and module configs
.github/       → GitHub Actions, PR/issue templates
```

## 🎨 Description Modes

The plugin can generate image descriptions in multiple styles:

- **pinterest_pin** – title, catchy caption, and hashtags in the PtiCalin voice.
- **stable_diffusion_prompt** – a prompt ready for Stable Diffusion.
- **ekphrasis** – poetic description inspired by the image.
- **brief** – a short overview.
- **detailed** – a thorough description.
- **extract_text** – OCR text found inside the image.
- **midjourney_prompt** – prompt for Midjourney.
- **technical_artstyle** – technical art style analysis.
- **analysis** – academic review of the image.

---

## 🤝 Contributing

We welcome contributions of all kinds!

Use these links to get started:

- [🐛 Bug Reports](https://github.com/your-username/vault-image-description/issues/new?template=bug.yml)
- [🌟 Feature Requests](https://github.com/your-username/vault-image-description/issues/new?template=feature-request.yml)
- [📦 Pull Requests](./.github/PULL_REQUEST_TEMPLATE.md)

Read our [CONTRIBUTING.md](CONTRIBUTING.md) for more info, or start a conversation in [💬 GitHub Discussions](https://github.com/your-username/vault-image-description/discussions).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
Use freely, fork creatively — just spread the love.

---

## 💌 Sponsor

If this plugin helps you work better, consider sponsoring here:
[**github.com/sponsors/your-username**](https://github.com/sponsors/your-username)

---

Have fun building, and spend less time structuring!
