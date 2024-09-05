browser.webNavigation.onCompleted.addListener(async (details) => {
	const url = new URL(details.url).hostname;
	console.log(url);
	const { websites } = await browser.storage.local.get("websites") || { websites: ['google.com'] };

	if (websites.some((site) => url.includes(site))) {
		console.log("showOverlay");
		browser.tabs.sendMessage(details.tabId, { action: "showOverlay" });

	}
}, { url: [{ urlMatches: ".*" }] });
