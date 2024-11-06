import { DEFAULT_SETTINGS, type Settings, type SettingsServiceInterface } from "../ports/settingsService";

const SETTINGS_KEY = 'settings'


export class LocalStorageSettingsService implements SettingsServiceInterface {
    getSettings(): Settings {
        if (window) {
            const settingsFromLocalStorage = window.localStorage.getItem(SETTINGS_KEY);
            if (settingsFromLocalStorage) {
                return {
                    ...DEFAULT_SETTINGS,
                    ...JSON.parse(settingsFromLocalStorage)
                };
            }
        }
        throw new Error('Unable to load settings from local storage');
    }

    saveSettings(settings: Settings): void {
        if (window) {
            window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
            return;
        }

        throw new Error('Unable to save settings to the local storage');
    }

    getSetting(key: keyof Settings): Settings[keyof Settings] {
        const settings = this.getSettings();
        return settings[key];
    }
}