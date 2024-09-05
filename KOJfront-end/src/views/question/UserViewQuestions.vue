<template>
    <div class="home">
        <ManagerNav />
        <div id="viewQuestionsView" :gutter="[24, 24]">
            <a-row>
                <a-col :md="12" :xs="24">
                    <a-tabs default-active-key="question">
                        <a-tab-pane key="question" title="題目">
                            <a-card v-if="question" :title="question.title">
                                <a-space direction="vertical" size="large" fill>
                                    <a-descriptions title="判题条件" :column="{ xs: 1, md: 2, lg: 3 }">
                                        <a-descriptions-item label="时间限制">
                                            {{ question.timeLimit ?? 0 }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="内存限制">
                                            {{ question.memoryLimit ?? 0 }}
                                        </a-descriptions-item>
                                        <a-descriptions-item label="堆栈限制">
                                            {{ question.stackLimit ?? 0 }}
                                        </a-descriptions-item>
                                    </a-descriptions>
                                </a-space>
                                <MdViewer :value="question.content || ''" />
                                <template #extra>
                                    <a-space wrap>
                                        <a-tag v-for="(tag, index) of question.tags" :key="index" color="green">{{ tag
                                            }}</a-tag>
                                    </a-space>
                                </template>
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="comment" title="评论"> 评论区 </a-tab-pane>
                        <a-tab-pane key="answer" title="题解"> 暂时无题解 </a-tab-pane>
                    </a-tabs>
                </a-col>
                <a-col :md="12" :xs="24">
                    <a-form :model="form" layout="inline">
                        <a-form-item field="language" label="编程语言" style="min-width: 240px">
                            <a-select v-model="form.language" :style="{ width: '320px' }" placeholder="选择编程语言">
                                <a-option>java</a-option>
                                <a-option>cpp</a-option>
                                <a-option>go</a-option>
                            </a-select>
                        </a-form-item>
                    </a-form>

                    <CodeEditor :value="form.code as string" :language="form.language" :handle-change="changeCode" />
                    <a-divider size="0" />
                    <a-button type="primary" style="min-width: 200px" @click="doSubmit">提交</a-button>
                </a-col>
            </a-row>
        </div>
        <BasicFooter />
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import axios from "axios";
// import MdViewer from "@/components/MdViewer.vue";
import { languages } from "monaco-editor/esm/metadata";
// interface Props {
//     id: string;
// }
// const props = withDefaults(defineProps<Props>(), {
//     id: () => "",
// });
const question = ref('');
const loadData = async () => {
    const res = await axios({

    })
    // if (res.code === 0) {
    //     question.value = res.data;
    // } else {
    //     message.error("加载失败，" + res.message);
    // }
};

const form = ({
    language: "java",
    code: "",
});
// //提交代码
const doSubmit = async () => {

    const res = await axios({
      
    });
};
// //页面加载时请求数据
onMounted(() => {
    loadData();
});
const changeCode = (value: string) => {
   
};
</script>
<style>
#viewQuestionsView {
    max-width: 1400px;
    margin: 0 auto;
}

#viewQuestionsView .arco-space-horizontal .arco-space-item {
    margin-bottom: 0 !important;
}
</style>
