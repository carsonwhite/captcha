import { isBetweeen } from "../lib/helpers";

// browser.webNavigation.onDOMContentLoaded.addListener(async (details) => {

// 	console.log("onDOMContentLoaded: ", details);


// 	const url = new URL(details.url).hostname;
// 	console.log("url: ", url);
// 	// const { blockList } = { websites: ['google.com'] };
// 	let { blockList } = await browser.storage.local.get("blockList");

// 	for await (let site of blockList) {

// 		if (url.includes(site.website)) {

// 			let between = isBetweeen(site.startTime, site.endTime)
// 			console.log("between: ", between, site.startTime, site.endTime, site);


// 			if (isBetweeen(site.startTime, site.endTime) && site.days[(new Date()).getDay()]) {
// 				let index = blockList.indexOf(site);

// 				browser.tabs.sendMessage(details.tabId, { action: "showOverlay", ruleNum: index }).then(() => {
// 					console.log("overlay sent");
// 				}).catch((err) => {
// 					console.log("error: ", err);
// 				});
// 			}
// 		}
// 	}


// }, { url: [{ urlMatches: ".*" }] });

browser.tabs.onUpdated.addListener(async (tabID, changeInfo, tab) => {

	if (changeInfo.status === "loading") {

		const url = tab.url;
		console.log("url: ", url);
		// const { blockList } = { websites: ['google.com'] };
		let { blockList } = await browser.storage.local.get("blockList");

		for await (let site of blockList) {

			if (url.includes(site.website)) {
				if (isBetweeen(site.startTime, site.endTime) && site.days[(new Date()).getDay()]) {
					let index = blockList.indexOf(site);

					browser.tabs.sendMessage(tabID, { action: "showOverlay", ruleNum: index }).then(() => {
						console.log("overlay sent");
					}).catch((err) => {
						console.log("error: ", err);
					});
				}
			}
		}
	}


});
