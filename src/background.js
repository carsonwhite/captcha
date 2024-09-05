browser.webNavigation.onCompleted.addListener(async (details) => {
	const url = new URL(details.url).hostname;

	const { websites } = await browser.storage.local.get("websites") || { websites: [] };

	if (websites.some((site) => url.includes(site))) {
		browser.tabs.sendMessage(details.tabId, { action: "showOverlay" });
	}
}, { url: [{ urlMatches: ".*" }] });
