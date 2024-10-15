import Overlay from "../components/Overlay.svelte";
import css from '../app.css?inline';


// TODO: maybe don't need this once tailwind wonkiness is not being wonky
// This is what allows Tailwind to work in the content script
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = browser.runtime.getURL('content/index.css');
document.head.appendChild(link);

browser.runtime.onMessage.addListener(async (message) => {
	if (message.action === 'showOverlay') {
		console.log('showing overlay');
		createOverlay(message.ruleNum);
	}
});

function createOverlay(ruleNum: number) {

	const target = document.createElement('div');

	// so captcha component can find canvas element in shadowDom
	target.id = 'overlay';

	const shadowRoot = target.attachShadow({ mode: 'open' });
	document.body.appendChild(target);

	shadowRoot.innerHTML = `<style>${css}</style>`;

	new Overlay({
		target: shadowRoot,
		props: {
			ruleNum,
		},
	});
}