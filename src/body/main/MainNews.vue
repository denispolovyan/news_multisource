<template>
    <div class="news__list">
        <div v-for="(item, index) in news" :key="index" class="news__card"
            :class="{ 'darkThemeMain__card': darkTheme == 'true' }">
            <!-- Зображення -->
            <div class="news__image-wrapper" :class="{ 'darkThemeMain__image-wrapper': darkTheme == 'true' }">

                <!-- Основне зображення -->
                <img :src="item.image_url"
                    @error="() => { item.hasError = true; item.image_url = catsPlaceholders[index % 10]; }"
                    class="news__image" />

                <!-- Заглушка (видно лише коли є помилка) -->
                <div v-if="item.hasError" class="news__overlay">
                    <img src="@/images/main/placeholder.png" class="news__placeholder" alt="placeholder" />
                </div>


                <div class="news__source" v-if="item.source_name && item.source_url">
                    <a :href="item.source_url" target="_blank">{{ item.source_name }}</a>
                </div>
            </div>
            <!-- Тіло картки -->
            <div class="news__body" :class="{ 'darkThemeMain__body': darkTheme == 'true' }">
                <h4 class="news__title" :class="{ 'darkThemeMain__title': darkTheme == 'true' }">
                    {{
                        !item.title
                            ? ""
                            : item.title.length > 80
                                ? item.title.slice(0, 80) + "..."
                                : item.title
                    }}
                </h4>
                <p class="news__description" :class="{ 'darkThemeMain__description': darkTheme == 'true' }">
                    {{
                        !item.description
                            ? ""
                            : item.description.length > 300
                                ? item.description.slice(0, 300) + "..."
                                : item.description
                    }}
                </p>
            </div>
            <!-- Посилання -->
            <a :href="item.link" target="_blank" class="news__link"
                :class="{ 'darkThemeMain__link': darkTheme == 'true' }">
                Читати далі
            </a>
            <div class="news__date" :class="{ 'darkThemeMain__date': darkTheme == 'true' }">
                <p v-if="item.date_day"> {{ item.date_day }} </p>
                <p v-if="item.date_time"> {{ item.date_time }} </p>
            </div>

        </div>
    </div>
</template>

<script setup>

const props = defineProps({
  news: {
    type: Array,
    default: null,
  },
  catsPlaceholders: {
    type: Array,
    default: null,
  },
    darkTheme: {
    type: String,
    default: null,
  }
});
</script>

<style scoped>
@import "@/css/main/news.css";
@import "@/css/dark.css";
</style>