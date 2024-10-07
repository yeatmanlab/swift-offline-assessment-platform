<template>
  <Navbar />
  <div class="page-wrapper flex flex-col gap-3">
    <div>
      <div class="text-xl font-bold">View Runs</div>
      <div>
        admin uid: 4shlrC4eJMZO3voP0QDyKKztLVo1 administraiton id:
        nwhT3AkUNhTstIg48GUk
      </div>
      <div class="text-sm font-light">
        These are runs that have been created by this user.
      </div>
    </div>
    <div class="text-md">currently under construction</div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const offlineUsers = ref([]);

console.log('userdata', authStore.userData)
// this.runRef = doc(
//   collection(this.user.userRef, "offlineUsers", this.targetUser, "runs")
// );

// retrieve user's offlineUsers collection
</script>
