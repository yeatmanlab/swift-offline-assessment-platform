<template>
  <div
    class="flex flex-row align-center justify-between w-full p-5 bg-stone-200 rounded"
  >
    <!-- ROAR LOGO -->
    <div class="flex gap-3">
      <button class="btn-primary gap-1 flex items-center">
        <div class="text-xl font-bold">ROAR</div>
        <div class="text-xl font-light">Offline</div>
      </button>
    </div>
    <!-- Account and Mode Info -->
    <div class="flex flex-row justify-apart items-center gap-3">
      <div v-if="authStore.uid" class="flex items-center uppercase font-light">
        <div class="uppercase font-light text-xs mr-3">mode</div>
        <div v-if="routeParams.playerId">
          <a :href="'/play/' + routeParams.playerId + '/admin-interchange'">
            <div
              class="rounded text-stone-100 px-2 py-1 bg-blue-800 font-bold text-white"
            >
              Player
            </div></a
          >
        </div>
        <div v-else>
          <a href="/play">
            <div
              class="rounded text-stone-100 px-2 py-1 bg-orange-700 font-bold text-white"
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
      <div v-if="authStore.uid">
        <button class="btn-primary" :onClick="signOutUser">Sign out</button>
      </div>
      <div v-else>
        <button :onClick="loginUser" class="btn-primary">Sign in</button>
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

const handleNavigateHome = () => {
  if (routeParams.playerId) {
    window.location = "/play/" + routeParams.playerId;
  } else {
    window.location = "/play";
  }
};

const signOutUser = () => {
  authStore.signOut();
};

const loginUser = () => {
  if (!authStore.uid) {
    authStore.signOut();
  }

  authStore.logInWithEmailAndPassword({
    email: "testofflineadmin1@roar-auth.com",
    password: "testofflineadminpw",
  });
};
</script>
