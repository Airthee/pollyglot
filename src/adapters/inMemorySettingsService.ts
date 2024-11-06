import { DEFAULT_SETTINGS, type Settings, type SettingsServiceInterface } from "../ports/settingsService";

export class InMemorySettingsService implements SettingsServiceInterface {
    private settings: Settings = DEFAULT_SETTINGS;
    
    getSettings(): Settings {
        return this.settings;
    }

    saveSettings(settings: Settings): void {
        this.settings = settings;
    }

    getSetting(key: keyof Settings): Settings[keyof Settings] {
        return this.settings[key];
    }
}