<template>
  <div ref="video-chat-container" class="embed-response embed-responsive-16by9">
    <video
      id="video"
      ref="video"
      class="embed-responsive-item"
      autoplay="autoplay"
    ></video>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Webcam',
  data() {
    return {
      stream: null,
    }
  },
  computed: {
    ...mapState(['user', 'warzone']),
  },
  watch: {
    stream(stream) {
      // this.setVideo({ stream, room: this.user.room })
    },
  },
  mounted() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.$refs.video.srcObject = stream
        this.$refs.video.play()
        this.stream = stream
      })
    }
  },
  methods: {
    ...mapActions(['setVideo']),
  },
}
</script>
