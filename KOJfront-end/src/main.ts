// vue3框架提供的方法createApp方法，可以用来创建应用实例方法
import { createApp } from 'vue'
import router from '@/router';
//引入根组件App
import App from './App.vue'
//引入全局样式
import "bytemd/dist/index.css";
import '@/assets/CSS/登陆注册.css'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { createPinia } from 'pinia';
const pinia = createPinia();
//利用createApp方法创建应用实例，且将应用实例挂载到挂载点上
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(ArcoVue, {
    // 用于改变使用组件时的前缀名称
    componentPrefix: 'arco'
});
app.use(ArcoVueIcon);
app.mount('#app');
