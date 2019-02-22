<template>
  <LoadingPage
    :loading="loading"
    :error="error">

    <div class="margenes" v-if="sesion">
      <div class="float-right">
        <b-btn
          variant="primary"
          @click="back()">Back</b-btn>
        <b-btn
          v-if="isAdmin"
          :to="{ name: 'SesionForm', params: { id: sesion.id }}"
          variant="primary">Edit</b-btn>
      </div>

        <div>
            <h3> Id de la sesion : {{sesion.id}} </h3>
            <h5> Fecha de realizacion : {{sesion.fecha_realizacion}}</h5> 
            <h5> Eistado : {{sesion.estado}}</h5> 
        </div>

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
      sesion: null,
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

      HTTP.get(`sesiones/${this.$route.params.id}`)
      .then(response => this.sesion = response.data)
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
  padding: 1.5em 0;
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
