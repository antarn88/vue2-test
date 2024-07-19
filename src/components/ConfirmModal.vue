<template>
  <div id="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Törlés</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">Biztosan törölni szeretnéd a felhasználót?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Mégse</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="confirmDelete">Törlés</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "ConfirmModal",
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    methods: {
      confirmDelete(): void {
        this.$emit("confirmed-delete", this.id);
      },
    },
  });
</script>

<style scoped></style>
