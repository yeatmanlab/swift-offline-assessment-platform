<template>
  <div class="flex flex-col">
    <NavBar />
    <div class="page-wrapper ">
      <div class="text-lg mb-3 font-bold">
        Welcome to the ROAR Offline Assessment platform! 
        <div class="text-md font-light">

        Please choose from a
        list of functions below.
        </div>
      </div>

      <div class="flex flex-col gap-3 items-center text-xl bg-stone-200 rounded py-8">
      <a href="/play" class="">
        <button class="bg-red-900 text-white rounded px-2 py-3">
          Launch a Player
        </button>
      </a>
      <a href="/runs" class="">
        <button class="bg-red-900 text-white rounded px-2 py-3">
         View existing runs 
        </button>
      </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
// import TaskLauncher from "@/pages/TaskLauncher.vue";
// import AdminInterchange from "@/components/AdminInterchange.vue";

const viewMode = ref("launching");
</script>
