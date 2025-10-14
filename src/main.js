import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./css/nullstyle.css";

// 1️⃣ Створюємо екземпляр Pinia
const pinia = createPinia();

// 2️⃣ Створюємо застосунок
const app = createApp(App);

// 3️⃣ Підключаємо Pinia до Vue
app.use(pinia);

// 4️⃣ Монтуємо додаток
app.mount("#app");
