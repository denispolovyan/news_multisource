<template>
  <div class="wrapper">
    <div class="menu-overlay">
      <div class="menu-panel">
        <nav class="menu-links">
          <a @click="openDonate()">ПІДТРИМАТИ</a>
          <a @click="openSimpleSearch()">ПРОСТИЙ ПОШУК</a>
          <a @click="closeMenu()">НА ГОЛОВНУ</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
// store
import { donateStateStore } from '@/stores/donateState';
import { simpleSearchStateStore } from '@/stores/simpleSearchState';
import { menuStateStore } from '@/stores/menuState';


// store const
const donateStore = donateStateStore();
const simpleSearchStore = simpleSearchStateStore();
const menuStore = menuStateStore();


// open donate window
function openDonate() {
  donateStore.setDonateState(true);
}

// open simple search 
function openSimpleSearch() {
  simpleSearchStore.setSimpleSearchState(true);
}

// close menu
function closeMenu() {
  menuStore.setMenuState(false);
}


</script>

<style scoped>
@import '../css/menu/menu.css';
</style>