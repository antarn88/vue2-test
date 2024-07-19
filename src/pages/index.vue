<template>
  <GreetingComponent />
</template>

<script lang="ts">
  import Vue from "vue";
  import GreetingComponent from "../components/GreetingComponent.vue";

  export default Vue.extend({
    name: "IndexPage",
    components: {
      GreetingComponent,
    },
    layout: "default",
  });
</script>
