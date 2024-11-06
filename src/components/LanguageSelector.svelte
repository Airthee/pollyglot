<script module lang="ts">
	export type Language = { label: string; image: string; value: string };
</script>

<script lang="ts">
	import Subtitle from './Subtitle.svelte';

    type Props = {
        value: Language | null;
    }

    let { value = $bindable() }: Props = $props();

	const languages: Language[] = [
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
    let selectedLanguage: Language['value'] | null = $state(value?.value || null);
    $effect(() => {
        value = languages.find((l) => l.value === selectedLanguage) || null;
    })
</script>

<Subtitle>Select language 👇</Subtitle>
{#each languages as language}
	<div class="flex flex-row items-center space-x-2 text-xl font-bold">
		<input
			type="radio"
			id="input-language-{language.value}"
			name="language"
			value={language.value}
			bind:group={selectedLanguage}
		/>
		<label for="input-language-{language.value}" class="flex flex-row items-center space-x-2">
			<span>{language.label}</span>
			<div class="border-grey border-2">
				<img class="h-5" src={language.image} alt="{language.label} flag" />
			</div>
		</label>
	</div>
{/each}
