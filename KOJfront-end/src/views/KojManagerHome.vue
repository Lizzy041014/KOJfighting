<!-- <MdEditor :value="value" :handle-change="onChange" />
    <CodeEditor :value="Codevalue" :handle-change="onCodeChange" /> -->
<!-- // import MdEditor from "@/components/MdEditor.vue";
// import CodeEditor from '@/components/CodeEditor.vue'
// const value = ref();

// const onChange = (v: string) => {
// value.value = v;
// };
// const Codevalue = ref();

// const onCodeChange = (v: string) => {
// Codevalue.value = v;
// } -->
<!-- .bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
display: none;
}  -->
<template>
  <!-- <div v-if="hasAdminPermission" class="home">
    管理员页面内容
    <ManagerNav />
  </div>
  <div v-else>
    <p>您没有管理员权限，无法访问此页面</p>
  </div> -->
  <div class="home">
    <ManagerNav />
  </div>
</template>
<script setup name="KojManagerHome">
import ManagerNav from '@/components/ManagerNav.vue'
import {ref} from "vue";
import {IconEdit} from '@arco-design/web-vue/es/icon';
import axios from "axios";
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/userStore';
import ACCESS_ENUM from '@/access/accessEnum'
const authStore = useAuthStore();
const hasAdminPermission = authStore.checkPermission(ACCESS_ENUM.ADMIN);
const userStore = useUserStore();
</script>
<style scoped>
.tag li p{
  font-size: 14px;
  width: 9vw;
}
</style>