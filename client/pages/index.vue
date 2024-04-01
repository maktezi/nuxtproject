<!-- eslint-disable vue/no-multiple-template-root -->
import Navbar from '~/components/Navbar.vue'; import Footer from '~/components/Footer.vue';

<template>
	<Navbar />
	<v-container>
		<v-btn style="margin-right: 10px" variant="tonal" to="/launches">SpaceX Launches</v-btn>
		<v-btn variant="tonal" to="/rockets">SpaceX Rockets</v-btn>
	</v-container>
	<Footer />
</template>
