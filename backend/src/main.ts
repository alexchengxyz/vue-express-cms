import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { i18n } from './utils';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
//   app.component(key, component);
// });

app
  .use(i18n)
  .use(ElementPlus)
  .use(createPinia())
  .use(router)
  .mount('#app');
