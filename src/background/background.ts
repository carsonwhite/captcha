browser.webNavigation.onCompleted.addListener(async (details) => {
	const url = new URL(details.url).hostname;
	// const { blockList } = { websites: ['google.com'] };
	let { blockList } = await browser.storage.local.get("blockList");

	for await (let site of blockList) {

		if (url.includes(site.website)) {
			let index = blockList.indexOf(site);

			browser.tabs.sendMessage(details.tabId, { action: "showOverlay", ruleNum: index }).then(() => {
				console.log("overlay sent");
			}).catch((err) => {
				console.log("error: ", err);
			});
		}
	}


}, { url: [{ urlMatches: ".*" }] });

