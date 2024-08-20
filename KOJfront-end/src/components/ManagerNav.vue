<template>
    <header class="header">
        <div class="kexielogo"><img :src="kexielogo"></div>
        <div class="title">KexieOJ</div>
        <ul class="tag">
            <li>
                <RouterLink to="/manager/add/question" active-class="active">
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
                <RouterLink to="/manager/manageusers" active-class="active">
                    <p>用户管理</p>
                </RouterLink>
            </li>
        </ul>
        <div>
            <div class="figure" v-if="userStore.username !== ''">
                <div>
                    <a-avatar trigger-type="mask" @click="toggleSidebar">
                        <img alt="avatar"
                            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
                        <template #trigger-icon>
                            <IconEdit />
                        </template>
                    </a-avatar><span class="nickname">{{ userStore.username }}</span>
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
    <div class="sidebar" :class="{ 'show': showSidebar }">
        <div class="one">
            <span class="touxiang">
                <a-avatar trigger-type="mask" @click="triggerFileUpload">
                    <img alt="avatar" :src="selectedAvatar" />
                    <input type="file" id="headUrl" name="headUrl" style="display: none" accept="images/*" />
                    <template #trigger-icon>
                        <IconEdit id="choiceImage" />
                    </template>
                </a-avatar></span>
            <span class="username">{{ userStore.username }}</span>
            <span class="close" @click="hideSidebar">×</span>
            <a-divider :size="3" style="border-bottom-style: dotted" />
        </div>
        <div class="two">
            <div class="" @click="switchAccount"><icon-swap />&nbsp; 切换账号</div>
            <div class="" @click="logout"><icon-export />&nbsp; 退出登录</div>
        </div>
    </div>
    <div class="overlay" v-if="showOverlay" @click="hideSidebar"></div>
</template>

<script setup name="ManagerNav" lang="ts">
import { ref,onMounted } from "vue";
import kexielogo from '@/assets/img/kexielogo.png'
import sousuo from '@/assets/img/搜索.png'
import { IconEdit } from '@arco-design/web-vue/es/icon';
import axios from "axios";
import { useUserStore } from '@/stores/userStore';
import router from "@/router";
const userStore = useUserStore();
let showSidebar = ref(false);
let showOverlay = ref(false);
let showSearch = ref(false);
let searchText = ref('');
let selectedAvatar = ref('https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp');

const saveSelectedAvatarToLocalStorage = () => {
    localStorage.setItem('selectedManagerAvatar', selectedAvatar.value);
};
const triggerFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files![0];
        const reader = new FileReader();
        reader.onload = (event) => {
            selectedAvatar.value = event.target!.result as string;
            saveSelectedAvatarToLocalStorage();
        };
        reader.readAsDataURL(file);
    };
    input.click();
};
function switchAccount() {
    userStore.logout();
    router.push({
        path: "/login",
        replace: true,
    });
}
function logout() {
    userStore.logout();
    router.push({
        path: "/managerhome",
    });
    location.reload();
}
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
    const savedAvatarUrl = localStorage.getItem('selectedManagerAvatar');
    if (savedAvatarUrl) {
        selectedAvatar.value = savedAvatarUrl;
    }
    // 在这里可以访问到 userStore 中的 username
    const savedManagername = localStorage.getItem('managername');
    if (savedManagername) {
        userStore.setUsername(savedManagername);
    }
});

</script>
<style>
.tag li p {
    font-size: 16px;
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
.two div {
    margin-left: 20px;
    margin-top: 30px;
    height: 30px;
    font-size: 16px;
    color: rgb(33, 58, 104);
}
.username{
    color: rgb(33, 58, 104);
}
.close{
    color: rgb(105, 105, 105);
}
</style>