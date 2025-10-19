<template>
    <div class="container">
        <footer class="footer">
            <div class="footer__container">
                <!-- Ліва частина: пошта -->
                <div class="footer__left">
                    <a href="mailto:multisourcenews@gmail.com" class="footer__link footer-mail">
                        multisource@gmail.com
                    </a>
                </div>

                <!-- Права частина: кнопки -->
                <div class="footer__right">
                    <!-- Telegram -->
                    <a href="https://t.me/multisource_news" target="_blank"
                        class="footer__button footer-telegram footer__icon-link">
                        <img src="@/images/footer/telegram.png" alt="telegram" class="footer__icon">
                    </a>

                    <!-- Support button -->
                    <button class="footer__button footer-donate">
                        <img src="@/images/footer/donate.png" alt="donate" class="footer__icon">
                    </button>

                    <!-- Scroll button -->
                    <button class="footer__button footer__top" @click="scrollToTop()">
                        <img src="@/images/footer/arrow-up.png" alt="arrow up" class="footer__icon">
                    </button>
                </div>
            </div>
        </footer>

    </div>
</template>

<script>
export default {
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // плавна анімація
            });
        }
    }
}
</script>

<style scoped>
@import "../css/footer/footer.css";
</style>