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
    <pre>{{ userData }}</pre>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const {userData} = useAuthStore();

const loginUser = () => {
  console.log("login user");

  if(!authStore.uid) {
    authStore.signOut()
  }
  
  authStore.logInWithEmailAndPassword({
    email: "testsuperadmin1@roar-auth.com",
    password: "!roartestsuperadmin1",
  });
  // console.log(authStore);
};
</script>
