<script setup>
import {ref, onBeforeMount} from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { fetchDocById } from '@/helpers/query/utils';

const isAuthStoreReady = ref(false);

onBeforeMount(async () => {
  const authStore = useAuthStore();
  await authStore.initFirekit();
  authStore.setUser();
  await authStore.initStateFromRedirect().then(async () => {
    if (authStore.uid) {
      const userData = await fetchDocById('users', authStore.uid);
      const userClaims = await fetchDocById('userClaims', authStore.uid);
      authStore.userData = userData;
      authStore.userClaims = userClaims;
    }
  });
  isAuthStoreReady.value = true;
  //login as test user
  console.log("auth store", authStore)
  // const auth  = getAuth(authStore.admin.auth);
  authStore.signInWithGooglePopup();
  // authStore.logInWithEmailAndPassword({email:'testsuperadmin1@roar-auth.com', password: '!roartestsuperadmin1'});

});
</script>

<template>
  <router-view />
</template>

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
