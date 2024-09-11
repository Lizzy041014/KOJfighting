<template>
    <div class="home">
        <UserNav />
        <div class="question">
            <a-form layout="inline" class="dosubmit">
                <a-form-item field="title" label="名称" style="min-width: 260px">
                    <a-input :style="{ width: '280px' }" v-model="title" placeholder="请输入题目名称" allow-clear />
                    <el-button type="primary" @click="dotitleSubmit(title)" class="chaxunbutton">查询</el-button>
                </a-form-item>
                <a-form-item field="tags" label="标签">
                    <div class="m-4">
                        <el-select v-model="selectedLabels" multiple placeholder="选择标签" style="width: 240px"
                            class="inputquestion" @change="onSelectChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <el-button type="primary" @click="dolabelSubmit(selectedLabels)" class="chaxunbutton">查询</el-button>
                </a-form-item>
            </a-form>
            <div class="list-head">
                <div class="question"></div>
            </div>
            <div>
                <table class="table index-list">
                    <thead class="thead">
                        <tr>
                            <th></th>
                            <th><a href="#">题号</a></th>
                            <th><a href="#">标题</a></th>
                            <th><a href="#">标签</a></th>
                            <th><a href="#">难度</a></th>
                            <th><a href="#">创建时间</a></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="tbody">
                        <tr v-for="question in questionsStore.questions" :key="question.topicId">
                            <td></td>
                            <td>{{ question.topicId }}</td>
                            <td>{{ question.title }}</td>
                            <td>
                                <span class="problem-list-tags">
                                    <a href="#" v-for="label in question.labels" :key="label.labelId">
                                        <span class="label" :class="getLabelClass(question.difficulty)">{{
                                            label.labelName }}</span>
                                    </a>
                                </span>
                            </td>
                            <td><span class="label" :class="getLabelClass(question.difficulty)">{{ question.difficulty
                                    }}</span></td>
                            <td><span>{{ question.updateTime }}</span></td>
                            <td style="text-align:center;vertical-align: middle;">
                                <a-button type="outline" @click="topicquestion(question.topicId)" size="small" shape="round"
                                  >做题</a-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <a-pagination :total="totalpagesizeRef" size="large" @change="handlePageChange">
                    <template #page-item="{ page }" :v-model="currentPage">
                        {{ page }}
                    </template>
                    <template #page-item-step="{ type }">
                        <icon-send :style="type === 'previous' ? { transform: `rotate(180deg)` } : undefined" />
                    </template>
                    <template #page-item-ellipsis>
                        <icon-sun-fill />
                    </template>
                </a-pagination>
            </div>
        </div>
        <BasicFooter />
    </div>
</template>
<script setup lang="ts">
import UserNav from '@/components/UserNav.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { totalpagesizeRef, currentPage, options, selectedLabels, onSelectChange,  getLabelClass } from '@/Logic/ViewQuesLogic';
import router from '@/router';
import BasicFooter from '@/components/BasicFooter.vue';
import { useQuestionsStore } from '@/stores/questions';
import { log } from 'console';
interface Question {
    topicId: number;
    title: string;
    difficulty: string;
    from: string;
    labels?: { labelId: number; labelName: string }[];
    updataTime: string;
}
let questionsStore = useQuestionsStore();
let title = ref('');
let topicquestion = (topicId:number) => {
    console.log(`${topicId}`);
    router.push(`/user/doquestion/${topicId}`)
};
onMounted(async () => {
    await fetchData(currentPage.value);
    try {
        let response = await axios.get('/api/label/gets');
        let data = response.data.data.records;
        options.value = data.map((item: { labelId: any; labelName: any; }) => ({ value: item.labelId, label: item.labelName }));
    } catch (error) {
        console.error(error);
    }
});
let dotitleSubmit = async (title: string) => {
    let data = { search: title,pageSize :10};
    try {
        console.log(data);
        let response = await axios.post('/api/topic/gets', data);
        questionsStore.setQuestions(response.data.data.records as Question[]);
        totalpagesizeRef.value = response.data.data.totalPage;
        console.log(response.data);
        
    } catch (error) {
        console.log(error);
    }
};

let dolabelSubmit = async (labelsid: number[]) => {
    let data = { labelIds: labelsid, pageNo: 1 };
    try {
        let response = await axios.post('/api/topic/gets', data);
         questionsStore.setQuestions(response.data.data.records as Question[]);
        totalpagesizeRef.value = response.data.data.totalPage;
    } catch (error) {
        console.log(error);
    }
};

let fetchData = async (pageNo: number) => {
    let data = {
        pageNo,
        pageSize: 10,
    };
    try {
        let response = await axios.post('/api/topic/gets', data);
        questionsStore.setQuestions(response.data.data.records as Question[]);
        totalpagesizeRef.value = response.data.data.totalRow;
        console.log(response.data);
        
    } catch (error) {
        console.error(error);
    }
};
let handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchData(page);
};

</script>
<style scoped>
.chaxunbutton{
    margin-left: 22px;
    margin-bottom: 2px;
}
.question {
    width:85vw;
    margin: 0 auto;
    margin-top: 20px;
    padding: 5px;
}
.dosubmit{
    margin-bottom: 20px;
}
</style>
