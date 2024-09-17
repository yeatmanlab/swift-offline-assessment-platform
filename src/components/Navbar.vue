<template>
  <div
    class="flex flex-row align-center justify-between w-full p-5 bg-stone-200 rounded"
  >
    <!-- ROAR LOGO -->
    <div class="flex gap-3">
      <div
        class="flex items-center gap-1 text-white bg-red-900 rounded px-3 py-1"
      >
        <div class="text-xl font-bold">ROAR</div>
        <div class="text-xl font-light">Offline</div>
      </div>
    </div>
    <!-- Account and Mode Info -->
    <div class="flex flex-row justify-apart gap-3">
      <div v-if="authStore.uid" class="flex items-center uppercase font-light">
        <div class="uppercase font-light text-xs mr-3">mode</div>
        <div v-if="routeParams.playerId">
          <a :href="'/play/' + routeParams.playerId + '/admin-interchange'">
            <div
              class="rounded bg-stone-100 px-2 py-1 bg-blue-800 font-bold text-white"
            >
              Player
            </div></a
          >
        </div>
        <div v-else>
          <a href="/play">
            <div
              class="rounded bg-stone-100 px-2 py-1 bg-orange-700 font-bold text-white"
            >
              Admin
            </div>
          </a>
        </div>
      </div>
      <div v-if="routeParams.playerId">
        <div class="rounded bg-stone-100 px-2 py-1">
          {{ routeParams.playerId }}
        </div>
      </div>
      <div class="rounded bg-stone-100 px-2 py-1" v-else-if="authStore.email">
        {{ authStore.email }}
      </div>
      <div v-if="routeParams.playerId">
        <button class="bg-red-900 text-white rounded px-2 py-1">
          <a href="/admin-interchange"> Return to Admin Mode </a>
        </button>
      </div>
      <div v-else-if="authStore.uid">
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
import { useRoute } from "vue-router";

const props = defineProps({
  mode: { type: String, required: false, default: "admin" },
});

const route = useRoute();
const routeParams = route.params;

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
    email: "testofflineadmin1@roar-auth.com",
    password: "testofflineadminpw",
  });
  console.log(authStore);
};
</script>
