<script lang="ts">
	let addNewRule = false;

	let testItems = [
		{
			website: 'google.com',
			length: 5,
			difficulty: 'easy',
			limit: 5,
			startDay: 'Sunday',
			endDay: 'Sunday',
			startTime: '00:00',
			endTime: '23:59'
		}
	];
</script>

<div class="bg-white text-black py-2">
	<table class="w-full">
		<thead>
			<tr class=" grid grid-cols-10">
				<th class="col-span-3">Website</th>
				<th>Captcha Length</th>
				<th> Complexity</th>
				<th>Time allowed</th>
				<th>Start day</th>
				<th>Start time</th>
				<th>End day</th>
				<th>End time</th>
			</tr>
		</thead>
	</table>

	{#each testItems as testItem}
		<div class="grid grid-cols-10">
			<div class="col-span-3 border">{testItem.website}</div>
			<div class="border">{testItem.length}</div>
			<div class="border">{testItem.difficulty}</div>
			<div class="border">{testItem.limit}</div>
			<div class="border">{testItem.startDay}</div>
			<div class="border">{testItem.startTime}</div>
			<div class="border">{testItem.endDay}</div>
			<div class="border">{testItem.endTime}</div>
		</div>
	{/each}

	{#if testItems.length === 0 || addNewRule}
		<form action="/" class="grid grid-cols-10">
			<input class="border col-span-3" type="text" name="website" />

			<input class="border" type="text" name="length" />

			<input class="border" type="text" name="difficulty" />

			<input class="border" type="number" name="limit" />
			<select class="border" name="startDay">
				<option value="Sunday">Sunday</option>
				<option value="Monday">Monday</option>
				<option value="Tuesday">Tuesday</option>
				<option value="Wednesday">Wednesday</option>
				<option value="Thursday">Thursday</option>
				<option value="Friday">Friday</option>
				<option value="Saturday">Saturday</option>
			</select>

			<select class="border" name="endDay">
				<option value="Sunday">Sunday</option>
				<option value="Monday">Monday</option>
				<option value="Tuesday">Tuesday</option>
				<option value="Wednesday">Wednesday</option>
				<option value="Thursday">Thursday</option>
				<option value="Friday">Friday</option>
				<option value="Saturday">Saturday</option>
			</select>

			<input class="border" type="time" name="startTime" />

			<input class="border" type="time" name="endTime" />
			{#if addNewRule || testItems.length === 0}
				<div class="grid place-content-center mt-4 w-full">
					<button
						type="submit"
						class="border border-green-700 text-white bg-green-500 text-xl rounded-md p-1"
						on:click={() => (addNewRule = !addNewRule)}
						on:keyup={() => (addNewRule = !addNewRule)}>Save Rule</button
					>
				</div>
			{/if}
		</form>
	{/if}

	<div class="grid place-content-center mt-4">
		{#if !addNewRule && testItems.length !== 0}
			<button
				class="border border-orange-700 text-white bg-orange-500 text-xl rounded-md p-1"
				on:click={() => (addNewRule = !addNewRule)}
				on:keyup={() => (addNewRule = !addNewRule)}>Add New Rule</button
			>
		{/if}
	</div>
</div>

<style>
	th {
		border: 1px solid black;
		background-color: #f1f1f1;
	}
</style>
