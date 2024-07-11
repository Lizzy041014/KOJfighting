<template>
    <div class="big">
        <div class="pictrueBox">
            <div class="pulse1"></div>
            <div class="pulse2"></div>
        </div>
        <div class="registerBox">
            <h2>REGISTER</h2>
            <form action="">
                <div class="item">
                    <input type="text" required v-model="username">
                    <label for="">Username</label>
                </div>
                <div class="item">
                    <input type="password" required v-model="password">
                    <label for="">Password</label>
                </div>
                <div class="item">
                    <input type="text" required v-model="email">
                    <label for="">Email</label>
                </div>
                <button @click="showMessage" class="btn">submit
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

<script setup name="KojRegister">
import { ElMessage } from 'element-plus';
import { RouterLink, RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter();
function showMessage(){
    ElMessage({
        type:"success",
        message:'恭喜uu注册成功，请前往登录页面登陆吧~~'
    })
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.pictrueBox {
    position: relative;
    top: 5%;
    margin: 0 auto;
    height: 145px;
    width: 145px;
    border-radius: 75px;
    background-image: url('../assets/kexielogo.png');
    background-repeat: no-repeat;
    background-size: 188px 188px;
    background-position: center;

}

/* 属性选择器 */
.pictrueBox div[class^=pulse] {
    /* 保证我们的发光盒子里面水平垂直居中，放大之后就会向四周发散 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 139px;
    width: 139px;
    border-radius: 75px;
    box-shadow: 0px 0px 20px 1px rgba(9, 43, 117, 0.898);
    animation: faguang 2s ease 0s infinite normal none running;
}

@keyframes faguang {
    70% {
        width: 144px;
        height: 144px;
        opacity: 1;
    }
}
.big {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#c8ddf1, #fbfeff);
    /* background-color: #ffffff; */
}

a {
    text-decoration: none;
    color: #032564;
}

input,
button {
    background: transparent;
    border: 0;
    outline: none;
}

body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #ffffff;
}

.registerBox {
    position: relative;
    top: 8.5%;
    width: 400px;
    height: 422px;
    background-color: #f9fdff;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 2px 8px 18px 0 rgba(10, 51, 139, 0.488);
    padding: 38px;
    box-sizing: border-box;
    color: #032564;
}

h2 {
    text-align: center;
    font-size: 38px;
    color: rgb(0, 54, 102);
    margin-bottom: 22px;
    margin-top: -8px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.item {
    height: 38px;
    border-bottom: 1px solid #052f76;
    margin-bottom: 40px;
    position: relative;
}

.item input {
    width: 100%;
    height: 100%;
    color: #0a3164;
    padding-top: 20px;
    font-size: 16px;
    box-sizing: border-box;
}

/* input在触发焦点时更改样式
+号是相邻兄弟选择器
为的是去找与input相邻的兄弟label
*/
/* valid选择器是判断input框是否合法，如果合法会执行下面的代码属性
不合法就不会执行，我们刚开始写布局的时候给input框写了required 我们删掉看对比
当没有required的话 input框的值就会被认为一直合法，所以一直都是下方的样式
但是密码不会，密码框的值为空，那么这句话就不合法，required不能为空 当我们给密码框写点东西的时候才会执行以下代码 ———————————————— 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
*/
.item input:focus+label,
.item input:valid+label {
    top: 0px;
    font-size: 13px;
}

.item label {
    position: absolute;
    font-size: 17px;
    left: 0;
    top: 3px;
    transition: all 0.5s linear;
}
.login{
        margin-top: 22px;
        text-align: center;
        font-size: 12px;
        color: #032564;
}
.btn {
    text-align: center;
    padding: 10px 20px;
    /* margin-top: 2px; */
    font-size: 18px;
    font-weight: 600;
    color: rgb(12, 74, 128);
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 2px;
    left: 35%;
}

.btn:hover {
    border-radius: 3px;
    color: #ffffff;
    background: #144e84;
    box-shadow: 0 0 5px 0 #3c7689,
        0 0 20px 0 #43788a,
        0 0 45px 0 #538da1,
        0 0 90px 0 #356576;
    transition: all .5s linear;
}

.btn>span {
    position: absolute;
}

.btn>span:nth-child(1) {
    width: 100%;
    height: 2px;
    background: -webkit-linear-gradient(left, transparent, rgb(0, 63, 118));
    left: -100%;
    top: 0px;
    animation: line1 1.25s linear infinite;
}

@keyframes line1 {

    50%,
    100% {
        left: 100%;
    }
}

.btn>span:nth-child(2) {
    width: 2px;
    height: 100%;
    background: -webkit-linear-gradient(top, transparent, rgb(0, 63, 118));
    right: 0px;
    top: -100%;
    animation: line2 1.25s 0.5s linear infinite;
}

@keyframes line2 {

    50%,
    100% {
        top: 100%;
    }
}

.btn>span:nth-child(3) {
    width: 100%;
    height: 2px;
    background: -webkit-linear-gradient(left, rgb(0, 63, 118), transparent);
    left: 100%;
    bottom: 0px;
    animation: line3 1.25s 1s linear infinite;
}

@keyframes line3 {

    50%,
    100% {
        left: -100%;
    }
}

.btn>span:nth-child(4) {
    width: 2px;
    height: 100%;
    background: -webkit-linear-gradient(top, transparent, rgb(0, 63, 118));
    left: 0px;
    top: 100%;
    animation: line4 1.25s 1.25s linear infinite;
}

@keyframes line4 {

    50%,
    100% {
        top: -100%;
    }
}
</style>