<template>
  <q-page :padding="$q.platform.is.mobile" class="flex flex-center">
    <q-card
      flat
      :bordered="!$q.platform.is.mobile"
      :style="
        $q.platform.is.desktop
          ? 'width: 40%; height: 40%'
          : 'width: 100%; height: 40%'
      "
    >
      <q-card-section horizontal>
        <q-card-section
          :style="$q.platform.is.desktop ? 'width: 70%' : 'width: 100%'"
        >
          <div class="text-h6">Connexion</div>
          <div class="text-subtitle text-grey-8">
            connecte toi ici chers AS40
          </div>
          <q-form>
            <div class="col-12 text-center">
              <q-input v-model="username" class="text-center" label="username">
              </q-input>
            </div>
            <q-input v-model="password" type="password" label="password">
            </q-input>

            <q-btn
              flat
              @click="login"
              color="indigo"
              label="me connecter"
              class="bg-indigo-1 full-width q-mt-md"
              :loading="loading"
            >
            </q-btn>
          </q-form>
        </q-card-section>
        <q-card-section
          style="width: 40%"
          class="bg-indigo text-center text-white"
          v-if="$q.platform.is.desktop"
        >
          <div v-if="!error && !success">
            <h1 class="text-h4 text-center">AS40</h1>
            <p>Nous sommes une collection de génies</p>
          </div>
          <div v-if="error" class="row justify-center">
            <div class="col-5">
              <lottie-player
                animationLink="https://assets3.lottiefiles.com/packages/lf20_jqcjv619.json"
              >
              </lottie-player>
            </div>
            <p>
              Les informations que vous avez renseigner ne permettent pas de se
              connecter
            </p>
          </div>
          <div v-if="success">
            <lottie-player
              :count="1"
              :loop="1"
              animationLink="https://assets3.lottiefiles.com/packages/lf20_lk80fpsm.json"
            >
            </lottie-player>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, inject } from "vue";
import { useAuthStore as auth } from "src/stores/auth";
import { useRouter } from "vue-router";
import axios from "axios";
const api = inject("api");

const router = useRouter();
const username = ref("");
const password = ref("");
const loading = ref(false);
const success = ref(false);
const error = ref(false);

function login() {
  loading.value = true;
  axios
    .post(api + "token/", {
      username: username.value,
      password: password.value,
    })
    .then((res) => {
      auth().login(res.data);
      success.value = true;
      loading.value = false;
      router.push({ name: "propos" });
    })
    .catch((err) => {
      console.dir(err);
      error.value = true;
      loading.value = false;

      setTimeout(() => {
        error.value = false;
      }, 3000);
    });
}
</script>

<style lang="scss">
.border-indigo {
  border: 1px solid $blue-7;
}
</style>
