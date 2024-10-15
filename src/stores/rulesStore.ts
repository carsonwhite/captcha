import { writable } from "svelte/store";
import type { Rule } from "../lib/types";

export let rulesStore = writable(<Rule[]>[]);