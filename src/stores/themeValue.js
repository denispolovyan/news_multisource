import { defineStore } from "pinia";

export const themeValueStore = defineStore("themeValue", {
  state: () => ({
    theme: 'false',
  }),
  actions: {
    setTheme(val) {
      this.theme = val;
    },
  },
});
