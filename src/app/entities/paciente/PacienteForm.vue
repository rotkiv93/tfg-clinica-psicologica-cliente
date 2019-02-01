<template>
  <LoadingPage
    :loading="loading"
    :error="error">

    <div class="float-right">
      <b-btn
        variant="primary"
        @click="back()">Back</b-btn>
      <b-btn
        variant="primary"
        @click="save()">Submit</b-btn>
    </div>

    <b-form
      v-if="paciente"
      class="app-form"
      @submit="save">

      <b-form-group
        label="Nombre:"
        label-for="nombre">
        <b-form-input
          id="nombre"
          v-model="paciente.nombre"
          type="text"
          required
          placeholder="Introduce nombre"/>
      </b-form-group>

      <b-form-group
        label="Apellido 1:"
        label-for="apellido1">
        <b-form-input
          id="apellido1"
          v-model="paciente.apellido1"
          type="text"
          required
          placeholder="Introduce apellido 1"/>
      </b-form-group>
      
      <b-form-group
            label="Apellido 2:"
            label-for="apellido2">
            <b-form-input
            id="apellido2"
            v-model="paciente.apellido2"
            type="text"
            required
            placeholder="Introduce apellido 2"/>
        </b-form-group>

    </b-form>
  </LoadingPage>
</template>

<script>
import { HTTP } from '../../common/http-common'
import LoadingPage from '../../components/LoadingPage'

export default {
  components: { LoadingPage },
  data() {
    return {
      paciente: {},
      error: null,
      loading: false,
    }
  },
  created() {
    if (this.$route.params.id) {
      this.loading = true

      HTTP.get(`pacientes/${this.$route.params.id}`)
      .then(response => this.paciente = response.data)
      .catch(err => this.error = err.message)
      .finally(() => this.loading = false)
    } else {
      this.paciente = {}
    }
  },
  methods: {
    save() {
      if (this.$route.params.id) {
        HTTP.put(`pacientes/${this.$route.params.id}`, this.paciente)
        .then(this._successHandler)
        .catch(this._errorHandler)
      } else {
        HTTP.post('pacientes', this.paciente)
        .then(this._successHandler)
        .catch(this._errorHandler)
      }
    },
    back() {
      this.$router.go(-1)
    },
    _successHandler(response) {
      this.$router.replace({ name: 'PacienteDetail', params: { id: response.data.id }})
    },
    _errorHandler(err) {
      this.error = err.response.data.message
    }
  }
}
</script>
