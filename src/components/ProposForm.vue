<template>
  <q-form class="q-px-sm column justify-between">
    <div class="col">
      <q-input v-model="title" label="titre"> </q-input>
      <q-input v-model="description" label="description" autogrow></q-input>
    </div>
  </q-form>
</template>
<script setup>
import { inject } from "vue";

const title = inject("title");
const description = inject("description");
</script>
