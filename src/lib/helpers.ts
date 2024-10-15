export const isBetweeen = (startTime: string, endTime: string) => {
	const currentDateTime = new Date();
	const hours = currentDateTime.getHours();
	const minutes = currentDateTime.getMinutes();
	const alarmStartTime = startTime.split(":");
	const alarmEndTime = endTime.split(":");
	return hours >= parseInt(alarmStartTime[0]) && hours <= parseInt(alarmEndTime[0]) && minutes >= parseInt(alarmStartTime[1]) && minutes <= parseInt(alarmEndTime[1]);
};