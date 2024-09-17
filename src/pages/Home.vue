<template>
  <div class="flex flex-col">
    <NavBar />
    <div class="page-wrapper ">
      <div class="text-lg mb-3 font-bold">
        Welcome to the Swift Offline Assessment platform, or ⓈⓄⒶⓅ for short! 
        <div class="text-sm font-light">

        Please choose from a
        list of functions below.


        </div>
      </div>

      <div class="flex flex-col gap-3 items-center text-xl bg-stone-100 rounded py-8">
      <a href="/play" class="">
        <button class="btn-ghost">
           Launch a Player
        </button>
      </a>
      <a href="/runs" class="">
        <button class="btn-ghost">
         View existing runs 
        </button>
      </a>
      </div>
        admin uid: 4shlrC4eJMZO3voP0QDyKKztLVo1
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
