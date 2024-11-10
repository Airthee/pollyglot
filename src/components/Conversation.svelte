<script module lang="ts">
    export type ConversationMessage = {
		message: string;
		type: 'sent' | 'received'
	};
</script>

<script lang="ts">
    type Props = {
        messages: ConversationMessage[],
    }

    const {
        messages
    }: Props = $props();

    const BASE_CLASSES = ['rounded-lg', 'p-5'];
    const MESSAGE_CLASSES: Record<ConversationMessage['type'], string[]> = {
        'received': [...BASE_CLASSES, 'justify-self-end', 'rounded-tr-none', 'bg-primary', 'text-white'],
        'sent': [...BASE_CLASSES, 'justify-self-start', 'rounded-tl-none', 'bg-[#65DA65]', 'text-black']
    };
</script>

<div class="flex flex-col space-y-4">
    {#each messages as message }
        <div class={MESSAGE_CLASSES[message.type].join(' ')}>
            {message.message}
        </div>
    {/each}
</div>