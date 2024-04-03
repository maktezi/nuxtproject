<!-- eslint-disable vue/multi-word-component-names -->
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
		<div>
			<v-btn class="nav-button" variant="outlined" to="/launches">Launches</v-btn>
			<v-btn class="nav-button" variant="outlined" to="/rockets">Rockets</v-btn>
		</div>
		<h5 class="sub-title">Nuxt 3 / Vuetify / Graphql / Pinia</h5>
	</v-app-bar>
</template>

<style>
.nav-button {
	margin-left: 10px;
}

.sub-title {
	margin-right: 20px;
	margin-left: 20px;
}
</style>
