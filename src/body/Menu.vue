<template>
  <div class="wrapper">
    <div class="menu-overlay">
      <div class="menu-panel">
        <nav class="menu-links">
          <a @click="openDonate()">ПІДТРИМАТИ</a>
          <a>НЕЗАБАРОМ ...</a>
          <a href="">НА ГОЛОВНУ</a>

        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { donateStateStore } from '@/stores/donateState';

// donate const
const donateStore = donateStateStore();

// open donate window
function openDonate() {
  donateStore.setDonateState(true);
}
</script>

<style scoped>
@import '../css/menu/menu.css';
</style>