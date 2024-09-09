<template>
    <header class="header">
        <div class="kexielogo"><img :src="kexielogo" alt="kexielogo"></div>
        <div class="title">KexieOJ</div>
        <ul class="tag">
            <li>
                <RouterLink to="/manager/managerusers" active-class="active">
                    <p @click="handleClick('/manager/managerusers')"><icon-user />&nbsp;用户管理</p>
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/manager/column" active-class="active">
                    <p @click="handleClick('/manager/column')"><icon-nav />&nbsp;栏目</p>
                </RouterLink>
            </li>
            <li> <a-dropdown trigger="hover">
                    <p><icon-down-circle />&nbsp;题目</p>
                    <template #content>
                        <RouterLink to="/manager/add/question" active-class="active">
                            <a-doption>
            <li>
                <p @click="handleClick('/manager/add/question')"><icon-link />&nbsp;&nbsp;创建题目</p>
            </li>
            </a-doption>
            </RouterLink>
            <RouterLink to="/manager/viewquestions" active-class="active">
                <a-doption>
                    <li>
                        <p @click="handleClick('/manager/viewquestions')"><icon-align-left />&nbsp;&nbsp;题目列表</p>
                    </li>
                </a-doption>
            </RouterLink>
            <RouterLink to="/manager/managequestions" active-class="active">
                <a-doption>
                    <li>
                        <p @click="handleClick('/manager/managequestions')"><icon-file />&nbsp;&nbsp;浏览题目提交</p>
                    </li>
                </a-doption>
            </RouterLink>
</template>
</a-dropdown></li>
<li> <a-dropdown trigger="hover">
        <p><icon-down-circle />&nbsp;比赛</p>
        <template #content>
            <a-doption>
<li>
    <RouterLink to="/manager/add/question" active-class="active">
        <p><icon-folder-add />&nbsp;&nbsp;创建比赛</p>
    </RouterLink>
</li>
</a-doption>
<a-doption>
    <li>
        <RouterLink to="/manager/add/question" active-class="active">
            <p><icon-align-left />&nbsp;&nbsp;比赛列表</p>
        </RouterLink>
    </li>
</a-doption>
</template>
</a-dropdown></li>
</ul>
<div>
    <div class="searchBar" :class="{ 'changeWidth': showSearch }">
        <div class="icon" @click="toggleSearch"><img :src="sousuo" alt="" width="20"></div>
        <div class="textInput" v-if="showSearch">
            <input type=" text" placeholder="Search Here..." v-model="searchText">
            <div class="clear" @click="clearInput">×</div>
        </div>
    </div>
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
        <RouterLink to="/login" active-class="active">
            <div class="link">登录</div>
        </RouterLink>
    </div>
</div>
</header>
<div class="line"></div>
<div class="sidebar" :class="{ 'show': showSidebar }">
    <div class="one">
        <div class="touxiang">
            <a-avatar trigger-type="mask">
                <img alt="avatar" :src="selectedAvatar" />
            </a-avatar>
        </div>
        <div class="username">{{ userStore.username }}</div>
        <div class="close" @click="hideSidebar">×</div>
    </div>
    <a-divider :size="3" style="border-bottom-style: dotted" />
    <div class="two">
        <div class="" @click="switchAccount"><icon-swap />&nbsp; 切换账号</div>
        <div class="" @click="logout"><icon-export />&nbsp; 退出登录</div>
    </div>
</div>
<div class="overlay" v-if="showOverlay" @click="hideSidebar"></div>
</template>
<script setup name="ManagerNav" lang="ts">
import { ref, onMounted } from "vue";
import kexielogo from '@/assets/img/kexielogo.png'
import sousuo from '@/assets/img/搜索.png'
import { IconEdit } from '@arco-design/web-vue/es/icon';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStore';
import router from "@/router";
import { useRoute } from 'vue-router';
let userStore = useUserStore();
let showSidebar = ref(false);
let showOverlay = ref(false);
let showSearch = ref(false);
let searchText = ref('');
let selectedAvatar = ref('https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp');
let tokenmanager = localStorage.getItem('tokenmanager');
let route = useRoute();
let handleClick = (path: string) => {
    if (route.path === path) {
        ElMessage.warning('已经处于该页面！');
        return;
    }
    router.push(path);
}
let switchAccount = () => {
    userStore.logoutManager();
    router.push({ path: "/login", replace: true });
};
let logout = () => {
    userStore.logoutManager();
    router.push({ path: "/managerhome" });
    location.reload();
};
onMounted(() => {
    let savedAvatarUrl = localStorage.getItem('selectedManagerAvatar');
    if (savedAvatarUrl) {
        selectedAvatar.value = savedAvatarUrl;
    }
    let savedManagername = localStorage.getItem('managername');
    if (savedManagername) {
        userStore.setUsername(savedManagername);
    }
    if (!tokenmanager) {
        setTimeout(() => {
            router.push('/login');
            ElMessage.warning('无权限，请登录管理员账号');
        }, 1500);
    }
});
function toggleSearch() {
    showSearch.value = !showSearch.value;
};
function toggleSidebar() {
    showSidebar.value = !showSidebar.value;
    showOverlay.value = !showOverlay.value;
};
function hideSidebar() {
    showSidebar.value = false;
    showOverlay.value = false;
};

function clearInput() {
    searchText.value = '';
};
</script>
<style scoped>
.right div {
    width: 30px;
    float: right;
    margin-right: 60px;
}

.header {
    height: 48px;
}

.searchBar {
    right: 15%;
}

.tag li p {
    font-size: 15px;
    width: 11vw;
    letter-spacing: 2px;
    color: #032564;
}

.tag li:nth-child(1) {
    margin-left: 100px;
}

.line {
    height: 1px;
    margin: 0 70px;
    background-color: rgba(159, 164, 174, 0.954);
}

.kexielogo {
    display: flex;
    margin-left: 100px;
    margin-top: 10px;
}

.two div {
    margin-left: 20px;
    margin-top: 30px;
    height: 30px;
    font-size: 16px;
    color: rgb(33, 58, 104);
}

.username {
    margin-top: -35px;
    color: rgb(33, 58, 104);
}

.close {
    color: rgb(105, 105, 105);
}

.touxiang {
    margin: 14px 12px;
}

.figure {
    right: -15px;
}

.title {
    margin-left: -9px;
}

@media screen and (max-width: 708px) {
    .tag li p {
        font-size: 12px;
        letter-spacing: .5px;
    }

    .tag {
        left: 110px;
    }

    .kexielogo {
        display: flex;
        margin-left: 55px;
    }

    .title {
        font-size: 16px;
        margin-left: -50px;
    }

    .tag li {
        margin-left: -7px;
    }

    .right {
        font-size: 12px;
        right: 4.5%;
    }
}
</style>