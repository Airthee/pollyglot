import { LocalStorageSettingsService } from "../adapters/LocalStorageSettingsService";
import { DEFAULT_SETTINGS, type Settings } from "../ports/settingsService";

export function useSettings() {
    const settingsService = new LocalStorageSettingsService();
    const settings: {value: Settings} = $state({
        value: DEFAULT_SETTINGS
    })
	$effect(() => {
		if (window) {
			settings.value = settingsService.getSettings();
		}
	});

    function saveSettings(updatedSettings: Settings) {
        settingsService.saveSettings(updatedSettings);
        settings.value = updatedSettings;
    }

    return {
        settings,
        saveSettings,
    }
}