<template>
    <div v-if="isLoading" class="isLoading">
        <a-spin :size="50">
            <template #icon>
                <icon-loading />
            </template>
        </a-spin>
    </div>
    <div v-else class="bigone">
        <div class="question">
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
                            <th><a href="#"></a></th>
                        </tr>
                    </thead>
                    <tbody class="tbody">
                        <tr v-for="question in questionsStore.questions" :key="question.topicId">
                            <td> </td>
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
                            <td style="text-align:center;vertical-align: middle;">
                                <a-button type="outline" @click="topicquestion(question.topicId)" size="small"
                                    shape="round">做题</a-button>
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
        <div class="panel-two">
            <div>
                <div class="panel-heading">栏目</div>
                <div class="panel-body-two">
                    <ul class="tag-group-two">
                        <li v-for="item in columnName">{{item.columnName }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="panel" >
            <div>
                <div class="panel-heading">标签</div>
                <div class="panel-body">
                    <ul class="tag-group">
                        <li class="taggroup-item-index" v-for="item in options" :key="item.value" :label="item.label"
                            @click="labelquestion(item.value)">
                            <span>{{ item.label }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" name="MainBanner">
import { onMounted,ref } from "vue";
import axios from "axios";
import { useQuestionsStore, Question } from '@/stores/questions'
import router from "@/router";
import { totalpagesizeRef, currentPage, options,getLabelClass } from '@/Logic/ViewQuesLogic';
interface OptionType {
    value: number;
    label: string;
}
interface Column {
    columnName: string;
}
let columnName=ref<Column[]>([])
let questionsStore = useQuestionsStore();
let optionsid = ref<OptionType[]>([]);
let isLoading = ref(true);
onMounted(async () => {
    await fetchData(currentPage.value);
        isLoading.value = false;
    try {
        let data = {
            "columnState": true,
            "topicState": true
        }
        let response = await axios.post("/api/column/gets",data);
       columnName.value=response.data.data.records
    } catch (error) {
        console.error(error);
    }
});
let topicquestion = (topicId: number) => {
    console.log(`${topicId}`);
    router.push(`/user/doquestion/${topicId}`)
};
let fetchData = async (pageNo: number) => {
    let data = {
        pageNo,
        pageSize: 10,
    }
    try {
        let response = await axios.post("/api/topic/gets", data);
        questionsStore.setQuestions(response.data.data.records as Question[]);
        totalpagesizeRef.value = response.data.data.totalRow; 
    } catch (error) {
        console.error(error);
    }
    try{
        let response = await axios.get("/api/label/gets");
        options.value = response.data.data.records.map((item: { labelId: any; labelName: any; }) =>
            ({ value: item.labelId, label: item.labelName }));
        optionsid.value = response.data.data.records.map((item: { labelId: any; }) =>
            ({ value: item.labelId }));
    }catch(error){
        console.error(error);
    }
};
let handlePageChange = (page: number) => {
    currentPage.value = page;  
    fetchData(page);
};
let labelquestion = async (labelId: number) => {
    router.push(`/user/labelviewquestion/${labelId}`)
};
</script>
<style>
.isLoading{
    position: relative;
    left: 50%;
    top: 35%;
    height: 45vh;
    width: 100px;
}
.bigone{
    position: relative;
    display: flex;
}
.doquestion{
    width: 60px;
}
.tag-group-two li{
    height: 30px;
    font-size: 15px;
    padding-top: 10px;
    padding-left: 15px;
}
.tag-group-two li:nth-child(2n){
    background-color: rgba(238, 238, 238, 0.567);
}
.tag-group-two li:hover {
    background-color: #efefef;
}
.taggroup-item-index {
    display: inline-block;
    margin-right: 3px;
    margin-bottom: 5px;
    padding: 6px 9px;
    border-radius: 2px;
    font-size: 13px;
    text-decoration: none;
    white-space: nowrap;
    background-color: #e6eff8;
    color: #083b71;
}
.taggroup-item-index:hover{
    background-color:rgb(247, 251, 255);
    color: black;
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
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    color: #333;
    background-color: #e6eff8;
    border-color: #ddd;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.panel-two {
    width: 22vw;
    float: right;
    position: absolute;
    right: 5.8%;
    top: 37px;
    background-color: #fefefe;
    border: 1px solid #bbc9d4;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    color: #134c89;
}
.panel {
    float: right;
    width: 22vw;
    position: absolute;
    right: 5.8%;
    bottom: 140px;
    background-color: #fefefe;
    border: 1px solid #bbc9d4;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}
.question {
    width: 61vw;
    margin-left: 5.5%;
    margin-top: 15px;
    padding: 20px;
    font-size: 15px;
}
.tbody {
    color: #134c89;
    background-color: #fff;
}

.list-head {
    background-color: #e6eff8;
    color: rgb(27, 71, 125);
    padding: 10px 15px;
    border-radius: 2px;
}

.index-list th {
    background-color: #e6eff8;
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

.page li  {
    color: #134c89;
    padding: 8px 16px;
    border: 1px solid #134c89;
    border-radius: 5px;
}

.page li.active  {
    background-color: #134c89;
    color: white;
}

.index-list {
    width: 100%;
    border-collapse: collapse;
}

.index-list th,
.index-list td {
    border: 1.5px solid #bec7d180;
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
    border-top: 2px solid #7897b7;
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
</style>