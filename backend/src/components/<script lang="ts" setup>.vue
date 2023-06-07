<script lang="ts" setup>
const menu = [
  {
    title: 'Navigator One',
    icon: '<location />',
    item: ['item one'],
  },
  {
    title: '文章',
    icon: '<Tickets />',
  },
  {
    title: '分類',
    icon: '<Discount />',
  },
  {
    title: '顧客',
    icon: '<User />',
  },
  {
    title: '使用者',
    icon: '<UserFilled />',
  },
  {
    title: '文章',
    icon: '<Tickets />',
  },
];
</script>

<template lang="pug">
div
  el-aside(:class="$style['el-aside']")
    div.logo Management

    el-menu(
      active-text-color="#ffd04b"
      background-color="#545c64"
      default-active="2"
      text-color="#fff"
    )
      template(v-for="(title, icon, index) in menu")
        el-menu-item(index="index")
          el-icon
            {{ icon }}
          span {{ title }}
</template>

<style lang="scss" module>
  .el-aside {
    width: 200px;
    color: $base-color-white-soft;
    background: $base-color-black-soft;
  }
  </style>


顯示以下錯誤訊息如何修正
The template requires child element.eslintvue/valid-template-root
