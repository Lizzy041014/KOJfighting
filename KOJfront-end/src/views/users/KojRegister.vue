<template>
    <div class="big">
        <div class="pictrueBox">
            <img :src="kexielogo">
            <div class="pulse1">
            </div>
            <div class="pulse2"></div>
        </div>
        <div class="registerBox">
            <h2>REGISTER</h2>
            <form @submit.prevent="handleSubmit">
                <div class="item">
                    <input type="text" @focus="handleFocus('username')" @blur="handleBlur('username')"
                        v-model="username">
                    <label for="" :class="{ 'animated-class': isAnimatedUsername }">Username</label>
                </div>
                <div class="item">
                    <input type="password" @focus="handleFocus('password')" @blur="handleBlur('password')"
                        v-model="password">
                    <label for="" id="lll" :class="{ 'animated-class': isAnimatedPassword }">Password</label>
                </div>
                <div class="item">
                    <input type="email" @focus="handleFocus('email')" @blur="handleBlur('email')" v-model="email">
                    <label for="" :class="{ 'animated-class': isAnimatedEmail }">Email</label>
                </div>
                <button type="submit" class="btn">submit
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </form>
            <div class="login">
                <RouterLink to="/login" active-class="active">
                    &nbsp; &nbsp; &nbsp; &nbsp;已有账号？请登陆吧~</RouterLink>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="KojRegister">
import kexielogo from '@/assets/img/kexielogo.png'
import { ElMessage } from 'element-plus';
import { RouterLink} from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import { ref } from 'vue';
let userStore = useUserStore();
let username = ref('');
let password = ref('');
let email = ref('');
// 正则匹配
let uPattern: RegExp = /^[\u4e00-\u9fa5a-zA-Z0-9]{3,12}$/;
// //至少1个字母(?=.*[A-Za-z])至少1个特殊字符(?=.*[$@$!%*#?&])
let pPattern: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,20}$/
let ePattern: RegExp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
function matchPattern(Pattern: RegExp, str: string) {
    return Pattern.test(str);
}
// // 第一种：使用类型注释let handleSubmit = async (event: { preventDefault: () => void; }) => {}
//这种语法是 TypeScript 中的类型标注，用于增强类型检查和代码的类型安全性。
// 第二种：不使用类型注释
let handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    let _username = username.value.trim();
    let _password = password.value;
    let _email = email.value;
    if (username.value.trim() === '') {
        ElMessage({
            type: "error",
            message: "请输入您的用户名",
            duration: 2000,
        });
        return;
    }
    if (!matchPattern(uPattern, _username)) {
        ElMessage({
            type: "error",
            message: "请输入3到12位用户名:可以包含中文、字母和数字",
            duration: 4000,
        });
        return;
    }
    if (!password.value) {
        ElMessage({
            type: "error",
            message: "请输入您的密码",
            duration: 2000,
        });
        return;
    }
    if (!matchPattern(pPattern, _password)) {
        ElMessage({
            type: "error",
            message: "数字、字母、符号同时组合，最小长度为8，最大长度不超过20",
            duration: 4000,
        });
        return;
    }
    if (!email.value) {
        ElMessage({
            type: "error",
            message: "请输入您的邮箱",
            duration: 2000,
        });
        return;
    }
    if (!matchPattern(ePattern, _email)) {
        ElMessage({
            type: "error",
            message: "邮箱格式错误，请重试",
            duration: 4000,
        });
        return;
    }
    let data = {
        nickname: _username,
        password: _password,
        email: _email
    };
    try {
        let response = await axios.post('/api/register', data); 
        // 直接传递对象，不需要 JSON.stringify  
        if (response.data.code!=200){
            ElMessage.error(response.data.message)
        }
        else{
            ElMessage.success("恭喜uu注册成功，请前往登陆页面进行登录吧！")
            userStore.setEmail(email.value);
        }
    } catch (error) {
        console.error(error);
    }
};
let isAnimatedUsername = ref(false);
let isAnimatedPassword = ref(false);
let isAnimatedEmail = ref(false);
function handleFocus(content: any) {
    if (content === 'username') {
        isAnimatedUsername.value = true;
    } else if (content === 'password') {
        isAnimatedPassword.value = true;
    } else if (content === 'email') {
        isAnimatedEmail.value = true;
    }
}
function handleBlur(content:any) {
    if (content === 'username') {
        if (!username.value) {
            isAnimatedUsername.value = false;
        }
    } else if (content === 'password') {
        if (!password.value) {
            isAnimatedPassword.value = false;
        }
    } else if (content === 'email') {
        if (!email.value) {
            isAnimatedEmail.value = false;
        }
    }
}
</script>
<style scoped>
.registerBox {
    position: relative;
    top: 9%;
    width: 400px;
    height: 410px;
    background-color: #f9fdff;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 2px 8px 18px 0 rgba(10, 51, 139, 0.488);
    padding: 38px;
    box-sizing: border-box;
    color: #032564;
}

h2 {
    margin-bottom: 22px;
    margin-top: -15px;
}

.item {
    height: 37px;
}

.item label {
    top: 8px;
}

.login {
    margin-top: 22px;
    text-align: center;
    font-size: 12px;
    color: #032564;
}
</style>
