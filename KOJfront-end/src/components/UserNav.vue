<template>
    <div>
        <header class="header">
            <div class="kexielogo"><img alt="kexielogo" :src="kexielogo"></div>
            <div class="title">KexieOJ</div>
            <ul class="tag">
                <li>
                    <router-link to='/userhome' active-class="active">
                        <p @click="handleClick('/userhome')"><icon-home />&nbsp;首页</p>
                    </router-link>
                </li>
                <li >
                    <RouterLink to="/view/total/detailquestions" active-class="active">
                        <p @click="handleClick('/view/total/detailquestions')"><icon-highlight />&nbsp;习题</p>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/userhome" active-class="active">
                        <p><icon-book />&nbsp;考试</p>
                    </RouterLink>
                </li>
            </ul>
            <div>
                <div class="searchBar" :class="{ 'changeWidth': showSearch }">
                    <div class="icon" @click="toggleSearch"><img :src="sousuo" alt="" width="20"></div>
                    <div class="textInput" v-if="showSearch">
                        <input type="text" placeholder="Search Here..." v-model="searchText">
                        <div class="clear" @click="clearInput">×</div>
                    </div>
                </div>
                <div class="figure" v-if="userStore.username !== ''">
                    <div>
                        <a-avatar trigger-type="mask" @click="toggleSidebar">
                            <img alt="avatar" :src="selectedAvatar" />
                            <template #trigger-icon>
                                <IconEdit />
                            </template>
                        </a-avatar>
                        <span class="nickname">{{ userStore.username }}</span>
                    </div>
                </div>
                <div class="right" v-else>
                    <RouterLink to="/register" active-class="active">
                        <div class="link">注册</div>
                    </RouterLink>
                    <div>或</div>
                    <RouterLink to="/login" active-class="active">
                        <div class="link">登录</div>
                    </RouterLink>
                </div>
            </div>
            <div class="line"></div>
            <div class="sidebar" :class="{ 'show': showSidebar }">
                <div class="one">
                    <div class="touxiang">
                        <a-avatar trigger-type="mask" @click="triggerFileUpload">
                            <img alt="avatar" :src="selectedAvatar" />
                            <input type="file" id="headUrl" name="headUrl" style="display: none" accept="images/*" />
                            <template #trigger-icon>
                                <IconEdit id="choiceImage" />
                            </template>
                        </a-avatar>
                        <!--这是用arco design组件上传并提交给后端的头像，但素嘞，这样解决了后端字符串位数的问题，关闭页面再打开就没了，
            所以打算还是用原来那个方法。。。。。。<a-space direction="vertical" :style="{ width: '100%' }"> <a-upload action="/" :fileList="file ? [file] : []" :show-file-list="false" @change="onChange"@progress="onProgress"><template #upload-button>
                  <div :class="`arco-upload-list-item${file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
                    }`">
                    <div class="arco-upload-list-picture-hao custom-upload-avatar" v-if="file && file.url">
                      <img :src="file.url" height="45px" width="45px" />
                      <div class="arco-upload-list-picture-mask">
                        <IconEdit />
                      </div>
                      <a-progress v-if="file.status === 'uploading' && file.percent < 100" :percent="file.percent"
                        type="circle" size="mini" :style="{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translateX(-50%) translateY(-50%)',
                        }" />
                    </div>
                    <div class="arco-upload-picture-card" v-else>
                      <div class="arco-upload-picture-card-text">
                        <IconEdit />
                      </div>
                    </div>
                  </div></template></a-upload></a-space> -->
                    </div>
                    <div class="username">{{ userStore.username }}</div>
                    <div class="close" @click="hideSidebar">×</div>
                </div>
                <div class="two">
                    <form @submit.prevent="handleSubmit">
                        <div class="editPersonalone"> <icon-user-group />&nbsp; 性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <label><input type="radio" name="gender" value="女" v-model="gender"> <icon-woman />
                                女</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <label><input type="radio" name="gender" value="男" v-model="gender"> <icon-man />
                                男</label>
                        </div>
                        <div v-if="userStore.qq !== ''">
                            <icon-qq-circle-fill />&nbsp; 修改QQ
                            <span style="margin-left: 12px;">{{ userStore.qq }}</span>
                            <input type="text" v-model="qq" class="ainput" v-show="isInputVisibleqq"
                                placeholder="请输入您的QQ">
                            </input>
                            <icon-edit @click="showinput('qq')" class="editPersonaltwo" />
                        </div>
                        <div v-else>
                            <icon-qq-circle-fill />&nbsp; 添加QQ
                            <input type="text" v-model="qq" class="ainput" v-show="isInputVisibleqq"
                                placeholder="请输入您的QQ">
                            </input>
                            <icon-edit @click="showinput('qq')" class="editPersonaltwo" />
                        </div>
                        <div>
                            <icon-user />&nbsp; 修改名字<input type="text" v-model="username" class="ainput"
                                placeholder="请输入新的用户名" v-show="isInputVisibleusername">
                            </input><icon-edit @click="showinput('username')" class="editPersonaltwo" />
                        </div>
                        <button type="submit" class="xiugai-button">保存提交</button>
                    </form>
                </div>
                <a-divider :size="3" style="border-bottom-style: dotted" />
                <div class="two">
                    <form @submit.prevent="handleSubmitPwd">
                        <div>
                            <icon-unlock /> &nbsp;修改密码
                            <input type="password" v-model="password" class="ainput" v-show="isInputVisiblepassword"
                                placeholder="请输入新的密码">
                            </input>
                            <icon-edit @click="showinput('password')" class="editPersonaltwo" />
                        </div>
                        <button type="submit" class="xiugai-button">保存提交</button>
                    </form>
                </div>
                <a-divider :size="3" style="border-bottom-style: dotted" />
                <div class="two">
                    <div class=""><icon-drive-file />&nbsp; 我的考试</div>
                    <div class="" @click="switchAccount"><icon-swap />&nbsp; 切换账号</div>
                    <div class="" @click="logout"><icon-export />&nbsp; 退出登录</div>
                </div>
            </div>
            <div class="overlay" v-if="showOverlay" @click="hideSidebar"></div>
        </header>
    </div>
</template>
<script setup lang="ts" name="UserNav">
import { ref, onMounted, onBeforeMount} from 'vue';
import kexielogo from '@/assets/img/kexielogo.png'
import sousuo from '@/assets/img/搜索.png'
import { IconEdit } from '@arco-design/web-vue/es/icon';
import { useUserStore } from '@/stores/userStore';
import router from "@/router";
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from "axios";
import { toggleSearch, toggleSidebar, hideSidebar, clearInput } from '@/Logic/NavLogics'
let userStore = useUserStore();
let showSidebar = ref(false);
let showOverlay = ref(false);
let showSearch = ref(false);
let searchText = ref('');
let username = ref('');
let qq = ref('');
let password = ref('');
let gender = ref('');
let isInputVisibleusername = ref(false)
let isInputVisibleqq = ref(false)
let isInputVisiblepassword = ref(false)
let uPattern: RegExp = /^[\u4e00-\u9fa5a-zA-Z0-9]{3,12}$/;
let pPattern: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,16}$/
let genderPattern: RegExp = /^(男|女)$/;
let token = localStorage.getItem('token');
// 初始默认头像
let selectedAvatar = ref('https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp');
let route = useRoute();
let handleClick = (path:string) => {
    if (route.path !== path) {
        router.push(path);
    } else if (path === '/userhome'){
        ElMessage.warning('已经正处于首页！');
    }
    else if (path === '/view/total/detailquestions') {
        ElMessage.warning('已经正处于习题页面！');
    }
};
let triggerFileUpload = () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        let file = (e.target as HTMLInputElement).files![0];
        let reader = new FileReader();
        reader.onload = (event) => {
            selectedAvatar.value = event.target!.result as string;
            localStorage.setItem('selectedAvatar', selectedAvatar.value);
        }
        reader.readAsDataURL(file);
    };
    input.click();
};
let headers = {
    Authorization: token
};
function matchPattern(Pattern: RegExp, str: string) {
    return Pattern.test(str);
}
let handleSubmitPwd = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    let newPwd = password.value;
    let oldPwd = localStorage.getItem('userpassword')
    if (!newPwd) {
        ElMessage({
            type: "error",
            message: "请输入您的密码",
            duration: 2000,
        });
        return;
    }
    if (!matchPattern(pPattern, newPwd)) {
        ElMessage({
            type: "error",
            message: "数字、字母、符号同时组合，最小长度为8，最大长度不超过16",
            duration: 4000,
        });
        return;
    }
    let dataPwd = {
        "oldPwd": oldPwd,
        "newPwd": newPwd
    }
    try {
        let response = await axios({
            method: 'PUT',
            url: '/api/user/pwd',
            headers,
            data: dataPwd
        })
        if (response.data.code === 200) {
            ElMessage.success("修改密码成功！请重新登录")
            userStore.setPassword(password.value);
            localStorage.setItem('userpassword', password.value);
            userStore.logoutUser();
            router.push({
                path: "/login",
                replace: true,
            });
        }
        else {
            ElMessage.error(response.data.message)
        }
    } catch (error) {
        console.error(error);
    };
}
let handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    let _username = username.value.trim();
    if (username.value.trim() !== '') {
        if (!matchPattern(uPattern, _username)) {
            ElMessage({
                type: "error",
                message: "请输入3到12位用户名:可以包含中文、字母和数字",
                duration: 4000,
            });
            return;
        }
    }
    if (!matchPattern(genderPattern, gender.value)) {  // 新增性别正则匹配判断
        ElMessage({
            type: "error",
            message: "性别只能是男或女",
            duration: 2000
        });
        return;
    }
    let data = {};
    if (username.value.trim() !== '') {
        data = Object.assign(data, { nickname: username.value.trim() });
    }
    if (qq.value !== '') {
        data = Object.assign(data, { qq: qq.value });
    }
    if (gender.value !== '') {
        data = Object.assign(data, { gender: gender.value });
    }
    try {
        let response = await axios({
            method: 'PUT',
            url: '/api/user/update',
            headers, data
        })
        if (response.data.code != 200) {
            ElMessage.error(response.data.message)
        }
        else if (response.data.code === 200) {
            console.log(response.data);
            ElMessage.success("修改信息成功！")
            if (username.value !== '') {
                userStore.setUsername(username.value);
            }
            if (qq.value !== '') {
                userStore.setQQ(qq.value);
            }
            // setTimeout(() => {
            //   location.reload();
            // }, 1000); 
            userStore.setGender(gender.value)
        }
    } catch (error) {
        console.error(error);
    }
};
function showinput(content: string) {
    if (content === 'username') {
        isInputVisibleusername.value = !isInputVisibleusername.value
    } else if (content === 'qq') {
        isInputVisibleqq.value = !isInputVisibleqq.value
    } else if (content === 'password') {
        isInputVisiblepassword.value = !isInputVisiblepassword.value
    }
}
function switchAccount() {
    userStore.logoutUser();
    router.push({
        path: "/login",
        replace: true,
    });
}
function logout() {
    userStore.logoutUser();
    router.push({
        path: "/userhome",
    });
    location.reload();
}
let file = ref();
onMounted(() => {
    let savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        userStore.setUsername(savedUsername);// 在这里可以访问到 userStore 中的 username
    }
    let savedAvatarUrl = localStorage.getItem('selectedAvatar');
    if (savedAvatarUrl) {
        selectedAvatar.value = savedAvatarUrl;
    }
    if (savedAvatarUrl && savedAvatarUrl !== '') {
        file.value = { url: savedAvatarUrl };
    }
    let savedQQ = localStorage.getItem('qq');
    if (savedQQ) {
        userStore.setQQ(savedQQ);
    }
    if (!token) {
        setTimeout(() => {
            router.push('/login');
            ElMessage.warning('请uu先登录！')
        }, 2500);
    }
});
onBeforeMount(() => {
    let savedGender = localStorage.getItem('gender');
    gender.value = savedGender || ''
})
</script>
