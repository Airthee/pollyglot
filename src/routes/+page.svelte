<script lang="ts">
    import Subtitle from '../components/Subtitle.svelte';

    const languages: {label: string; image: string; value: string;}[] = [
        {
            label: 'French',
            image: '/images/french.png',
            value: 'french',
        },
        {
            label: 'Spanish',
            image: '/images/spanish.png',
            value: 'spaninsh',
        },
        {
            label: 'Japanese',
            image: '/images/japanese.png',
            value: 'japanese',
        },
    ]
</script>

<header class="h-80 bg-[#0D182E] flex items-center justify-center space-x-4">
    <div>
        <img class="h-24" src="/images/parrot.png" />
    </div>
    <div class="flex flex-col">
        <span class="text-[#32CD32] text-5xl font-extrabold">PollyGlot</span>
        <span class="text-white font-semibold">Perfect Translation Every Time</span>
    </div>
</header>
<main class="my-8 mx-4 px-5 py-6 border-4 border-black rounded-lg">
    <div class="flex flex-col space-y-6">
        <Subtitle>Text to translate 👇</Subtitle>
        <textarea class="bg-[#EFF0F4] px-2.5 py-3 font-semibold text-xl" rows="5" placeholder="How are you ?"></textarea>
        <Subtitle>Select language 👇</Subtitle>
        {#each languages as language}
            <div class="flex flex-row space-x-2 font-bold text-xl items-center">
                <input type="radio" name="language" value="{language.value}">
                <span>{language.label}</span>
                <img class="h-5" src="{language.image}" alt="{language.label} flag" />
            </div>
        {/each}
        <button type="button" class="bg-primary py-3.5">
            <span class="font-bold text-x2 text-white">Translate</span>
        </button>
    </div>
</main>