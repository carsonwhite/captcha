<script lang="ts">
	import { onMount } from "svelte";

 export let length = 6;

 onMount (() => {
  const canvas = document.getElementById("captchaCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const string_length = length;
  let randomstring = "";

  for (let i = 0; i < string_length; i++) {
	const rnum = Math.floor(Math.random() * chars.length);
	randomstring += chars.substring(rnum, rnum + 1);
  }

  ctx.font = "30px Arial";
  ctx.fillText(randomstring, 10, 30);
 });

</script>

<canvas id="captchaCanvas" width="200" height="50"></canvas>