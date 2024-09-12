import Overlay from "../components/Overlay.svelte";


// THIS IS WHAT ALLOWS TAILWIND TO WORK IN THE CONTENT SCRIPT
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = browser.runtime.getURL('content/index.css'); // Use chrome.runtime.getURL() to reference the file
document.head.appendChild(link);


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