<script lang="ts">
	import { translate } from '$lib/translate';
	import type { ConversationMessage } from '../components/Conversation.svelte';
	import Conversation from '../components/Conversation.svelte';
	import LanguageSelectorV2, { type Language } from '../components/LanguageSelector.svelte';
	import Settings from '../components/Settings.svelte';
	import { useSettings } from '../hooks/useSettings.svelte';

	const {settings, saveSettings} = useSettings();
	let displaySettings = $state(false);
	const toggleDisplaySettings = () => (displaySettings = !displaySettings);

	let textToTranslate = $state('');
	let selectedLanguage: Language | undefined = $state();

	const messages: ConversationMessage[] = $state([
		{
			type: 'received',
			message: 'Select the language you want me to translate into, type your text and hit send!'
		}
	])
	
	let isLoading = $state(false);
	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		if (!textToTranslate) {
			return;
		}
		isLoading = true;

		const textToTranslateCopy = textToTranslate;
		textToTranslate = '';
		messages.push({
			type: 'sent',
			message: textToTranslateCopy
		})
		
		try {
			const translatedText = await translate({
				text: textToTranslateCopy,
				language: selectedLanguage!.label,
				apiKey: settings.value.openAiApiKey
			}) || '';
			messages.push({
				type: 'received',
				message: translatedText
			})
		} catch(error: any) {
			messages.push({
				type: 'received',
				message: `An error occured : ${error.message}`
			})
		} finally {
			isLoading = false;
		}
	};

	const canSend = $derived(!isLoading && selectedLanguage != null && textToTranslate !== '');
</script>

<header class="flex h-80 items-center justify-center space-x-4 bg-[#0D182E]">
	<div>
		<img class="h-24" src="/images/parrot.png" alt="Parrot icon" />
	</div>
	<div class="flex flex-col">
		<span class="text-5xl font-extrabold text-[#32CD32]">PollyGlot</span>
		<span class="font-semibold text-white">Perfect Translation Every Time</span>
	</div>
</header>
<main class="mx-4 my-8 rounded-lg border-4 border-black px-5 py-6">
	<div class="flex flex-col space-y-6">
		<div class="text-right">
			<button onclick={toggleDisplaySettings}>
				{displaySettings ? '❌' : '🔧'}
			</button>
		</div>
		{#if displaySettings}
			<Settings value={settings.value} onSave={saveSettings} />
		{:else}
			<Conversation messages={messages} />
			<form onsubmit={handleSubmit}>
				<div class="flex flex-col space-y-6">
					<div class="relative">
						<input
							class="bg-[#EFF0F4] px-2.5 py-3 text-xl font-semibold w-full pr-9 rounded-lg border-black border-2"
							type="text"
							bind:value={textToTranslate}
						/>
						<button type="submit" class="absolute right-2 translate-y-1/2 disabled:grayscale" disabled={!canSend}>
							<img src="/images/send-button.svg" alt="Sending icon">
						</button>
					</div>
					<LanguageSelectorV2 bind:value={selectedLanguage} />
				</div>
			</form>
		{/if}
	</div>
</main>
