import {
	App,
	Plugin,
	PluginSettingTab,
	Setting,
	WorkspaceLeaf,
} from "obsidian";

// ==================== Settings Interface ====================

interface VaultImageDescriptionSettings {
	apiEndpoint: string;
}

const DEFAULT_SETTINGS: VaultImageDescriptionSettings = {
	apiEndpoint: "http://localhost:11434",
};

// ==================== Main Plugin Class ====================

export default class VaultImageDescriptionPlugin extends Plugin {
	settings: VaultImageDescriptionSettings;

	async onload() {
		await this.loadSettings();

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

		this.addSettingTab(new VaultImageDescriptionSettingTab(this.app, this));
	}

	async activatePanel() {
		this.app.workspace.detachLeavesOfType("image-description-panel");

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: "image-description-panel",
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType("image-description-panel")[0]
		);
	}

	onunload() {
		this.app.workspace.detachLeavesOfType("image-description-panel");
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

// ==================== View Class ====================

class ImageDescriptionView {
	leaf: WorkspaceLeaf;
	containerEl: HTMLElement;

	constructor(leaf: WorkspaceLeaf) {
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

// ==================== Settings Tab ====================

class VaultImageDescriptionSettingTab extends PluginSettingTab {
	plugin: VaultImageDescriptionPlugin;

	constructor(app: App, plugin: VaultImageDescriptionPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("API Endpoint")
			.setDesc("Set the local endpoint to call for image description")
			.addText((text) =>
				text
					.setPlaceholder("http://localhost:11434")
					.setValue(this.plugin.settings.apiEndpoint)
					.onChange(async (value) => {
						this.plugin.settings.apiEndpoint = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
