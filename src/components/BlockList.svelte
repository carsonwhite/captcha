<script lang="ts">
	import { onMount } from 'svelte';
	import { blockListStore } from '../stores/blockListStore';

	let addNewRule = false;

	let days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	let newRule = {
		website: 'test.com',
		numToSolve: 2,
		difficulty: 1,
		limit: 0,
		days: [1, 1, 1, 1, 1, 1, 1],
		startTime: '00:00',
		endTime: '23:59',
	};

	onMount(async () => {
		let rules = await browser.storage.local.get('blockList');
		$blockListStore = rules.blockList || [];
	});

	const makeNewRule = async () => {
		$blockListStore = [...$blockListStore, newRule];

		await browser.storage.local.set({ blockList: $blockListStore });
		addNewRule = false;
	};
	const updateNewRuleDay = (day: number) => {
		newRule.days[day] = newRule.days[day] === 0 ? 1 : 0;
		newRule = { ...newRule };
	};
</script>

<div class="bg-black text-gray-500 py-2 xl:text-2xl w-full">
	<table class="w-full">
		<thead>
			<tr class=" grid grid-cols-10">
				<th class="col-span-3">Website</th>
				<th>Captchas to solve</th>
				<th> Captcha difficulty <br /> (1-10)</th>
				<th>Time allowed before blocking</th>
				<th class="col-span-2">Days <br /> (click letters to toggle)</th>
				<th>Start time</th>
				<th>End time</th>
			</tr>
		</thead>
	</table>

	{#each $blockListStore as blockItem}
		<div class="grid grid-cols-10">
			<div class="col-span-3 border p-1">{blockItem.website}</div>
			<div class="border p-1">{blockItem.numToSolve}</div>
			<div class="border p-1">{blockItem.difficulty}</div>
			<div class="border p-1">{blockItem.limit}</div>
			<div class="border col-span-2 grid grid-cols-7">
				{#each blockItem.days as day, i}
					<span class:day-selected={day !== 0} class="border grid place-content-center">
						{days[i]}
					</span>
				{/each}
			</div>
			<div class="border p-1">{blockItem.startTime}</div>
			<div class="border p-1">{blockItem.endTime}</div>
		</div>
	{/each}

	{#if $blockListStore.length === 0 || addNewRule}
		<!-- {#if true} -->
		<form on:submit|preventDefault={makeNewRule} class=" text-black">
			<div class="grid grid-cols-10">
				<input class=" col-span-3" type="text" name="website" required bind:value={newRule.website} />

				<input class="" type="text" name="length" required bind:value={newRule.numToSolve} />

				<input class="" type="number" max="10" min="1" name="difficulty" required bind:value={newRule.difficulty} />

				<input class="" type="number" name="limit" required bind:value={newRule.limit} />

				<div class="text-white grid grid-cols-7 col-span-2" id="days">
					<span class="day-select" on:click={() => updateNewRuleDay(0)} class:day-selected={newRule.days[0] !== 0}>S</span>
					<span class="day-select" on:click={() => updateNewRuleDay(1)} class:day-selected={newRule.days[1] !== 0}>M</span>
					<span class="day-select" on:click={() => updateNewRuleDay(2)} class:day-selected={newRule.days[2] !== 0}>T</span>
					<span class="day-select" on:click={() => updateNewRuleDay(3)} class:day-selected={newRule.days[3] !== 0}>W</span>
					<span class="day-select" on:click={() => updateNewRuleDay(4)} class:day-selected={newRule.days[4] !== 0}>T</span>
					<span class="day-select" on:click={() => updateNewRuleDay(5)} class:day-selected={newRule.days[5] !== 0}>F</span>
					<span class="day-select" on:click={() => updateNewRuleDay(6)} class:day-selected={newRule.days[6] !== 0}>S</span>
				</div>

				<input class="" type="time" name="startTime" required bind:value={newRule.startTime} />
				<input class="" type="time" name="endTime" required bind:value={newRule.endTime} />
			</div>
			<!-- {#if addNewRule || $blockListStore.length === 0} -->
			<div class="grid place-content-center mt-4">
				<button type="submit" class="border border-green-700 text-white bg-green-500 text-xl rounded-md p-1">Save Rule</button>
			</div>
			<!-- {/if} -->
		</form>
	{/if}

	<div class="grid place-content-center mt-4">
		{#if !addNewRule && $blockListStore.length !== 0}
			<button
				class="border border-orange-700 text-white bg-orange-500 text-xl rounded-md p-1"
				on:click={() => (addNewRule = !addNewRule)}
				on:keyup={() => (addNewRule = !addNewRule)}>Add New Rule</button>
		{/if}
	</div>
</div>

<style>
	th {
		border: 1px solid white;
	}
	input,
	select {
		border: 2px solid green;
		padding: 2px;
	}
	.day-selected {
		background-color: green;
	}
	.day-select {
		border: 1px solid white;
		display: grid;
		place-content: center;
		cursor: pointer;
	}
</style>
