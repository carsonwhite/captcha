// // // import { createOverlay } from "./overlay";

// function loadSvelteComponent() {
// 	console.log('loading svelte component****************************8');

// 	import('./overlay.js').then((module) => {
// 		module.createOverlay('This is a Svelte component overlay!');
// 	});
// }

// browser.runtime.onMessage.addListener((message) => {
// 	console.log('message received', message);

// 	if (message.action === 'showOverlay') {
// 		const script = document.createElement('script');
// 		script.src = browser.runtime.getURL('overlay.js');
// 		script.type = 'module';
// 		document.body.appendChild(script);
// 	}
// });

// import Overlay from './Overlay.svelte';

// function createOverlay(message) {


// 	const target = document.createElement('div');
// 	document.body.appendChild(target);

// 	new Overlay({
// 		target,
// 		props: {
// 			message,
// 		},
// 	});
// }

function createOverlay(message) {
	const overlay = document.createElement('div');
	overlay.style.position = 'fixed';
	overlay.style.top = '0';
	overlay.style.left = '0';
	overlay.style.width = '100%';
	overlay.style.height = '50px';
	overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
	overlay.style.color = 'white';
	overlay.style.zIndex = '9999';
	overlay.style.textAlign = 'center';
	overlay.style.lineHeight = '50px';
	overlay.textContent = message;
	document.body.appendChild(overlay);
}

// Listen for messages from the background script
browser.runtime.onMessage.addListener((message) => {
	console.log('Message received in content script:', message);
	if (message.action === 'showOverlay') {
		createOverlay('This is a Svelte component overlay!');
	}
});

