<template>
  <div>
    <base-header
      class="header pb-5 pt-5 pt-lg-6 d-flex align-items-center"
      style="min-height: 400px"
    >
      <span class="mask bg-gradient-success opacity-8"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-12">
            <h1 class="display-2 text-white">Chat privado</h1>
            <p class="text-white mt-0 mb-5">
              Lado esquerdo um chat em real-time, e lado direito webcam ou um
              campo para todos usuários digitar uma frase.
            </p>
          </div>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div :class="cameras || warzone ? 'col-xl-6' : 'col-xl-12'">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">{{ $store.state.user.room }}</h3>
                </div>
                <div class="col-4 text-right">
                  <button
                    class="btn btn-sm btn-primary"
                    :disabled="warzone"
                    @click="toggleCameras"
                  >
                    <i class="ni ni-camera-compact"></i> Cameras
                  </button>
                  <button
                    class="btn btn-sm btn-primary"
                    :disabled="cameras"
                    @click="toggleWarzone"
                  >
                    <i class="ni ni-spaceship"></i> Warzone
                  </button>
                </div>
              </div>
            </div>
            <template>
              <b-card>
                <b-card-body ref="chat" style="height: 40vh; overflow: auto">
                  <message
                    v-for="(message, index) in messages"
                    :key="`message-${index}`"
                    :message="message"
                    :owner="message.id === user.id"
                  />
                </b-card-body>
              </b-card>
              <chat-form />
            </template>
          </card>
        </div>

        <div v-if="cameras" class="col-xl-6">
          <webcam />
        </div>
        <div v-if="warzone" class="col-xl-6">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Warzone</h3>
                  <p>
                    Tente digitar o texto abaixo junto de outros membros
                    presentes na sala.
                  </p>
                  <p>
                    <em
                      >O tempo perguntou ao tempo quanto tempo o tempo tem, o
                      tempo respondeu ao tempo que o tempo tem o tempo que o
                      tempo tem.</em
                    >
                  </p>
                </div>
              </div>
            </div>
            <template>
              <b-card>
                <b-card-body>
                  <warzone-form />
                </b-card-body>
              </b-card>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Index',
  layout: 'DashboardLayout',
  data: () => ({
    title: 'Node/Vue test',
    cameras: false,
    warzone: false,
  }),
  computed: {
    ...mapState(['user', 'messages', 'users']),
    ...mapGetters(['typingUsers']),
  },
  watch: {
    messages() {
      setTimeout(() => {
        if (this.$refs.chat) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
        }
      }, 0)
    },
  },
  mounted() {
    this.setPageTitle(this.title)
  },
  methods: {
    ...mapActions({
      setPageTitle: 'page/setPageTitle',
    }),
    toggleCameras() {
      return (this.cameras = !this.cameras)
    },
    toggleWarzone() {
      return (this.warzone = !this.warzone)
    },
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>
