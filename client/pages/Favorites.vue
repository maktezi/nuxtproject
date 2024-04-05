<template>
	<v-container>
		<h2 style="text-align: center">SpaceX Favorite Rockets</h2>
		<v-card>
			<div style="display: flex; justify-content: space-between">
				<v-btn style="margin: 20px" variant="tonal" to="/">Back</v-btn>
				<v-btn style="margin: 20px" variant="tonal" @click="favorite.removeAllFavorites()">
					<v-icon icon="mdi-delete-sweep" class="icon" />
					Clear
				</v-btn>
			</div>
			<v-table style="padding-left: 50px; padding-right: 50px">
				<thead>
					<tr>
						<th class="text-left"><h3>Rocket</h3></th>
						<th class="text-left"><h3>Mission</h3></th>
						<th class="text-left hide-text"><h3>Launch Date</h3></th>
						<th class="text-center"><h3>Action</h3></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="launch in paginatedLaunches" :key="launch.rocket.rocket_name">
						<td style="width: 25%">
							<h4>{{ launch.rocket.rocket_name }}</h4>
						</td>
						<td style="width: 25%">{{ launch.mission_name }}</td>
						<td class="hide-text" style="width: 25%">{{ launch.launch_date_local }}</td>
						<td
							style="width: 5%"
							class="favorite text-center"
							@click="favorite.removeFromFavorites(launch.mission_name)"
						>
							<v-icon icon="mdi-star-remove" class="icon" />
						</td>
					</tr>
				</tbody>
			</v-table>
			<v-pagination v-model="currentPage" size="small" :length="totalPages" :total-visible="5" />
		</v-card>
	</v-container>
</template>

<script setup lang="ts">
useHead({
	title: 'NuxtVGP - SpaceX Favorites',
	meta: [{ name: 'SpaceX', content: 'SpaceX Webpage.' }],
	bodyAttrs: {
		class: 'test',
	},
	script: [{ innerHTML: "console.log('FrontEnd Exam')" }],
})

const [favorite, paginatedLaunches, totalPages, currentPage] = useFavorites()
</script>

<style scoped>
.favorite {
	cursor: pointer;
}

@media screen and (width <= 800px) {
	.hide-text {
		display: none;
	}
}
</style>
