<template>
  <LoadingPage
    :loading="loading"
    :error="error">

    <div class="margenes" v-if="paciente">
      <div class="float-right">
        <b-btn
          variant="primary"
          @click="back()">Back</b-btn>
        <b-btn
          v-if="isAdmin"
          :to="{ name: 'PacienteForm', params: { id: paciente.id }}"
          variant="primary">Edit</b-btn>
      </div>

      <b-tabs>
        <b-tab title="Datos Personales" active>
          <div class = "row">
            <div class = "imagen">
              <img src="http://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png" class="img-thumbnail" alt="Cinque Terre">
            </div>

            <div class = "derecha">
              <h3>Nombre: {{ paciente.nombre }} {{ paciente.apellido1 }} {{ paciente.apellido2 }}</h3>
              <h5>DNI: {{ paciente.dni }}</h5>
              <h5>Genero: {{ paciente.genero }}</h5>
              <h5>Correo: {{ paciente.correo }}</h5>
              <h5>Fecha nacimiento: {{ paciente.fecha_nacimiento }}</h5>
              <h5>Dirección: {{ paciente.dirección }}</h5>
              <h5>Numero telefono: {{ paciente.num_telefono }}</h5>
            </div>
          </div>
        </b-tab>

        <b-tab title="Sesiones" >
          <div class="sesiones"
            v-for="sesion in sesiones"
            :key="sesion.id">
            <router-link
              :to="{ name: 'SesionDetail', params: { id: sesion.id } }">
              Id de la sesion : {{sesion.id}}
               - Fecha de realizacion : {{sesion.fecha_realizacion}}
               - Estado : {{sesion.estado}}
            </router-link>
          </div>
        </b-tab>
    </b-tabs>


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
      sesiones: null,
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

      HTTP.get('sesiones', {params: {pacienteId : this.$route.params.id}})
      .then(response => this.sesiones = response.data)
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

  .row div {
  /* The vertical alignment magic */
  display: inline-block;
  vertical-align: middle;

  /* Fix for IE <= 7 */
  *display: inline;
  *zoom:1;
  *width: 16.6%;
}

.imagen {
  padding: 1.5em 0 0 1em;
}
.derecha {
  padding: 1.5em 0;
  margin-left: 3em;
  width: 70%;
}

.sesiones{
  padding: 1.5em 1.5em 1.5em;
}


</style>
