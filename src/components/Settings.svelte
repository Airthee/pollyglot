<script lang="ts">
	import { LocalStorageSettingsService } from "../adapters/LocalStorageSettingsService";
	import { type Settings } from "../ports/settingsService";
	import Button from "./Button.svelte";

    type Props = {
        value: Settings;
        onSave(updatedSettings: Settings): void;
    }
    let {
        value: initialSettings,
        onSave
    }: Props = $props();

    const internalSettings = $state({...initialSettings});
	const handleClickSaveSettings = () => {
        onSave({...internalSettings});
	}
</script>

<div class="flex flex-col space-y-4">
    <div class="flex flex-row space-x-2">
        <label for="input-openapi-api-key">OpenAPI :</label>
        <input
            id="input-openapi-api-key"
            placeholder="OpenAPI API key"
            type="password"
            bind:value={internalSettings.openAiApiKey}
        />
    </div>
    <Button onClick={handleClickSaveSettings}>Save settings</Button>
</div>