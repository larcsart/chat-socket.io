<template>
  <div>
    <p v-if="isSystemMessage" class="text-center font-italic system">
      <small
        ><em>{{ message.text }}</em></small
      >
    </p>
    <div
      v-if="message.id === user.id"
      class="row justify-content-end text-right mb-3"
    >
      <div class="col-auto">
        <div class="card bg-gradient-primary text-white">
          <div class="card-body p-2">
            <p class="mb-1">{{ message.text }}<br /></p>
            <div>
              <small class="opacity-60">{{ message.time }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="message.id !== user.id && !isSystemMessage"
      class="row justify-content-start mb-3"
    >
      <div class="col-auto">
        <div class="card">
          <div class="card-body p-2">
            <h4>{{ message.user }}</h4>
            <p class="mb-1">{{ message.text }}<br /></p>
            <div>
              <small class="opacity-60">{{ message.time }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      default: () => {},
    },
    owner: {
      type: Boolean,
    },
  },
  computed: {
    isSystemMessage() {
      return this.message.name === 'admin'
    },
    ...mapState(['user']),
  },
}
</script>

<style lang="scss" scoped>
.system {
  margin-bottom: 1rem;
  color: #c6c6c6;

  p {
    margin-bottom: 1rem;
  }
}
</style>
