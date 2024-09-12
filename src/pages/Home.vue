<template>
  <div class="flex flex-column">
    <NavBar />
    <div v-if="viewMode== 'launching'">
      <LaunchPlayer/>
    </div>
    <div v-else-if="viewMode == 'playGame'">
      <TaskPicker/>
    </div>
    <div v-else-if="viewMode == 'returnToAdmin'">
      <AdminInterchange/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";


const viewMode = ref('launching');
</script>
