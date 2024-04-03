<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/attributes-order -->
<template>
	<v-container>
		<h2 style="text-align: center">SpaceX launches</h2>
		<v-lazy :min-height="200" :options="{ threshold: 0.5 }" transition="fade-transition">
			<v-card>
				<div
					style="
						padding-left: 20px;
						padding-right: 20px;
						padding-top: 20px;
						display: flex;
						justify-content: space-between;
					"
				>
					<div style="display: flex">
						<div style="width: 250px">
							<input
								style="
									width: 80%;
									border-bottom: 1px solid darkgray;
									background-color: #f8f8f8;
									margin-left: 40px;
									outline: none;
									padding: 8px 20px;
								"
								placeholder="Filter by Year:"
								type="number"
								id="year"
								v-model="selectedYear"
								@input="filterLaunches"
							/>
						</div>
						<div style="width: 200px">
							<v-select
								:items="['Ascending', 'Descending']"
								density="compact"
								label="Sort by Launch Date:"
								v-model="selectedSorting"
								id="sorting"
								onchange="sortLaunches"
							></v-select>
						</div>
					</div>
					<v-btn style="margin-bottom: 10px" variant="tonal" to="/">Back</v-btn>
				</div>
				<v-data-table density="compact" style="padding-left: 50px; padding-right: 50px">
					<thead>
						<tr>
							<th class="text-left"><h4>Mission</h4></th>
							<th class="text-left"><h4>Launch date</h4></th>
							<th class="text-left"><h4>Launch site</h4></th>
							<th class="text-left"><h4>Rocket</h4></th>
							<th class="text-left"><h4>Details</h4></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="launch in sortedLaunches" :key="launch.mission_name">
							<td style="width: 10%">{{ launch.mission_name }}</td>
							<td style="width: 10%">{{ launch.launch_date_utc }}</td>
							<td style="width: 5%">{{ launch.launch_site ? launch.launch_site : 'N/A' }}</td>
							<td style="width: 5%">{{ launch.rocket.rocket_name }}</td>
							<td style="width: 70%">{{ launch.details ? launch.details : 'N/A' }}</td>
						</tr>
					</tbody>
				</v-data-table>
			</v-card>
		</v-lazy>
	</v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
const query = gql`
	query Launches {
		launches {
			id
			mission_name
			launch_date_utc
			launch_site {
				site_name
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`

const selectedYear = ref<number | null>(null)
const selectedSorting = ref<string>('Ascending')
const { data } = useAsyncQuery<{
	launches: {
		id: String
		mission_name: String
		launch_date_utc: Date
		launch_site: {
			site_name: String
		}
		rocket: {
			rocket_name: String
		}
		details: String
	}[]
}>(query)
const launches = data.value?.launches ?? []

const filterLaunches = () => {
	if (selectedYear.value === null || selectedYear.value === '') {
		return launches
	}
	return launches.filter((launch) => new Date(launch.launch_date_utc).getFullYear() === selectedYear.value)
}

const sortLaunches = () => {
	const sortedLaunches = [...filteredLaunches.value]
	sortedLaunches.sort((a, b) => {
		const dateA = new Date(a.launch_date_utc)
		const dateB = new Date(b.launch_date_utc)
		if (selectedSorting.value === 'Ascending') {
			return dateA.getTime() - dateB.getTime()
		} else {
			return dateB.getTime() - dateA.getTime()
		}
	})
	return sortedLaunches
}

const filteredLaunches = computed(() => filterLaunches())
const sortedLaunches = computed(() => sortLaunches())
</script>
