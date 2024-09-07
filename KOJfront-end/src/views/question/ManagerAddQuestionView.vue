<template>
    <div class="home">
        <ManagerNav />
        <div class="addQuestionView">
            <h2>创建题目</h2>
            <form action="" @submit="handleSubmit">
                <a-form ref="formRef" :model="form" :style="{ width: '1000px' }" label-align="left">
                    <a-form-item field="题目Id" label="题目Id">
                        <a-input placeholder="请输入题目id" minlength="0" v-model="topicId" />
                        <template #extra>
                            <div>&nbsp;随便一个整数，提交时如果提示id重复再修改</div>
                        </template>
                    </a-form-item>
                    <a-form-item field="name" label="题目标题" :validate-trigger="['change', 'input']">
                        <a-input v-model="form.title" placeholder="请输入标题" />
                    </a-form-item>
                    <a-form-item field="tags" label="标签">
                        <div>
                            <el-select v-model="value1" multiple placeholder="Select" style="width: 240px"
                                @change="onSelectChange">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"             
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="inputtag" size="small"
                                @keyup.enter="handleInputConfirm" />
                            <el-button v-else class="button-new-tag" @click="showInput">
                                + 新标签
                            </el-button>
                            <el-input v-if="inputVisibledelete" ref="InputRefdelete" v-model="inputValuedelete"
                                class="inputtag" size="small" @keyup.enter="handleInputConfirmdelete" />
                            <el-button v-else class="button-new-tag" @click="showdeleteInput">
                                - 删除标签
                            </el-button>
                        </div>
                    </a-form-item>
                    <a-form-item field="radio" label="难度" :rules="[{ match: /one/, message: 'must select one' }]">
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
                            <a-textarea v-model="form.inputDescribe" class="textarea" minlength="2"
                                placeholder="请输入输入描述" :max-length="20" allow-clear show-word-limit />
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
                    <a-form-item label="测试用例配置" :content-flex="false" :merge-props="false">
                        <a-form-item v-for="(examplesItem, index) of form.examples" :key="index" no-style>
                            <a-space direction="vertical" style="min-width: 640px">
                                <a-form-item :field="`form.examples[${index}].input`" :label="`输入用例-${index}`">
                                    <a-input v-model="examplesItem.input" placeholder="请输入测试输入用例" />
                                </a-form-item>
                                <a-form-item :field="`form.examples[${index}].output`" :label="`输出用例-${index}`">
                                    <a-input v-model="examplesItem.output" placeholder="请输入测试输出用例" />
                                </a-form-item>
                                <a-button status="danger" class="delete" @click="handleDelete(index)">
                                    删除
                                </a-button>
                            </a-space>
                        </a-form-item>
                        <div style="margin-bottom: 10px;margin-top: -10px;">
                            <a-button @click="handleAdd" type="outline" status="success">新增测试用例</a-button>
                        </div>
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
import { reactive, ref, nextTick,onMounted} from "vue";
import axios from 'axios';
import type { InputInstance } from 'element-plus'
import { ElMessage, ElInput } from 'element-plus';
import router from "@/router";
let uploadUserId = localStorage.getItem('uploadUserId')
let topicId=ref('')
let form = reactive({
    uploadUserId: uploadUserId,
    title:'',
    content:'',
    difficulty:'',
    limitedMemory:1,
    limitedTime:1,
    inputDescribe:'',
    outputDescribe:'',
    from:'',
    examples: [
        {
            topicId: '',
            input: '',
            output: '',
            showed: true,
            assessed: true
        }
    ],
    labelsId: [] as number[]
});
let handleAdd = () => {
    form.examples.push({
    input: '',output: '',topicId:topicId.value,showed: true,assessed: true
    });
};
let handleDelete = (index: number) => {
    form.examples.splice(index, 1);
}
let tokenmanager = localStorage.getItem('tokenmanager');
let headers = {
    Authorization: tokenmanager
};
let onSelectChange = (selectedValues: number[]) => {
    form.labelsId = selectedValues.map(value => {
        let option = options.value.find(item => item.value === value);
        return option ? option.value : null;
    }).filter((id): id is number => id !== null);
};
let handleSubmit = async (event: Event) => {
    event.preventDefault(); 
    form.examples.forEach(item => {
        item.topicId = topicId.value.toString(); 
    });
    console.log(form);
    try {
        let response = await axios({
            method: 'POST',
            url: '/api/admin/topic/add',
            headers: headers,
            data: form
        })
        console.log(response.data);
        if (response.data.code === 200) {
            ElMessage.success("创建题目成功")
            setTimeout(()=>{
                router.push('/manager/viewquestions')
            },1000)
        } else {
            ElMessage.error(response.data.message)
        }
    } catch (error) {
        console.error(error);
    }
};
let inputValue = ref('')
let inputVisible = ref(false)
let inputValuedelete = ref('')
let inputVisibledelete = ref(false)
let InputRef = ref<InputInstance>()
interface OptionType {
    value: number;
    label: string;
}
let value1 = ref<number[]>([]);
let options = ref<OptionType[]>([]);
let showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}
let showdeleteInput = () => {
    inputVisibledelete.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}
let handleInputConfirm = async () => {
    try {
        let data={
            labelName: inputValue.value
        }
        let response = await axios({
            method:'POST',
            url:'/api/admin/label/add',
            headers,
            data
        })
        console.log(response.data.code);
        console.log(data);
        if(response.data.code===200){
            ElMessage.success('标签添加成功')
        inputVisible.value = false
        inputValue.value = '' 
        }
       else{
        ElMessage.error('添加失败或已有该标签')
       }
    } catch (error) {
        console.error(error);
    }
}
let handleInputConfirmdelete = async () => {
    try {
        let data = {
            labelName: inputValuedelete.value
        }
        let response = await axios({
            method: 'DELETE',
            url: '/api/root/label/delete/{labelId}',
            headers,
            data
        })
        console.log(response.data.code);
        console.log(data);
        if (response.data.code === 200) {
            ElMessage.success('成功删除该标签')
            inputVisibledelete.value = false
            inputValuedelete.value = ''
        }
        else {
            ElMessage.error('删除失败或还未有该标签的存在')
        }
    } catch (error) {
        console.error(error);
    }
}
onMounted(async () => {
    try {
        let response = await axios.get('/api/label/gets');
        let data = response.data.data.records;
        options.value = data.map((item: { labelId: any; labelName: any; }) => 
        ({ value: item.labelId, label: item.labelName }));
    } catch (error) {
        console.error(error);
    }
});
</script>
<style scoped>
.inputtag{
margin-top: 10px;
margin-left: 20px;
margin-bottom: 11px;
width: 190px;
line-height: 40px;
}
.button-new-tag{
    margin-left: 15px;
}
.el-tag.is-closable{
margin-right: 8px;
}
.arco-form{
    margin-left: 5%;
}
.textarea{
    width: 680px;
    height: 140px;
}
.arco-space-vertical {
    margin-bottom: 8px;
    position: relative;
}
.delete{
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
