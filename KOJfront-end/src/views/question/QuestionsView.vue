<template>
    <div class="home">
        <ManagerNav />
        <div id="QuestionsView">
            <a-form layout="inline" :model="formData">
                <a-form-item field="title" label="名称" style="min-width: 290px;margin-left: 10px;margin-top: 10px;">
                    <a-input placeholder="请输入题目名称" v-model="search"/>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="doSearch" style="margin-top: 10px;">查询</a-button>
                </a-form-item>
            </a-form>
            <a-table :ref="tableRef" :columns="columns" :data="dataList" stripe class="table">
                <template #tags="{ record }">
                    <a-space wrap>
                        <a-tag v-for="(tag, index) of record.tags" :key="index">{{ tag }}</a-tag>
                    </a-space>
                </template>
                <template #no="{ record }">
                    <span v-if="isCurrentUser(record)" class="edittimu" @click="toQuestionEditPage(topicId)"><icon-edit
                            size="large" /></span>
                    <span v-if="isCurrentUser(record)" style="margin-left: 50px;" class="edittimu"><icon-delete
                            size="large" /></span>
                </template>
                <template #edit="{ record }">
                    <span v-if="!isCurrentUser(record)"></span>
                </template>
            </a-table>
        </div>
        <BasicFooter />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import axios from 'axios';
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import { ElMessage } from 'element-plus';
import { RefSymbol } from '@vue/reactivity';
let userStore = useUserStore();
let dataList = ref([]);
let tableRef = ref();
let nickname = ref()
let managername=''
let formData=ref([])
let search=ref('')

const columns = [
    {
        title: '题号',
        dataIndex: 'topicId',
    },
    {
        title: '题目名称',
        dataIndex: 'title',
    },
    {
        title: '难度',
        dataIndex: 'difficulty',
    },
    {
        title: '创建者',
        dataIndex: 'uploadUser.nickname',
    },
    {
        title: '创建时间',
        dataIndex: 'updateTime',
    },
    {
        slotName: 'edit'
    },
    {
        slotName: 'no'
    }
];
let tokenmanager = localStorage.getItem('tokenmanager');
let headers = {
    Authorization: tokenmanager
};
const loadData = async () => {
    try {
        const response = await axios.post('/api/topic/gets', headers);
        dataList.value = response.data.data.records;
        // total.value = response.data.data.totalRow;
    for(let i=0;i>=0;i++){
        nickname.value = response.data.data.records[i].uploadUser.nickname
        managername = nickname.value
    }
    } catch (error) {
        // console.log(error);
    }
};
const isCurrentUser = (record: { uploadUser: { nickname: string | undefined; }; }) => {
    return userStore.username === record.uploadUser.nickname;
};
watchEffect(() => {
    loadData();
});

onMounted(() => {
    loadData();
});

let toQuestionEditPage = (topicId:any) => {
    router.push({
        path: `/view/question/${topicId}`,
    });
};
let doSearch = async () => {
    let data = { search: search.value };
    try {
        const response = await axios.post('/api/topic/gets', data, { headers });
        dataList.value = response.data.data.records;
        for (let i = 0; i >= 0; i++) {
            nickname.value = response.data.data.records[i].uploadUser.nickname;
            managername = nickname.value;
        }
    } catch (error) {
        console.log(error);
    }
};
</script>
<style scoped>
.table {
    margin-top: 20px;
}

.edittimu:hover {
    color: blue;
}

#QuestionsView {
    max-width: 1200px;
    margin: 15px auto;
}
</style>