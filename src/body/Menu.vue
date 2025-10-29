<template>
  <div class="wrapper">
    <div class="menu-overlay">
      <div class="menu-panel">
        <nav class="menu-links">
          <a @click="openDonate()">ПІДТРИМАТИ</a>
          <a @click="setSimpleSearch()">{{ (simpleSearch == 'true') ? SEARCH_TYPE_TEXT[0] : SEARCH_TYPE_TEXT[1] }}</a>
          <a @click="closeMenu()">НА ГОЛОВНУ</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import { SEARCH_TYPE_TEXT } from "@/constants.js"

// store
import { donateStateStore } from '@/stores/donateState';
import { simpleSearchStateStore } from '@/stores/simpleSearchState';
import { menuStateStore } from '@/stores/menuState';


// store const
const donateStore = donateStateStore();
const simpleSearchStore = simpleSearchStateStore();
const menuStore = menuStateStore();

// const
const simpleSearch = ref('true');


// open donate window
function openDonate() {
  donateStore.setDonateState(true);
}

// open simple search 
function setSimpleSearch() {

  if (simpleSearch.value == 'true') {
    simpleSearchStore.setSimpleSearchState('false');
    localStorage.setItem('simple-search', 'false');
  }
  else { 
    simpleSearchStore.setSimpleSearchState('true'); 
    localStorage.setItem('simple-search', 'true');
  }

  closeMenu();
}

// close menu
function closeMenu() {
  menuStore.setMenuState(false);
}

// watch
watch(
  () => simpleSearchStore.simpleSearch,
  (newVal) => {
    simpleSearch.value = newVal;
  }
)

// onmounted
onMounted(() => {
  // set simple serch state
  simpleSearch.value = localStorage.getItem('simple-search');
  if (simpleSearch.value !== null){
    simpleSearchStore.setSimpleSearchState(simpleSearch.value); 
  } else {
    simpleSearch.value = 'true';
  }
})

</script>

<style scoped>
@import '../css/menu/menu.css';
</style>