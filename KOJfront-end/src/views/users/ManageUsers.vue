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
                    <template v-if="isNormalUser(user.roleDescribe)" #actions>
                        <a-input v-if="showInputForUser(user.userId)" :style="{ width: '230px' }" placeholder="修改该用户的密码"
                            allow-clear class="changepwd" v-model="newPasswordForUser[user.userId]"
                            @keyup.enter="changeUserPwd(user.userId)" />
                        <icon-edit @click="toggleInputForUser(user.userId)" />
                        <icon-delete />
                        <a-switch unchecked-color="#f45e5e" checked-color="#2e69fd" 
                            v-if="user.switchValue===0" v-model="user.switchValue"
                            @click="changeUserStatus(user.userId)">
                            <template #checked>
                                ON
                            </template>
                            <template #unchecked>
                                OFF
                            </template>
                        </a-switch>
                        <a-switch checked-color="#f45e5e" unchecked-color="#2e69fd" checked-value="0" v-else
                            unchecked-value="1" v-model="user.switchValue" @click="changeUserStatus(user.userId)">
                            <template #checked>
                                OFF
                            </template>
                            <template #unchecked>
                                ON
                            </template>
                        </a-switch>
                    </template>
                    <template v-else #actions>
                        <div>管理员无法修改此用户的密码和状态</div>
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
import { ref, onMounted } from "vue";
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
    switchColorChecked: string;
    switchColorUnchecked: string;
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
let searchname = ref('')
let newPasswordForUser = ref<Record<string, string>>({});
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
        console.log(response);  
        let backendData = response.data.data as DataResponse;
        backendData.records.forEach((user) => {
            let storedValue = localStorage.getItem(`userSwitchValue_${user.userId}`);
            user.switchValue = storedValue ? Number(storedValue) : 0;
            user.switchColorChecked = "#f45e5e";
            user.switchColorUnchecked = "#2e69fd";
            console.log(user.switchColorChecked);
        });
        users.value = backendData.records;
        totalUsers.value = backendData.totalRow;
    } catch (error) {
        console.error(error);
    }
};
onMounted(fetchUsers);
function changeUserPwd(userId: any) {
    let newPassword = newPasswordForUser.value[userId];
    if (newPassword) {
        let data = {
            userId: userId,
            password: newPassword,
        };
        axios
            .put('/api/admin/pwd', data, { headers })
            .then((response) => {
                if (response.data.code === 200) {
                    ElMessage.success("密码修改成功");
                    newPasswordForUser.value[userId] = "";
                    showInputForUserMap.value[userId] = false;
                } else {
                    console.log(response);
                    ElMessage.error("密码修改失败");
                }
            })
            .catch((error) => {
                console.error(error);
                ElMessage.error("密码修改失败");
            });
    }
}
let changeUserStatus = async (userId: any) => {
    let user = users.value.find((u) => u.userId === userId);
    if (user) {
        try {
            let response = await axios({
                method: 'PUT',
                url: `/api/admin/status/${userId}?action=${users.value.find((user) => user.userId === userId)?.switchValue}`,
                headers,
            })
            if (response.data.code === 200) {
                localStorage.setItem(`userSwitchValue_${userId}`, user.switchValue.toString());
                ElMessage.warning('修改用户状态成功')
                console.log(user.switchValue);
                if (user.switchValue===1){
                    user.switchColorChecked = "#2e69fd";
                } 
            }
        } catch (error) {
            console.error(error);
        };
}
}
function toggleInputForUser(userId: string) {
    showInputForUserMap.value[userId] = !showInputForUserMap.value[userId];
}
function showInputForUser(userId: string) {
    return showInputForUserMap.value[userId] || false;
}
function isNormalUser(roleDescribe: string) {
    return roleDescribe === "普通用户";
}
</script>
<style scoped>
.changepwd {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
}

.nickname {
    color: black;
}

.usesearch {
    position: relative;
    left: 3%;
}

.footer {
    bottom: 0;
}

.arco-list-item-action {
    margin-right: 20px !important;
    padding: 5px !important;
    margin: 6px !important;
}

.arco-list-item-meta {
    padding: 5px 10px;
}

.arco-space-vertical {
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

.arco-list-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90vw;
    margin-left: 5%;
    margin-top: -16px;
}

.arco-list-medium .arco-list-content-wrapper .arco-list-content>.arco-list-item {
    width: 82vw;
    padding: 15px 20px
}

.arco-list-item-action {
    margin: 50px !important;
}

.arco-list-item-action>li:not(:last-child) {
    margin-right: 190px !important;
}
</style>