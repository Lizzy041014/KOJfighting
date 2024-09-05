<template>
    <div class="home">
        <UserNav />
        <div class="question">
            <a-form layout="inline" class="dosubmit">
                <a-form-item field="title" label="名称" style="min-width: 260px">
                    <a-input :style="{ width: '280px' }" v-model="title" placeholder="请输入题目名称" allow-clear />
                    <a-button type="primary" @click="dotitleSubmit" class="chaxunbutton">查询</a-button>
                </a-form-item>
                <a-form-item field="tags" label="标签">
                    <div class="m-4">
                        <el-select v-model="selectedLabels" multiple placeholder="选择标签" style="width: 240px"
                            class="inputquestion" @change="onSelectChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <a-button type="primary" @click="dolabelSubmit(selectedLabels)" class="chaxunbutton">查询</a-button>
                </a-form-item>
            </a-form>
            <div class="smallfix"></div>
            <div class="list-head">
                <div>
                    <div class="listtag">
                        <div class="listtag-title">问题列表</div>
                        <div class="listtag-muted">List Of Questions</div>
                    </div>
                </div>
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
                            <th><a href="#"></a></th>
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
                            <td>{{ question.updateTime }}</td>
                            <td style="text-align:center;vertical-align: middle;">
                                <el-button type="primary" plain class="doquestion">做题</el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <a-pagination :total="totalpagesize" size="large" @change="handlePageChange">
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
import { useQuestionsStore } from '@/stores/questions';
import router from '@/router';
import BasicFooter from '@/components/BasicFooter.vue';

interface Question {
    topicId: number;
    title: string;
    difficulty: string;
    from: string;
    labels?: { labelId: number; labelName: string }[];
    updataTime: string;
}

let totalpagesize = ref(0);
let questionsStore = useQuestionsStore();
let currentPage = ref(1);
let title = ref('');

interface OptionType {
    value: number;
    label: string;
}
let options = ref<OptionType[]>([]);
let selectedLabels = ref<number[]>([]);

let onSelectChange = (selectedValues: number[]) => {
    selectedLabels.value = selectedValues;
};

let dotitleSubmit =async () => {
    let data = { search: title.value };
    try {
        const response = await axios.post('/api/topic/gets', data);
        questionsStore.setQuestions(response.data.data.records as Question[]);
    } catch (error) {
        console.log(error);
    }
}
let dolabelSubmit = async (labelsid: number[])=> {
    let data = { labelIds: labelsid };
    console.log(data);
    try {
        const response = await axios.post('/api/topic/gets', data);
        questionsStore.setQuestions(response.data.data.records as Question[]);
    } catch (error) {
        console.log(error);
    }
}

onMounted(async () => {
    await fetchData(currentPage.value);
});

const fetchData = async (pageNo: number) => {
    let data = {
        pageNo,
        pageSize: 10,
    };
    try {
        const response = await axios.post('/api/topic/gets', data);
        questionsStore.setQuestions(response.data.data.records as Question[]);
        totalpagesize.value = response.data.data.totalRow;
    } catch (error) {
        console.error(error);
    }
};

const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchData(page);
};

const getLabelClass = (difficulty: string) => {
    switch (difficulty) {
        case '低':
            return 'label-success';
        case '中':
            return 'label-info';
        case '高':
            return 'label-warning';
        default:
            return '';
    }
};

onMounted(async () => {
    try {
        const response = await axios.get('/api/label/gets');
        const data = response.data.data.records;
        options.value = data.map((item: { labelId: any; labelName: any; }) => ({ value: item.labelId, label: item.labelName }));
    } catch (error) {
        console.error(error);
    }
});
</script>
<style scoped>
.chaxunbutton{
    margin-left: 22px;
    margin-bottom: 2px;
}
.question {
    width:85vw;
    margin: 0 auto;
    margin-top: 10px;
    padding: 20px;
    font-size: 15px;
}
.dosubmit{
    margin-bottom: 20px;
}
</style>
