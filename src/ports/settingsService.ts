export const DEFAULT_SETTINGS: Settings = Object.freeze({
    openAiApiKey: '',
})


export type Settings = {
    openAiApiKey: string;
}

export interface SettingsServiceInterface {
    getSettings(): Settings;
    saveSettings(settings: Settings): void;
    getSetting(key: keyof Settings): Settings[keyof Settings];
}