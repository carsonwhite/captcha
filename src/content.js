// src/content.js
import { createOverlay } from './overlay';

browser.runtime.onMessage.addListener((message) => {
	if (message.action === 'showOverlay') {
		createOverlay('This is a Svelte component overlay!');
	}
});
