<template>
    <div class="home">
        <ManagerNav/>
        <div class="addQuestionView">
            <h2>创建题目</h2>
            <a-form :model="form" label-align="left">
                <a-form-item field="title" label="标题">
                    <a-input v-model="form.title" placeholder="请输入标题" />
                </a-form-item>
                <a-form-item field="tags" label="标签">
                    <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
                </a-form-item>
                <a-form-item field="content" label="题目内容">
                    <MdEditor :value="form.content" :handle-change="onContentChange" mode=""/>
                </a-form-item>
                <a-form-item field="answer" label="答案">
                    <MdEditor :value="form.answer" :handle-change="onAnswerChange" mode=""/>
                </a-form-item>
                <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
                    <a-space direction="vertical" style="min-width: 480px">
                        <a-form-item field="judgeConfig.timeLimit" label="时间限制">
                            <a-input-number v-model="form.judgeConfig.timeLimit" placeholder="请输入时间限制" mode="button"
                                :min="0" size="large" />
                        </a-form-item>
                        <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
                            <a-input-number v-model="form.judgeConfig.memoryLimit" placeholder="请输入内存限制" mode="button"
                                :min="0" size="large" />
                        </a-form-item>
                        <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
                            <a-input-number v-model="form.judgeConfig.stackLimit" placeholder="请输入堆栈限制" mode="button"
                                :min="0" size="large" />
                        </a-form-item>
                    </a-space>
                </a-form-item>
                <a-form-item label="测试用例配置" :content-flex="false" :merge-props="false">
                    <a-form-item v-for="(judgeCaseItem, index) of form.judgeCase" :key="index" no-style>
                        <a-space direction="vertical" style="min-width: 640px">
                            <a-form-item :field="`form.judgeCase[${index}].input`" :label="`输入用例-${index}`">
                                <a-input v-model="judgeCaseItem.input" placeholder="请输入测试输入用例" />
                            </a-form-item>
                            <a-form-item :field="`form.judgeCase[${index}].output`" :label="`输出用例-${index}`">
                                <a-input v-model="judgeCaseItem.output" placeholder="请输入测试输出用例" />
                            </a-form-item>
                            <a-button status="danger" @click="handleDelete(index)">
                                删除
                            </a-button>
                        </a-space>
                    </a-form-item>
                    <div style="margin-top: 32px">
                        <a-button @click="handleAdd" type="outline" status="success">新增测试用例
                        </a-button>
                    </div>
                </a-form-item>
                <div style="margin-top: 16px"></div>
                <a-form-item>
                    <a-button type="primary" style="min-width: 200px" @click="doSubmit">提交
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup lang="ts" name="AddQuestionView">
import { reactive } from "vue";
import axios from 'axios';
import MdEditor from "@/components/MdEditor.vue";
import { ElMessage } from 'element-plus';
import { log } from "console";
// import CodeEditor from "@/components/CodeEditor.vue";
// import { QuestionControllerService } from "../../../generated";
// import message from "@arco-design/web-vue/es/message";
const form = reactive({
    tags: [],
    title: '',
    content: '',
    answer: '',
    judgeCase: [
        {
            input: "",
            output: "",
        },
    ],
    judgeConfig: {
        timeLimit: 0,
        memoryLimit: 0,
        stackLimit: 0
    },
});
//新增判题用例
const handleAdd = () => {
    form.judgeCase.push({
        input: "",
        output: "",
    });
};
//删除判题用例
const handleDelete = (index: number) => {
    form.judgeCase.splice(index, 1);
};

const onAnswerChange = (value: string) => {
    form.answer = value;
};

const onContentChange = (value: string) => {
    form.content = value;
};

const doSubmit = async () => {
    try {
        const response = await axios.put('/admin/topic/add', form);
        console.log(response);
        console.log(form);
        
        if (response.status === 200 && response.data.success) {
            ElMessage.success("创建成功");
        } else {
            if (response.data && response.data.errorMessage) {
                ElMessage.error(response.data.errorMessage);
            } else {
                ElMessage.error("创建失败，未知错误");
            }
        }
    }catch (error) {
        ElMessage.error("创建过程中发生错误");
    }
}
</script>
<style>
.addQuestionView {
 position: absolute;
 margin-top: 30px;
 margin-left: 150px;
 width: 81vw;
}
h2{
    margin-top: 120px;
    font-weight: 400;
    font-size: 30px!important;
}
</style>
