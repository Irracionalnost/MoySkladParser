<script setup>
import LayoutHeader from './Header.vue';
import LayoutFooter from './Footer.vue';
</script>

<template>
  <div>
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
  </div>
</template>
