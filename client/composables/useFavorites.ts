export const useFavorites = () => {
	const favorite = favoriteStore()

	const query = gql`
		query Launches {
			launches {
				mission_name
				launch_site {
					site_name
				}
				rocket {
					rocket_name
				}
				details
				launch_date_local
			}
		}
	`

	const { data } = useAsyncQuery<{
		launches: {
			id: string
			mission_name: string
			launch_date_local: string
			launch_site: {
				site_name: string
			}
			rocket: {
				rocket_name: string
			}
			details: string
		}[]
	}>(query)

	const launches = computed(() => data.value?.launches ?? [])

	const selectedSorting = ref<string>('Ascending')
	const currentPage = ref(1)
	const itemsPerPage = ref(10)
	const totalPages = computed(() => Math.ceil(sortedLaunches.value.length / itemsPerPage.value))

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
	const sortedLaunches = computed(() => sortLaunches())

	const filteredLaunches = computed(() => {
		return launches.value.filter((launch) => favorite.favorites.includes(launch.mission_name))
	})

	const paginatedLaunches = computed(() => {
		const start = (currentPage.value - 1) * itemsPerPage.value
		const end = start + itemsPerPage.value
		return sortedLaunches.value.slice(start, end)
	})

	return [favorite, paginatedLaunches, totalPages, currentPage]
}
