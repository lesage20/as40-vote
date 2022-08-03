<template>
  <router-view />
</template>

<script setup>
import { provide } from "vue";
import { useAuthStore as auth } from "./stores/auth.js";

auth();
provide("api", "http://192.168.43.108:8000/");
</script>
