<script lang="ts">
	import { resetStore } from '../stores/resetStore';
	import Captcha from './Captcha.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { answerStore } from '../stores/answerStore';

	// this import makes sure the image gets bundled with the rest of the code
	import ResetImage from '../../static/reset.png';

	export let ruleNum;
	let blockList: any[] = [];
	let numToSolve: number;
	let solved: number = 0;
	let imagePath: string;

	onMount(async () => {
		browser.storage.local.get('blockList').then((res) => {
			blockList = res.blockList;
			numToSolve = blockList[ruleNum]?.numToSolve;
			console.log('blocklist: ', blockList, 'numToSolve: ', numToSolve);
		});
		imagePath = browser.runtime.getURL('content/reset.png');
		console.log('image: ', imagePath);
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

<div class="h-screen w-screen absolute overflow-hidden bg-black bg-opacity-50 z-50" style="position: absolute; top: 0px; z-index: 1000;" id="cover">
	<div class="grid place-content-center h-full border border-red-500">
		<section class="text-4xl grid place-content-center bg-green-500 text-white border">
			{solved} / {numToSolve}
		</section>
		<section class="grid grid-cols-2">
			<Captcha></Captcha>
			<button class="p-2 bg-white border-2 border-red-500 rounded-lg h-10" type="button" on:click={() => ($resetStore = !$resetStore)}>
				<img src={imagePath} alt="reset captcha" />
			</button>
		</section>
		<section>
			<form on:submit|preventDefault={checkCaptcha} class="text-black">
				<input type="text" id="captchaInput" class="p-2 bg-white rounded-lg text-xl" />
				<button class="p-2 bg-white rounded-lg text-xl text-black border-2 border-green-500" type="submit">Submit</button>
			</form>
		</section>
	</div>
</div>
