import { isBetweeen } from "../lib/helpers";
import type { Rule } from "../lib/types";

let blockList: Rule[];

browser.webRequest.onBeforeRequest.addListener((details) => {
	const url = new URL(details.url).hostname;

	console.log("url: ", url);


	for (let site of blockList) {

		if (url.includes(site.website) && isBetweeen(site.startTime, site.endTime)) {
			let index = blockList.indexOf(site);

			browser.tabs.update(details.tabId, { url: browser.runtime.getURL("blocked.html") });
			return { cancel: true }; // Cancel the original request
		}
	}


	// browser.tabs.sendMessage(details.tabId, { action: "showOverlay", ruleNum: index }).then(() => {
	// 	console.log("overlay sent");
	// }).catch((err) => {
	// 	console.log("error: ", err);
	// });

}, { urls: ["<all_urls>"] },   // Apply to all URLs
	["blocking"]                // Enable blocking)
);

browser.runtime.onStartup.addListener(async () => {
	let { blockList } = await browser.storage.local.get("blockList");
	console.log("blockList: ", blockList);
});

browser.runtime.onInstalled.addListener(async () => {
	let { blockList } = await browser.storage.local.get("blockList");
	console.log("blockList: ", blockList);
});


// TODO: Add listener for when the blockList is updated
browser.runtime.onMessage.addListener(async (message) => {
	if (message.action === "blockList") {
		blockList = message.blockList;
	}
});
