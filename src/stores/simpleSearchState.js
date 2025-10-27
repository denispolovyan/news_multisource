import { defineStore } from "pinia";

export const simpleSearchStateStore = defineStore("simpleSearchState", {
  state: () => ({
    simpleSearch: false,
  }),
  actions: {
    setSimpleSearchState(val) {
      this.simpleSearch = val;
    },
  },
});
