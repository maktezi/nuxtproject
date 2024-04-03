<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<v-container>
		<v-card>
			<h1>Welcome to SpaceX</h1>
		</v-card>
	</v-container>
</template>

<script setup lang="ts">
useHead({
	title: 'NuxtVGP',
	meta: [{ name: 'SpaceX', content: 'SpaceX Webpage.' }],
	bodyAttrs: {
		class: 'test',
	},
	script: [{ innerHTML: "console.log('FrontEnd Exam')" }],
})
</script>
