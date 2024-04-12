export default function({ route, store, redirect }) {
  if ((isRouteAdmin(route) || isRouteManage(route)) && !isLoggedIn(store)) {
    redirect('/login')
  } else if (isRouteAdmin(route) && !isAdmin(store)) {
    redirect('/')
  } else if (isRouteManage(route) && !isManager(store)) {
    redirect('/')
  } else if (isRouteAuth(route) && isLoggedIn(store)) {
    redirect('/')
  }
}

function isRouteAdmin(route) {
  const adminRoutePattern = /(\/)?admin(\/)?[a-zA-Z0-9-_]*/g
  return !!route.path.match(adminRoutePattern)
}

function isRouteManage(route) {
  const manageRoutePattern = /(\/)?manage(\/)?[a-zA-Z0-9-_]*/g
  return !!route.path.match(manageRoutePattern)
}

function isRouteAuth(route) {
  const authRoutePattern = /(\/)?signup(\/)?|(\/)?login(\/)?|(\/)?reset-password(\/)?|(\/)?forgot-password(\/)?/g
  return !!route.path.match(authRoutePattern)
}

function isLoggedIn(store) {
  return store.state.auth.isLoggedIn
}

function isAdmin(store) {
  return store.state.auth.isLoggedIn && (store.state.auth.roles.includes('admin') ||
  store.state.auth.roles.includes('superadmin'))
}

function isManager(store) {
  return store.state.auth.isLoggedIn && store.state.auth.roles.includes('manage')
}