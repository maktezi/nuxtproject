<template>
	<v-container>
		<h2 style="text-align: center">SpaceX Rockets</h2>
		<v-lazy :min-height="200" :options="{ threshold: 0.5 }" transition="fade-transition">
			<v-card>
				<v-btn style="margin: 20px" variant="tonal" to="/">Back</v-btn>
				<v-data-table density="compact" style="padding-left: 50px; padding-right: 50px">
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
				</v-data-table>
			</v-card>
		</v-lazy>
	</v-container>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
const query = gql`
	query Rockets {
		rockets {
			name
			description
			first_flight
			height {
				feet
			}
			diameter {
				feet
			}
			mass {
				lb
			}
			stages
		}
	}
`
const { data } = useAsyncQuery<{
	rockets: {
		name: string
		description: string
		first_flight: string
		height: {
			feet: number
		}
		diameter: {
			feet: number
		}
		mass: {
			lb: number
		}
		stages: number
	}[]
}>(query)
const rockets = computed(() => data.value?.rockets ?? [])

useHead({
	title: 'NuxtVGP - SpaceX Rockets',
	meta: [{ name: 'SpaceX', content: 'SpaceX Webpage.' }],
	bodyAttrs: {
		class: 'test',
	},
	script: [{ innerHTML: "console.log('FrontEnd Exam')" }],
})
</script>

<style>
@media screen and (max-width: 800px) {
	.hide-text {
		display: none;
	}
}
</style>
