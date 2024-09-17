import Overlay from "../components/Overlay.svelte";


// This is what allows Tailwind to work in the content script
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = browser.runtime.getURL('content/index.css');
document.head.appendChild(link);


browser.runtime.onMessage.addListener(async (message) => {
	if (message.action === 'showOverlay') {
		let { websites } = await browser.storage.local.get("websites");

		console.log(websites[0]);

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