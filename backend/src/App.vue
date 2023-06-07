<script setup lang="ts">
import SideBar from './components/SideBar.vue';

const route = useRoute();
const fullArr = ['login', '404'];

const isFull = computed(() => {
  const pathName = route.path.replace('/', '');

  return fullArr.includes(pathName);
});
</script>

<template lang="pug">
RouterView(v-if="isFull")

el-container(v-else class="common-container")
  SideBar
  RouterView(class="el-main")
</template>

<style lang="scss">
@import './assets/styles/element/index.scss';
@import './assets/styles/index.scss';

.common-container {
  height: 100vh;
}
</style>
