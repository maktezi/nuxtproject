<template>
	<v-container>
		<v-btn style="margin-bottom: 10px" variant="tonal" to="/">Back</v-btn>
		<v-lazy :min-height="200" :options="{ threshold: 0.5 }" transition="fade-transition">
			<v-card>
				<h3 style="padding-left: 20px" class="my-5">SpaceX Rockets</h3>
				<v-data-table density="compact">
					<thead>
						<tr>
							<!-- <th class="text-left">ID</th> -->
							<th class="text-left"><h4>Rocket</h4></th>
							<th class="text-left"><h4>First flight date</h4></th>
							<th class="text-left"><h4>Height</h4></th>
							<th class="text-left"><h4>Diameter</h4></th>
							<th class="text-left"><h4>Mass</h4></th>
							<th class="text-left"><h4>No. of stages</h4></th>
							<th class="text-left"><h4>Description</h4></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="launch in launches" :key="launch.rocket.rocket.name">
							<td>{{ launch.rocket.rocket.name }}</td>
							<td>{{ launch.rocket.rocket.first_flight }}</td>
							<td>{{ launch.rocket.rocket.height.meters + ' meters' }}</td>
							<td>{{ launch.rocket.rocket.diameter.meters + ' meters' }}</td>
							<td>{{ launch.rocket.rocket.mass.kg + ' kg' }}</td>
							<td>{{ launch.rocket.rocket.stages }}</td>
							<td>{{ launch.rocket.rocket.description }}</td>
						</tr>
					</tbody>
				</v-data-table>
			</v-card>
		</v-lazy>
	</v-container>
</template>
<script lang="ts" setup>
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
