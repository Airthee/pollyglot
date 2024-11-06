<script lang="ts">
    type Props = {
        onClick: () => void;
        children: any;
        variant?: 'primary';
        disabled?: boolean;
    }

    const { onClick, children, variant='primary', disabled = false }: Props = $props();

    const colors = {
        primary: {
            background: 'primary',
            text: 'white'
        }
    }

    const backgroundClass = `bg-${colors[variant].background}`
    const textClass = `text-${colors[variant].text}`
</script>

<button type="button" class="{backgroundClass} py-3.5 text-2xl font-bold {textClass} disabled:contrast-50" {disabled} onclick={onClick}>
    {@render children()}
</button>