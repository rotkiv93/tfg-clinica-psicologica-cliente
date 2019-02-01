<template>
  <LoadingPage
    :loading="loading"
    :error="error">

    <div v-if="paciente">
      <div class="float-right">
        <b-btn
          variant="primary"
          @click="back()">Back</b-btn>
        <b-btn
          v-if="isAdmin"
          :to="{ name: 'PacienteForm', params: { id: paciente.id }}"
          variant="primary">Edit</b-btn>
      </div>

      <h3>Nombre: {{ paciente.nombre }} {{ paciente.apellido1 }} {{ paciente.apellido2 }}</h3>
      <h5>DNI: {{ paciente.dni }}</h5>
      <h5>Genero: {{ paciente.genero }}</h5>
      <h5>Correo: {{ paciente.correo }}</h5>
      <h5>Fecha nacimiento: {{ paciente.fecha_nacimiento }}</h5>
      <h5>Dirección: {{ paciente.dirección }}</h5>
      <h5>Numero telefono: {{ paciente.num_telefono }}</h5>
     
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
      paciente: null,
      error: null
    }
  },
  computed: {
    isAdmin() {
      return auth.isAdmin()
    },
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true

      HTTP.get(`pacientes/${this.$route.params.id}`)
      .then(response => this.paciente = response.data)
      .catch(err => this.error = err.message)
      .finally(() => this.loading = false)
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
  .post {
    white-space: pre;
  }

  .tags {
    font-style: italic;
  }
</style>
