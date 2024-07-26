<template>
  <div class="home">
    <header class="header">
      <div class="kexielogo"><img :src="kexielogo"></div>
      <div class="title">KexieOJ</div>
      <ul class="tag">
        <li>
          <p href="#">习题</p>
        </li>
        <li>
          <p href="#">考试</p>
        </li>
        <li></li>
      </ul>
      <div>
        <div class="figure" v-if="localStorageData !== ''">
          <div>
            <a-avatar trigger-type="mask" @click="showPersonMessage">
              <img alt="avatar"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
              <template #trigger-icon>
                <IconEdit />
              </template>
            </a-avatar><span class="nickname">{{ localStorageData }}</span>
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
      <div class="line"></div>
      <div class="sidebar" v-if="showSidebar">
        <div class="one">
          <span class="touxiang"><a-avatar trigger-type="mask">
              <img alt="avatar"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
              <template #trigger-icon>
                <IconEdit />
              </template>
            </a-avatar></span>
          <span class="username">{{ localStorageData }}</span>
          <span class="close" @click="hideSidebar">×</span>
          <a-divider :size="3.5" style="border-bottom-style: dotted" />
        </div>
        <div class="two">
          <div class="">用户名：</div>
          <div class="">性别：</div>
          <div class="">QQ：</div>
          <div class="">修改密码</div>
          <a-divider :size="3.5" style="border-bottom-style: dotted" />
        </div>
        <div class="two">
          <div class="">切换账号</div>
          <div class="">退出登录</div>
        </div>
      </div>
      <div class="overlay" v-if="showOverlay"></div>
    </header>
    <!-- <MdEditor :value="value" :handle-change="onChange" />
    <CodeEditor :value="Codevalue" :handle-change="onCodeChange" /> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import kexielogo from '@/assets/img/kexielogo.png'
import sousuo from '@/assets/img/搜索.png'
import { IconEdit } from '@arco-design/web-vue/es/icon';
let showSidebar = ref(false);
let showOverlay = ref(false);
let showSearch = ref(false); 
let searchText = ref('');
let localStorageData = ref('');
if (typeof window !== 'undefined' && window.localStorage) {
  localStorageData.value = localStorage.getItem('nickname') || '';
}
function toggleSearch() {
  showSearch.value = !showSearch.value;
}
function clearInput() {
  searchText.value = '';
}
function showPersonMessage() {
  showSidebar.value = true;
  showOverlay.value = true;
}

function hideSidebar() {
  showSidebar.value = false;
  showOverlay.value = false;
}
// import MdEditor from "@/components/MdEditor.vue";
// import CodeEditor from '@/components/CodeEditor.vue'
// const value = ref();

// const onChange = (v: string) => {
//   value.value = v;
// };
// const Codevalue = ref();

// const onCodeChange = (v: string) => {
//   Codevalue.value = v;
// }
</script>
<style>
/* .bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
} */
* {
  margin: 0;
  padding: 0;
}
.home {
  cursor: pointer;
  width: 100vw;
  height: 100vh;
}
.header {
  font-family: "微软雅黑";
  width: 100%;
  height: 50px;
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
  width: 14%;
}

.kexielogo {
  display: flex;
  margin-left: 85px;
  margin-top: 8px;
  margin-bottom: 3px;
  width: 5%;
  height: 45px;
}

.title {
  left: 127px;
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
  /*弹性布局，使li排成一行*/
  top: 0px;
  left: 190px;
  line-height: 60px;
  position: absolute;
  color: rgb(46, 46, 142);
  font-size: 17px;
  font-weight: 500;
}

.tag li:first-child {
  margin-left: 50px;
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
  /* 这里设置为1，表示盒子会根据剩余空间自动调整宽度 */
}

.tag li p {
  position: relative;
  display: block;
  text-decoration: none;
}

.tag li:hover {
  font-weight: 700;
}

.tag li p:before {
  /*这里添加上边框*/
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
  background: rgb(228, 229, 232);
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
  margin: 0 4px;
  color: rgb(58, 58, 58);
}
.link:hover{
  color:rgb(98, 143, 226);
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
  right: 10px;
  box-shadow: 0 0 6px cornflowerblue;
  border-radius: 25px;
  position: relative;
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
  left: 5px;
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
  color: #838383;
}

.searchBar img {
  transform: translate(2.5%, -58%);
}
.sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: white;
  z-index: 100;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 97.3vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: block;
}

.overlay.show {
  display: block;
}

.sidebar span {
  display: inline-block;
}

.touxiang {
  height: 30px;
  margin-top: 10px;
  margin-left: 10px;
}

.username {
  font-size: 17px;
  margin-bottom: 5px;
  width: 70%;
  margin-left: 10px;
}

.close {
  width: 5%;
  font-size: 22px;
}

.two div {
  margin-left: 20px;
  margin-top: 30px;
  height: 30px;
  font-size: 16px;
}

.nickname {
  margin-left: 8px;
  font-size: 15px;
}
 @media screen and (max-width: 708px) {
   .tag li p {
     font-size: 13px;
     letter-spacing: 1px;
   }
  .tag{
   left: 128px;
  }
  .kexielogo{
    display: flex;
    margin-left: 60px;
  }
   .title {
     font-size: 16px;
      margin-left: -25px;
   }
  .tag li{
  margin-left: -7px;
}
.right{
  font-size: 12px;
  right: 4.5%;
}
 }
</style>
