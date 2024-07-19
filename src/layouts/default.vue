<template>
  <div>
    <BSHeader />
    <Nuxt />
  </div>
</template>

<script lang="ts">
  import BSHeader from "../components/BSHeader.vue";

  export default {
    components: {
      BSHeader,
    },
  };
</script>
