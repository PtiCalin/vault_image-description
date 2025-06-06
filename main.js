"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
class VaultImageDescriptionPlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addRibbonIcon("image-file", "Describe Image", () => {
                this.activatePanel();
            });
            this.registerView("image-description-panel", (leaf) => new ImageDescriptionView(leaf));
            this.addCommand({
                id: "open-image-description-panel",
                name: "Open Image Description Panel",
                callback: () => this.activatePanel(),
            });
        });
    }
    activatePanel() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.workspace.detachLeavesOfType("image-description-panel");
            yield this.app.workspace.getRightLeaf(false).setViewState({
                type: "image-description-panel",
                active: true,
            });
            this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType("image-description-panel")[0]);
        });
    }
    onunload() {
        this.app.workspace.detachLeavesOfType("image-description-panel");
    }
}
exports.default = VaultImageDescriptionPlugin;
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
    onOpen() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onClose() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
