<template>
	<v-container>
		<div class="container">
			<div>
				<h1 class="title">
					<v-icon icon="mdi-vuetify" />
					<br />
					Welcome to
					<br />
					<h1>SpaceX</h1>
				</h1>
				<v-card class="text-wrapper">
					<p class="text">
						Welcome to SpaceX, your gateway to the stars. Explore our impressive catalog of
						launches and rockets as we continue to push the boundaries of space exploration.
						Witness the culmination of cutting-edge technology and pioneering spirit as we soar
						towards the future. Join us as we embark on the next chapter of humanity's journey
						into space. Welcome to the adventure!
					</p>
				</v-card>
			</div>
		</div>
	</v-container>
</template>

<script setup lang="ts">
useHead({
	title: 'NuxtVGP - SpaceX',
	meta: [{ name: 'SpaceX', content: 'SpaceX Webpage.' }],
	bodyAttrs: {
		class: 'test',
	},
	script: [{ innerHTML: "console.log('FrontEnd Exam')" }],
})
</script>

<style>
* {
	font-family: Poppins, Montserrat, Arial, Helvetica, sans-serif;
}

.container {
	display: flex;
	align-items: center;
	height: 70vh;
}

.title {
	text-align: center;
	margin-bottom: 20px;
	font-size: 3rem;
	font-weight: 800;
}

.text-wrapper {
	margin: auto;
	width: 60%;
}

.text {
	padding: 30px;
	text-align: justify;
	font-style: italic;
}

@media screen and (width <= 800px) {
	.title {
		margin-top: 30px;
		font-size: 2rem;
	}

	.text-wrapper {
		margin: auto;
		width: 70%;
	}
}
</style>
