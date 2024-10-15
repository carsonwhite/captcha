import { writable } from "svelte/store";

export let showEditStore = writable(-1);

export let addNewRuleStore = writable(false);