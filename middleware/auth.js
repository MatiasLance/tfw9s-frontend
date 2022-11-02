export default function({ route, store, redirect }) {
  if (isRouteAdmin(route) && !isLoggedIn(store)) {
    redirect('/login')
  } else if (isRouteAuth(route) && isLoggedIn(store)) {
    redirect('/admin')
  }
}

function isRouteAdmin(route) {
  const adminRoutePattern = /(\/)?admin(\/)?[a-zA-Z0-9-_]*/g
  return !!route.path.match(adminRoutePattern)
}

function isRouteAuth(route) {
  const authRoutePattern = /(\/)?signup(\/)?|(\/)?login(\/)?|(\/)?reset-password(\/)?|(\/)?forgot-password(\/)?/g
  return !!route.path.match(authRoutePattern)
}

function isLoggedIn(store) {
  return store.state.auth.isLoggedIn
}