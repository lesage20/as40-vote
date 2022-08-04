<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-8">
        <q-card bordered flat class="q-mb-md">
          <q-card-section>
            <q-toolbar>
              <q-btn
                flat
                rounded
                color="indigo"
                label="retour"
                @click="$router.back()"
              >
              </q-btn>
              <h1 class="text-h5 q-mx-sm q-my-sm">
                {{ prop.title }}
              </h1>
            </q-toolbar>
          </q-card-section>
        </q-card>
        <q-card bordered flat class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle2">Description</div>
            {{ prop.description }}
          </q-card-section>
        </q-card>
        <q-card bordered flat>
          <q-card-section v-if="Object.keys(prop).length">
            <q-toolbar>
              <div class="text-subtitle2">Votes</div>
              <q-space></q-space>
              <q-badge class="text-h6 bg-indigo-1 text-indigo"
                >{{ totalVotes }} votes</q-badge
              >
            </q-toolbar>
            <div class="row">
              <div class="col-xs-12 col-md-6 q-pa-sm">
                <q-btn
                  outline
                  color="positive"
                  icon="thumb_up"
                  :label="prop.upvotes.length"
                  class="full-width"
                  style="height: 70px"
                  @click="upvote(prop)"
                >
                  <q-linear-progress
                    rounded
                    :value="prop.upvotes.length / (totalVotes || 1)"
                    :buffer="1"
                    color="positive"
                    size="30px"
                    stripe
                  >
                    <div class="absolute-full flex flex-center">
                      <q-badge
                        class="text-body2"
                        color="white"
                        text-color="positive"
                        :label="`${Math.round(
                          (prop.upvotes.length / (totalVotes || 1)) * 100
                        )} %`"
                      />
                    </div>
                  </q-linear-progress>
                  <q-avatar v-if="Boolean(upvoted[prop.id])">
                    <lottie-player
                      animationLink="https://assets8.lottiefiles.com/private_files/lf30_mdvpx85k.json"
                    >
                    </lottie-player>
                  </q-avatar>
                </q-btn>
              </div>
              <div class="col-xs-12 col-md-6 q-pa-sm">
                <q-btn
                  outline
                  color="negative"
                  icon="thumb_down"
                  :label="prop.downvotes.length"
                  class="full-width"
                  style="height: 70px"
                  @click="downvote(prop)"
                >
                  <q-linear-progress
                    rounded
                    stripe
                    :value="prop.downvotes.length / (totalVotes || 1)"
                    :buffer="1"
                    color="negative"
                    size="30px"
                  >
                    <div class="absolute-full flex flex-center">
                      <q-badge
                        class="text-body2"
                        color="white"
                        text-color="negative"
                        :label="`${Math.round(
                          (prop.downvotes.length / (totalVotes || 1)) * 100
                        )} %`"
                      />
                    </div>
                  </q-linear-progress>
                  <q-avatar v-if="downvoted[prop.id]">
                    <lottie-player
                      animationLink="https://assets8.lottiefiles.com/private_files/lf30_mdvpx85k.json"
                    >
                    </lottie-player>
                  </q-avatar>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useRoute } from "vue-router";
import { computed, inject, onMounted, ref } from "vue";
import { useAuthStore as auth } from "src/stores/auth";
import axios from "axios";

const route = useRoute();
const prop = ref({});
const api = inject("api");
function getProp() {
  axios
    .get(api + "propositions/" + route.params.id + "/", {
      headers: {
        Authorization: "Bearer " + auth().token,
      },
    })
    .then((res) => {
      prop.value = res.data;
    })
    .catch((err) => {
      console.dir(err);
    });
}
console.dir(route);

onMounted(getProp);

const upvoted = ref({});
const downvoted = ref({});
function upvote(prop) {
  console.log("prop: ", prop);
  axios
    .post(
      api + "upvotes/",
      {
        proposition: prop.id,
        voter: auth().user.pk,
      },
      {
        headers: {
          Authorization: "Bearer " + auth().token,
        },
      }
    )
    .then((res) => {
      console.log("votre vote a été prise en compte");
      upvoted.value[prop.id] = true;
      setTimeout(() => {
        upvoted.value[prop.id] = false;
      }, 1000);
      getPropositions();
    })
    .catch((err) => {
      if (err.response.status == 500) {
        $q.notify("Vous avez déja voté pour cette proposition");
      }
    });
}
function downvote(prop) {
  axios
    .post(
      api + "downvotes/",
      {
        proposition: prop.id,
        voter: auth().user.pk,
      },
      {
        headers: {
          Authorization: "Bearer " + auth().token,
        },
      }
    )
    .then((res) => {
      console.log("votre vote a été prise en compte");
      downvoted.value[prop.id] = true;
      setTimeout(() => {
        downvoted.value[prop.id] = false;
      }, 1000);
      getPropositions();
    })
    .catch((err) => {
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
    });
}
const totalVotes = computed(() => {
  if (Object.keys(prop).length) {
    return prop.value.upvotes.length + prop.value.downvotes.length;
  }
  return 0;
});
</script>
