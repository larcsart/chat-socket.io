<template>
  <nav
    id="sidenav-main"
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <NavbarToggleButton @click.native="toggleSidebar">
        <span class="navbar-toggler-icon"></span>
      </NavbarToggleButton>
      <nuxt-link class="navbar-brand" to="/">
        <img :src="logo" class="navbar-brand-img" alt="..." />
      </nuxt-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" position="right">
            <a
              slot="title"
              class="nav-link nav-link-icon"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="ni ni-bell-55"></i>
            </a>

            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </base-dropdown>
          <base-dropdown class="nav-item" position="right">
            <a slot="title" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img
                    alt="Image placeholder"
                    src="~assets/images/theme/team-1-800x800.jpg"
                  />
                </span>
              </div>
            </a>

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
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="showSidebar"
        id="sidenav-collapse-main"
        class="navbar-collapse collapse show"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <nuxt-link to="/">
                <img :src="logo" />
              </nuxt-link>
            </div>
            <div class="col-6 collapse-close">
              <NavbarToggleButton
                @click.native="toggleSidebar"
              ></NavbarToggleButton>
            </div>
          </div>
        </div>
        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

import NavbarToggleButton from '@/components/NavbarToggleButton'

export default {
  name: 'Sidebar',
  components: {
    NavbarToggleButton,
  },
  props: {
    logo: {
      type: String,
      default: require('~/assets/images/brand/logo.svg'),
      description: 'Sidebar app logo',
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        'Whether sidebar should autoclose on mobile when clicking an item',
    },
  },
  computed: {
    ...mapState({
      showSidebar: 'sidebar/showSidebar',
    }),
  },
  provide() {
    return {
      autoClose: this.autoClose,
    }
  },
  methods: {
    ...mapMutations({
      toggleSidebar: 'sidebar/toggleSidebar',
    }),
  },
}
</script>
