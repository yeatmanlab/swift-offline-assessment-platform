<template>
  <Navbar mode="player" />
  <div class="page-wrapper">
    <div></div>
    <div class="font-bold text-3xl mb-6">Pick task to play</div>
    <div class="flex flex-col gap-3">
      <div
        class="flex flex-col align-center justify-center bg-stone-100 gap-3 p-5 rounded"
      >
        <div class="flex flex-col gap-3">
          <div class="text-2xl font-bold">ROAR Apps</div>
          <div class="flex flex-col gap-3">
            <button class="bg-red-900 text-white rounded px-2 py-3">
              <a href="/play/teak1023/task/swr">ROAR - SWR</a>
            </button>
            <button class="bg-red-900 text-white rounded px-2 py-3">
              <a href="/play/teak1023/task/sre">ROAR - SRE</a>
            </button>
          </div>
        </div>
        <div
          class="flex flex-col align-center justify-center bg-stone-100 gap-3"
        >
          <div class="text-2xl font-bold">Levante Apps</div>
          <div class="flex flex-col gap-3">
              <button class="bg-red-900 text-white rounded px-2 py-3">
                <a href="/play/teak1023/task/swr">LEVANTE - Swr</a>
              </button>
              <button class="bg-red-900 text-white rounded px-2 py-3">
                <a href="/play/teak1023/task/sre">LEVANTE - SRE</a>
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
