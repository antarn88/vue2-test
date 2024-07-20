import Vue from "vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

// Global registration of components
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

// Add rules
extend("required", {
  ...required,
  message: "A mező kitöltése kötelező!",
});

extend("email", {
  ...email,
  message: "Érvénytelen e-mail!",
});

// Minimum karakterhossz
extend("min", {
  validate(value, { min }) {
    return value.length >= min;
  },
  params: ["min"],
  message: "Nem lehet kisebb, mint {min} karakter!",
});

// Maximum karakterhossz
extend("max", {
  validate(value, { max }) {
    return value.length <= max;
  },
  params: ["max"],
  message: "Nem lehet nagyobb, mint {max} karakter!",
});

// Minimum számérték
extend("min_value", {
  validate(value, { min }) {
    return Number(value) >= Number(min);
  },
  params: ["min"],
  message: "Nem lehet kisebb, mint {min}!",
});

// Maximum számérték
extend("max_value", {
  validate(value, { max }) {
    return Number(value) <= Number(max);
  },
  params: ["max"],
  message: "Nem lehet nagyobb, mint {max}!",
});
