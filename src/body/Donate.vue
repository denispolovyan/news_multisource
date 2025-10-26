<template>
  <div class="donate">
    <div class="donate__overlay">
      <div class="donate__panel">
        <button class="donate__close" @click="closeDonate()"></button>
        <!-- armed force support  -->
        <div v-if="donateInfo?.title" class="donate__content">
          <img src="@/images/donate/donate.jpg" alt="donation" class="donate__image" />
          <h2 class="donate__title">{{ donateInfo.title }}</h2>
          <p class="donate__description">{{ donateInfo.description }}</p>
          <div> <a :href="donateInfo.link" target="_blank" class="donate__button">
              ✙ БАНКА ЗБОРУ ✙
            </a>
          </div>
        </div>
        <!-- no info added  -->
        <div v-else class="donate__empty">
          <h2 class="donate__empty-title">ЗБІР НЕ ДОДАНИЙ</h2>
          <p class="donate__empty-text">
            Напиши нам, щоб додати збір. Це може бути як рекомендація, так і твоя банка. В лист потрібно одразу додати підтвердження чинності збору
          </p>
          <a href="mailto:multisourcenews@gmail.com?subject=Щодо розміщення збору"
            class="donate__empty-mail">
            multisourcenews@gmail.com
          </a>

        </div>
        <!-- developer support  -->
        <div v-if="supportInfo" class="donate__support">
          <div>
            <a :href="supportInfo" target="_blank" class="donate__support-button">
              ☕ НА КАВУ ДЛЯ НАТХНЕННЯ ☕
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { donateStateStore } from '@/stores/donateState';
import { DONATION_INFO, SUPPORT_CREATOR_INFO } from "@/constants.js";

const donateInfo = DONATION_INFO;
const supportInfo = SUPPORT_CREATOR_INFO;

// donate const
const donateStore = donateStateStore();

// close donate window
function closeDonate() {
  donateStore.setDonateState(false);
}
</script>

<style scoped>
@import '../css/donate/donate.css';
</style>