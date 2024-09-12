<script lang="ts">
	import { resetStore } from '../stores/resetStore';
	import Captcha from './Captcha.svelte';
</script>

<div
	class="h-screen w-screen fixed overflow-hidden bg-red-800 bg-opacity-50 z-50"
	style="position: absolute; width: 100vh; height: 100vh; background-color: gray; --tw-bg-opacity: 0.5; top: 0px; z-index: 1000;"
	id="cover">
	<!-- <Captcha></Captcha> -->
	<button class="p-2 bg-green-500 rounded-lg text-xl" type="button" on:click={() => ($resetStore = !$resetStore)}>RESET</button>
</div>
<div></div>

<style>
	#cover {
		position: absolute;
		background-color: blueviolet;
		height: 100vh;
		width: 100vw;
	}
	button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	body {
		background-color: red;
		color: yellow;
	}
</style>
