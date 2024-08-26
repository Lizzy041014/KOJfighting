<template>
  <div class="home">
    <header class="header">
      <div class="kexielogo"><img alt="kexielogo" :src="kexielogo"></div>
      <div class="title">KexieOJ</div>
      <ul class="tag">
        <li>
          <p href="#"><icon-highlight />&nbsp;习题</p>
        </li>
        <li>
          <p href="#"><icon-book />&nbsp;考试</p>
        </li>
        <li></li>
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
    <MainBanner />
    <BasicFooter/>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeMount} from "vue";
import kexielogo from '@/assets/img/kexielogo.png'
import sousuo from '@/assets/img/搜索.png'
import { IconEdit } from '@arco-design/web-vue/es/icon';
import axios from "axios";
import { useUserStore } from '@/stores/userStore';
import router from "@/router";
import { ElMessage } from 'element-plus';
import MainBanner from "@/components/MainBanner.vue";
import { log } from "console";
import BasicFooter from "@/components/BasicFooter.vue";
const userStore = useUserStore();
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
const file = ref();
const triggerFileUpload = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files![0];
    const reader = new FileReader();
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
      url: '/api/user/changePassword',
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
    }}catch(error) {
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
  let data = { };
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
    else if (response.data.code === 200){
      ElMessage.success("修改信息成功！")
      if (file.value.url!==''){
        userStore.setAvartaUrl(file.value.url);
      }
      if (username.value!==''){
        userStore.setUsername(username.value);
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
  const savedAvatarUrl = localStorage.getItem('selectedAvatar');
  if (savedAvatarUrl) {
    selectedAvatar.value = savedAvatarUrl;
  }
  if (savedAvatarUrl && savedAvatarUrl !== '') {
    file.value = { url: savedAvatarUrl };
  }
  // if (!token) {
  //   setTimeout(() => {
  //     router.push('/login');
  //     ElMessage.warning('请uu先登录！')
  //   }, 5000); 
  // }
});
onBeforeMount(()=>{
  const savedGender= localStorage.getItem('gender');
  gender.value = savedGender||''
})
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
  right: 14%;
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
