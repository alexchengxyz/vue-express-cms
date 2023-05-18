<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <el-container>
    <RouterView name="Sidebar" />
    <RouterView name="Main" class="el-main" />
    <RouterView name="Full"/>
  </el-container>

  <RouterView />
</template>

<style lang="scss">

</style>
