<template>
  <b-form ref="form" @submit.prevent>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Digite o texto acima"
      rows="8"
      max-rows="10"
      @keyup="updateText"
    ></b-form-textarea>
  </b-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'WarzoneForm',
  data() {
    return {
      text: '',
    }
  },
  computed: {
    ...mapState(['user', 'warzone']),
  },
  watch: {
    warzone(value) {
      this.text = value
    },
  },
  mounted() {
    this.text = this.warzone
  },
  methods: {
    updateText() {
      this.updateWarzone({ text: this.text, room: this.user.room })
    },
    ...mapActions(['updateWarzone']),
  },
}
</script>
