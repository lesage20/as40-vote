<template>
  <q-page :padding="!$q.platform.is.mobile" class="text-indigo">
    <div v-if="$q.platform.is.mobile" class="row q-pa-none q-ma-none">
      <div class="col-xs-12">
        <q-card
          flat
          class="bg-indigo full-width text-center flex flex-center"
          style="height: 150px; border-radius: 0 !important"
        >
          <h1
            class="text-h5 q-ma-none relative-position text-white text-uppercas"
          >
            Mes propositions
          </h1>
        </q-card>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-xs-11 col-md-12 text-subtitle2 q-pa-none">
        <q-card
          :flat="!$q.platform.is.mobile"
          :style="$q.platform.is.mobile ? 'top: -40px' : ''"
        >
          <q-card-section>
            <span class="q-px-md" v-if="$q.platform.is.mobile"> Filtres </span>
            <div class="row q-px-none">
              <div class="col-md-6" v-if="!$q.platform.is.mobile">
                <span> Listes de propositions </span>
              </div>
              <div class="col-xs-4 col-md-2 text-center">
                <q-btn
                  stack
                  @click="recents"
                  label="récents"
                  flat
                  icon="update"
                  size="sm"
                >
                  <q-tooltip class="text-body2">
                    Trier par le plus récent
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="col-xs-4 col-md-2 text-center">
                <q-btn
                  stack
                  label="plus voté"
                  @click="mostUpvoted"
                  flat
                  icon="thumb_up"
                  size="sm"
                >
                  <q-tooltip class="text-body2"
                    >Trier par le plus voté</q-tooltip
                  >
                </q-btn>
              </div>
              <div class="col-xs-4 col-md-2 text-center">
                <q-btn
                  stack
                  label="moins voté"
                  @click="lessVoted"
                  flat
                  icon="thumb_down"
                  size="sm"
                >
                  <q-tooltip class="text-body2"
                    >Trier par le moins voté</q-tooltip
                  >
                </q-btn>
              </div>
            </div>

            <!-- <q-space v-if="!$q.platform.is.mobile"></q-space> -->
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div v-if="!propositions.length" class="row justify-center">
      <div class="col-xs-11 col-md-3">
        <Empty></Empty>
      </div>
    </div>
    <div class="relative-position q-pb-xl" v-else>
      <div class="row justify-center q-pb-xl absolute" style="top: -30px">
        <div
          class="col-xs-11 col-md-6 q-py-sm"
          :class="{ 'q-px-sm': !$q.platform.is.mobile }"
          v-for="prop in propositions"
          :key="prop.title"
        >
          <q-card class="props" bordered flat>
            <q-card-section>
              <div class="text-body2">cédrick Zouzoua {{ prop.author }}</div>
              <div class="text-h5">
                <router-link
                  class="text-indigo"
                  style="text-decoration: none"
                  :to="{ name: 'singleProp', params: { id: prop.id } }"
                >
                  {{ prop.title }}
                </router-link>
              </div>
              <div style="font-size: 12px" class="text-grey-8">
                Proposé le
                {{ new Date(prop.created_at).toLocaleDateString() }} à
                {{ new Date(prop.created_at).toLocaleTimeString() }}
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-6 q-pr-sm">
                  <q-btn
                    outline
                    color="positive"
                    icon="thumb_up"
                    :label="prop.upvotes.length"
                    class="full-width"
                    style="height: 60px"
                    @click="upvote(prop)"
                  >
                    <q-avatar v-if="Boolean(upvoted[prop.id])">
                      <lottie-player
                        animationLink="https://assets8.lottiefiles.com/private_files/lf30_mdvpx85k.json"
                      >
                      </lottie-player>
                    </q-avatar>
                  </q-btn>
                </div>
                <div class="col-6 q-pl-sm">
                  <q-btn
                    outline
                    color="negative"
                    icon="thumb_down"
                    :label="prop.downvotes.length"
                    class="full-width"
                    style="height: 60px"
                    @click="downvote(prop)"
                  >
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
    </div>

    <!-- Dialogs -->

    <!-- ADD DIALOG -->
    <div class="row">
      <q-dialog
        transition-show="slide-left"
        transition-hide="slide-right"
        transition-duration="500"
        :maximized="$q.platform.is.mobile"
        v-model="add"
      >
        <q-card
          :class="{
            'column justify-between full-height': $q.platform.is.mobile,
          }"
          style="width: 600px"
        >
          <q-card-section class="q-pa-none">
            <q-toolbar class="q-px-sm">
              <q-btn round flat icon="arrow_back" @click="add = false"> </q-btn>

              <q-toolbar-title> Ajouter une proposition </q-toolbar-title>
            </q-toolbar>

            <propos-form class="q-mx-sm"></propos-form>
          </q-card-section>

          <q-card-actions>
            <div class="row full-width">
              <div class="col-xs-12 q-px-sm">
                <q-btn
                  class="q-my-sm bg-red-1 full-width"
                  flat
                  rounded
                  color="red-8"
                  type="submit"
                  label="annuler"
                  @click="add = false"
                ></q-btn>
              </div>
              <div class="col-xs-12 q-px-sm">
                <q-btn
                  class="q-my-sm bg-indigo-1 full-width"
                  flat
                  rounded
                  color="indigo"
                  type="submit"
                  label="enregistrer"
                  @click="save"
                ></q-btn>
              </div>
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- Search Dialog -->
    <div class="row">
      <q-dialog
        :maximized="$q.platform.is.mobile"
        v-model="searching"
        transition-duration="500"
        transition-show="slide-left"
        transition-hide="slide-right"
      >
        <q-card class="full-width full-height">
          <q-card-section class="q-pb-none">
            <q-toolbar class="text-bold q-px-none text-h6">
              <q-btn
                round
                flat
                @click="searching = false"
                icon="arrow_back"
              ></q-btn>
              Rechercher une proposition
            </q-toolbar>
            <q-form class="q-px-sm">
              <q-input
                v-model="searchKey"
                label="Entrer le terme de la recherche"
                @keyup="search"
                @keyup.enter="search"
                outlined
              ></q-input>
            </q-form>
          </q-card-section>

          <q-card-section v-if="searchResult.length">
            <q-list separator>
              <q-item>
                <q-item-section class="text-bold">
                  Résultat de la recherche
                </q-item-section>
                <q-item-section side class="text-bold text-indigo">
                  {{ searchResult.length }} Propositions
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                :to="{ name: 'singleProp', params: { id: prop.id } }"
                class="text-grey-8 text-h6"
                v-for="prop in searchResult"
                :key="prop.title"
              >
                {{ prop.title }}
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section class="text-center" v-else>
            <div class="row justify-center">
              <div class="col-xs-10 col-md-3">
                <Empty />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <q-page-sticky :offset="[10, 10]">
      <q-fab
        v-model="fabLeft"
        vertical-actions-align="right"
        push
        color="indigo-10"
        icon="keyboard_arrow_up"
        direction="up"
      >
        <q-fab-action
          label-position="left"
          color="indigo-8"
          @click="add = true"
          icon="add"
          label="ajouter"
        />
        <q-fab-action
          label-position="left"
          color="indigo-6"
          icon="search"
          @click="searching = true"
          label="chercher"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import axios from "axios";
import { computed, inject, onMounted, ref, provide } from "vue";
import Empty from "src/components/EmptyComp.vue";
import ProposForm from "src/components/ProposForm.vue";
import { useAuthStore as auth } from "src/stores/auth";
import { useQuasar } from "quasar";
const $q = useQuasar();
const propositions = ref([]);
const api = inject("api");
function getPropositions() {
  axios
    .get(api + "propos/propositions/")
    .then((res) => {
      propositions.value = res.data.filter(
        (prop) => prop.author == auth().user.id
      );
    })
    .catch((err) => {
      console.dir(err);
    });
}
onMounted(getPropositions);

function mostUpvoted() {
  propositions.value = propositions.value.sort((a, b) => {
    if (a.upvotes.length > b.upvotes.length) return -1;
    else if (a.upvotes.length < b.upvotes.length) return 1;
    else return 0;
  });
}
function lessVoted() {
  propositions.value = propositions.value.sort((a, b) => {
    if (a.downvotes.length > b.downvotes.length) return -1;
    else if (a.downvotes.length < b.downvotes.length) return 1;
    else return 0;
  });
}
function recents() {
  propositions.value = propositions.value.sort((a, b) => {
    if (new Date(a.created_at) > new Date(b.created_at)) return -1;
    else if (new Date(a.created_at) < new Date(b.created_at)) return 1;
    else return 0;
  });
}
const add = inject("add");
const upvoted = ref({});
const downvoted = ref({});
function upvote(prop) {
  console.log("prop: ", prop);
  axios
    .post(api + "propos/upvotes/", {
      proposition: prop.id,
      voter: auth().user.id,
    })
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
    .post(api + "propos/downvotes/", {
      proposition: prop.id,
      voter: auth().user.id,
    })
    .then((res) => {
      console.log("votre vote a été prise en compte");
      downvoted.value[prop.id] = true;
      setTimeout(() => {
        downvoted.value[prop.id] = false;
      }, 1000);
      getPropositions();
    })
    .catch((err) => {
      if (err.response.status) {
        $q.notify("Vous avez déja voté contre cette proposition");
      }
    });
}
const title = ref("");
const description = ref("");
provide("title", title);
provide("description", description);

function reset() {
  title.value = "";
  description.value = "";
}
function cancel() {
  reset();
  add.value = false;
}
function save() {
  console.log();
  axios
    .post(api + "propos/propositions/", {
      title: title.value,
      description: description.value,
      author: auth().user.id,
    })
    .then((res) => {
      $q.notify("Proposition ajoutée avec succès");
      getPropositions();
      cancel();
    })
    .catch((err) => {
      console.dir(err);
    });
}

const searching = ref(false);
const searchKey = ref("");
const searchResult = ref([]);

function search() {
  if (!searchKey.value) {
    searchResult.value = [];
  } else {
    searchResult.value = propositions.value.filter((prop) =>
      prop.title.toLowerCase().includes(searchKey.value.toLowerCase())
    );
  }
}
const fabLeft = ref(false);
</script>

<style lang="scss">
.props:hover {
  border: 1px solid $indigo;
}
</style>
