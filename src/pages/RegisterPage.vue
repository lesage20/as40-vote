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
          <div class="text-h6">Créér un compte</div>
          <div class="text-subtitle text-grey-8">Crée ton compte AS40 ici</div>
          <q-form>
            <div class="col-12 text-center">
              <q-input v-model="username" class="text-center" label="username">
              </q-input>
            </div>
            <div class="col-12 text-center">
              <q-input
                v-model="email"
                type="email"
                class="text-center"
                label="email"
              >
              </q-input>
            </div>
            <div class="col-12 text-center">
              <q-input v-model="password" type="password" label="mot de passe">
              </q-input>
            </div>
            <div class="col-12 text-center">
              <q-input
                v-model="password2"
                type="password"
                label="confirmer mot de passe"
              >
              </q-input>
            </div>

            <q-btn
              flat
              @click="login"
              color="indigo"
              label="créer mon compte"
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
import { useQuasar } from "quasar";
const api = inject("api");

const $q = useQuasar();
const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const password2 = ref("");
const loading = ref(false);
const success = ref(false);
const error = ref(false);

function login() {
  loading.value = true;
  axios
    .post(api + "auth/register/", {
      username: username.value,
      password1: password.value,
      email: email.value,
      password2: password2.value,
    })
    .then((res) => {
      const data = {
        token: res.data.access_token,
        user: res.data.user,
      };
      auth().login(data);

      success.value = true;
      loading.value = false;
      // router.push({ name: "propos" });
    })
    .catch((err) => {
      console.dir(err);
      error.value = true;
      loading.value = false;

      if (err.response) {
        const status = err.response.status;
        if (status == 0) {
          $q.notify("Erreur de réseau vérifiez votre connexion à internet");
        } else if (status == 400) {
          Object.keys(err.response.data).forEach((er) => {
            if (er != "non_field_errors") {
              $q.notify(`${er}: ${err.response.data[er]}`);
            } else {
              $q.notify(`${err.response.data[er]}`);
            }
          });
        } else if (status == 401) {
          $q.notify("Veuillez vous connecter pour avoir accès à ce contenu");
        } else if (status == 403) {
          $q.notify("Vous ne pouvez pas avoir accès a ce contenu");
        } else {
          $q.notify(
            "Un problème est survenu ce n'est pas à votre niveau. contactez nous ou signalez le sur https://github.com/lesage20/as40-vote/issues"
          );
        }
      } else {
        $q.notify(err.message);
      }

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
