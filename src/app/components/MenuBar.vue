<template>
  <b-navbar
    toggleable="md">
    <b-navbar-toggle target="nav_collapse"/>

    <b-navbar-brand to="/">VueExample</b-navbar-brand>

    <b-collapse
      id="nav_collapse"
      is-nav>

      <b-navbar-nav>
        <b-nav-item
          :to="{ name: 'PostList' }"
          exact>Posts</b-nav-item>
        <b-nav-item
          :to="{ name: 'PacienteList' }"
          exact>Pacientes</b-nav-item>
        <b-nav-item
          v-if="!isLogged"
          :to="{ name: 'Login' }"
          exact>Login</b-nav-item>
        <b-nav-item
          v-if="isLogged"
          @click="logout()">Logout</b-nav-item>
        
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item>{{ loggedUser }}</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import auth from '../common/auth'

export default {
  computed: {
    isLogged() {
      return auth.user.logged
    },
    loggedUser() {
      return auth.user.logged ? `${auth.user.login} (${auth.user.authority})` : 'not logged'
    }
  },
  methods: {
    logout() {
      auth.logout()
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
