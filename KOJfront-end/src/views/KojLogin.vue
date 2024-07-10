<template>
    <div class="big">
        <div class="loginBox">
            <h2>LOGIN</h2>
            <form action="">
                <div class="item">
                    <input type="text" required>
                    <label for="">Username</label>
                </div>
                <div class="item">
                    <input type="password" required>
                    <label for="">Password</label>
                </div>
                <button class="btn">submit
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts" name="KojLogin">

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.big{
width: 100vw;
height: 100vh;
background: linear-gradient(#c1d9f3,#f8fdff );
/* background-color: #ffffff; */
}
a {
    text-decoration: none;
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

.loginBox {
    position: relative;
    top: 17%;
    width: 400px;
    height: 360px;
    background-color: #f1f2f3;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 2px 12px 20px 0 rgba(10, 51, 139, 0.387);
    padding: 40px;
    box-sizing: border-box;
    color: #032564;
}

h2 {
    text-align: center;
    font-size: 38px;
    color: rgb(0, 54, 102);
    margin-bottom: 30px;
    font-family: 'Courier New', Courier, monospace;
}

.item {
    height: 45px;
    border-bottom: 1px solid #052f76;
    margin-bottom: 40px;
    position: relative;
}

.item input {
    width: 100%;
    height: 100%;
    color: #0a346b;
    padding-top: 20px;
    font-size: 16px;
    box-sizing: border-box;
}

.item input:focus+label,
.item input:valid+label {
    top: 0px;
    font-size: 11px;
}

.item label {
    position: absolute;
    left: 0;
    top: 12px;
    transition: all 0.5s linear;
}

.btn {
    text-align: center;
    padding: 10px 20px;
    margin-top: 8px;
    font-size: 15px;
    color: rgb(2, 56, 104);
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
    height: 1.5px;
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
    width: 1.5px;
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
    height: 1.5px;
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
    width: 1.5px;
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