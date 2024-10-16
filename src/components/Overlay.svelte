<script lang="ts">
	import { resetStore } from '../stores/resetStore';
	import Captcha from './Captcha.svelte';
	import '../app.css';
	import { onDestroy, onMount } from 'svelte';
	import { answerStore } from '../stores/answerStore';

	// this import makes sure the image gets bundled with the rest of the code
	import ResetImage from '../../static/reset.png';
	import ResetImageSVG from '../../static/reset-double.png';

	export let ruleNum;
	let blockList: any[] = [];
	let numToSolve: number;
	let solved: number = 0;
	let imagePath: string;
	let difficulty: number;

	let overlay: ShadowRoot | null | undefined;

	onMount(async () => {
		browser.storage.local.get('blockList').then((res) => {
			blockList = res.blockList;
			numToSolve = blockList[ruleNum]?.numToSolve;
			difficulty = blockList[ruleNum]?.difficulty;
		});
		imagePath = browser.runtime.getURL('content/reset.png');
		overlay = document.getElementById('overlay')?.shadowRoot;

		document.body.style.overflow = 'hidden'; // stop the user from scrolling past the overlay while the overlay is active
	});

	const checkCaptcha = () => {
		let input = overlay?.getElementById('captchaInput') as HTMLInputElement;
		if (input.value === $answerStore) {
			solved++;
			input.value = '';
			$resetStore = !$resetStore;
			if (solved === numToSolve) {
				document.body.style.overflow = 'auto'; // restore scrolling
				const overlayContainer = overlay?.getElementById('overlayContainer');
				if (overlayContainer) {
					overlayContainer.style.display = 'none';
				}
				$resetStore = !$resetStore;
			}
		}
	};
</script>

<div id="overlayContainer" class="h-screen w-screen absolute top-0 overflow-hidden bg-black bg-opacity-95 font-mono">
	<div class="grid place-content-center h-full text-center">
		<h1 class="text-5xl font-mono">CaptchaLock</h1>
		<h4 class="mb-8">Is it worth it?</h4>
		<h2 class="text-5xl grid place-content-center">
			{solved} / {numToSolve}
		</h2>
		<section class="grid relative mt-2">
			{#if difficulty}
				<Captcha {difficulty}></Captcha>
				<div class="absolute bottom-1 right-1 bg-white">
					<button class="w-10 h-10 grid place-content-center" on:click={() => ($resetStore = !$resetStore)}>
						<img src={imagePath} alt="reset captcha" class="" />
					</button>
				</div>
			{/if}
		</section>
		<section class="mt-4">
			<div class="text-black grid place-content-center">
				<form on:submit|preventDefault={checkCaptcha}>
					<input type="text" id="captchaInput" class="bg-white text-black border border-black mb-1 pl-1 text-xl" required />
					<button class="text-teal-900 bg-teal-200 hover:bg-teal-400 border-2 border-teal-300 rounded-sm text-xl px-1" type="submit">Submit</button>
				</form>
			</div>
		</section>
	</div>
</div>

<style>
	#overlayContainer {
		z-index: 9999;
	}
</style>
