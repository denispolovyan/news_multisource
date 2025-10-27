<template>
    <p class="news__empty" :class="{ 'darkThemeMain__empty': darkTheme == 'true' }">
        {{ isResponseEmpty ? UNSUCCESSFUL_SEARCH_MESSAGE[1] : UNSUCCESSFUL_SEARCH_MESSAGE[0] }}
    </p>
</template>

<script setup>
import { UNSUCCESSFUL_SEARCH_MESSAGE } from "@/constants.js";

const props = defineProps({
  isResponseEmpty: {
    type: Boolean,
    default: null,
  },
  darkTheme: {
    type: String,
    default: null,
  }
});
</script>

<style>
/* ----------------------------- */
/*     ЯКЩО НОВИН НЕМАЄ          */
/* ----------------------------- */

.news__empty {
  text-align: center;
  font-size: 1.05rem;
  color: #666;
  padding-top: 30px;
}
</style>