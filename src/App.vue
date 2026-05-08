<script setup lang="ts"></script>
// This is the main entry point of the application. It sets up the router view to display the appropriate components based on the current route. The global styles are also defined here to ensure a consistent look and feel across the application.
<template>
  <RouterView />
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #f0f4f7;
}
</style>