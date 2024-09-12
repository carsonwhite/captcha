import Overlay from "../components/Overlay.svelte";

// new Overlay({ target: document.body });

// const app = new Overlay({
// 	target: document.body, // or any specific element you want
// });

// export default app;


browser.runtime.onMessage.addListener((message) => {
	console.log('Message received in content script:', message);
	if (message.action === 'showOverlay') {
		createOverlay('This is a Svelte component overlay!');
	}
});

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