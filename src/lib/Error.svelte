<script lang="ts">
	export let error: Error | undefined;
</script>

{#if error}
	<strong class="text-red-600">{error.message}</strong>
{/if}
