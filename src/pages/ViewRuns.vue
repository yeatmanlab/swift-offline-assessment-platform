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
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { roarfirekit } = storeToRefs(authStore);

console.log("baba", roarfirekit);
const offlineUsers = await roarfirekit.getOfflineUsers();
console.log("offlineusers", offlineUsers);

// console.log("baba", roarfirekit)
// console.log("firekit76", db)
// // this.dbRefs!.app.tasks
// const offlineUsersSnapshot = await getDocs(collection(db, authStore?.uid, "offlineUsers"));
// offlineUserSnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

// const querySnapshot = await getDocs(offlineUsers);
// console.log('qs', querySnapshot)

// console.log('userdata', authStore.userData)

// this.runRef = doc(
//   collection(this.user.userRef, "offlineUsers", this.targetUser, "runs")
// );

// retrieve user's offlineUsers collection
</script>
