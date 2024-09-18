<template>
  <Navbar mode="player" />
  <div class="page-wrapper">
    <div class="mb-6">
      <div class="font-bold text-3xl">
        📖 Homepage for
        <span class="px-2 bg-stone-200 rounded">
          {{ playerId }} </span
        >
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div
        class="flex flex-col align-center justify-center bg-stone-100 gap-3 p-5 rounded"
      >
        <div class="font-bold text-xl">Tasks List</div>
        <div class="text-md">Please choose from the available tasks below:</div>
        <div class="flex flex-col gap-3 border rounded border-red-800 p-4">
          <div class="text-lg font-bold">ROAR Tasks</div>
          <div class="flex flex-col gap-3">
            <a :href="'/play/' + playerId + '/task/swr'">
              <button class="btn-ghost">ROAR - SWR</button>
            </a>
            <a :href="'/play/' + playerId + '/task/sre'">
              <button class="btn-ghost">ROAR - SRE</button>
            </a>
          </div>
        </div>
        <div
          class="flex flex-col align-center justify-center border p-5 rounded border-red-800 gap-3"
        >
          <div class="text-lg font-bold">Levante Tasks</div>
          <div class="flex flex-col gap-3">
            <a :href="'/play/' + playerId + '/task/levante'">
              <button class="btn-ghost">LEVANTE Trog</button>
            </a>
            <a href="/play/teak1023/task/swr">
              <button class="btn-ghost">LEVANTE - Swr</button>
            </a>
            <a href="/play/teak1023/task/sre">
              <button class="btn-ghost">LEVANTE - SRE</button>
            </a>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col align-center justify-center bg-stone-100 gap-3 p-5 rounded"
      >
        <div class="font-bold text-xl">View my runs</div>
        <div class="text-md">
          Here are runs that have been completed on this account:
        </div>
        <div class="flex flex-col gap-3 border rounded border-red-800 p-4">
          No runs at the moment.
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
