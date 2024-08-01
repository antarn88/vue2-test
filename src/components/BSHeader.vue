<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark sticky-top" data-bs-theme="dark">
    <div class="container-fluid">
      <div class="navbar-brand user-select-none">Vue.js teszt alkalmazás</div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-if="loggedInUser?.email" id="navbarNavAltMarkup" class="collapse navbar-collapse">
        <div class="navbar-nav">
          <NuxtLink to="/" class="nav-link user-select-none" exact exact-active-class="active">Kezdőlap</NuxtLink>
          <NuxtLink to="/users" class="nav-link user-select-none" exact exact-active-class="active">Felhasználók</NuxtLink>
        </div>
      </div>

      <div v-if="loggedInUser?.email" class="dropdown dropdown-external">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{ loggedInUser.name }}
        </a>

        <ul class="dropdown-menu mr-5 dropdown-internal">
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
  import { makeReactive } from "../utils/utils";

  export default Vue.extend({
    data() {
      return {
        form: {
          email: "",
          password: "",
        },
        loggedInUser: undefined as User | undefined,
      };
    },

    mounted(): void {
      this.manageLoggedInUser();
    },

    methods: {
      manageLoggedInUser() {
        this.loggedInUser = makeReactive(AuthService, "loggedInUser", (newValue: User) => {
          this.loggedInUser = { ...newValue };
        });

        if (!this.loggedInUser) {
          this.loggedInUser = AuthService.loggedInUser;
        }
      },

      logout() {
        AuthService.logout();
        this.manageLoggedInUser();
      },
    },
  });
</script>

<style lang="scss" scoped>
  .cursor-pointer {
    cursor: pointer;
    user-select: none;
  }

  .dropdown-external {
    position: relative;
    left: 10px;
  }

  .dropdown-internal {
    position: absolute;
    left: -70px;
  }
</style>
