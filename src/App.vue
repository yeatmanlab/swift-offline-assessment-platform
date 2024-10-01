<template>
  <router-view />
  <ReloadPrompt />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useAuthStore } from "@/store/auth";
import { fetchDocById } from "@/helpers/query/utils";
import ReloadPrompt from "@/components/ReloadPrompt.vue";

const isAuthStoreReady = ref(false);

onBeforeMount(async () => {
  const authStore = useAuthStore();
  await authStore.initFirekit();
  authStore.setUser();
  await authStore.initStateFromRedirect().then(async () => {
    if (authStore.uid) {
      const userData = await fetchDocById("users", authStore.uid);
      const userClaims = await fetchDocById("userClaims", authStore.uid);
      authStore.userData = userData;
      authStore.userClaims = userClaims;
    }
  });
  isAuthStoreReady.value = true;
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
