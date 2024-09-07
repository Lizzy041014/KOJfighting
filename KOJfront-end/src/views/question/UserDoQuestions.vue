<template>
    <div class="home">
        <UserNav />
        <div id="userdoquestions">
            <a-row :gutter="24">
                <a-col :md="12" :xs="12">
                    <a-tabs default-active-key="question" style="color: black;">
                        <a-tab-pane key="question" title="- 題目 -">
                            <a-card v-if="question" :title="question.title">
                                <a-space direction="vertical" size="large" fill>
                                    <a-descriptions title="判题条件" :column="{ xs: 1, md: 2, lg: 3 }">
                                        <a-descriptions-item label="时间限制">
                                            {{ question.limitedTime ?? 0 }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="内存限制">
                                            {{ question.limitedMemory ?? 0 }}
                                        </a-descriptions-item>
                                    </a-descriptions>
                                    <a-descriptions title="难度" :column="{ xs: 1, md: 2, lg: 3 }">
                                        <a-descriptions-item :label="question.difficulty">
                                            <a-rate readonly default-value="1" v-if="question.difficulty==='低'">
                                                <template #character>
                                                    <icon-face-smile-fill />
                                                </template>
                                            </a-rate>
                                            <a-rate readonly default-value="3" v-else-if="question.difficulty==='中'">
                                                <template #character>
                                                    <icon-face-smile-fill />
                                                </template>
                                            </a-rate>
                                            <a-rate readonly default-value="5" v-else>
                                                <template #character>
                                                    <icon-face-smile-fill />
                                                </template>
                                            </a-rate>
                                        </a-descriptions-item>
                                    </a-descriptions>
                                    <a-descriptions title="输入描述" :column="{ xs: 1, md: 2, lg: 3 }">
                                        <a-typography-paragraph copyable>
                                            {{ question.inputDescribe }}
                                        </a-typography-paragraph>
                                    </a-descriptions>
                                    <a-descriptions title="输出描述" :column="{ xs: 1, md: 2, lg: 3 }">
                                        <a-typography-paragraph copyable>
                                            {{ question.outputDescribe }}
                                        </a-typography-paragraph>
                                    </a-descriptions>
                                    <a-descriptions title="来源" :column="{ xs: 1, md: 2, lg: 3 }">
                                        <a-typography-paragraph>
                                            {{ question.from }}
                                        </a-typography-paragraph>
                                    </a-descriptions>
                                </a-space>
                                <template #extra>
                                    <a-space wrap>
                                        <a-tag v-for="( tagName, index) of question.labelNames || []" :key="index"
                                            :color="getColor(index)">{{ tagName }}</a-tag>
                                    </a-space>
                                </template>
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="comment" title="- 评论 -">评论区</a-tab-pane>
                        <a-tab-pane key="answer" title="- 题解 -">暂时无题解</a-tab-pane>
                    </a-tabs>
                </a-col>
                <a-col :md="12" :xs="24">
                    <a-form :model="form" layout="inline">
                        <a-form-item field="language" label="编程语言" style="min-width: 240px">
                            <a-select v-model="form.language" :style="{ width: '320px' }" placeholder="选择编程语言">
                                <a-option>C#</a-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                    <CodeEditor :value="form.code as string" :language="form.language" :handle-change="changeCode" />
                    <a-divider />
                    <el-button type="primary" style="min-width: 200px;margin-left: 424px;margin-top: -5px;"
                        @click="doSubmit" class="submitbutton">提交</el-button>
                </a-col>
            </a-row>
        </div>
        <BasicFooter />
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import message from '@arco-design/web-vue/es/message';
import CodeEditor from '@/components/CodeEditor.vue';
import axios from 'axios';
import UserNav from '@/components/UserNav.vue'
// import router from '@/router';
import { useRoute } from "vue-router";
interface Props {
    id: string;
}
let question = reactive({
    title: "",
    content: "",
    difficulty: "",
    limitedMemory: 1,
    limitedTime: 1,
    inputDescribe: "",
    outputDescribe: "",
    from: "",
    topicId: "",
    label:[],
    labelNames: [] 
});
let colors= [
    'orange',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'red',
    'orangered',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
    'lime',
    'gold',
];
let getColor = (index: number) => {
    return colors[index % colors.length];
};

let props = withDefaults(defineProps<Props>(), {
    id: () => '',
});

let form = ref({
    language: 'C#',
    code: '',
});

let doSubmit = async () => {
    try {
        let res = await axios.post('/your-submit-api-url', {
            language: form.value.language,
            code: form.value.code,
            questionId: props.id,
        });
        if (res.data.code === 0) {
            message.success('提交成功');
        } else {
            message.error('提交失败，' + res.data.message);
        }
    } catch (error) {
        message.error('提交失败，发生错误：' + error);
    }
};
let route = useRoute();
onMounted(async() => {
    let pathSegments = route.path.split("/");
    let topicId = pathSegments[pathSegments.length - 1];
    try {
        let response = await axios.get(`/api/topic/get/${topicId}`);
        let data = response.data.data;
        question.title = data.title;
        question.content = data.content;
        question.difficulty = data.difficulty;
        question.limitedMemory = data.limitedMemory;
        question.limitedTime = data.limitedTime;
        question.inputDescribe = data.inputDescribe;
        question.outputDescribe = data.outputDescribe;
        question.from = data.from;
        question.topicId = data.topicId;
        question.label = data.labels;
        question.labelNames = data.labels.map((labelObj: { labelName: string }) => labelObj.labelName);
    } catch (error) {
        console.error(error);
    }
});
let changeCode = (value: string) => {
    form.value.code = value;
};
</script>
<style scoped>
#userdoquestions {
    max-width: 1265px;
    margin: 15px auto;
}
#userdoquestions .arco-space-horizontal .arco-space-item {
    margin-bottom: 0 !important;
}
.footer {
    bottom: -10%;
}
.timubutton{
    position: relative;
    margin-right: 20px;
}
</style>
