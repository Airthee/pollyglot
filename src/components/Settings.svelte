<script lang="ts">
	import { LocalStorageSettingsService } from "../adapters/LocalStorageSettingsService";
	import { type Settings } from "../ports/settingsService";
	import Button from "./Button.svelte";

    type Props = {
        value: Settings;
    }
    
    let {
        value = $bindable()
    }: Props = $props();

	const settingsService = new LocalStorageSettingsService();
	$effect(() => {
        console.log('Trying to load settings');
		if(window) {
            value = settingsService.getSettings();
            console.log('Settings loaded');
		}
	})
	const handleClickSaveSettings = () => {
        if (value) {
            settingsService.saveSettings(value);
        }
	}
</script>

<div class="flex flex-col space-y-4">
    <div class="flex flex-row space-x-2">
        <label for="input-openapi-api-key">OpenAPI :</label>
        <input
            id="input-openapi-api-key"
            placeholder="OpenAPI API key"
            type="password"
            bind:value={value.openAiApiKey}
        />
    </div>
    <Button onClick={handleClickSaveSettings}>Save settings</Button>
</div>