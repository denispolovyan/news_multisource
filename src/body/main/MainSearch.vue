<template>
    <div class="news__button" :class="{ 'darkThemeMain__button': darkTheme == 'true' }">
        <button>
            Отримати новини
        </button>
    </div>
</template>

<script setup>

const props = defineProps({
    darkTheme: {
    type: String,
    default: null,
  }
});

</script>

<style scoped>
@import "@/css/main/search.css";
@import "@/css/dark.css";
</style>
