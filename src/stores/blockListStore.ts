import { writable } from "svelte/store";

export let blockListStore = writable([
	{
		website: 'google.com',
		length: 5,
		difficulty: 'easy',
		limit: 5,
		days: [1, 1, 0, 0, 0, 0, 0],
		startTime: '00:00',
		endTime: '23:59'
	},
	{
		website: 'reddit.com',
		length: 5,
		difficulty: 'extra hard',
		limit: 0,
		days: [0, 1, 1, 1, 1, 0, 0],
		startTime: '00:00',
		endTime: '23:59'
	}
]);