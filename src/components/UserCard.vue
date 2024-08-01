<template>
  <div>
    <!-- A gyerek komponens visszaküld adatot a szülőnek -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "UserCardComponent",

    data() {
      return {
        text: "",
      };
    },

    mounted() {
      this.text = "Változó érték a gyerekkomponensből";
      this.$emit("update-data", this.text);
    },
  });
</script>
