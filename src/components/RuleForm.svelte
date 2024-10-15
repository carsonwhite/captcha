<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { addNewRuleStore, showEditStore } from '../stores/controlsStore';
	import { rulesStore } from '../stores/rulesStore';
	import type { Rule } from '../lib/types';

	export let id: string | number = 'new';

	let days: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	let newRule: Rule = {
		website: '',
		numToSolve: 1,
		difficulty: 5,
		// limit: 0,
		days: [1, 1, 1, 1, 1, 1, 1],
		startTime: '00:00',
		endTime: '23:59',
	};

	let rule: Rule = newRule;

	onMount(async () => {
		rule = id === 'new' ? newRule : $rulesStore[+id];
	});

	onDestroy(() => {
		if (id === 'new') {
			$addNewRuleStore = false;
		}
	});

	const updateRule = () => {
		if (id === 'new') {
			$rulesStore.push(rule);
		} else {
			$rulesStore[+id] = rule;
		}
		browser.storage.local.set({ reminders: $rulesStore });
		$addNewRuleStore = false;
		$showEditStore = -2;
	};

	const updateNewRuleDay = (day: number) => {
		rule.days[day] = rule.days[day] === 0 ? 1 : 0;
		rule = { ...rule };
	};
	const deleteRule = () => {
		$rulesStore.splice(+id, 1);
		browser.storage.local.set({ reminders: $rulesStore });
		$showEditStore = -1;
	};
</script>

<form on:submit|preventDefault={updateRule} class="border-2 border-black rounded-sm p-1">
	<div class="grid grid-cols-2">
		<label for="website">Website:</label>
		<input type="text" id="website" name="website" placeholder="website" required bind:value={rule.website} />
	</div>
	<div class="grid grid-cols-2">
		<label for="numToSolve">Number to solve:</label>
		<input type="number" id="numToSolve" name="numToSolve" placeholder="numToSolve" bind:value={rule.numToSolve} />
	</div>
	<div class="grid grid-cols-2">
		<label for="difficulty">difficulty</label>
		<input type="number" id="difficulty" name="difficulty" placeholder="5" min="1" max="10" required bind:value={rule.difficulty} />
	</div>
	<!-- <div class="grid grid-cols-2">
		<label for="limit">Daily Time allowed before activation (mins)</label>
		<input type="number" id="limit" name="limit" placeholder="0" required bind:value={rule.limit} />
	</div> -->
	<div class="grid grid-cols-2 mb-[2px]">
		<label for="days">Active Days:</label>
		<div class="grid grid-cols-7 border-black border p-1" id="days">
			{#each days as day, i}
				<button type="button" class="day-select" on:click={() => updateNewRuleDay(i)} class:day-selected={rule.days[i] !== 0}>{day}</button>
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-2">
		<label for="startTime">Start Time:</label>
		<input class="" type="time" name="startTime" required bind:value={rule.startTime} />
		<label for="endTime">End Time:</label>
		<input class="" type="time" name="endTime" required bind:value={rule.endTime} />
	</div>
	<div class="grid" class:grid-cols-2={id !== 'new'}>
		<div class="grid place-content-center" class:hidden={id === 'new'}>
			<button type="button" on:click={deleteRule} class="text-red-900 bg-red-200 hover:bg-red-400 border-2 border-red-300 rounded-sm text-xl px-1 mt-2">
				Delete
			</button>
		</div>
		<div class="grid place-content-center">
			<button type="submit" class="text-green-900 bg-green-200 hover:bg-green-400 border-2 border-green-300 rounded-sm text-xl px-1 mt-2">
				{#if $addNewRuleStore || $rulesStore.length === 0}
					Add
				{:else}
					Update
				{/if}
			</button>
		</div>
	</div>
</form>

<style>
	input {
		border: 1px solid black;
		margin-bottom: 2px;
		padding-left: 2px;
	}

	.day-selected {
		background-color: rgb(169, 218, 169);
	}
	.day-select {
		border: 1px solid white;
		display: grid;
		place-content: center;
		cursor: pointer;
	}
</style>
