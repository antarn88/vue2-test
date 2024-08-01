<template>
  <div>
    <BSHeader />
    <Nuxt />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import BSHeader from "../components/BSHeader.vue";
  import { AuthService } from "../services/AuthService";
  import UserService from "../services/UserService";

  export default Vue.extend({
    components: {
      BSHeader,
    },

    async mounted(): Promise<void> {
      const token = this.$store.state.auth.accessToken;
      if (!token) return;

      const decodedToken = AuthService.decodeToken(token);
      if (!decodedToken) return;

      try {
        const user = await UserService.getUserByEmail(decodedToken!.sub, token);
        this.$store.dispatch("auth/setLoggedInUser", user);
        AuthService.setLoggedInUser(user);
        AuthService.loggedInUser = user;
      } catch (error) {
        console.error("User fetch error:", error);
      }
    },
  });
</script>
