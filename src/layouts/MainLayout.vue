<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="!$q.platform.is.mobile" bordered flat class="bg-white">
      <q-toolbar class="q-pl-md">
        <q-btn
          flat
          dense
          round
          color="indigo"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          v-if="!$q.platform.is.mobile"
        />

        <q-toolbar-title>
          <q-btn flat class="bg-indigo-1 text-bold text-indigo-8" square>
            AS40 Vote
          </q-btn>
          q-i
        </q-toolbar-title>

        <div>
          <q-btn
            color="indigo"
            @click="add = true"
            icon="add"
            label="Nouvelle proposition"
            no-caps
          >
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-indigo-1 text-grey-3"
    >
      <q-item class="text-center bg-indigo text-white">
        <q-item-section>
          <q-item-label class="text-bold"> AS40 Vote </q-item-label>
          <q-item-label caption class="text-grey-4">
            proposition et vote des fonctionnalités
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator></q-separator>

      <q-list separator>
        <q-item
          exact
          active-class="bg-left-indigo  text-bold"
          clickable
          :to="link.to"
          v-ripple
          class="text-indigo"
          v-for="link in links"
          :key="link.name"
        >
          <q-item-section side>
            <q-icon color="indigo" :name="link.icon"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label header class="text-indigo">{{
              link.name
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      v-if="$q.platform.is.mobile"
      class="bg-indigo-1 text-indigo text-dark"
    >
      <q-tabs active-class=" text-bold">
        <q-route-tab :to="{ name: 'propos' }" exact no-caps icon="message">
          Propos
        </q-route-tab>
        <q-route-tab :to="{ name: 'my-props' }" exact no-caps icon="person_add">
          Mes propos
        </q-route-tab>
        <q-route-tab :to="{ name: 'profile' }" no-caps icon="person">
          Profile
        </q-route-tab>
        <q-route-tab :to="{ name: 'about' }" no-caps icon="help">
          A propos
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { defineComponent, provide, ref } from "vue";
const links = [
  { name: "Propos", to: { name: "propos" }, icon: "message" },
  { name: "Mes Propos", to: { name: "my-props" }, icon: "person_add" },
  { name: "Profile", to: { name: "profile" }, icon: "person" },
  { name: "Apropos", to: { name: "about" }, icon: "help" },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const add = ref(false);

provide("add", add);
const headerBg = ref("bg-transparent");
const scrollPosition = ref(0);
function onScroll(position) {
  scrollPosition.value = position;
  // if (position > 50) {
  //   headerBg.value = "bg-white";
  // } else {
  //   headerBg.value = "bg-white";
  // }
}
</script>
<style lang="scss">
.bg-left-indigo {
  border-left: 5px solid $indigo;
}
</style>
