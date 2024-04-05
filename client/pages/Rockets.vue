<template>
	<v-container>
		<v-lazy :min-height="200" :options="{ threshold: 0.5 }" transition="fade-transition">
			<v-card>
				<h2 style="text-align: center; padding-top: 20px">SpaceX Rockets</h2>
				<v-btn style="margin: 20px" variant="tonal" to="/">Back</v-btn>
				<v-table style="padding-left: 50px; padding-right: 50px">
					<thead>
						<tr>
							<th class="text-left"><h3>Rocket</h3></th>
							<th class="text-left hide-text"><h3>First flight date</h3></th>
							<th class="text-left"><h3>Height</h3></th>
							<th class="text-left"><h3>Diameter</h3></th>
							<th class="text-left"><h3>Mass</h3></th>
							<th class="text-left"><h3>No. of stages</h3></th>
							<th class="text-left hide-text"><h3>Description</h3></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="rocket in rockets" :key="rocket.name">
							<td>
								<h4>{{ rocket.name }}</h4>
							</td>
							<td class="hide-text">{{ rocket.first_flight }}</td>
							<td>{{ rocket.height.feet + ' ft.' }}</td>
							<td>{{ rocket.diameter.feet + ' ft.' }}</td>
							<td>{{ rocket.mass.lb + ' lbs.' }}</td>
							<td>{{ rocket.stages }}</td>
							<td class="hide-text">{{ rocket.description }}</td>
						</tr>
					</tbody>
					<br />
				</v-table>
			</v-card>
		</v-lazy>
	</v-container>
</template>
<script lang="ts" setup>
useHead({
	title: 'NuxtVGP - SpaceX Rockets',
	meta: [{ name: 'SpaceX', content: 'SpaceX Rockets.' }],
})

const rockets = useRockets()
</script>

<style>
@media screen and (width <= 800px) {
	.hide-text {
		display: none;
	}
}
</style>
