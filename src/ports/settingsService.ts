export const DEFAULT_SETTINGS = Object.freeze({
    openAiApiKey: '',
})


export type Settings = typeof DEFAULT_SETTINGS;

export interface SettingsServiceInterface {
    getSettings(): Settings;
    saveSettings(settings: Settings): void;
    getSetting(key: keyof Settings): Settings[keyof Settings];
}