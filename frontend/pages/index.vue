<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Teste de Nodejs/Vue</small>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <b-form ref="form" @submit.prevent="submit">
              <b-form-group id="name" label="Seu Nome:" label-for="name">
                <b-form-input
                  id="name"
                  v-model="user.name"
                  required
                  autofocus
                  placeholder="Seu nome"
                  class="form-control-alternative"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="room"
                label="Digite o nome da sala:"
                label-for="room"
              >
                <b-form-input
                  id="room"
                  v-model="user.room"
                  required
                  placeholder="Nome da sala"
                  class="form-control-alternative"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Entrar</b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Index',
  layout: 'AuthLayout',
  data: () => ({
    title: 'Node/Vue test',
    user: {
      name: '',
      room: '',
      typingStatus: false,
      video: null,
    },
  }),
  mounted() {
    this.setPageTitle(this.title)
    const { message } = this.$route.query
    if (message === 'noUser') {
      this.$notify('Digite a seu nome e sala.')
    } else if (message === 'leftChat') {
      this.$notify('Você saiu do chat.')
    }
  },
  methods: {
    ...mapActions({
      setPageTitle: 'page/setPageTitle',
      createUser: 'createUser',
    }),
    async submit() {
      await this.createUser(this.user)
      this.$router.push('/chat')
    },
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>
