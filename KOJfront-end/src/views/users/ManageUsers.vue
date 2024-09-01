<template>
    <div class="home">
        <ManagerNav />
        <a-space direction="vertical" size="large" class="usesearch">
            <a-input-search :style="{ width: '320px' }" placeholder="请输入想要搜索的用户名" search-button v-model="searchname"
                @click="fetchUsers" />
        </a-space>
        <div>
            <a-list v-if="users.length > 0">
                <a-list-item v-for="user in users" :key="user.userId">
                    <a-list-item-meta :title="`${user.nickname}`" :description="`${user.email}  ${user.roleDescribe} `">
                        <template #avatar>
                            <icon-user />
                        </template>
                    </a-list-item-meta>
                    <template #actions>
                        <a-input :style="{ width: '230px' }" placeholder="修改该用户的密码" allow-clear class="changepwd"
                            v-show="showInputForUser(user.userId)" />
                        <icon-edit @click="toggleInputForUser(user.userId)" />
                        <icon-delete @click="deleteUser()" />
                        <a-switch checked-color="#f45e5e" unchecked-color="#2e69fd" checked-value="0"
                            unchecked-value="1" v-model="user.switchValue" @click="changeUserStatus(user.userId)" />
                    </template>
                </a-list-item>
            </a-list>
            <div v-else>正在加载用户数据...</div>
        </div>
        <a-space direction="vertical" size="large">
            <a-pagination :total="totalUsers" show-total show-jumper show-page-size />
        </a-space>
        <BasicFooter />
    </div>
</template>
<script setup lang="ts" name="ManageUsers">
import { ref, onMounted} from "vue";
import axios from 'axios';
import { ElMessage } from 'element-plus';
interface User {
    userId: string;
    studentId: string | null;
    username: string | null;
    nickname: string;
    avatar: string | null;
    gender: string | null;
    specialty: string | null;
    email: string;
    blogAddress: string | null;
    githubAddress: string | null;
    roleName: string;
    roleDescribe: string;
    createTime: string;
    switchValue: number;
}
interface DataResponse {
    pageNumber: number;
    pageSize: number;
    records: User[];
    totalPage: number;
    totalRow: number;
}
let token = localStorage.getItem('tokenmanager');
let headers = {
    Authorization: token
};
let users = ref<User[]>([]);
let totalUsers = ref(0);
let showInputForUserMap = ref<Record<string, boolean>>({});
let searchname=ref('')
let fetchUsers = async () => {
    let data = {
        "search": searchname.value,
        "pageNo": 1,
        "pageSize": 10
    }
    try {
        let response = await axios({
            method: 'POST',
            url: '/api/admin/gets',
            headers,
            data
        })
        const backendData = response.data.data as DataResponse;
        backendData.records.forEach(user => user.switchValue = 1);
        users.value = backendData.records;
        totalUsers.value = backendData.totalRow;
    } catch (error) {
        console.error(error);
    }
};

onMounted(fetchUsers);

function changeUserPwd(userId: any) {
    // 实现修改用户密码的逻辑
    
}
function deleteUser(){}
let changeUserStatus = async (userId:any) => {
    try {
        let response =await axios({
            method: 'PUT',
            url: `/api/admin/status/${userId}?action=${users.value.find((user) => user.userId === userId)?.switchValue}`,
            headers,
        })
if(response.data.code===200){
        ElMessage.warning('修改用户状态成功')
}
    } catch (error) {
        console.error(error);
    };
}
function toggleInputForUser(userId: string) {
    showInputForUserMap.value[userId] = !showInputForUserMap.value[userId];
}
function showInputForUser(userId: string) {
    return showInputForUserMap.value[userId] || false;
}
</script>
<style scoped>
.changepwd{
    padding-top:0px!important;
    padding-bottom:0px!important;
}
.nickname{
    color: black;
}
.usesearch{
 position: relative;
 left: 3%;
}
.footer{
    bottom: 0;
}
.arco-list-item-action {
    margin-right: 20px!important;
    padding: 5px!important;
    margin:6px!important;
}
 .arco-list-item-meta {
     padding: 5px 10px;
 }
.arco-space-vertical{
    margin-left: 36%;
    margin-top: 2%;
    margin-bottom: 3%;
}
.demo-arrow {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    padding: 10px;
    width: 200px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
}
 .arco-list-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90vw;
    margin-left: 5%;
    margin-top: -16px;
 }
 .arco-list-medium .arco-list-content-wrapper .arco-list-content>.arco-list-item{
    width: 82vw;
    padding: 15px 20px
 }
 .arco-list-item-action{
    margin: 50px!important;
 }
 .arco-list-item-action>li:not(:last-child) {
     margin-right: 190px!important;
 }
</style>