import { defineStore } from "pinia";

export const menuStateStore = defineStore("menuState", {
  state: () => ({
    menuState: false,
  }),
  actions: {
    setMenuState(val) {
      this.menuState = val;
    },
  },
});
