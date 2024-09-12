<template>
  <Navbar />
  <div class="flex flex-col justify-center align-center p-5 gap-3">
    <div class="font-bold text-3xl">Pick task to play </div>
    <div class="flex flex-col gap-3">
      <div class="flex flex-col align-center justify-center bg-stone-100">
        <div class="flex flex-col">
          <div class="text-2xl font-bold">ROAR Apps</div>
          <ul>
            <li>
              <a href="/play/teak1023/task/swr">ROAR - SWR</a>
            </li>
            <li>
              <a href="/play/teak1023/task/sre">ROAR - SRE</a>
            </li>
          </ul>
        </div>
        <div class="flex flex-col align-center justify-center bg-stone-100">
          <div class="text-2xl font-bold">Levante Apps</div>
          <ul>
            <li>
              <a href="/play/teak1023/task/swr">LEVANTE - Swr</a>
            </li>
            <li>
              <a href="/play/teak1023/task/sre">LEVANTE - Swr</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
