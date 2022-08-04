<template>
  <router-view />
</template>

<script setup>
import { provide } from "vue";
import { useAuthStore as auth } from "./stores/auth.js";

auth();

provide("api", "https://as40-vote-api.herokuapp.com/");
</script>
