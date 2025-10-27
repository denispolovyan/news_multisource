<template>
    <!-- Donate -->
    <button class="footer__button footer-donate" :class="{ 'darkThemeFooter__button': darkTheme == 'true' }"
        @click="openDonate()">
        <img src="@/images/footer/donate.png" alt="donate" class="footer__icon" />
    </button>
</template>

<script setup>
import { ref, watch } from "vue";
import { donateStateStore } from '@/stores/donateState'

// props
const props = defineProps({
    darkTheme: {
    type: String,
    default: null,
  }
});

// donate const
const donateStore = donateStateStore();
const donateState = ref(false);

// show or hide donate module
function openDonate(){
    donateState.value = !donateState.value;
    donateStore.setDonateState(donateState.value);
}

// watch donate
watch(
  () => donateStore.donateState,
  (newVal) => {
    donateState.value = newVal;
  }
)
</script>

<style scoped>
@import "@/css/footer/footer.css";
@import "@/css/dark.css";
</style>