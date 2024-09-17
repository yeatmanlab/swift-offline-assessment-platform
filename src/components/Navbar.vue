<template>
  <div
    class="flex flex-row align-center justify-between w-full p-5 bg-stone-200 rounded"
  >
    <!-- ROAR LOGO -->
    <div class="flex gap-3">
      <button
        class="btn-primary gap-1 flex flex-col items-center"
        :onClick="handleHomeRoute"
      >
        <div class="text-2xl font-bold">🧼 ⓈⓄⒶⓅ</div>
        <div class="flex flex-wrap gap-1 items-center justify-center">
          <div class="text-xs font-light">Swift Offline</div>
          <div class="text-xs font-bold">Assessment Platform</div>
        </div>
      </button>
    </div>
    <!-- Account and Mode Info -->
    <div class="flex justify-apart items-start gap-3">
      <div
        v-if="authStore.isAuthenticated"
        class="flex flex-col gap-1 items-end justify-end"
      >
        <div v-if="routeParams.playerId" id="playerButton">
          <a :href="'/play/' + routeParams.playerId + '/admin-interchange'">
            <div
              class="rounded text-stone-100 px-2 py-1 bg-blue-800 font-bold text-white"
            >
              <div
                id="backToAdminButton"
                class="text-sm font-bold text-stone-100"
              >
              ⤶ Return to Admin?
              </div>
              <div id="playerLabel" class="uppercase text-sm">Player</div>
            </div></a
          >
        </div>
        <div v-else>
          <a href="/play">
            <div
              class="rounded text-stone-100 px-2 py-1 bg-orange-700 font-bold text-white uppercase"
            >
              Admin
            </div>
          </a>
        </div>
        <div class="font-light text-xs text-stone-400 uppercase">mode</div>
      </div>
      <div v-if="routeParams.playerId" class="flex flex-col items-end gap-1">
        <div class="rounded bg-stone-100 px-2 py-1 text-sm">
          {{ routeParams.playerId }}
        </div>
        <div class="text-xs uppercase font-light text-stone-400">username</div>
      </div>
      <div
        class="flex flex-col items-end gap-1"
        v-else-if="authStore.email && authStore.isAuthenticated"
      >
        <div class="rounded bg-stone-100 px-2 py-1 text-stone-600">
          {{ authStore.email }}
        </div>
        <div class="text-xs uppercase font-light text-stone-400">email</div>
      </div>
      <div v-if="routeParams?.playerId">
      </div>
      <div v-else-if="authStore.isAuthenticated">
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

const handleHomeRoute = () => {
  if (routeParams?.playerId) {
    window.location = "/play/" + routeParams?.playerId;
  } else {
    window.location = "/";
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

<style>
#backToAdminButton {
  display: none;
}

#playerButton:hover #backToAdminButton {
  display: block;
}
#playerButton:hover #playerLabel {
  display: none;
}
</style>
