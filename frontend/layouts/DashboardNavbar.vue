<template>
  <base-nav
    id="navbar-main"
    class="navbar-top navbar-dark"
    :show-toggle-button="false"
    expand
  >
    <form
      class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
    >
      <div class="form-group mb-0">
        <base-input
          placeholder="Pesquisar..."
          class="input-group-alternative"
          alternative=""
          addon-right-icon="fas fa-search"
        >
        </base-input>
      </div>
    </form>
    <ul
      v-if="$store.state.user"
      class="navbar-nav align-items-center d-none d-md-flex"
    >
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <div slot="title" class="media align-items-center">
            <span class="avatar avatar-sm rounded-circle">
              <img
                alt="Image placeholder"
                :src="
                  $store.state.user.photoURL
                    ? $store.state.user.photoURL
                    : require('~/assets/images/theme/team-1-800x800.jpg')
                "
              />
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">{{
                $store.state.user.displayName
                  ? $store.state.user.displayName
                  : $store.state.user.email
              }}</span>
            </div>
          </div>

          <template>
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <nuxt-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </nuxt-link>
            <nuxt-link to="/profile" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
            </nuxt-link>
            <nuxt-link to="/profile" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </nuxt-link>
            <nuxt-link to="/profile" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
            </nuxt-link>
            <div class="dropdown-divider"></div>
            <a
              href="#!"
              class="dropdown-item"
              @click="() => $fireAuth.logout()"
            >
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </template>
        </base-dropdown>
      </li>
    </ul>
    <notifications />
  </base-nav>
</template>
<script>
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: '',
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
  },
}
</script>
