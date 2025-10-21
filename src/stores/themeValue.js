import { defineStore } from "pinia";

export const themeValueStore = defineStore("themeValue", {
  state: () => ({
    theme: '',
  }),
  actions: {
    setTheme(val) {
      this.theme = val;
    },
  },
});
