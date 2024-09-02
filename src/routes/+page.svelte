<script lang="ts">
	import Captcha from '$lib/components/Captcha.svelte';
	import { onMount } from 'svelte';
	import { answerStore } from '../stores/answerStore';
	import { resetStore } from '../stores/resetStore';
	import BlockList from '$lib/components/BlockList.svelte';

	let numberToSolve = 5;
	let difficulty = 1;
	let completed = 0;
	let answer = '';

	function checkAnswer() {
		if (answer === $answerStore) {
			completed++;
			answer = '';
			$resetStore = !$resetStore;
			document.getElementById('captcha')?.focus();
		}
	}
	function getNew() {
		answer = '';
		$resetStore = !$resetStore;
	}

	onMount(() => {
		document.getElementById('captcha')?.focus();
	});
</script>

<main class="w-full h-full grid place-content-center text-white">
	<section class="text-white text-4xl text-center py-4 font-mono">
		{completed} / {numberToSolve}
	</section>
	<div class="h-fit w-fit">
		<Captcha length={6} />
	</div>
	<form on:submit={checkAnswer}>
		<input type="text" name="captcha" id="captcha" class="border text-black" bind:value={answer} />
		<button type="submit">Check</button>
	</form>
	<button type="button" on:click={getNew}>Get new</button>

	<BlockList></BlockList>
</main>
