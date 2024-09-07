<template>
  <div class="home">
    <UserNav />
    <UserMainBanner />
    <BasicFooter />
  </div>
</template>
<script setup lang="ts">
import UserMainBanner from "@/components/UserMainBanner.vue";
import BasicFooter from "@/components/BasicFooter.vue";
import UserNav from "@/components/UserNav.vue";
</script>
<style>
.footer{
  position: relative;
  display: flex;
    bottom: -30%;
    left: 0;
    right: 0;
}
.editPersonaltwo {
  position: absolute;
  right: 2px;
}
.ainput {
  height: 20px;
  font-size: 14px;
  width: 169px;
  background-color: #e6edf4;
  border-radius: 3px;
  color: #052070;
  padding-left: 6px;
}
.two form div:nth-child(2)>input {
  margin-left: 6px;
}
.two form div:nth-child(3)>input {
  margin-left: 5px;
}
.xiugai-button {
  margin-top: 12px;
  height: 28px;
  width: 70px;
  background-color: #ffffff;
  position: relative;
  left: 125px;
  border-radius: 4px;
  letter-spacing: 1px;
  box-shadow: 0px 0px 1px 1px rgba(9, 26, 121, 0.278);
  color: rgb(5, 32, 112);
  font-size: 14px;
}
.xiugai-button:hover {
  transition: box-shadow .4s;
  box-shadow: 2px 1.5px 3px 2px rgba(13, 30, 128, 0.328);
}
.input {
  margin-top: 10px;
}
.input input {
  margin-left: 10px;
  height: 25px;
}
.input label {
  margin-left: 10px;
}
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #fcfcfc;
}
.home {
  cursor: pointer;
  width: 100vw;
  height: 100vh;
}
.header {
  font-family: "微软雅黑";
  width: 100%;
  height: 48px;
  color: rgb(5, 32, 112);
}
.line {
  height: 1px;
  margin: 0 75px;
  background-color: rgba(159, 164, 174, 0.954);
}
.figure {
  position: absolute;
  top: 6px;
  right: 0px;
  height: 100%;
  width: 15%;
}
.kexielogo {
  display: flex;
  margin-left: 110px;
  margin-top: 8px;
  margin-bottom: 3px;
  width: 5%;
  height: 45px;
}

.title {
  left: 155px;
  top: 0px;
  line-height: 55px;
  position: absolute;
  font-weight: 700;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
}
li {
  list-style: none;
}
.tag {
  display: flex;
  width: 30%;
  top: 0px;
  left: 190px;
  line-height: 60px;
  position: absolute;
  color: rgb(46, 46, 142);
  font-size: 17px;
  font-weight: 500;
}
.tag li:first-child {
  margin-left: 80px;
}
.tag li {
  display: flex;
  margin-left: 5px;
  margin-top: 5px;
  height: 43px;
  line-height: 43px;
  text-align: center;
  letter-spacing: 5px;
  display: block;
  flex-grow: 1;
}
.tag li p {
  width: 11vw;
  position: relative;
  display: block;
  text-decoration: none;
}
.tag li:hover {
  font-weight: 700;
}
.tag li p:before {
  /*添加上边框*/
  content: '';
  position: absolute;
  top: -3px;
  left: 1px;
  width: 98%;
  height: 100%;
  border-top: 1.8px solid rgba(86, 107, 125, 0.744);
  transform: scaleY(2);
  /*将边框沿Y轴拉伸两倍高度，初始状态下边框不可见*/
  transition: 0.5s;
  z-index: -1;
  /* 其实是由有两条线的，将伪元素放置在父元素的背景下面，确保文本在伪元素上面 */
}
.tag li p:hover:before {
  transform: scaleY(1);
  opacity: 1;
}
.tag li p:after {
  content: '';
  position: absolute;
  /* 设置相对于父元素的偏移量，使得背景色覆盖整个元素。 */
  top: 1px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(237, 240, 242);
  transform: scale(0);
  transition: 0.5s;
  z-index: -1;
  border-radius: 5px;
}
.tag li p:hover:after {
  transform: scale(1);
}
.right {
  top: -4px;
  right: 6%;
  line-height: 60px;
  font-size: 14px;
  position: absolute;
  display: flex;
  align-items: center;
}
.right div {
  float: right;
  margin-right: 15px;
  color: rgb(58, 58, 58);
}

.link:hover {
  color: rgb(98, 143, 226);
}

.input {
  display: flex;
  position: relative;
  align-items: center;
  margin-top: 4px;
}

.input input {
  background-color: rgba(215, 215, 215, 0.546);
  margin-right: 5px;
  height: 30px;
  border-radius: 7px;
  width: 200px;
}

.right button:hover {
  background-color: rgba(215, 215, 215, 0.546);
  border-radius: 5px;
  margin-top: 0px;
  transition: .6s;
  width: 20px;
  height: 20px;
}
.searchBar {
  width: 28px;
  height: 28px;
  right: 16%;
  top: 13px;
  box-shadow: 0 0 6px cornflowerblue;
  border-radius: 25px;
  position: absolute;
  overflow: hidden;
  transition: .7s;
}
.changeWidth {
  width: 230px;
}
.textInput {
  width: 86%;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 25px;
}
.textInput input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 17px;
  color: #585858;
}
.clear {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 3%;
  top: 48%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #2a477e;
}
.searchBar img {
  transform: translate(20%, 16%);
}
.sidebar {
  position: fixed;
  top: 0;
  right: -310px;
  width: 310px;
  height: 100vh;
  background-color: white;
  z-index: 100;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  transition: right .5s ease;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 97.3vh;
  background-color: rgba(0, 0, 0, 0.379);
  z-index: 99;
  display: block;
  transition: opacity .3s ease;
}
.sidebar.show {
  right: 0;
}
.overlay.show {
  display: block;
  opacity: 0.5;

}
.sidebar span {
  display: inline-block;
}
.one{
  height: 40px;
}
.touxiang {
  position: relative;
  height: 30px;
  margin:10px 10px;
  width: 10%;
}
.username {
  position: relative;
  font-size: 17px;
  margin-top: -28px;
  width: 70%;
  margin-left: 65px;
}
.close {
  position: relative;
  width: 5%;
  font-size: 22px;
  margin-left: 280px;
  top: -22px;
}
.two div {
  margin-left: 15px;
  margin-top: 30px;
  height: 25px;
  font-size: 15px;
}
.nickname {
  margin-left: 8px;
  font-size: 15px;
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
    margin-left: 65px;
  }
 .title{
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
