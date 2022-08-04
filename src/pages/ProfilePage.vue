<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-xs-12 col-md-6">
        <q-card flat style="border-radius: 0 !important">
          <q-card-section
            style="height: 200px"
            class="bg-indigo flex flex-center text-white"
          >
            <h1 class="text-h4">{{ auth().user.username }}</h1>
          </q-card-section>
          <q-card-section class="bg-white">
            <div class="row relative-position">
              <div
                class="col-xs-5 col-md-2 bg-transparent text-center absolute"
                style="border-radius: 10px; top: -50px !important"
              >
                <q-avatar size="70px" color="indigo-2">
                  <q-icon size="xl" color="indigo" name="person"></q-icon>
                </q-avatar>
              </div>
            </div>
          </q-card-section>
          <q-toolbar class="q-y-none">
            <!-- <h1 class="text-h6 q-my-xs">{{ auth().user.username }}</h1> -->
            <q-space></q-space>
            <q-btn
              color="grey"
              @click="modifying = true"
              flat
              icon="edit"
              round
            ></q-btn>
          </q-toolbar>
          <q-card-section class="q-pt-none">
            <q-form ref="profile" @submit="save">
              <q-input
                :borderless="!modifying"
                class="q-my-sm"
                :outlined="modifying"
                :readonly="!modifying"
                label="Nom"
                v-model="last_name"
              >
              </q-input>
              <q-input
                :borderless="!modifying"
                class="q-my-sm"
                :outlined="modifying"
                :readonly="!modifying"
                label="Prénoms"
                v-model="first_name"
              ></q-input>
              <q-input
                :borderless="!modifying"
                class="q-my-sm"
                :outlined="modifying"
                :readonly="!modifying"
                label="Téléphone"
                v-model="phone"
              >
              </q-input>
              <q-input
                :borderless="!modifying"
                class="q-my-sm"
                :outlined="modifying"
                :readonly="!modifying"
                label="Email"
                v-model="email"
                type="email"
              ></q-input>
            </q-form>
          </q-card-section>
          <q-card-actions align="center">
            <div class="col-xs-11">
              <q-btn
                rounded
                color="indigo"
                class="full-width"
                label="enregistrer"
                size="md"
                @click="save"
                type="submit"
                :disable="!modifying"
              ></q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted, inject, watch } from "vue";
import { useAuthStore as auth } from "src/stores/auth.js";
import axios from "axios";
import { useQuasar } from "quasar";
const $q = useQuasar();
const api = inject("api");
const userProfile = ref({
  last_name: "",
  first_name: "",
  email: "",
  phone: "",
  username: "",
});
const profile = ref();
const modifying = ref(false);
const token = auth().token;
function getProfile() {
  axios
    .get(api + "account/profile/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      userProfile.value = res.data.filter(
        (prof) => prof.user == auth().user.pk
      )[0];
    });
}
function save() {
  axios
    .put(
      api + "account/profile/" + userProfile.value.id + "/",
      {
        first_name: first_name.value,
        last_name: last_name.value,
        phone: phone.value,
        email: email.value,
        user: auth().user.pk,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(() => {
      $q.notify("Compte modifié avec succès");
    })
    .catch((err) => {
      const status = err.response.status;
      if (status == 0) {
        $q.notify("Erreur de réseau vérifiez votre connexion à internet");
      } else if (status == 400) {
        Object.keys(err.response.data).forEach((er) => {
          if (er != "non_field_error") {
            $q.notify(`${er}: ${err.response.data[er]}`);
          } else {
            $q.notify(`${err.response.data[er]}`);
          }
        });
      } else if (status == 401) {
        $q.notify("Veuillez vous connecter pour avoir accès à ce contenu");
        router.push({ name: "login" });
      } else if (status == 403) {
        $q.notify("Vous ne pouvez pas avoir accès a ce contenu");
      } else if (status == 404) {
        $q.notify(
          "Le lien demandé n'existe pas veuillez vous renseignez auprès du dévéloppeur pour plus d'info"
        );
      } else {
        $q.notify(
          "Un problème est survenu ce n'est pas à votre niveau. contactez nous ou signalez le sur https://github.com/lesage20/as40-vote/issues"
        );
      }
    });

  modifying.value = false;
}

const first_name = ref("");
const last_name = ref("");
const phone = ref("");
const email = ref("");

function initializeForm() {
  first_name.value = userProfile.value.first_name;
  last_name.value = userProfile.value.last_name;
  phone.value = userProfile.value.phone;
  email.value = userProfile.value.email;
}
onMounted(() => {
  getProfile();
  initializeForm();
});

watch(userProfile, () => {
  initializeForm();
});
// formulaire
</script>
