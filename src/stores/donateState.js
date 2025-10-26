import { defineStore } from "pinia";

export const donateStateStore = defineStore("donateState", {
  state: () => ({
    donateState: false,
  }),
  actions: {
    setDonateState(val) {
      this.donateState = val;
    },
  },
});
