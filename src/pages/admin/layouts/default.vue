<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  import Header from '../components/Header.vue'; // Updated path
  import Footer from '../components/Footer.vue'; // Updated path
</script>

<style scoped>
main {
  padding: 2rem;
  min-height: 80vh;
}
</style>
