import { defineStore } from "pinia";

export const searchRequestResponse = defineStore("searchRequestResponse", {
  state: () => ({
    articles: '',
    url: ''
  }),
  actions: {
    setArticles(val) {
      this.articles = val;
    },
    setUrl(val) {
      this.url = val;
    },
  },
});
