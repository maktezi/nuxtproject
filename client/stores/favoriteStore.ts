import { defineStore } from 'pinia'

export const favoriteStore = defineStore('favorite', {
	state: () => ({
		favorites: [] as string[],
	}),
	actions: {
		addToFavorites(item: string) {
			this.favorites.push(item)
			this.showAlert('Rocket added to favorites.')
		},
		removeFromFavorites(item: string) {
			this.favorites = this.favorites.filter((favorite) => favorite !== item)
			this.showAlert('Rocket removed from favorites.')
		},
		removeAllFavorites() {
			this.favorites = []
			this.showAlert('All favorites removed.')
		},
		showAlert(message: string) {
			alert(message)
		},
	},
})
