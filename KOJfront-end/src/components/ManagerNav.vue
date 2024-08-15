<template>
        <header class="header">
            <div class="kexielogo"><img :src="kexielogo"></div>
            <div class="title">KexieOJ</div>
            <ul class="tag">
                <li>
                    <RouterLink to="/add/question" active-class="active">
                        <p>创建题目</p>
                    </RouterLink>
                </li>
                <li>
                    <p>浏览题目提交</p>
                </li>
                <li>
                    <p>管理题目</p>
                </li>
                <li>
                    <p>用户管理</p>
                </li>
            </ul>
            <div>
                <div class="figure" v-if="userStore.username !== ''">
                    <div>
                        <a-avatar trigger-type="mask" @click="toggleSidebar">
                            <img alt="avatar"
                                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
                            <template>
                                <IconEdit />
                            </template>
                        </a-avatar><span class="nickname">{{  userStore.username }}</span>
                    </div>
                </div>
                <div class="right" v-else>
                    <div class="searchBar" :class="{ 'changeWidth': showSearch }">
                        <div class="icon" @click="toggleSearch"><img :src="sousuo" alt="" width="20"></div>
                        <div class="textInput" v-if="showSearch">
                            <input type=" text" placeholder="Search Here..." v-model="searchText">
                            <div class="clear" @click="clearInput">×</div>
                        </div>
                    </div>
                    <RouterLink to="/register" active-class="active">
                        <div class="link">注册</div>
                    </RouterLink>
                    <div>或</div>
                    <RouterLink to="/login" active-class="active">
                        <div class="link">登录</div>
                    </RouterLink>
                </div>
            </div>
        </header>
        <div class="line"></div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import kexielogo from '@/assets/img/kexielogo.png'
import sousuo from '@/assets/img/搜索.png'
import { IconEdit } from '@arco-design/web-vue/es/icon';
import axios from "axios";
import ManagerNav from '@/components/ManagerNav.vue'
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
let showSidebar = ref(false);
let showOverlay = ref(false);
let showSearch = ref(false);
let searchText = ref('');
function toggleSearch() {
    showSearch.value = !showSearch.value;
}
function toggleSidebar() {
    showSidebar.value = !showSidebar.value;
    showOverlay.value = !showOverlay.value; // 根据需要是否显示overlay
}

function hideSidebar() {
    showSidebar.value = false;
    showOverlay.value = false;
}
function clearInput() {
    searchText.value = '';
}
onMounted(() => {
    // 在这里可以访问到 userStore 中的 username
    const savedUsername = localStorage.getItem('managername');
    if (savedUsername) {
        userStore.setUsername(savedUsername);
    }
});
</script>
<style>
.tag li p {
    font-size: 14px;
    width: 9vw;
}
.line{
    height: 1px;
    margin: 0 75px;
    background-color: rgba(159, 164, 174, 0.954);
}
.kexielogo {
      display: flex;
      margin-left: -515px;
      margin-top: 35px;
}
</style>