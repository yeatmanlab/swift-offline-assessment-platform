<template>
    <Navbar/>
    <div class="page-wrapper flex flex-col gap-3">
        <div>
        <div class="text-xl font-bold">
            View Runs
        </div>
        <div class="text-sm font-light">
        These are runs that have been created by this user. 
        </div>
        </div>
        <div class="text-md ">
            currently under construction
        </div>
    </div>

</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";
</script>