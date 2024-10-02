<script lang="ts">
	import { resetStore } from '../stores/resetStore';
	import Captcha from './Captcha.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { answerStore } from '../stores/answerStore';

	// this import makes sure the image gets bundled with the rest of the code
	import ResetImage from '../../static/reset.png';
	import ResetImageSVG from '../../static/reset-double.png';

	export let ruleNum;
	let blockList: any[] = [];
	let numToSolve: number;
	let solved: number = 0;
	let imagePath: string;
	let imagePathSmol: string;
	let difficulty: number;

	onMount(async () => {
		browser.storage.local.get('blockList').then((res) => {
			blockList = res.blockList;
			numToSolve = blockList[ruleNum]?.numToSolve;
			difficulty = blockList[ruleNum]?.difficulty;
			console.log('blockList: ', blockList, 'numToSolve: ', numToSolve, 'difficulty: ', difficulty);
		});
		imagePath = browser.runtime.getURL('content/reset.png');
		imagePathSmol = browser.runtime.getURL('content/reset-double.png');
		console.log('imagePath: ', imagePath);
		console.log('imagePathSmol: ', imagePathSmol);
	});

	const checkCaptcha = () => {
		let input = document.getElementById('captchaInput') as HTMLInputElement;
		console.log('input: ', input.value, 'answer: ', $answerStore);

		if (input.value === $answerStore) {
			solved++;
			input.value = '';
			$resetStore = !$resetStore;
			if (solved === numToSolve) {
				// document.getElementById('cover').style.display = 'none';
				$resetStore = !$resetStore;
			}
		}
	};
</script>

<div id="overlayContainer" class="h-screen w-screen absolute overflow-hidden" style="position: absolute; top: 0px; z-index: 1000;">
	<div class="grid place-content-center h-full border border-red-500">
		<section class="text-4xl grid place-content-center bg-green-500 text-white border">
			{solved} / {numToSolve}
		</section>
		<section class="grid">
			{#if difficulty}
				<Captcha {difficulty}></Captcha>
			{/if}
		</section>
		<section>
			<form on:submit|preventDefault={checkCaptcha} class="text-black">
				<input type="text" id="captchaInput" class="p-2 bg-white rounded-lg text-xl" />
				<button class="p-2 bg-white rounded-lg text-xl text-black border-2 border-green-500" type="submit">Submit</button>
			</form>
		</section>
	</div>
</div>

<style>
	/* #overlayContainer {
		all: revert !important;
	} */
</style>
