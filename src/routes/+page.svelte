<script lang="ts">
	import { translate } from '$lib/translate';
	import { LocalStorageSettingsService } from '../adapters/LocalStorageSettingsService';
	import Button from '../components/Button.svelte';
	import LanguageSelector, { type Language } from '../components/LanguageSelector.svelte';
	import Settings from '../components/Settings.svelte';
	import Subtitle from '../components/Subtitle.svelte';
	import Textarea from '../components/Textarea.svelte';
	import { DEFAULT_SETTINGS, type Settings as SettingsType } from '../ports/settingsService';

	const Steps = {
		InitTranslation: 'INIT',
		TranslationResult: 'RESULT'
	};
	let step: (typeof Steps)[keyof typeof Steps] = $state(Steps.InitTranslation);
	let textToTranslate: string = $state('');
	let translatedText: string = $state('');
	let selectedLanguage: Language | null = $state(null);
	let isLoading = $state(false);
	const settingsService = new LocalStorageSettingsService();
	let settings: SettingsType = $state(DEFAULT_SETTINGS);
	$effect(() => {
		if (window) {
			settings = settingsService.getSettings();
		}
	})
	$inspect(settings);
	const handleClickTranslate = async () => {
		isLoading = true;
		try {
			if (textToTranslate && selectedLanguage) {
				translatedText = await translate({
					text: textToTranslate,
					language: selectedLanguage.label,
					apiKey: settings.openAiApiKey
				}) || '';
				step = Steps.TranslationResult;
			} else {
				console.error('Missing parameter');
			}
		} catch(error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	};

	const handleClickStartOver = () => {
		step = Steps.InitTranslation;
		textToTranslate = '';
		translatedText = '';
		selectedLanguage = null;
	};

	let displaySettings = $state(false);
	const toggleDisplaySettings = () => (displaySettings = !displaySettings);
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
			<Settings bind:value={settings} />
		{:else if step === Steps.InitTranslation}
			<Subtitle>Text to translate 👇</Subtitle>
			<Textarea placeholder="How are you ?" bind:value={textToTranslate} />
			<LanguageSelector bind:value={selectedLanguage} />
			<Button disabled={isLoading} onClick={handleClickTranslate}>Translate</Button>
		{:else if step === Steps.TranslationResult}
			<Subtitle>Original text 👇</Subtitle>
			<Textarea readonly value={textToTranslate} />
			<Subtitle>Your translation 👇</Subtitle>
			<Textarea readonly value={translatedText} />
			<Button onClick={handleClickStartOver}>Start Over</Button>
		{/if}
	</div>
</main>
