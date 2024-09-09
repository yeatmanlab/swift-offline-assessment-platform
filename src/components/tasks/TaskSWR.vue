<template>
    <div id="jspsych-target" class="game-target" translate="no" />
    <div v-if="!gameStarted" class="col-full text-center">
      <!-- <h1>{{ $t('tasks.preparing') }}</h1> -->
      <AppSpinner />
    </div>
  </template>
  <script setup>
  import { onMounted, onBeforeUnmount, watch, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useQuery } from '@tanstack/vue-query';
  import { useAuthStore } from '@/store/auth';
  import { useGameStore } from '@/store/game';
  import _get from 'lodash/get';
  import { fetchDocById } from '@/helpers/query/utils';
  import packageLockJson from '../../../package-lock.json';
  
  const props = defineProps({
    taskId: { type: String, required: true, default: 'swr' },
    language: { type: String, required: true, default: 'en' },
  });
  
  let TaskLauncher;
  
  const taskId = props.taskId;
  const { version } = packageLockJson.packages['node_modules/@bdelab/roar-swr'];
  const router = useRouter();
  const gameStarted = ref(false);
  const authStore = useAuthStore();
  const gameStore = useGameStore();
  const { isFirekitInit, roarfirekit, uid } = storeToRefs(authStore);
  
  const initialized = ref(false);
  let unsubscribe;
  const init = () => {
    if (unsubscribe) unsubscribe();
    initialized.value = true;
  };
  const handlePopState = () => {
    router.go(0);
  };
  
  unsubscribe = authStore.$subscribe(async (mutation, state) => {
    if (state.roarfirekit?.restConfig) init();
  });

  const { userData }  = useAuthStore();
  
  // const { isLoading: isLoadingUserData, data: userData } = useQuery({
  //   queryKey: ['userData', uid, 'studentData'],
  //   queryFn: () => fetchDocById('users', uid.value, ['studentData']),
  //   keepPreviousData: true,
  //   enabled: initialized,
  //   staleTime: 5 * 60 * 1000, // 5 minutes
  // });
  
  // The following code intercepts the back button and instead forces a refresh.
  // We add { once: true } to prevent an infinite loop.
  window.addEventListener(
    'popstate',
    () => {
      handlePopState();
    },
    { once: true },
  );
  
  onMounted(async () => {
    try {
      TaskLauncher = (await import('@bdelab/roar-swr')).default;
    } catch (error) {
      console.error('An error occurred while importing the game module.', error);
    }
    console.log(roarfirekit.value)
    if (roarfirekit.value?.restConfig) init();
    // if (isFirekitInit.value && !isLoadingUserData.value) {
    if (isFirekitInit.value) {
      await startTask();
    }
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('popstate', handlePopState);
  });
  
  watch([isFirekitInit], async ([newFirekitInitValue]) => {
    if (newFirekitInitValue) await startTask();
  });
  
  const selectedAdmin = ref("5f9b1b3b-0b3b-4b3b-8b3b-0b3b4b3b4b3b");
//   const { selectedAdmin } = storeToRefs(gameStore);
  
  async function startTask() {
    try {
      console.log('start task called', userData)
      let checkGameStarted = setInterval(function () {
        // Poll for the preload trials progress bar to exist and then begin the game
        let gameLoading = document.querySelector('.jspsych-content-wrapper');
        if (gameLoading) {
          gameStarted.value = true;
          clearInterval(checkGameStarted);
        }
      }, 100);

      const tempSelectedAdmin = "nwhT3AkUNhTstIg48GUk"
  
      const appKit = await authStore.roarfirekit.startAssessmentForTargetParticipant(tempSelectedAdmin, taskId, version);
      console.log('userdata', userData)
  
      const userDob = _get(userData, 'studentData.dob');
      const userDateObj = new Date(userDob);
  
      const userParams = {
        grade: _get(userData, 'studentData.grade'),
        birthMonth: userDateObj.getMonth() + 1,
        birthYear: userDateObj.getFullYear(),
        language: props.language,
      };
      console.log("made it past params")
  
      const gameParams = { ...appKit._taskInfo.variantParams };
      console.log("made it past game params")

      console.log("this is the taskaluncher", TaskLauncher)
  
      const roarApp = new TaskLauncher(appKit, gameParams, userParams, 'jspsych-target');
  
      await roarApp.run().then(async () => {
        console.log("made it past run")
        // Handle any post-game actions.
        // await authStore.completeAssessment(tempSelectedAdmin, taskId);
  
        // Navigate to home, but first set the refresh flag to true.
        // gameStore.requireHomeRefresh();
        // router.push({ name: 'Home' });
      });
    } catch (error) {
      console.error('An error occurred while starting the task:', error);
    //   alert(
    //     'An error occurred while starting the task. Please refresh the page and try again. If the error persists, please submit an issue report.',
    //   );
    }
  }
  </script>
  <style>
  @import '@bdelab/roar-swr/lib/resources/roar-swr.css';
  
  .game-target {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .game-target:focus {
    outline: none;
  }
  </style>
  