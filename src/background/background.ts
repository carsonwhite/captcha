browser.webNavigation.onCompleted.addListener(async (details) => {
	const url = new URL(details.url).hostname;
	console.log("url", url);
	// const { websites } = await browser.storage.local.get("websites") || { websites: ['google.com'] };
	const { websites } = { websites: ['google.com'] };

	console.log(websites);


	if (websites.some((site) => url.includes(site))) {
		console.log("showOverlay");
		browser.tabs.sendMessage(details.tabId, { action: "showOverlay" });

	}
}, { url: [{ urlMatches: ".*" }] });
