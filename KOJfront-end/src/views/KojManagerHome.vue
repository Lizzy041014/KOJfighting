<template>
  <div class="home">
    <ManagerNav />
    <div style="height: 91.8vh;width: 90vw; margin-left: 5%; background-color:rgb(237, 240, 242);margin-top: 12px;">
      <div class="empty">
        <a-empty />
      </div>
    </div>
    <BasicFooter />
  </div>
</template>
<script setup name="KojManagerHome">
import ManagerNav from '@/components/ManagerNav.vue'
import { ref } from "vue";
import {IconEdit} from '@arco-design/web-vue/es/icon';
import axios from "axios";
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/userStore';
import ACCESS_ENUM from '@/access/accessEnum'
import kexielogo from '@/assets/img/kexielogo.png'
import { useRouter } from 'vue-router'
let authStore = useAuthStore();
let hasAdminPermission = authStore.checkPermission(ACCESS_ENUM.ADMIN);
let userStore = useUserStore();
</script>
<style scoped>
.footer{
  bottom:-3%;
}
.empty{
  position: relative;
  top: 40%;
  background-color: rgb(237, 240, 242);
}
</style>