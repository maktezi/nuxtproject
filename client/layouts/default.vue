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
