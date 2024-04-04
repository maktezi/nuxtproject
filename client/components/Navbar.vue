<template>
	<v-app-bar :elevation="2">
		<template #prepend />
		<v-app-bar-title>
			<h2>
				<nuxt-link style="color: black" to="/">
					<v-icon icon="mdi-vuetify" />
				</nuxt-link>
				SpaceX
			</h2>
		</v-app-bar-title>
		<div class="pc-links">
			<v-btn class="nav-button" variant="text" to="/launches">
				<v-icon icon="mdi-rocket-launch" class="icon" />
				Launches
			</v-btn>
			<v-btn class="nav-button" variant="text" to="/rockets">
				<v-icon icon="mdi-rocket" class="icon" />
				Rockets
			</v-btn>
			<v-btn class="nav-button" variant="text" to="/favorites">
				<v-icon icon="mdi-star" class="icon" />
				Favorites
			</v-btn>
		</div>
		<div class="mobile-links">
			<v-btn class="nav-button" variant="text" to="/launches">
				<v-icon icon="mdi-rocket-launch" class="icon" />
			</v-btn>
			<v-btn class="nav-button" variant="text" to="/rockets">
				<v-icon icon="mdi-rocket" class="icon" />
			</v-btn>
			<v-btn class="nav-button" variant="text" to="/favorites">
				<v-icon icon="mdi-star" class="icon" />
			</v-btn>
		</div>
		<h5>Nuxt 3 / Vuetify / Graphql / Pinia</h5>
	</v-app-bar>
</template>

<style>
.nav-button {
	margin-left: 10px;
}

h5 {
	margin-right: 20px;
	margin-left: 20px;
}

.mobile-links {
	display: none;
	margin-right: 20px;
}

@media screen and (max-width: 800px) {
	h5 {
		display: none;
	}

	.pc-links {
		display: none;
	}

	.mobile-links {
		display: block;
	}
}
</style>
