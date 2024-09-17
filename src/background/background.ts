browser.webNavigation.onCompleted.addListener(async (details) => {
	const url = new URL(details.url).hostname;
	// const { blockList } = { websites: ['google.com'] };
	let { blockList } = await browser.storage.local.get("blockList");


	console.log("Blocklist: ", blockList);

	for await (let site of blockList) {
		console.log("site: ", site.website);

		if (url.includes(site.website)) {
			console.log("blocking: ", url);



			browser.tabs.sendMessage(details.tabId, { action: "showOverlay" }).then(() => {
				console.log("overlay sent");
			}).catch((err) => {
				console.log("error: ", err);
			});
		}
	}

	// if (blockList.some((site) => site.website.includes(site))) {
	// 	console.log("blocking: ", url);

	// 	browser.tabs.sendMessage(details.tabId, { action: "showOverlay" });

	// }
}, { url: [{ urlMatches: ".*" }] });

