import Navbar from '~/components/Navbar.vue'; import Footer from '~/components/Footer.vue';
<template>
	<v-container>
		<Navbar />
		<v-btn variant="tonal" to="/">Back</v-btn>
		<h3 class="my-5">SpaceX Rockets</h3>
		<v-table>
			<thead>
				<tr>
					<!-- <th class="text-left">ID</th> -->
					<th class="text-left">Rocket</th>
					<th class="text-left">Description</th>
					<th class="text-left">First flight date</th>
					<th class="text-left">Height</th>
					<th class="text-left">Diameter</th>
					<th class="text-left">Mass</th>
					<th class="text-left">No. of stages</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in launches" :key="launch.rocket.rocket.name">
					<!-- <td>{{ launch.id }}</td> -->
					<td>{{ launch.rocket.rocket.name }}</td>
					<td>{{ launch.rocket.rocket.description }}</td>
					<td>{{ launch.rocket.rocket.first_flight }}</td>
					<td>{{ launch.rocket.rocket.height.meters + ' meters' }}</td>
					<td>{{ launch.rocket.rocket.diameter.meters + ' meters' }}</td>
					<td>{{ launch.rocket.rocket.mass.kg + ' kg' }}</td>
					<td>{{ launch.rocket.rocket.stages }}</td>
				</tr>
			</tbody>
		</v-table>
	</v-container>
</template>
<script lang="ts" setup>
const store = useCounter()
const selection = ref(0)
const query = gql`
	query Rocket {
		launches {
			rocket {
				rocket {
					name
					description
					first_flight
					height {
						meters
					}
					diameter {
						meters
					}
					mass {
						kg
					}
					stages
				}
			}
		}
	}
`

const { data } = useAsyncQuery<{
	launches: {
		mission_name: string
		launch_date_utc: Date
		launch_site: {
			site_name: string
		}
		rocket: {
			rocket_name: string
			rocket: {
				name: string
				description: string
				first_flight: string
				height: {
					meters: number
				}
				diameter: {
					meters: number
				}
				mass: {
					kg: number
				}
				stages: number
			}
		}
		details: string
	}[]
}>(query)

const launches = computed(() => data.value?.launches ?? [])
</script>
