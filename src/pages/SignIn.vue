<template>
  <div v-if="spinner" class="loading-blur">
    <AppSpinner />
  </div>
  <div
    id="signin-container"
    class="flex items-center justify-center h-full w-full bg-stone-200"
  >
    <section id="signin">
      <header>
        <div class="signin-logo">
          <!-- <img
            v-if="isLevante"
            src="/LEVANTE/Levante_Logo.png"
            alt="LEVANTE Logo"
            width="200"
          /> -->
          <ROARLogoShort />
        </div>
      </header>
      <h1 v-if="!isLevante">{{ $t("pageSignIn.welcome") }}</h1>
      <section class="signin-options">
        <section class="signin-option-container signin-option-userpass">
          <h4 class="signin-option-title">{{ $t("pageSignIn.login") }}</h4>
          <!-- <div id="languageSelect" class="m-4 flex justify-content-center">
            <LanguageSelector />
          </div> -->
          <SignIn
            :invalid="incorrect"
            @submit="authWithEmail"
            @update:email="email = $event"
          />
        </section>
      </section>
      <footer style="display: none"></footer>
    </section>
  </div>
  <!-- <RoarModal
      :is-enabled="warningModalOpen"
      title="Email is already associated with an account"
      subtitle=""
      icon="pi-exclamation-triangle"
      small
      @modal-closed="handleWarningModalClose"
    >
      <template #default>
        The email <span class="font-bold">{{ email }}</span> is already in use using
        {{ displaySignInMethods.slice(0, -1).join(', ') + ' or ' + displaySignInMethods.slice(-1) }}. If this is you,
        click to sign in below.
        <div class="flex align-items-center flex-column gap-2 my-2">
          <div v-if="signInMethods.includes('google')" class="flex">
            <button
              label="Sign in with Google"
              class="flex surface-0 p-1 mr-1 border-black-alpha-10 text-center justify-content-center hover:border-primary hover:surface-ground"
              style="border-radius: 3rem; height: 3rem"
              @click="authWithGoogle"
            >
              <img src="../assets/provider-google-logo.svg" alt="The Google Logo" class="flex mr-2 w-2" />
              <span>Google</span>
          </button>
          </div>
          <div v-if="signInMethods.includes('clever')">
            <button
              v-if="!isLevante"
              class="flex surface-0 p-1 mr-1 border-black-alpha-10 justify-content-center hover:border-primary hover:surface-ground"
              style="border-radius: 3rem; height: 3rem"
              @click="authWithClever"
            >
              <img src="../assets/provider-clever-logo.svg" alt="The Clever Logo" class="flex mr-2 w-2" />
              <span>Clever</span>
          </button>
          </div>
          <div v-if="signInMethods.includes('classlink')">
            <button
              v-if="!isLevante"
              class="flex surface-0 p-1 mr-1 border-black-alpha-10 justify-content-center hover:border-primary hover:surface-ground"
              style="border-radius: 3rem; height: 3rem"
              @click="authWithClassLink"
            >
              <img src="../assets/provider-classlink-logo.png" alt="The ClassLink Logo" class="flex mr-2 w-2" />
              <span>ClassLink</span>
          </button>
          </div>
          <div v-if="signInMethods.includes('password')" class="flex flex-row gap-2">
            <PvPassword v-model="modalPassword" placeholder="Password" :feedback="false"></PvPassword>
            <button
              class="flex p-3 border-none border-round hover:bg-black-alpha-20"
              :label="$t('authSignIn.buttonLabel') + ' &rarr;'"
              @click="authWithEmail({ email, password: modalPassword, useLink: false, usePassword: true })"
            ></button>
          </div>
        </div>
        You will then be directed to your profile page where you can link different authentication providers.
      </template>
      <template #footer>
        <button
          tabindex="0"
          class="border-none border-round bg-white text-primary p-2 hover:surface-200"
          text
          label="Back to Sign In"
          outlined
          @click="handleWarningModalClose"
        ></button>
      </template>
    </RoarModal> -->
</template>

<script setup>
import { onMounted, ref, toRaw, onBeforeUnmount, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import SignIn from "@/components/auth/SignIn.vue";
import ROARLogoShort from "@/assets/RoarLogo-Short.vue";
import { useAuthStore } from "@/store/auth";
import { isMobileBrowser } from "@/helpers";
import { fetchDocById } from "../helpers/query/utils";
import RoarModal from "../components/modals/RoarModal.vue";

const incorrect = ref(false);
const isLevante = import.meta.env.MODE === "LEVANTE";
const authStore = useAuthStore();
const router = useRouter();

const {
  spinner,
  authFromClever,
  authFromClassLink,
  routeToProfile,
  roarfirekit,
} = storeToRefs(authStore);
const warningModalOpen = ref(false);

authStore.$subscribe(() => {
  if (authStore.uid) {
    console.log("home")
    //   if (authStore.userData && isLevante) {
    //     if (
    //       toRaw(authStore.userData?.userType?.toLowerCase()) === 'parent' ||
    //       toRaw(authStore.userData?.userType?.toLowerCase()) === 'teacher'
    //     ) {
    //       router.push({ name: 'Survey' });
    //       return;
    //     }
    //   }

    //   if (authFromClever.value) {
    //     router.push({ name: 'CleverLanding' });
    //   } else if (authFromClassLink.value) {
    //     router.push({ name: 'ClassLinkLanding' });
    //   } else if (routeToProfile.value) {
    //     router.push({ name: 'ProfileAccounts' });
    //   } else {
    router.push({ name: "Home" });
    //   }
  }
});

const modalPassword = ref("");

const authWithEmail = (state) => {
  console.log("auth with email called")
  authStore.logInWithEmailAndPassword({
    email: "testofflineadmin1@roar-auth.com",
    password: "testofflineadminpw",
  })
    .then(async () => {
      console.log("auth with email called in then in authwithemail", authStore)
      if (authStore.uid) {
        console.log("returned uid", authStore.uid)
        const userData = await fetchDocById("users", authStore.uid);
        const userClaims = await fetchDocById("userClaims", authStore.uid);
        authStore.userData = userData;
        authStore.userClaims = userClaims;
      }

      spinner.value = true;
    });
  // If username is supplied instead of email
  // turn it into our internal auth email
  // incorrect.value = false;
  // let creds = toRaw(state);
  // if (creds.useLink && !creds.usePassword) {
  //   authStore.initiateLoginWithEmailLink({ email: creds.email }).then(() => {
  //     router.push({ name: 'AuthEmailSent' });
  //   });
  // } else {
  //   if (!creds.email.includes('@')) {
  //     creds.email = `${creds.email}@roar-auth.com`;
  //   }

  //   authStore
  //     .logInWithEmailAndPassword(creds)
  //     .then(async () => {
  //       if (authStore.uid) {
  //         const userData = await fetchDocById('users', authStore.uid);
  //         const userClaims = await fetchDocById('userClaims', authStore.uid);
  //         authStore.userData = userData;
  //         authStore.userClaims = userClaims;
  //       }

  //       spinner.value = true;
  //     })
  //     .catch((e) => {
  //       incorrect.value = true;
  //       if (['auth/user-not-found', 'auth/wrong-password'].includes(e.code)) {
  //         return;
  //       } else {
  //         throw e;
  //       }
  //     });
  // }
};

const handleWarningModalClose = () => {
  authStore.routeToProfile = true;
  warningModalOpen.value = false;
};

const email = ref("");

const signInMethods = ref([]);

const openWarningModal = async () => {
  signInMethods.value = await roarfirekit.value.fetchEmailAuthMethods(
    email.value
  );
  warningModalOpen.value = true;
};

const displaySignInMethods = computed(() => {
  return signInMethods.value.map((method) => {
    if (method === "password") return "Password";
    if (method === "google") return "Google";
    if (method === "clever") return "Clever";
    if (method === "classlink") return "ClassLink";
  });
});

onBeforeUnmount(() => {
  document.body.classList.remove("page-signin");
});
</script>

<style scoped>
.loading-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.7);
  padding-top: 21vh;
}
</style>
