<template>
  <Navbar mode="player" />
  <div class="page-wrapper">
    <div class="mb-6">
      <div class="font-bold text-3xl">
        📖 Homepage for
        <span class="px-2 bg-stone-200 rounded"> {{ playerId }} </span>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div class="font-bold text-xl">Tasks List</div>
      <div class="text-md">Please choose from the available tasks below:</div>
      <div
        class="flex flex-col align-center justify-center bg-stone-100 gap-3 p-5 rounded"
      >
        <div class="flex flex-col gap-3 border rounded border-red-800 p-4">
          <div class="text-lg font-bold flex-wrap">ROAR Tasks</div>
          <div class="flex flex-row gap-3">
            <a :href="'/play/' + playerId + '/task/swr'">
              <button class="btn-ghost">ROAR - SWR</button>
            </a>
            <a :href="'/play/' + playerId + '/task/sre'">
              <button class="btn-ghost">ROAR - SRE</button>
            </a>
            <a :href="'/play/' + playerId + '/task/vocab'">
              <button class="btn-ghost">ROAR - VOCAB</button>
            </a>
          </div>
        </div>
        <div
          class="flex flex-col flex-wrap align-center justify-center border p-5 rounded border-red-800 gap-3"
        >
          <div class="text-lg font-bold">Levante Tasks</div>
          <div class="flex flex-row flex-wrap gap-3">
            <div class="bg-green-200 p-3 rounded">
              <a
                :href="
                  '/play/' + playerId + '/task/levante/same-different-selection'
                "
              >
                <button class="btn-ghost">Same Different Selection</button>
              </a>
              <a :href="'/play/' + playerId + '/task/levante/memory-game'">
                <button class="btn-ghost">Memory Game</button>
              </a>
              <a :href="'/play/' + playerId + '/task/levante/trog'">
                <button class="btn-ghost">TROG (Syntax)</button>
              </a>
              <a :href="'/play/' + playerId + '/task/levante/pa'">
                <button class="btn-ghost">Phoneme</button>
              </a>
              <a :href="'/play/' + playerId + '/task/levante/egma-math'">
                <button class="btn-ghost">Math</button>
              </a>
              <a :href="'/play/' + playerId + '/task/levante/theory-of-mind'">
                <button class="btn-ghost">Theory of Mind</button>
              </a>
            </div>
            <div class="bg-red-200 p-3 rounded">
              <a
                :href="'/play/' + playerId + '/task/levante/hearts-and-flowers'"
              >
                <button class="btn-ghost">Hearts and Flowers</button>
              </a>
              <a :href="'/play/' + playerId + '/task/levante/matrix-reasoning'">
                <button class="btn-ghost">Matrix Reasoning</button>
              </a>
              <a :href="'/play/' + playerId + '/task/levante/mental-reasoning'">
                <button class="btn-ghost">Mental Reasoning</button>
              </a>
              <a :href="'/play/' + playerId + '/task/levante/vocab'">
                <button class="btn-ghost">Vocab</button>
              </a>
              <a :href="'/play/' + playerId + '/task/levante/sre'">
                <button class="btn-ghost">Sentence</button>
              </a>
              <a :href="'/play/' + playerId + '/task/levante/swr'">
                <button class="btn-ghost">Word</button>
              </a>
            </div>
            <!-- <a href="/play/teak1023/task/sre">
              <button class="btn-ghost">LEVANTE - SRE</button>
            </a> -->
          </div>
        </div>
      </div>
      <div
        class="flex flex-col align-center justify-center bg-stone-100 gap-3 p-5 rounded"
      >
        <div class="font-bold text-xl">View my runs</div>
        <div class="text-md">
          Here are runs that have been completed on this account:
        </div>
        <div class="flex flex-col gap-3 border rounded border-red-800 p-4">
          No runs at the moment.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const { playerId } = route.params;

// list of levante apps
// EF tasks
// Hearts and Flowers
// Same-Different-Selection
// Memory Game
// Matrix reasoning
// Mental rotation
// Language tasks:
// TROG
// Vocab
// Phoneme
// Sentence
// Word/nonword
// Math
// Kid survey
// Theory of Mind + ER + HA task
</script>
