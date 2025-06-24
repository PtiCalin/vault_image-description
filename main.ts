import { App, Notice, Plugin, PluginSettingTab, Setting, TFile, WorkspaceLeaf, Menu, ItemView } from 'obsidian';

interface DescriptionMode {
  name: string;
  prompt: string;
}

interface ImageDescriptionSettings {
  ollamaUrl: string;
  modes: DescriptionMode[];
}

const DEFAULT_SETTINGS: ImageDescriptionSettings = {
  ollamaUrl: 'http://localhost:11434/api',
  modes: [
    {
      name: 'Default',
      prompt: 'Describe the image.'
    }
  ]
};

const VIEW_TYPE = 'image-description-panel';

export default class VaultImageDescriptionPlugin extends Plugin {
  settings: ImageDescriptionSettings;

  async onload() {
    await this.loadSettings();

    this.addRibbonIcon('image-file', 'Describe Image', () => {
      this.activatePanel();
    });

    this.registerView(VIEW_TYPE, (leaf: WorkspaceLeaf) => new ImageDescriptionView(leaf, this));

    this.addCommand({
      id: 'open-image-description-panel',
      name: 'Open Image Description Panel',
      callback: () => this.activatePanel(),
    });

    this.addSettingTab(new ImageDescriptionSettingTab(this.app, this));

    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        if (file instanceof TFile && /(png|jpg|jpeg|gif|svg)$/i.test(file.extension)) {
          const subMenu = new Menu();
          this.settings.modes.forEach(mode => {
            subMenu.addItem(item =>
              item.setTitle(mode.name).onClick(() => this.describeFile(file, mode))
            );
          });
          menu.addItem(item => item.setTitle('Describe Image').setSubmenu(subMenu));
        }
      })
    );
  }

  async describeFile(file: TFile, mode: DescriptionMode) {
    new Notice(`Would describe ${file.name} using mode "${mode.name}"`);
  }

  async activatePanel() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE);

    const leaf = this.app.workspace.getRightLeaf(false);
    await leaf.setViewState({ type: VIEW_TYPE, active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class ImageDescriptionView extends ItemView {
  plugin: VaultImageDescriptionPlugin;
  dropEl: HTMLElement;
  resultEl: HTMLElement;

  constructor(leaf: WorkspaceLeaf, plugin: VaultImageDescriptionPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType() {
    return VIEW_TYPE;
  }

  getDisplayText() {
    return 'Vault Image Description';
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();

    container.createEl('h2', { text: 'Vault Image Describer' });

    this.dropEl = container.createEl('div', { cls: 'drop-area', text: 'Drop image here' });
    this.resultEl = container.createEl('pre');

    this.dropEl.ondragover = (e) => { e.preventDefault(); };
    this.dropEl.ondrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        this.resultEl.setText(`Would describe ${files[0].name}`);
      }
    };
  }

  async onClose() {
    // cleanup if needed
  }
}

class ImageDescriptionSettingTab extends PluginSettingTab {
  plugin: VaultImageDescriptionPlugin;

  constructor(app: App, plugin: VaultImageDescriptionPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName('Ollama API URL')
      .setDesc('Endpoint for the local Ollama server.')
      .addText(text =>
        text
          .setPlaceholder('http://localhost:11434/api')
          .setValue(this.plugin.settings.ollamaUrl)
          .onChange(async value => {
            this.plugin.settings.ollamaUrl = value;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl('h3', { text: 'Description Modes' });

    this.plugin.settings.modes.forEach((mode, index) => {
      const setting = new Setting(containerEl);
      setting
        .addText(text =>
          text
            .setPlaceholder('Name')
            .setValue(mode.name)
            .onChange(async value => {
              mode.name = value;
              await this.plugin.saveSettings();
            })
        )
        .addText(text =>
          text
            .setPlaceholder('Prompt')
            .setValue(mode.prompt)
            .onChange(async value => {
              mode.prompt = value;
              await this.plugin.saveSettings();
            })
        )
        .addExtraButton(btn => {
          btn.setIcon('cross').setTooltip('Delete').onClick(async () => {
            this.plugin.settings.modes.splice(index, 1);
            this.display();
            await this.plugin.saveSettings();
          });
        });
    });

    new Setting(containerEl)
      .addButton(btn =>
        btn.setButtonText('Add Mode').onClick(async () => {
          this.plugin.settings.modes.push({ name: 'New Mode', prompt: '' });
          this.display();
          await this.plugin.saveSettings();
        })
      );
  }
}
