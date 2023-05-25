<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Message, Lock } from '@element-plus/icons-vue';
import { langOpts } from '../options';

const { locale } = useI18n();

const form = ref({
  email: '',
  password: '',
});

watch(locale, (newLocale) => {
  localStorage.setItem('lang', newLocale);
});
</script>

<template lang="pug">
div(:class="$style['login-container']")
  el-card(shadow="always" :class="$style['el-card']")
    h1(:class="$style['login-title']") Login
    el-form(
      ref="ruleFormRef"
      status-icon
      size="large"
      label-width="120px"
      label-position="top"
      class="demo-ruleForm"
      :model="form"
    )
      el-form-item(:label="$t('email')" prop="email")
        el-input(
          v-model="form.email"
          type="text"
          autocomplete="off"
          :prefix-icon="Message"
        )

      el-form-item(:label="$t('password')" prop="password")
        el-input(
          v-model="form.password"
          type="password"
          autocomplete="off"
          :prefix-icon="Lock"
        )

      el-form-item
        el-button(
          type="primary"
          size="large"
          :class="$style['login-btn']"
        ) {{ $t('login In') }}

    el-select(
      v-model="locale"
      placeholder="Select"
      size="large"
      :class="$style['lang-select']"
    )
      el-option(
        v-for="i in langOpts"
        :key="i.value"
        :label="i.label"
        :value="i.value"
      )
</template>

<style lang="scss" module>
body {
  background-image: radial-gradient(circle, #FFF, #efeff0, #e0e0e1, #d0d1d3, #c0c2c4);
  background-repeat: no-repeat;
}

.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-card {
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  font-size: 3em;
  font-weight: 700;
  background: -webkit-linear-gradient(#409eff, #032444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-btn {
  width: 100%;
  & > span {
    font-weight: 700;
  }
}

.lang-select {
  width: 100%;
}
</style>
