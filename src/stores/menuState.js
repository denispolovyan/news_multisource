import { defineStore } from "pinia";

export const menuStateStore = defineStore("menuState", {
  state: () => ({
    menuState: '',
  }),
  actions: {
    setMenuState(val) {
      this.menuState = val;
    },
  },
});
