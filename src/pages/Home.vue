<template>
  <h1>roar offline home page</h1>
  <div>
    <a href="/game/swr">swr</a>
  </div>
  <div>
    <a href="/game/sre">sre</a>
  </div>
  <button :onClick="loginUser">authenticate</button>
  <!-- <div v-if="userData"> -->
  <div>
    <h1>user data:</h1>
    <pre>{{ authStore.userData }}</pre>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const loginUser = () => {
  console.log("login user");

  if(!authStore.uid) {
    authStore.signOut()
  }
  
  authStore.logInWithEmailAndPassword({
    email: "testofflineadmin4@roar-auth.com",
    password: "testofflineadminpw",
  });
  // console.log(authStore);
};
</script>
