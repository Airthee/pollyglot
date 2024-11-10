<script module lang="ts">
	export type Language = { label: string; image: string; value: string };
</script>

<script lang="ts">
    type Props = {
        value?: Language;
    }

	const availableLanguages: Language[] = [
		{
			label: 'French',
			image: '/images/french.png',
			value: 'french'
		},
		{
			label: 'Spanish',
			image: '/images/spanish.png',
			value: 'spaninsh'
		},
		{
			label: 'Japanese',
			image: '/images/japanese.png',
			value: 'japanese'
		}
	];

    let { value: selectedLanguage = $bindable() }: Props = $props();
	function handleClickLanguage(language: Language) {
		selectedLanguage = language;
	}
</script>

<div class="flex flex-row justify-evenly">
	{#each availableLanguages as language}
		<button type="button" class="border-grey border-2 {language.value === selectedLanguage?.value ? 'border-2 border-black' : '' }" onclick={() => handleClickLanguage(language)}>
			<img class="h-10" src={language.image} alt="{language.label} flag" />
		</button>
	{/each}
</div>
