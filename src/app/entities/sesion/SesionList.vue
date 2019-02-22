<template>
  <LoadingPage
    :loading="loading"
    :error="error">

    <div class="float-right">
      <b-btn
        v-if="isAdmin"
        :to="{ name: 'SesionCreate' }"
        variant="primary">New</b-btn>
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
    console.log(this.$route.params.id);

    
  }
}
</script>
