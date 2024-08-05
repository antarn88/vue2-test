<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark sticky-top" data-bs-theme="dark">
    <div class="container-fluid">
      <div class="navbar-brand user-select-none">Vue.js teszt alkalmazás</div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        data-bs-display="static"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-if="accessToken" id="navbarNavAltMarkup" class="collapse navbar-collapse">
        <div class="navbar-nav">
          <NuxtLink to="/" class="nav-link user-select-none" exact exact-active-class="active">
            <a @click="closeMenu">Kezdőlap</a>
          </NuxtLink>
          <NuxtLink to="/users" class="nav-link user-select-none" exact exact-active-class="active">
            <a @click="closeMenu">Felhasználók</a>
          </NuxtLink>
        </div>
      </div>

      <div v-if="accessToken" class="dropdown">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{ loggedInUser?.name || "" }}
        </a>

        <ul class="dropdown-menu">
          <li><a class="dropdown-item cursor-pointer" @click="logout()">Kijelentkezés</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
  import Vue from "vue";
  import { AuthService } from "../services/AuthService";
  import { User } from "../models/User";

  export default Vue.extend({
    data() {
      return {
        form: {
          email: "",
          password: "",
        },
        loggedInUser: undefined as User | undefined,
        accessToken: "",
      };
    },

    watch: {
      "$store.state.auth.accessToken": function (newVal: string) {
        this.accessToken = newVal;
      },

      "$store.state.auth.loggedInUser": function (newVal: User) {
        this.loggedInUser = newVal;
      },
    },

    mounted(): void {
      this.accessToken = this.$store.state.auth.accessToken;
      this.loggedInUser = this.$store.state.auth.loggedInUser;
    },

    methods: {
      logout() {
        AuthService.logout();
      },

      closeMenu(): void {
        document.querySelector("#navbarNavAltMarkup")?.classList.toggle("show");
      },
    },
  });
</script>

<style lang="scss" scoped>
  .cursor-pointer {
    cursor: pointer;
    user-select: none;
  }
</style>
