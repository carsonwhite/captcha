<script lang="ts">
	import { resetStore } from '../stores/resetStore';
	import Captcha from './Captcha.svelte';
	import '../app.css';
</script>

<div class="h-screen w-screen absolute overflow-hidden bg-black bg-opacity-50 z-50" style="position: absolute; top: 0px; z-index: 1000;" id="cover">
	<div class="grid place-content-center h-1/3 border border-red-500">
		<section>
			<Captcha></Captcha>
		</section>
		<section>
			<button class="p-2 bg-green-500 rounded-lg text-xl" type="button" on:click={() => ($resetStore = !$resetStore)}>RESET</button>
		</section>
	</div>
</div>
