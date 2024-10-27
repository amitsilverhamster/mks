<template>
   
  <header>
    <v-app-bar app color="white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Admin</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text :to="{name:'AdminHome'}" class="text-dark">Dashboard</v-btn>
      <v-btn text :to="{name:'AdminMenus'}"  class="text-dark">Menus</v-btn>
      <v-btn text :to="{name:'AdminProducts'}"  class="text-dark">Products</v-btn>
      <v-btn text :to="{name:'Adminprojects'}"  class="text-dark">Projects</v-btn>
      <v-btn text :to="{name:'AdminBanners'}"  class="text-dark">Banners</v-btn>
      <v-btn text :to="{name:'AdminIndustries'}" class="text-dark">Industries</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary color="white">
      <v-list>
        <v-list-item link to="/">
          <v-list-item-title class="text-dark" >Home</v-list-item-title>
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