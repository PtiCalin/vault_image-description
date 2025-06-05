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
- 🤖 Uses a pluggable AI service for descriptions
- 📑 Stores results alongside the original image reference
- ⚙️ Built with TypeScript and a VaultOS-friendly layout
- 💬 GitHub Actions and community links for collaboration

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/vault-image-description.git
cd vault-image-description
```

### 🛠 Local Setup

```bash
npm install
npm run build
```

After building, copy the contents of `/dist` into your Obsidian vault’s `.obsidian/plugins/` folder.

---

## 🧱 Folder Structure

```plaintext
src/           → TypeScript plugin source
dist/          → Compiled output used by Obsidian
ops/           → Plugin orchestration logic
config/        → Static metadata and module configs
.github/       → GitHub Actions, PR/issue templates
```

---

## 🤝 Contributing

We welcome contributions of all kinds!

Use these links to get started:

- [🐛 Bug Reports](./.github/ISSUE_TEMPLATE/bug_report.md)
- [🌟 Feature Requests](./.github/ISSUE_TEMPLATE/feature_request.md)
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

Have fun building, and spend less time structuring
