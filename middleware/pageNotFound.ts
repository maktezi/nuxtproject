const validatedRoutes = ['/launches', '/rockets', '/favorites']

export default function ({ route, redirect }) {
	if (route.matched.length === 0) {
		if (!validatedRoutes.includes(route.path)) {
			return redirect('/launches')
		}
	}
}
