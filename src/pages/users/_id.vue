<template>
  <div class="container">
    <h1 class="text-center my-5">{{ userId === "0" ? "Felhasználó hozzáadása" : "Felhasználó szerkesztése" }}</h1>

    <div v-if="!isFormLoaded" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-lg-8 offset-lg-2">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <!-- Név -->
            <div class="mb-3">
              <label for="name" class="form-label">Név *</label>
              <ValidationProvider v-slot="{ errors }" name="name" rules="required|min:3|max:50">
                <div>
                  <input id="name" v-model="form.name" type="text" name="name" class="form-control" :class="{ 'is-invalid': errors[0] }" />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>

            <!-- E-mail -->
            <div class="mb-3">
              <label for="email" class="form-label">Email *</label>
              <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                <div>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    name="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors[0] }"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>

            <!-- Jelszó -->
            <div class="mb-3">
              <label for="password" class="form-label">Jelszó *</label>
              <ValidationProvider v-slot="{ errors }" name="password" rules="required">
                <div>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    name="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors[0] }"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>

            <!-- Kor -->
            <div class="mb-3">
              <label for="age" class="form-label">Kor *</label>

              <!-- TODO Validációt kiegészíteni! -->
              <ValidationProvider v-slot="{ errors }" name="age" rules="required">
                <div>
                  <input id="age" v-model="form.age" type="number" name="age" class="form-control" :class="{ 'is-invalid': errors[0] }" />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>

            <div class="d-flex justify-content-center mt-3">
              <div class="d-flex gap-3">
                <!-- Loading gomb -->
                <button v-if="isSaving" class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status"> Mentés...</span>
                </button>

                <button v-else type="submit" class="btn btn-primary" :disabled="invalid || isSaving">Mentés</button>

                <button type="button" class="btn btn-secondary" :disabled="isSaving" @click="goBack">Vissza</button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import Vue from "vue";
  import VueToast from "vue-toast-notification";
  import UserService from "../../services/UserService";

  Vue.use(VueToast, { duration: 3500 });

  export default Vue.extend({
    name: "UserEditorComponent",
    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data() {
      return {
        isFormLoaded: false,
        isSaving: false,
        form: {
          name: "",
          email: "",
          password: "",
          age: undefined as number | undefined,
        },
        userId: this.$route.params.id,
        USER_LIST_PATH: "/users",
      };
    },

    head() {
      return {
        title: "Felhasználó szerkesztő",
      };
    },

    async mounted(): Promise<void> {
      if (this.userId === "0") {
        this.isFormLoaded = true;
      } else {
        try {
          const userData = await UserService.getUserById(this.userId);

          this.form = {
            name: userData.name || "",
            email: userData.email || "",
            password: "",
            age: userData.age !== undefined ? Number(userData.age) : undefined,
          };

          this.isFormLoaded = true;
        } catch (error) {
          this.$toast.error("Hiba a felhasználó adatainak lekérésekor!");
        }
      }
    },

    methods: {
      async onSubmit(): Promise<void> {
        if (this.userId === "0") {
          try {
            this.isSaving = true;
            await UserService.createUser({ ...this.form, age: Number(this.form.age) });

            this.$toast.success("Sikeresen létrejött a felhasználó!");

            this.goBack();
          } catch (error) {
            this.isSaving = false;
            this.$toast.error("Hiba a felhasználó létrehozásakor!");
          }
        } else {
          try {
            this.isSaving = true;
            await UserService.updateUser(this.userId || "", this.form);
            this.$toast.success("Sikeresen frissült a felhasználó!");
            this.goBack();
          } catch (error) {
            this.isSaving = false;
            this.$toast.error("Hiba a felhasználó frissítésekor!");
          }
        }
      },

      goBack() {
        this.$router.push(this.USER_LIST_PATH);
      },
    },
  });
</script>

<style lang="scss" scoped></style>
