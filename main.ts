import { Plugin, WorkspaceLeaf } from "obsidian";

export default class VaultImageDescriptionPlugin extends Plugin {
  async onload() {
    this.addRibbonIcon("image-file", "Describe Image", () => {
      this.activatePanel();
    });

    this.registerView(
      "image-description-panel",
      (leaf: WorkspaceLeaf) => new ImageDescriptionView(leaf)
    );

    this.addCommand({
      id: "open-image-description-panel",
      name: "Open Image Description Panel",
      callback: () => this.activatePanel(),
    });
  }

  async activatePanel() {
    this.app.workspace.detachLeavesOfType("image-description-panel");

    await this.app.workspace.getRightLeaf(false).setViewState({
      type: "image-description-panel",
      active: true,
    });

    this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType("image-description-panel")[0]);
  }

  onunload() {
    this.app.workspace.detachLeavesOfType("image-description-panel");
  }
}

class ImageDescriptionView {
  constructor(leaf) {
    this.leaf = leaf;
    this.containerEl = leaf.view.containerEl;
    this.containerEl.empty();
    this.containerEl.createEl("h2", { text: "Vault Image Describer" });

    const para = this.containerEl.createEl("p", {
      text: "This plugin will later allow image description via Python/Ollama.",
    });

    const btn = this.containerEl.createEl("button", {
      text: "Run Description (not yet connected)",
    });

    btn.onclick = () => {
      para.setText("⚙️ Running local Python backend would happen here.");
    };
  }

  getViewType() {
    return "image-description-panel";
  }

  getDisplayText() {
    return "Vault Image Description";
  }

  async onOpen() {}
  async onClose() {}
}
