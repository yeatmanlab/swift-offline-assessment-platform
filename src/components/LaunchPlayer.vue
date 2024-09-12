
<template>
  <div class="flex flex-column">
<h1> Launch Player </h1>
    <div v-if="!uid"><SignIn/></div>
    <div v-if="playMode == 'launching'"></div>
    <div v-else-if="playMode == 'playGame'"></div>
    <div v-else-if="playMode == 'returnToAdmin'"></div>
  </div>
</template>
    


<script setup>
import NavBar from "@/components/NavBar.vue";
import SignIn from "@/components/SignIn.vue";

</script>