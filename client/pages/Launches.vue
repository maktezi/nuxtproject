<template>
	<v-container>
		<h2 style="text-align: center">SpaceX Launches</h2>
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
					<v-btn style="margin-bottom: 10px" variant="tonal" to="/">Back</v-btn>
					<div style="display: flex">
						<div style="width: 250px">
							<input
								id="year"
								v-model="selectedYear"
								style="
									width: 70%;
									border-bottom: 1px solid darkgray;
									background-color: #f8f8f8;
									margin-left: 20px;
									outline: none;
									padding: 9.5px 15px;
									font-size: small;
								"
								placeholder="Filter by Launch date:"
								type="number"
								@input="filterLaunches"
							/>
						</div>
						<div style="width: 160px; margin-left: -50px">
							<v-select
								id="sorting"
								v-model="selectedSorting"
								:items="['Ascending', 'Descending']"
								density="compact"
								label="Sort by Launch Date:"
								onchange="sortLaunches"
							/>
						</div>
					</div>
				</div>
				<v-data-table density="compact" style="padding-left: 50px; padding-right: 50px">
					<thead>
						<tr>
							<th class="text-left"><h3>Mission</h3></th>
							<th class="text-left"><h3>Launch date</h3></th>
							<th class="text-center hide-text"><h3>Launch site</h3></th>
							<th class="text-center"><h3>Rocket</h3></th>
							<th class="text-left hide-text"><h3>Details</h3></th>
							<th class="text-center"><h3>Action</h3></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="launch in sortedLaunches" :key="launch.mission_name">
							<td style="width: 10%">
								<h4>{{ launch.mission_name }}</h4>
							</td>
							<td style="width: 10%">{{ launch.launch_date_utc }}</td>
							<td class="text-center hide-text" style="width: 10%">
								{{ launch.launch_site ? launch.launch_site : 'N/A' }}
							</td>
							<td style="text-align: center; width: 10%">{{ launch.rocket.rocket_name }}</td>
							<td class="hide-text" style="width: 60%; text-align: justify">
								{{ launch.details ? launch.details : 'N/A' }}
							</td>
							<td
								class="favorite text-center"
								@click="favorite.addToFavorites(launch.mission_name)"
							>
								<v-icon icon="mdi-star-plus" class="icon" />
							</td>
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
		id: string
		mission_name: string
		launch_date_utc: string
		launch_site: {
			site_name: string
		}
		rocket: {
			rocket_name: string
		}
		details: string
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
const favorite = favoriteStore()

useHead({
	title: 'NuxtVGP - SpaceX Launches',
	meta: [{ name: 'SpaceX', content: 'SpaceX Webpage.' }],
	bodyAttrs: {
		class: 'test',
	},
	script: [{ innerHTML: "console.log('FrontEnd Exam')" }],
})
</script>

<style>
.favorite {
	cursor: pointer;
}

@media screen and (max-width: 800px) {
	.hide-text {
		display: none;
	}
}
</style>
