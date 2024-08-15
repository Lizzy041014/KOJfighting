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
      <div class="line"></div>
      <div class="sidebar" :class="{ 'show': showSidebar }">
        <div class="one">
          <span class="touxiang"><a-avatar trigger-type="mask">
              <img alt="avatar"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
              <template #trigger-icon>
                <IconEdit />
              </template>
            </a-avatar></span>
          <span class="username">{{ userStore.username }}</span>
          <span class="close" @click="hideSidebar">×</span>
          <a-divider :size="3" style="border-bottom-style: dotted" />
        </div>
        <div class="two">
          <form @submit.prevent="handleSubmit">
            <div class="editPersonalone"> <icon-user-group />&nbsp; 性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label><input type="radio" name="gender" value="female" v-model="gender"> <icon-woman />
                女</label>&nbsp;&nbsp;&nbsp;&nbsp;
              <label><input type="radio" name="gender" value="male" v-model="gender"> <icon-man />
                男</label>
            </div>
            <div>
              <icon-qq-circle-fill />&nbsp; 添加QQ
              <input type="text" v-model="qq" class="ainput" v-show="isInputVisibleqq" placeholder="请输入您的QQ">
              </input>
              <icon-edit @click="showinput('qq')" class="editPersonaltwo" />
            </div>
            <div>
              <icon-user />&nbsp; 修改名字<input type="text" v-model="username" class="ainput" placeholder="请输入新的用户名"
                v-show="isInputVisibleusername">
              </input><icon-edit @click="showinput('username')" class="editPersonaltwo" />
            </div>
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
    <div class="question">
      <div class="smallfix"></div>
      <div class="list-head">
        <div>
          <div class="listtag">
            <div class="listtag-title">问题列表</div>
            <div class="listtag-muted">List Of Questions</div>
          </div>
        </div>
        <div class="question">
          <!-- 。。。。。。 -->
        </div>
      </div>
      <div>
        <div>
          <table class="table index-list">
            <thead>
              <tr>
                <th></th>
                <th><a href="#">题号</a></th>
                <th><a href="#">标题</a></th>
                <th><a href="#">标签</a></th>
                <th><a href="#">难度</a></th>
                <th><a href="#">正确</a></th>
              </tr>
            </thead>
            <tbody class="tbody">
              <tr>
                <td></td>
                <td><a href="#" target="_blank">001</a></td>
                <td><a href="#" target=" _blank">编程求解1+2+3+...+n</a></td>
                <td><span class="problem-list-tags"><a href="#"><span class="label label-warning">简单循环</span></a></span>
                </td>
                <td><span class="label label-success">入门</span></td>
                <td style="text-align:center;vertical-align: middle;"><a href="#">880</a></td>
              </tr>
              <tr>
                <td></td>
                <td><a href="#" target=" _blank">002</a></td>
                <td><a href="#" target="_blank">编程求1+3+5+...+n</a></td>
                <td><span class="problem-list-tags"><a href="#"><span class="label label-info">简单循环</span></a></span>
                </td>
                <td><span class="label label-success">入门</span></td>
                <td style="text-align:center;vertical-align: middle;"><a href="#">661</a></td>
              </tr>
            </tbody>
          </table>
          <ul class="page">
            <li><span>«</span></li>
            <li class="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">6</a></li>
            <li class="next"><a href="#">»</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="panel">
      <div>
        <div class="panel-heading">标签</div>
        <div class="panel-body">
          <ul class="tag-group">
            <li class="taggroup-item-index"><a href="#">字符串</a>
            </li>
            <li class="taggroup-item-index"><a href="#">结构体</a>
            </li>
            <li class="taggroup-item-index"><a href="#">循环</a>
            </li>
            <li class="taggroup-item-index"><a href="#">数组问题</a>
            </li>
            <li class="taggroup-item-index"><a href="#">链表</a>
            </li>
            <li class="taggroup-item-index"><a href="#">指针</a>
            </li>
            <li class="taggroup-item-index"><a href="#">字符串</a>
            </li>
            <li class="taggroup-item-index"><a href="#">结构体</a>
            </li>
            <li class="taggroup-item-index"><a href="#">循环</a>
            </li>
            <li class="taggroup-item-index"><a href="#">数组问题</a>
            </li>
            <li class="taggroup-item-index"><a href="#">链表</a>
            </li>
            <li class="taggroup-item-index"><a href="#">指针</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import kexielogo from '@/assets/img/kexielogo.png'
import sousuo from '@/assets/img/搜索.png'
import { IconEdit } from '@arco-design/web-vue/es/icon';
import axios from "axios";
import { useUserStore } from '@/stores/userStore';
import router from "@/router";
import { ElMessage } from 'element-plus';
const userStore = useUserStore();
let showSidebar = ref(false);
let showOverlay = ref(false);
let showSearch = ref(false);
let searchText = ref('');
let username = ref('');
let qq = ref('');
let password = ref('');
let gender = ref('male');
let isInputVisibleusername = ref(false)
let isInputVisibleqq = ref(false)
let isInputVisiblepassword = ref(false)
let uPattern: RegExp = /^[\u4e00-\u9fa5a-zA-Z0-9]{3,12}$/;
// //至少1个字母(?=.*[A-Za-z])至少1个特殊字符(?=.*[$@$!%*#?&])
let pPattern: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,20}$/
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
  userStore.logout();
  router.push({
    path: "/login",
    replace: true,
  });
}
function logout() {
  userStore.logout();
  router.push({
    path: "/userhome",
  });
  location.reload();
}
function matchPattern(Pattern: RegExp, str: string) {
  return Pattern.test(str);
}
let handleSubmit = async (event: { preventDefault: () => void; }) => {
  event.preventDefault();
  let _username = username.value.trim();
  let _password = password.value;
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
  let data = {
    nickname: _username,
    password: _password,
    qq:qq.value,
    gender:gender.value,
    // avarta:''
  };
  try {
    let response = await axios.post('/api/user/update', data);
    // 直接传递对象，不需要 JSON.stringify  
    console.log(response.data);
    if (response.data.code != 200) {
      ElMessage.error(response.data.message)
    }
    else {
      ElMessage.success("恭喜uu修改信息成功，请重新登录")
      userStore.setUsername(username.value);
      userStore.setPassword(password.value);
    }
  } catch (error) {
    console.error(error);
  }
};
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
  // 在这里可以访问到 userStore 中的 username
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    userStore.setUsername(savedUsername);
  }
});

</script>
<style>
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
  color:#052070;
  padding-left:6px ;
}
.two form div:nth-child(2)>input {
  margin-left: 6px;
}

.two form div:nth-child(3)>input {
  margin-left:5px;
}

.xiugai-button {
  margin-top: 25px;
  margin-bottom: 12px;
  height: 30px;
  width: 80px;
  background-color: #ffffff;
  position: relative;
  left: 119px;
  border-radius: 4px;
  letter-spacing: 1px;
  box-shadow: 0px 0px 1px 1px rgba(9, 26, 121, 0.278);
  color: rgb(5, 32, 112);
  font-size: 15px;
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
  margin-left: 95px;
  margin-top: 8px;
  margin-bottom: 3px;
  width: 5%;
  height: 45px;
}

.title {
  left: 135px;
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
  margin-left: 60px;
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
  /* 设置为1，表示盒子会根据剩余空间自动调整宽度 */
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
  color: #2a477e;
}

.searchBar img {
  transform: translate(2.5%, -58%);
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

.taggroup-item-index {
  display: inline-block;
  margin-right: 3px;
  margin-bottom: 5px;
  padding: 5px 7px;
  border-radius: 2px;
  font-size: 12px;
  text-decoration: none;
  white-space: nowrap;
  transition-timing-function: ease;
  transition-duration: 0.2s;
  transition-property: background-color;
  color: #757575;
  background-color: #e9ecf9;
}

.tag-group {
  padding: 0;
}

.tag-group li {
  margin-top: 5px;
  margin-left: 5px;
}

.tag-group ul {
  display: block;
  padding-left: 30px;
}

.tag-group ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.page li {
  line-height: 1.5;
}

.panel-body {
  padding: 15px;
}

.panel-heading {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  color: #333;
  background-color: rgba(223, 231, 240);
  border-color: #ddd;
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel {
  width: 22vw;
  position: absolute;
  right: 6%;
  top: 113px;
  background-color: #fefefe;
  border: 1px solid #bbc9d4;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.question {
  width: 61vw;
  margin-left: 6%;
  margin-top: 40px;
  padding: 20px;
}

.tbody {
  background-color: #fff;
}

.list-head {
  background-color: #dfe7f0;
  color: rgb(27, 71, 125);
  padding: 15px 0;
}

.index-list th {
  background-color: #dfe7f0;
  color: white;
}

.listtag-title {
  font-size: 24px;
  font-weight: bold;
}

.listtag-muted {
  font-size: 14px;
}

.page {
  /* display: inline-block; */
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}

.page li {
  display: flex;
  margin-left: 10px;
  float: left;
}

.page li a {
  color: #134c89;
  padding: 8px 16px;
  border: 1px solid #134c89;
  border-radius: 5px;
}

.page li.active a {
  background-color: #134c89;
  color: white;
}

.index-list {
  width: 100%;
  border-collapse: collapse;
}

.index-list th,
.index-list td {
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: left;
}



.problem-list-tags a {
  /* background-color: #e9ecef; */
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
}



.index-list,
.table-top-border {
  border-top: 2px solid #134c89;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}

table {
  background-color: transparent;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
}

.label-warning {
  border: 1px solid #D26719;
  color: #D26719;
  background-color: #FEEACC;
}

.label {
  font-weight: normal;
  padding: 0.3em 0.6em 0.3em 0.6em;
  border: 1px;
  font-size: 12px;
  border-radius: 5px;
}

.label-success {
  border: 1px solid #3EA86F;
  color: #3EA86F;
  background-color: #E0F7D7;
}

.label-info {
  border: 1px solid #e5c8ec;
  color: #6e3781;
  background-color: #f0cff0;
  border-radius: 5px;
}

@media screen and (max-width: 708px) {
  .tag li p {
    font-size: 13px;
    letter-spacing: 1px;
  }

  .tag {
    left: 128px;
  }

  .kexielogo {
    display: flex;
    margin-left: 60px;
  }

  .title {
    font-size: 16px;
    margin-left: -25px;
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
