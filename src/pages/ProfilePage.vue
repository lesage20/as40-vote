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
            <h1 class="text-h6 q-my-xs">{{ auth().user.username }}</h1>
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
            <q-form>
              <q-input
                :borderless="!modifying"
                :disable="!modifying"
                :readonly="!modifying"
                label="Nom"
              >
              </q-input>
              <q-input
                :borderless="!modifying"
                :disable="!modifying"
                :readonly="!modifying"
                label="Prénoms"
              ></q-input>
              <q-input
                :borderless="!modifying"
                :disable="!modifying"
                :readonly="!modifying"
                label="Téléphone"
              >
              </q-input>
              <q-input
                :borderless="!modifying"
                :disable="!modifying"
                :readonly="!modifying"
                label="Email"
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
              ></q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore as auth } from "src/stores/auth.js";
const modifying = ref(false);
function save() {
  console.log("saved");
  modifying.value = false;
}
</script>
