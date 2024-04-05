import { ref, computed } from 'vue'
export const useLaunches = () => {
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

	const inputYear = ref<number | null>(null)
	const selectedSorting = ref<string>('Ascending')
	const currentPage = ref(1)
	const itemsPerPage = ref(10)
	const totalPages = computed(() => Math.ceil(sortedLaunches.value.length / itemsPerPage.value))

	const filterLaunches = () => {
		if ((inputYear.value as string | null) === null || (inputYear.value as string | null) === '') {
			return launches
		}
		return launches.filter((launch) => new Date(launch.launch_date_utc).getFullYear() === inputYear.value)
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

	const paginatedLaunches = computed(() => {
		const start = (currentPage.value - 1) * itemsPerPage.value
		const end = start + itemsPerPage.value
		return sortedLaunches.value.slice(start, end)
	})

	const favorite = favoriteStore()

	return [currentPage, totalPages, favorite, paginatedLaunches, selectedSorting, filterLaunches, inputYear]
}
