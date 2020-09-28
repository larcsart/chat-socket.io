<template>
  <div class="wrapper" :class="{ 'nav-open': showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      :short-title="$store.state.user.room"
      :title="$store.state.user.room"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Usuários online',
            path: '#!',
          }"
        />
        <hr />
        <a
          v-for="{ name, id, typingStatus } in users"
          :key="`user-${id}`"
          href="#!"
          class="list-group-item"
          :class="id !== user.id ? '' : ' active bg-gradient-primary'"
        >
          <div class="media">
            <img
              alt="Image"
              src="~assets/images/theme/team-1-800x800.jpg"
              class="avatar"
            />
            <div class="media-body ml-2">
              <div class="justify-content-between align-items-center">
                <h4 class="mb-0" :class="id === user.id ? 'text-white' : ''">
                  {{ name }}
                </h4>
                <div>
                  <small>{{ !typingStatus ? '' : 'Digitando...' }}</small>
                </div>
              </div>
            </div>
          </div>
        </a>

        <sidebar-item
          :link="{
            name: 'Sair',
            icon: 'ni ni-user-run text-primary',
            path: '/?message=leftChat',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <DashboardNavbar></DashboardNavbar>
      <div @click="toggleSidebar">
        <transition
          :duration="200"
          name="fade"
          origin="center top"
          mode="out-in"
        >
          <Nuxt />
        </transition>
        <ContentFooter v-if="!$route.meta.hideFooter"></ContentFooter>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'

export default {
  name: 'DashboardLayout',
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: 'vue', //  vue|blue|orange|green|red|primary
    }
  },
  computed: {
    ...mapState({
      showSidebar: 'sidebar/showSidebar',
      user: 'user',
      users: 'users',
    }),
  },
  middleware: 'auth',
  created() {
    this.joinRoom(this.user)
  },
  methods: {
    ...mapActions(['joinRoom', 'leftRoom']),
    ...mapMutations({
      toggleSidebar: 'sidebar/toggleSidebar',
    }),
    exit() {
      this.leftRoom()
      this.$router.push('/?message=leftChat')
    },
  },
}
</script>
<style lang="scss"></style>
