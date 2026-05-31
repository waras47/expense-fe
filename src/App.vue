<template>
  <div>
    <nav class="nav">
      <strong>💸 Duitku Starter</strong>
      <RouterLink to="/">Kategori</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.nav {
  display: flex; align-items: center; gap: 16px;
  padding: 12px 24px; border-bottom: 2px solid #111; background: #fff;
}
.nav a { color: #111; text-decoration: none; font-weight: 600; }
.nav a.router-link-active { color: #2ABFA3; }
</style>
