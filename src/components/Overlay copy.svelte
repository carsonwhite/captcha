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
	let difficulty: number;

	let base;
	let stylesheets;
	let scripts;

	onMount(async () => {
		browser.storage.local.get('blockList').then((res) => {
			blockList = res.blockList;
			numToSolve = blockList[ruleNum]?.numToSolve;
			difficulty = blockList[ruleNum]?.difficulty;
			console.log('blockList: ', blockList, 'numToSolve: ', numToSolve, 'difficulty: ', difficulty);
		});
		imagePath = browser.runtime.getURL('content/reset.png');
		console.log('imagePath: ', imagePath);
		base = document.getRootNode() as Document;
		console.log(base);
		stylesheets = Array.from(base.styleSheets).filter((stylesheet) => !stylesheet.href || !stylesheet.href.includes('content/index.css'));
		stylesheets.forEach((stylesheet) => {
			if (stylesheet.ownerNode && stylesheet.ownerNode.parentNode) {
				stylesheet.ownerNode.parentNode.removeChild(stylesheet.ownerNode);
			}
		});
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

<svelte:head>
	<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
</svelte:head>

<div id="overlayContainer" class="h-screen w-screen sticky top-0 overflow-hidden bg-black font-mono" style="position: absolute; top: 0px; z-index: 1000;">
	<div class="grid place-content-center h-full border border-red-500">
		<section class="text-4xl grid place-content-center bg-green-500 text-white border">
			{solved} / {numToSolve}
		</section>
		<section class="grid">
			{#if difficulty}
				<Captcha {difficulty}></Captcha>
			{/if}
		</section>
		<section class=" bg-white" id="answerBar">
			<div class="">
				<button class="w-10 h-10 grid place-content-center" on:click={() => ($resetStore = !$resetStore)}>
					<img src={imagePath} alt="reset captcha" class="" />
				</button>
			</div>
			<div class="text-black border-black border-2 bg-red-200">
				<form on:submit|preventDefault={checkCaptcha} class="grid grid-cols-2">
					<input type="text" id="captchaInput" class="p-1 bg-white rounded-lg text-xl border-2 border-black" />
					<button class="p-2 bg-white rounded-lg text-xl text-black border-2 border-green-500" type="submit">Submit</button>
				</form>
			</div>
		</section>
	</div>
</div>

<style>
	answerBar {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
</style>
