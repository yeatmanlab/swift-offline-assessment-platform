<template>
    <Navbar/>
    <div class="page-wrapper">
        <div class="bg-stone-100 p-5 rounded">
    <div class="font-bold text-xl"> Admin Interchange </div>
        <div class="">
    <div class="font-light text-md"> Want to return to administrator mode? Please enter your password. </div>
    <div class="flex gap-3 my-5">
    <input placeholder="Password" class="px-3 rounded" v-model="passwordInput">  </input> 
    <button class="btn-primary" :onClick="checkPassword"> 
        Submit
        </button>
        <div v-if="incorrectPassword"> 
            <div class="text-red-900"> Incorrect Password </div>
            </div>
    </div>
    <hr/>
    </div>
        <div class="my-5 flex flex-col gap-3">
            <div class="font-light text-md">
     Not what you meant to do? 
            </div>
            <div>
                    <a :href="'/play/' + playerId">
                <button class="btn-primary">
                        ️ Back to Player Mode  ⤶
                </button>
                    </a>
            </div>
    <!-- <input> </input> -->
        </div>
        </div>
    </div>


</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";
import {useRoute} from "vue-router";

const checkPassword = () => {
    if (passwordInput.value === password.value) {
        incorrectPassword.value = false
        window.location = "/play" 
        console.log("password correct")
    } else {
        incorrectPassword.value = true
        console.log("password incorrect")
        
    }
}

const incorrectPassword = ref(false)
const password = ref("lmfg")
const passwordInput = ref("")
const route = useRoute();
const { playerId } = route.params;



</script>