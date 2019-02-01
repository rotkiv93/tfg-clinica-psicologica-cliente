<template>
  <LoadingPage
    :loading="loading"
    :error="error">

    <div class="float-right">
      <b-btn
        v-if="isAdmin"
        :to="{ name: 'PacienteCreate' }"
        variant="primary">New</b-btn>
    </div>

    <div
      v-for="paciente in pacientes"
      :key="paciente.id">
      <router-link
        :to="{ name: 'PacienteDetail', params: { id: paciente.id } }">
        DNI: {{paciente.dni}}  - Nombre: {{ paciente.nombre }} {{paciente.apellido1}} {{paciente.apellido2}}
      </router-link>
    </div>
  </LoadingPage>
</template>

<script>
import { HTTP } from '../../common/http-common'
import LoadingPage from '../../components/LoadingPage'
import auth from '../../common/auth'

export default {
  components: { LoadingPage },
  data() {
    return {
      loading: false,
      pacientes: null,
      error: null
    }
  },
  computed: {
    isAdmin() {
      return auth.isAdmin()
    }
  },
  created() {
    this.loading = true

    HTTP.get('pacientes')
    .then(response => {
      this.pacientes = response.data
    })
    .catch(err => {
      this.error = err.message
    })
    .finally(() => this.loading = false)
  }
}
</script>
