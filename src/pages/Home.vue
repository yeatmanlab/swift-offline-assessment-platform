<template>
  <div class="flex flex-col">
    <NavBar />
    <div class="px-5 py-5">
    <div v-if="viewMode== 'launching'">
      <PlayerLauncher/>
    </div>
    <div v-else-if="viewMode == 'playGame'">
      <TaskLauncher/>
    </div>
    <div v-else-if="viewMode == 'returnToAdmin'">
      <AdminInterchange/>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import PlayerLauncher from "@/components/PlayerLauncher.vue";
import TaskLauncher from "@/components/TaskLauncher.vue";
import AdminInterchange from "@/components/AdminInterchange.vue";


const viewMode = ref('launching');
</script>
