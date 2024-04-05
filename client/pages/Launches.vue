<template>
	<v-container>
		<v-lazy :min-height="200" :options="{ threshold: 0.5 }" transition="fade-transition">
			<v-card>
				<h2 style="text-align: center; padding-top: 20px">SpaceX Launches</h2>
				<div
					style="
						padding-left: 20px;
						padding-right: 20px;
						display: flex;
						justify-content: space-between;
					"
				>
					<v-btn style="margin-bottom: 10px" variant="tonal" to="/">Back</v-btn>
					<div style="display: flex">
						<div style="width: 250px">
							<input
								id="year"
								v-model="inputYear"
								class="input-filter"
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
				<v-table height="620px" style="padding-left: 50px; padding-right: 50px">
					<thead>
						<tr>
							<th class="text-left"><h3>Mission</h3></th>
							<th class="text-left"><h3>Date</h3></th>
							<th class="text-center hide-text"><h3>Site</h3></th>
							<th class="text-left"><h3>Rocket</h3></th>
							<th class="text-center hide-text"><h3>Details</h3></th>
							<th class="text-center"><h3>Action</h3></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="launch in paginatedLaunches" :key="launch.mission_name">
							<td style="width: 200px">
								<h4>{{ launch.mission_name }}</h4>
							</td>
							<td class="header">{{ launch.launch_date_utc }}</td>
							<td class="text-center hide-text header">
								{{ launch.launch_site ? launch.launch_site : 'N/A' }}
							</td>
							<td class="header">{{ launch.rocket.rocket_name }}</td>
							<td class="hide-text description">
								{{ launch.details ? launch.details : 'N/A' }}
							</td>
							<td
								class="favorite text-center"
								@click="favorite.toggleFavorite(launch.mission_name)"
							>
								<v-icon
									:icon="
										favorite.isFavorite(launch.mission_name)
											? 'mdi-star'
											: 'mdi-star-plus-outline'
									"
									class="icon"
								/>
							</td>
						</tr>
					</tbody>
				</v-table>
				<v-pagination v-model="currentPage" size="small" :length="totalPages" :total-visible="5" />
			</v-card>
		</v-lazy>
	</v-container>
</template>

<script lang="ts" setup>
useHead({
	title: 'NuxtVGP - SpaceX Launches',
	meta: [{ name: 'SpaceX', content: 'SpaceX Launches.' }],
})

const [currentPage, totalPages, favorite, paginatedLaunches, selectedSorting, filterLaunches, inputYear] =
	useLaunches()
</script>

<style>
.favorite {
	cursor: pointer;
}

.input-filter {
	width: 70%;
	border-bottom: 1px solid darkgray;
	background-color: #f8f8f8;
	margin-left: 20px;
	outline: none;
	padding: 9.5px 15px;
	font-size: small;
}

.header {
	width: 120px;
}

.description {
	min-width: 200px;
	max-width: 900px;
}

.hide-text {
	text-align: justify;
}

@media screen and (width <= 800px) {
	.hide-text {
		display: none;
	}
}
</style>
