import Navbar from '~/components/Navbar.vue'; import Footer from '~/components/Footer.vue';
<template>
	<v-app>
		<Navbar />
		<v-main>
			<slot />
		</v-main>
		<Footer />
	</v-app>
</template>
<script>
export default {
	name: 'DefaultLayout',
}
</script>
