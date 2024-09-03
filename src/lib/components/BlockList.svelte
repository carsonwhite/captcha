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

<div class="bg-black text-white py-2 font-serif lg:text-2xl">
	<table class="w-full">
		<thead>
			<tr class=" grid grid-cols-10">
				<th class="col-span-3">Website</th>
				<th>Captchas to solve</th>
				<th> Captcha difficulty</th>
				<th>Time allowed before blocking</th>
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

	<!-- {#if testItems.length === 0 || addNewRule} -->
	{#if true}
		<form action="/" class="grid grid-cols-10 text-black">
			<input class=" col-span-3" type="text" name="website" />

			<input class="" type="text" name="length" />

			<input class="" type="text" name="difficulty" />

			<input class="" type="number" name="limit" />
			<select class="" name="startDay">
				<option value="Sunday">Sunday</option>
				<option value="Monday">Monday</option>
				<option value="Tuesday">Tuesday</option>
				<option value="Wednesday">Wednesday</option>
				<option value="Thursday">Thursday</option>
				<option value="Friday">Friday</option>
				<option value="Saturday">Saturday</option>
			</select>

			<select class="" name="endDay">
				<option value="Sunday">Sunday</option>
				<option value="Monday">Monday</option>
				<option value="Tuesday">Tuesday</option>
				<option value="Wednesday">Wednesday</option>
				<option value="Thursday">Thursday</option>
				<option value="Friday">Friday</option>
				<option value="Saturday">Saturday</option>
			</select>

			<input class="" type="time" name="startTime" />

			<input class="" type="time" name="endTime" />
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
		border: 1px solid white;
	}
</style>
