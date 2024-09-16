<template>
  <div class="flex flex-col">
    <NavBar />
    <div class="page-wrapper">
      app home
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
