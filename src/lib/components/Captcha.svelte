<script lang="ts">
	import { onMount } from 'svelte';
	import { answerStore } from '../../stores/answerStore';
	import { resetStore } from '../../stores/resetStore';
	import { browser } from '$app/environment';

	export let length = 6;
	export let difficulty = 1;

	const chars = '0123456789abcdefghijklmnopqrstuvwxtzabcdefghiklmnopqrstuvwxyz?!@#$%^&*';

	function generateRandomString() {
		// TO DO properly type this
		let captchaString: any = [];

		for (let i = 0; i < length; i++) {
			let posOrNeg = Math.random() < 0.5 ? -1 : 1;
			let letterRotation = posOrNeg * Math.floor(Math.random() * 45);
			const rnum = Math.floor(Math.random() * chars.length);
			captchaString.push([chars.substring(rnum, rnum + 1), letterRotation]);
		}
		return captchaString;
	}

	function generate() {
		if (browser) {
			let randomString: string[] = generateRandomString();
			$answerStore = randomString.map((el) => el[0]).join('');

			const canvas = document.getElementById('captchaCanvas') as HTMLCanvasElement;
			const ctx = canvas.getContext('2d');

			ctx.font = '60px Arial';
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = 'white';

			randomString.forEach(([letter, rotation], index) => {
				ctx.save();
				ctx.translate(10 + index * 60, Math.random() * 20 + 60);
				ctx.rotate((rotation * Math.PI) / 180);
				ctx.fillText(letter, 0, 0);
				ctx.restore();
			});
		}
	}

	onMount(() => {
		generate();
	});
	$: $resetStore, generate();
</script>

<div class="border-2 border-purple-700 h-full w-full">
	<canvas id="captchaCanvas" width="400" height="200"></canvas>
</div>
