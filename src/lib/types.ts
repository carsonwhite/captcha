export type Rule = {
	website: string;
	numToSolve: number;
	difficulty: number;
	limit?: number;
	days: number[];
	startTime: string;
	endTime: string;
}