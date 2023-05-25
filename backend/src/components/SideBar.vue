<script lang="ts" setup></script>

<template lang="pug">
el-aside(:class="$style['el-aside']")
  div.logo Management

  el-menu(
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="2"
    text-color="#fff"
  )
    el-sub-menu(index="1")
      template(#title)
        el-icon
          location
          span Navigator One
      el-menu-item-group(title="Group One")
        el-menu-item(index="1-1") item one
        el-menu-item(index="1-2") item one
      el-menu-item-group(title="Group Two")
        el-menu-item(index="1-3") item three
      el-sub-menu(index="1-4")
        template(#title) item four
        el-menu-item(index="1-4-1") item one
    el-menu-item(index="2")
      el-icon
        icon-menu
      span Navigator Two
    el-menu-item(index="3" disabled)
      el-icon
        document
      span Navigator Three
    el-menu-item(index="4")
      el-icon
        setting
      span Navigator Four
</template>

<style lang="scss" module>
  .el-aside {
    width: 200px;
    color: $base-color-white-soft;
    background: $base-color-black-soft;
  }
  </style>
