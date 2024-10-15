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
			console.log('blockList: ', blockList, 'numToSolve: ', numToSolve, 'difficulty: ', difficulty);
		});
		imagePath = browser.runtime.getURL('content/reset.png');
		overlay = document.getElementById('overlay')?.shadowRoot;

		// stop the user from scrolling past the overlay while the overlay is active
		document.body.style.overflow = 'hidden';
	});

	const checkCaptcha = () => {
		let input = overlay?.getElementById('captchaInput') as HTMLInputElement;
		console.log('input: ', input.value, 'answer: ', $answerStore);

		if (input.value === $answerStore) {
			solved++;
			input.value = '';
			$resetStore = !$resetStore;
			if (solved === numToSolve) {
				// restore scrolling
				document.body.style.overflow = 'auto';
				const overlayContainer = overlay?.getElementById('overlayContainer');
				if (overlayContainer) {
					overlayContainer.style.display = 'none';
				}
				$resetStore = !$resetStore;
			}
		}
	};
</script>

<div id="overlayContainer" class="h-screen w-screen absolute top-0 overflow-hidden bg-black bg-opacity-90 font-mono z-50">
	<div class="grid place-content-center h-full">
		<section class="text-4xl grid place-content-center">
			{solved} / {numToSolve}
		</section>
		<section class="grid relative">
			{#if difficulty}
				<Captcha {difficulty}></Captcha>
				<div class="absolute bottom-1 right-1 bg-white">
					<button class="w-10 h-10 grid place-content-center" on:click={() => ($resetStore = !$resetStore)}>
						<img src={imagePath} alt="reset captcha" class="" />
					</button>
				</div>
			{/if}
		</section>
		<section class=" bg-white" id="answerBar">
			<div class="text-black">
				<form on:submit|preventDefault={checkCaptcha} class="grid grid-cols-2">
					<input type="text" id="captchaInput" class="p-1 bg-white rounded-lg text-xl border-2 border-black" />
					<button class="p-2 bg-white rounded-lg text-xl text-black border-2 border-green-500" type="submit">Submit</button>
				</form>
			</div>
		</section>
	</div>
</div>
