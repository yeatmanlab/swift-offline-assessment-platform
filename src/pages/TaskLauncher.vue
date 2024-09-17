<template>
  <Navbar mode="player" />
  <div class="page-wrapper">
    <div class="mb-6">
      <div class="font-bold text-3xl">🧼 Your Soapbox</div>
      <div class="font-light text-sm">Choose a task to play</div>
    </div>
    <div class="flex flex-col gap-3">
      <div
        class="flex flex-col align-center justify-center bg-stone-100 gap-3 p-5 rounded"
      >
        <div class="flex flex-col gap-3">
          <div class="text-xl font-bold">ROAR Apps</div>
          <div class="flex flex-col gap-3">
            <a :href="'/play/' + playerId + '/task/swr'">
              <button class="btn-primary">ROAR - SWR</button>
            </a>
            <a :href="'/play/' + playerId + '/task/sre'">
              <button class="btn-primary">ROAR - SRE</button>
            </a>
          </div>
        </div>
        <div
          class="flex flex-col align-center justify-center bg-stone-100 gap-3"
        >
          <div class="text-xl font-bold">Levante Apps</div>
          <div class="flex flex-col gap-3">
            <a href="/play/teak1023/task/swr">
              <button class="btn-primary">LEVANTE - Swr</button>
            </a>
            <a href="/play/teak1023/task/sre">
              <button class="btn-primary">LEVANTE - SRE</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const { playerId } = route.params;
</script>
