import { computed } from 'vue'
export const useRockets = () => {
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

	return rockets
}
