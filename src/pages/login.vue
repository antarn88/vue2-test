<template>
  <div class="container my-5 d-flex justify-content-center">
    <div class="card login-card" style="width: 30rem">
      <img src="@/assets/image/logo.jpg" class="align-self-center" alt="..." />
      <div class="card-body">
        <h5 class="card-title text-center mb-4">BEJELENTKEZÉS</h5>
        <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <div class="mb-3">
              <label for="email" class="form-label">E-mail cím *</label>
              <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                <div>
                  <input id="email" v-model="form.email" type="email" class="form-control" :class="{ 'is-invalid': errors.length }" />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Jelszó *</label>
              <ValidationProvider v-slot="{ errors }" name="password" rules="required">
                <div>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.length }"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>

            <div class="">
              <button class="btn btn-primary w-100" :disabled="invalid">Bejelentkezés</button>
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
  import { AuthService } from "../services/AuthService";

  Vue.use(VueToast, { duration: 5000 });

  export default Vue.extend({
    name: "LoginComponent",

    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data() {
      return {
        form: {
          email: "",
          password: "",
        },
        loggedInUser: AuthService.loggedInUser,
      };
    },
    head() {
      return {
        title: "Bejelentkezés",
      };
    },

    methods: {
      async onSubmit() {
        const response = await AuthService.login(this.form);
        if (response?.status === 200 && response.data.accessToken) {
          this.$store.dispatch("auth/setLoggedInUser", response.data.loggedInUser);
          this.$store.dispatch("auth/setAccessToken", response.data.accessToken);
          AuthService.setLoggedInUser(response.data.loggedInUser);

          document.cookie = `accessToken=${response.data.accessToken}`;
          localStorage.setItem("accessToken", response.data.accessToken);

          this.$router.push("/");
        } else if (response?.status === 401) {
          this.$toast.error("Rossz felhasználónév vagy jelszó!");
        } else {
          this.$toast.error("Ismeretlen hiba történt!");
        }
      },
    },
  });
</script>
