import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from './common/auth'

import { PostDetail, PostForm, PostList, PacienteList, PacienteDetail, PacienteForm, SesionList, SesionDetail } from './entities'
import { Home, Login, NotFound } from './components'

const routes = [
  { name: 'Home', path: '/', component: Home, meta: { public: true } },
  // solo usuarios administradores pueden crear o editar posts
  { name: 'PostCreate', path: '/posts/new', component: PostForm, meta: { authority: 'ADMIN' } },
  { name: 'PostDetail', path: '/posts/:id', component: PostDetail },
  // solo usuarios administradores pueden crear o editar posts
  { name: 'PostUpdate', path: '/posts/:id/edit', component: PostForm, meta: { authority: 'ADMIN' } },
  // usuarios anónimos pueden ver el listado de posts
  { name: 'PostList', path: '/posts', component: PostList, meta: { public: true } },
  { name: 'PacienteList', path: '/pacientes', component: PacienteList, meta: {authority: 'ADMIN'} },
  { name: 'PacienteDetail', path: '/pacientes/:id', component: PacienteDetail, meta: {authority: 'ADMIN'} },
  { name: 'PacienteForm', path: '/pacientes/:id/edit', component: PacienteForm, meta: {authority: 'ADMIN'} },
  { name: 'PacienteCreate', path: '/pacientes/new', component: PacienteForm, meta: {authority: 'ADMIN'} },
  { name: 'Login', path: '/login', component: Login, meta: { public: true, isLoginPage: true }},
  { name: 'SesionList', path: '/sesiones', component: SesionList, meta: {authority: 'ADMIN'} },
  { name: 'SesionDetail', path: '/sesiones/:id', component: SesionDetail, meta: {authority: 'ADMIN'} },
  { path: '*', component: NotFound, meta: { public: true } }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // por defecto las rutas restringen el acceso a usuario autenticados
  const requiresAuth = !to.meta.public

  const requiredAuthority = to.meta.authority
  const userIsLogged = auth.user.logged
  const loggedUserAuthority = auth.user.authority

  if (requiresAuth) {
    if (userIsLogged) {
      if (requiredAuthority && requiredAuthority != loggedUserAuthority) {
        // usuario logueado pero sin permisos
        Vue.notify({
          text: 'Access is not allowed for the current user. Try to log again.',
          type: 'error'
        })
        auth.logout().then(() => next('/login'))
      } else {
        // usuario logueado y con permisos adecuados
        next()
      }
    } else { // usuario no está logueado
      Vue.notify({
        text: 'This page requires authentication.',
        type: 'error'
      })
      next('/login')
    }
  } else { // página pública
    if (userIsLogged && to.meta.isLoginPage) {
      // si estamos logueados no hace falta volver a mostrar el login
      next({ name: 'Home', replace: true })
    } else {
      next()
    }
  }
})

export default router
