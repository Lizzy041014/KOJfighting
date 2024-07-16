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
import kexielogo from '@/assets/kexielogo.png'
import { RouterLink} from 'vue-router';
import { ElMessage } from 'element-plus';
// import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
const password = ref('');
const email = ref('');

const isAnimatedPassword = ref(false);
const isAnimatedEmail = ref(false);
function handleFocus(field: any) {
if (field === 'password') {
        isAnimatedPassword.value = true;
    } else if (field === 'email') {
        isAnimatedEmail.value = true;
    }
}

function handleBlur(field: any) {
    if (field === 'password') {
        if (!password.value) {
            isAnimatedPassword.value = false;
        }
    } 
     else if (field === 'email') {
        if (!email.value) {
            isAnimatedEmail.value = false;
        }
    }
}

const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const data = {
        password: password.value,
        email: email.value
    };
    try {
        const response = await axios.post('/api/login', data);
        console.log(response.data);
        if (response.data.code=200){
            ElMessage.success("登陆成功！")
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<style scoped>
.item label {
    top: 17px;
}

.loginBox {
    position: relative;
    top: 10.5%;
    width: 400px;
    height: 360px;
    background-color: #f9fdff;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 2px 12px 20px 0 rgba(19, 63, 157, 0.576);
    padding: 38px;
    box-sizing: border-box;
    color: #032564;
}

.register {
    margin-top: 18px;
    text-align: center;
    font-size: 12px;

}

.btn {
    margin-top: 12px;
}
</style>