import { defineStore } from "pinia";

export const searchParamsStore = defineStore("news", {
  state: () => ({
    isQueryRequired: false,
  }),
  actions: {
    setIsQueryRequired(val) {
      this.isQueryRequired = val;
    },
  },
});
