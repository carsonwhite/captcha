<!-- src/Overlay.svelte -->
<script>
	export let message = 'This is an overlay!';
</script>

<div class="overlay">
	{message}
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		z-index: 9999;
		text-align: center;
		line-height: 50px;
		font-size: 20px;
	}
</style>
