<template>
  <div
    class="flex flex-row align-center justify-between w-full p-5 bg-stone-200 rounded"
  >
    <!-- ROAR LOGO -->
    <div class="flex gap-3">
      <div class="flex items-center gap-1 text-white bg-red-900 rounded px-3 py-1">
        <div class="text-xl font-bold">ROAR</div>
        <div class="text-xl font-light">Offline</div>
      </div>
    </div>
    <!-- Account and Mode Info -->
    <div class="flex flex-row justify-apart gap-3">
      <div class="rounded bg-stone-100 px-2 py-1" v-if="email">
        {{ email }}
      </div>
      <div v-if="uid">
        <button
          class="bg-red-900 text-white rounded px-2 py-1"
          :onClick="signOutUser"
        >
          sign out
        </button>
      </div>
      <div v-else>
        <button :onClick="loginUser">Sign In</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";

const authStore = useAuthStore();
const { uid, email } = useAuthStore();

const playerId = ref("123123123");

const signOutUser = () => {
  console.log("sign out user");
  authStore.signOut();
};

const loginUser = () => {
  console.log("login user");

  if (!authStore.uid) {
    authStore.signOut();
  }

  authStore.logInWithEmailAndPassword({
    email: "testofflineadmin4@roar-auth.com",
    password: "testofflineadminpw",
  });
  console.log(authStore);
};
</script>
