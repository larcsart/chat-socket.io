<template>
  <b-form ref="form" @submit.prevent="send">
    <base-input
      v-model="text"
      alternative=""
      label="Mensagem"
      placeholder="Digite a sua mensagem"
      input-classes="form-control-alternative"
      @keyup="typing"
    />
    <button type="submit" class="btn btn-sm btn-primary right">
      <i class="ni ni-send-compact"></i> Enviar
    </button>
  </b-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ChatForm',
  data: () => ({
    text: '',
    timeout: undefined,
  }),
  computed: {
    ...mapGetters(['typingStatus']),
  },
  methods: {
    ...mapActions(['createMessage', 'setTypingStatus']),
    send() {
      this.createMessage(this.text)
      this.text = ''

      this.setTypingStatus(false)
    },
    typing() {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.setTypingStatus(false)
      }, 1000)
      if (this.text.length > 0) this.setTypingStatus(true)
    },
  },
}
</script>
