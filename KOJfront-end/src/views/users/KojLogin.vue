<template>
    <div class="big">
        <div class="pictrueBox">
            <img :src="kexielogo">
            <div class="pulse1"></div>
            <div class="pulse2"></div>
        </div>
        <div class="loginBox">
            <form @submit.prevent="handleSubmit">
                <h2>LOGIN</h2>
                <div class="item">
                    <input type="email" @focus="handleFocus('email')" @blur="handleBlur('email')" v-model="email">
                    <label for="" :class="{ 'animated-class': isAnimatedEmail }">Email</label>
                </div>
                <div class="item">
                    <input type="password" @focus="handleFocus('password')" @blur="handleBlur('password')"
                        v-model="password">
                    <label for="" id="lll" :class="{ 'animated-class': isAnimatedPassword }">Password</label>
                </div>
                    <button class="btn">enter
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </form>
            <div class="register">
                <RouterLink to="/register" active-class="active">
                    &nbsp;&nbsp;&nbsp;没有账号？点击注册
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="KojLogin">
import kexielogo from '@/assets/img/kexielogo.png'
import { RouterLink} from 'vue-router';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
let router = useRouter();
let password = ref('');
let email = ref('');
let isAnimatedPassword = ref(false);
let isAnimatedEmail = ref(false);
function handleFocus(content: any) {
    if (content === 'password') {
        isAnimatedPassword.value = true;
    } else if (content === 'email') {
        isAnimatedEmail.value = true;
    }
}

function handleBlur(content: any) {
    if (content === 'password') {
        if (!password.value) {
            isAnimatedPassword.value = false;
        }
    } 
    else if (content === 'email') {
        if (!email.value) {
            isAnimatedEmail.value = false;
        }
    }
}

let handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    let data = {
        password: password.value,
        email: email.value
    };
    try {
        let response = await axios.post('/api/login', data);
        console.log(response.data);
        if (response.data.code === 200 && response.data.data.account.roleId === "管理员")
        {
            ElMessage.success("热烈欢迎管理员uu！")
            router.push('/managerhome')
        } else if (response.data.code === 200 && response.data.data.account.roleId === "普通用户"){
            ElMessage.success("登陆成功！欢迎欢迎！")
            router.push('/userhome')
        }
        else{
            ElMessage.error(response.data.message)
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<style scoped>
.pictrueBox {
    top: 4.5%;
}
.item label {
    top: 17px;
}

.loginBox {
    position: relative;
    top: 10%;
    width: 400px;
    height: 360px;
    background-color: #f9fdff;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 2px 8px 20px 0 rgba(19, 63, 157, 0.576);
    padding: 38px;
    box-sizing: border-box;
    color: #032564;
}

.register {
    margin-top: 18px;
    text-align: center;
    font-size: 12px;

}
.register span{
    margin-left: 20px;
}
.btn {
    margin-top: 12px;
}
</style>