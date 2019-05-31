export default function ({app, route, redirect}) {
  if ((route.path !== '/callback' && route.path !== '/login') && !app.router.app.$auth.isAuthenticated()) {
    redirect('/login')
  }
}
