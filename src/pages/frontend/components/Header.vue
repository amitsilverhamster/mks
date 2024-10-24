<template>

  <header>
   
    <v-app-bar app color="white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My Website</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" class="text-dark">Home</v-btn>
      <v-btn to="/about" class="text-dark">About</v-btn>
      <v-btn to="/contact" class="text-dark">Contact</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary color="white">
      <v-list>
        <v-list-item link to="/">
          <v-list-item-title class="text-dark">Home</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-title class="text-dark">About</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/contact">
          <v-list-item-title class="text-dark">Contact</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>

<style scoped>
/* Additional styles if needed */
</style>