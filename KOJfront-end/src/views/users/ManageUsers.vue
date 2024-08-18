<template>
    <div class="home">
        <ManagerNav/>
        <div class="user-list-container">
            <a-table :columns="columns" :dataSource="users" />
        </div>
    </div>
</template>

<script setup lang="ts" name="ManageUsers">
import { ref } from 'vue';
import  ATable  from '@arco-design/web-vue';
const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
    },
    {
        title: '年龄',
        dataIndex: 'age',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
    },
];

const users = ref([
    { username: '张三', age: 25, email: 'zhangsan@example.com' },
    { username: '李四', age: 30, email: 'lisi@example.com' },
]);
</script>
<style>
.user-list-container {
    color: black;
    padding: 20px;
}
</style>
