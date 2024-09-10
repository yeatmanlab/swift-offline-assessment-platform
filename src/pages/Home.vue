<template>
  <h1>roar offline home page</h1>
  <div>
 we should be logged in as offlinetestadmin1
  </div>
  <div>
    and playing as offlinetestadmin4... hopefully
  </div>
  <button :onClick="loginUser">authenticate</button>
  <!-- <div v-if="userData"> -->
  <!-- <div>
    <h1>user data:</h1>
    <pre>{{ authStore.userData }}</pre>
  </div> -->
  <!-- <div v-if="isAuthenticated"> -->
    <h3> launch game as player </h3>
    <input> player </input>
    <a href='/play/${playerId}/swr'>swr</a>
  <!-- </div> -->
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";

const authStore = useAuthStore();
const {isAuthenticated} = useAuthStore();

const playerId = ref("123123123")


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
