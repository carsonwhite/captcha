<script lang="ts">
	import { onMount } from 'svelte';
	import { answerStore } from '../stores/answerStore';
	import { resetStore } from '../stores/resetStore';

	let length = 6;
	export let difficulty: number;
	console.log('difficulty: ', difficulty);

	length = Math.floor(length + difficulty * 1.2);

	let canvasWidth: number = 400 + length * 5;
	let canvasHeight: number = 100;

	console.log('canvasWidth: ', canvasWidth, 'length: ', length);

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let imagePath: string;

	const chars = '0123456789abcdefghijklmnopqrstuvwxtzabcdefghiklmnopqrstuvwxyz?!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

	const generate = () => {
		let randomString: string[] = generateRandomString();
		$answerStore = randomString.map((el) => el[0]).join('');

		if (ctx) {
			ctx.font = '40px Arial';
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = 'black';

			randomString.forEach(([letter, rotation], index) => {
				ctx.save();
				ctx.translate(10 + index * 30, Math.random() * 20 + 60);
				ctx.rotate((rotation * Math.PI) / 180);
				ctx.fillText(letter, 0, 0);
				ctx.restore();
			});
		}
	};

	onMount(() => {
		let overlayContainer = document.getElementById('overlay') as HTMLDivElement;
		canvas = overlayContainer.shadowRoot?.getElementById('captchaCanvas') as HTMLCanvasElement;

		ctx = canvas.getContext('2d');
		generate();
	});
	$: $resetStore, generate();
</script>

<div class="border-2 border-purple-700 bg-white h-full w-full">
	<canvas id="captchaCanvas" width={canvasWidth} height={canvasHeight} class="border-2"> </canvas>
</div>
