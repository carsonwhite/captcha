// src/content.js
import { createOverlay } from './overlay';

browser.runtime.onMessage.addListener((message) => {
	console.log('message received', message);

	if (message.action === 'showOverlay') {
		createOverlay('This is a Svelte component overlay!');
	}
});
