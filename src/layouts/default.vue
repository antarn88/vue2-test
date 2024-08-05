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

  export default Vue.extend({
    components: {
      BSHeader,
    },

    mounted(): void {
      AuthService.init(this.$store);
      AuthService.setLoggedInUserByToken();
    },
  });
</script>
