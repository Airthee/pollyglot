<script lang="ts">
	type Props = {
		value: string;
		placeholder?: string;
		rows?: number;
        readonly?: boolean;
	};

	let { value = $bindable(), placeholder = '', rows = 5, readonly }: Props = $props();
</script>

<textarea
    {readonly}
    class="bg-[#EFF0F4] px-2.5 py-3 text-xl font-semibold" {rows} {placeholder} bind:value="{value}"
></textarea>
