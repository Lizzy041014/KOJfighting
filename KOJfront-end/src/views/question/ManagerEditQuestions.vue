<template>
    <div class="home">
        <ManagerNav />
        <div class="addQuestionView">
            <h2>编辑题目</h2>
            <form action="" @submit="handleSubmit">
                <a-form ref="formRef" :model="form" :style="{ width: '1000px' }" label-align="left">
                    <a-form-item field="题目Id" label="题目Id">
                        <a-input placeholder="请输入题目 id" minlength="0" v-model="form.topicId" />
                        <template #extra>
                            <div>&nbsp;随便一个整数，提交时如果提示 id 重复再修改</div>
                        </template>
                    </a-form-item>
                    <a-form-item field="name" label="题目标题" :validate-trigger="['change', 'input']">
                        <a-input v-model="form.title" placeholder="请输入标题" />
                    </a-form-item>
                    <a-form-item field="radio" label="难度">
                        <a-radio-group v-model="form.difficulty">
                            <a-radio value="低">低</a-radio>
                            <a-radio value="中">中</a-radio>
                            <a-radio value="高">高</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item field="content" label="题目内容">
                        <a-space direction="vertical" size="large" fill>
                            <a-textarea class="textarea" placeholder="请输入题目详情内容" :max-length="20" allow-clear
                                show-word-limit v-model="form.content" />
                        </a-space>
                    </a-form-item>
                    <a-form-item field="inputDescribe" label="输入描述">
                        <a-space direction="vertical" size="large" fill>
                            <a-textarea v-model="form.inputDescribe" class="textarea" minlength="2" :max-length="20"
                                allow-clear show-word-limit />
                        </a-space>
                    </a-form-item>
                    <a-form-item field="outputDescribe" label="输出描述">
                        <a-space direction="vertical" size="large" fill>
                            <a-textarea v-model="form.outputDescribe" class="textarea" placeholder="请输入输出描述"
                                minlength="2" :max-length="20" allow-clear show-word-limit />
                        </a-space>
                    </a-form-item>
                    <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
                        <a-space direction="vertical" style="min-width: 480px">
                            <a-form-item field="judgeConfig.timeLimit" label="时间限制">
                                <a-input-number v-model="form.limitedTime" placeholder="请输入时间限制" mode="button" :min="1"
                                    size="large" />
                            </a-form-item>
                            <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
                                <a-input-number v-model="form.limitedMemory" placeholder="请输入内存限制" mode="button"
                                    :min="1" size="large" />
                            </a-form-item>
                        </a-space>
                    </a-form-item>
                    <a-form-item field="from" label="来源" :validate-trigger="['change', 'input']"
                        style="margin-bottom: 30px;">
                        <a-input v-model="form.from" placeholder="" />
                        <template #extra>
                            <div>&nbsp;必填（可随意填）</div>
                        </template>
                    </a-form-item>
                </a-form>
                <a-form-item>
                    <a-space>
                        <button type="submit" class="abutton">提交</button>
                    </a-space>
                </a-form-item>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";
import { useRoute } from "vue-router";
let form = reactive({
    title: "",
    content: "",
    difficulty: "",
    limitedMemory: 1,
    limitedTime: 1,
    inputDescribe: "",
    outputDescribe: "",
    from: "",
    topicId: "",
});

let tokenmanager = localStorage.getItem("tokenmanager");
let headers = {
    Authorization: tokenmanager,
};

let handleSubmit = async (event: Event) => {
    event.preventDefault();
    try {
        let response = await axios({
            method: "put",
            url: "/api/admin/topic/update",
            headers: headers,
            data: form,
        });
        if (response.data.code === 200) {
            ElMessage.success("修改题目成功");
            setTimeout(()=>{
                router.push({
                    path: "/manager/viewquestions",
                });
            },1200)
        } else {
            ElMessage.error(response.data.message);
        }
    } catch (error) {
        console.error(error);
    }
};
let route = useRoute();
onMounted(async () => {
    let pathSegments = route.path.split("/");
    let topicId = pathSegments[pathSegments.length - 1];
    try {
        let response = await axios.get(`/api/topic/get/${topicId}`);
        let data = response.data.data;
        form.title = data.title;
        form.content = data.content;
        form.difficulty = data.difficulty;
        form.limitedMemory = data.limitedMemory;
        form.limitedTime = data.limitedTime;
        form.inputDescribe = data.inputDescribe;
        form.outputDescribe = data.outputDescribe;
        form.from = data.from;
        form.topicId = data.topicId;
    } catch (error) {
        console.error(error);
    }
});
</script>
<style scoped>
.w-20 {
    margin-top: 10px;
    line-height: 40px;
}

.button-new-tag {
    margin-left: 15px;
}

.el-tag.is-closable {
    margin-right: 8px;
}

.arco-form {
    margin-left: 5%;
}

.textarea {
    width: 680px;
    height: 140px;
}

.arco-space-vertical {
    margin-bottom: 8px;
    position: relative;
}

.delete {
    position: absolute;
    right: -100px;
    bottom: 58px;
}

.abutton {
    margin-left: 124%;
    margin-top: 15px;
    margin-bottom: 50px;
    min-width: 200px;
    height: 35px;
    background-color: rgb(44, 44, 247);
    color: white;
    font-size: 15px;
    letter-spacing: 3px;
}

.abutton:hover {
    background-color: rgb(28, 28, 181);
}

.footer {
    bottom: -250%;
}

.addQuestionView {
    position: absolute;
    margin-top: 30px;
    margin-left: 150px;
    width: 81vw;
}

h2 {
    margin-top: -8px;
    font-weight: 400;
    font-size: 30px !important;
}
</style>
