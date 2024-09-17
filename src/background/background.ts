browser.webNavigation.onCompleted.addListener(async (details) => {
	const url = new URL(details.url).hostname;
	// const { websites } = { websites: ['google.com'] };
	let { websites } = await browser.storage.local.get("websites");
	// console.log("initial:", websites[0]);

	// if (websites.websites === undefined) {
	// 	await browser.storage.local.set({
	// 		websites: [
	// 			{
	// 				website: 'google.com',
	// 				length: 5,
	// 				difficulty: 'easy',
	// 				limit: 5,
	// 				days: [1, 1, 0, 0, 0, 0, 0],
	// 				startTime: '00:00',
	// 				endTime: '23:59'
	// 			},
	// 			{
	// 				website: 'fedoraproject.org',
	// 				length: 5,
	// 				difficulty: 'extra hard',
	// 				limit: 0,
	// 				days: [0, 1, 1, 1, 1, 0, 0],
	// 				startTime: '00:00',
	// 				endTime: '23:59'
	// 			}
	// 		]
	// 	});
	// 	// websites = await browser.storage.local.get("websites");

	// 	console.log("also: ", websites);
	// }
	websites.foreach((site) => {
		console.log('boop doop');

		console.log(site);

	})
	console.log(websites[0]);

	if (websites.some((site) => site.website.includes(site))) {
		console.log("blocking: ", url);

		browser.tabs.sendMessage(details.tabId, { action: "showOverlay" });

	}
}, { url: [{ urlMatches: ".*" }] });

