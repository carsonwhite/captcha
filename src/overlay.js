// src/overlay.js
import Overlay from './Overlay.svelte';

function createOverlay(message) {


	const target = document.createElement('div');
	document.body.appendChild(target);

	new Overlay({
		target,
		props: {
			message,
		},
	});
}

export { createOverlay };
