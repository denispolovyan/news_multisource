import { defineStore } from "pinia";

export const serverValueStore = defineStore("serverValueStore", {
  state: () => ({
    serverValue: '',
  }),
  actions: {
    setServerValue(val) {
      this.serverValue = val;
    },
  },
});
