import Navbar from '~/components/Navbar.vue'; import Footer from '~/components/Footer.vue';

<template>
	<v-container>
		<Navbar />
		<v-btn variant="tonal" to="/">Back</v-btn>
		<h3 class="my-5">SpaceX launches</h3>
		<v-table>
			<thead>
				<tr>
					<!-- <th class="text-left">ID</th> -->
					<th class="text-left">Mission</th>
					<th class="text-left">Launch date</th>
					<th class="text-left">Launch site</th>
					<th class="text-left">Rocket</th>
					<th class="text-left">Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in launches" :key="launch.mission_name">
					<!-- <td>{{ launch.id }}</td> -->
					<td>{{ launch.mission_name }}</td>
					<td>{{ launch.launch_date_utc }}</td>
					<td>{{ launch.launch_site }}</td>
					<td>{{ launch.rocket.rocket_name }}</td>
					<td>{{ launch.details }}</td>
				</tr>
			</tbody>
		</v-table>
	</v-container>
</template>
<script lang="ts" setup>
const store = useCounter()
const selection = ref(0)
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
const launches = computed(() => data.value?.launches ?? [])
</script>
