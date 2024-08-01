<template>
  <div class="container p-3 mt-5">
    <h1 class="text-center text-success mb-5">Üdvözlet a Vue.js tesztalkalmazásban!</h1>

    <div class="row">
      <div class="col-6">
        <button class="btn btn-primary" @click="toggleVisibility">Toggle Visibility</button>

        <!-- v-if -> Ha nem látszik, akkor a DOM-ból is eltűnik az elem! Angularban ez ngIf -->
        <p v-if="isVisible">Ez egy feltételesen megjelenített szöveg.</p>

        <!-- v-show -> Ha nem látszik, a DOM-ban ettől még megjelenik! Angularban ez hidden -->
        <p v-show="isVisible">Ez egy feltételesen elrejtett szöveg.</p>
      </div>

      <div class="col-6">
        <ul>
          <h5>Nevek kiírása ciklussal</h5>
          <!-- v-for -> Angularban ez az ngFor -->
          <p v-for="name in names" :key="name.id" class="mb-0">
            {{ name.name }}
          </p>
        </ul>
      </div>
    </div>

    <!-- Összegek szekció -->
    <div class="row mt-5">
      <div class="col">
        <ul>
          <h5>Összegek (pipe szerű cuccal megoldva)</h5>
          <p v-for="(amount, index) in formattedAmounts" :key="index" class="mb-0">{{ amount }}</p>
        </ul>
      </div>
    </div>

    <!-- Watch teszt -->
    <div class="row mt-5">
      <div class="col">
        <button class="btn btn-success" @click="increaseCounter">Watch teszt</button>
        <p>Számlálás: {{ counter }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { AuthService } from "../services/AuthService";

  interface Data {
    isVisible: boolean;
    names: Array<{ id: string; name: string }>;
    amounts: number[];
    authService: typeof AuthService;
    counter: number;
  }

  export default Vue.extend({
    name: "GreetingComponent",

    data(): Data {
      return {
        isVisible: true,
        names: [
          { id: "1", name: "Gipsz Jakab" },
          { id: "2", name: "Nagy Béla" },
          { id: "3", name: "Kiss Zsolt" },
          { id: "4", name: "Szabó Ernő" },
        ],
        amounts: [145, 787, 1215, 1219, 78787],
        authService: AuthService,
        counter: 0,
      };
    },

    head() {
      return {
        title: "Vue.js tesztalkalmazás",
      };
    },

    computed: {
      formattedAmounts(): string[] {
        return this.amounts.map((amount: number) => this.formatMoney(amount));
      },
    },

    watch: {
      counter(newValue: number): void {
        console.log("A számláló értéke a következő:", newValue);
      },
    },

    created(): void {
      this.authService.init(this.$store);
    },

    methods: {
      increaseCounter(): void {
        this.counter++;
      },
      toggleVisibility() {
        this.isVisible = !this.isVisible;
      },

      formatMoney(amount: number): string {
        if (amount >= 1000 && amount < 10000) {
          return `${amount.toString()[0]} ${amount.toString().slice(-3)} Ft`;
        }
        const formatter = new Intl.NumberFormat("hu-HU", {
          style: "currency",
          currency: "HUF",
          maximumFractionDigits: 0,
        });

        return formatter.format(amount);
      },
    },
  });
</script>
