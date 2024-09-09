<template>
    <div class="home">
        <ManagerNav />
        <div class="column">
            <div class="adddeletecol">
                <a-space size="large">
                    <a-input :style="{ width: '260px' }" placeholder="请输入想要添加的栏目" allow-clear v-if="inputVisible"
                        ref="InputRef" v-model="inputValue" @keyup.enter="handleInputConfirm">
                        <template #prefix>
                            <icon-plus-circle size="18" />
                        </template>
                    </a-input>
                    <el-button v-else class="button-new-tag" @click="showInput">
                        + 新栏目
                    </el-button>
                    <a-input :style="{ width: '260px' }" placeholder="请输入想要删除的栏目" allow-clear v-if="inputVisibledelete"
                        ref="InputRefdelete" v-model="inputValuedelete" @keyup.enter="handleInputConfirmdelete">
                        <template #prefix>
                            <icon-minus-circle size="18" />
                        </template>
                    </a-input>
                    <el-button v-else class="button-new-tag" @click="showdeleteInput">
                        - 删除栏目
                    </el-button>
                </a-space>
            </div>
            <a-collapse>
                <a-collapse-item v-for="item in collapseData" :key="item.columnId" :header="item.columnName"
                    :customStyle>
                    <template #expand-icon="{ active }">
                        <icon-up-circle v-if="active" size="17" />
                        <icon-down-circle v-else size="17" />
                    </template>
                    <template #extra>
                        <a-trigger :popup-translate="[-570, -70]" trigger="click">
                            <el-button type="primary" plain size="small">添加题目</el-button>
                            <template #content>
                                <div class="trigger-demo-translate">
                                    <div v-if="false"> <a-empty /></div>
                                    <div v-else> <a-table :ref="tableRef" :columns="columns" :data="data" stripe
                                            class="table">
                                            <template #add="{record}">
                                                <span style="margin-left: 10px;" class="edittimu"><icon-plus-circle-fill
                                                        size="large" style="color:cornflowerblue;"
                                                        @click="addtopictocolumn(item.columnId, record.topicId)" /></span>
                                            </template>
                                            <template #tags="{ record }">
                                                <a-space wrap>
                                                    <a-tag v-for="(tag, index) of record.tags" :key="index">{{ tag
                                                        }}</a-tag>
                                                </a-space>
                                            </template>
                                        </a-table>
                                    </div>
                                </div>
                            </template>
                        </a-trigger>
                    </template>
                    <div v-for="topic in item.topicVOS" :key="topic.topicId" style="position: relative;">
                        <div>{{ topic.title }}<span class="deletetopic"><icon-delete size="17"
                                    @click="deletetopictocolumn()" /></span>
                        </div>
                    </div>
                </a-collapse-item>
            </a-collapse>
        </div>
    </div>
</template>
<script setup lang="ts">
import ManagerNav from '@/components/ManagerNav.vue';
import { ref,nextTick, onMounted } from 'vue';
import { ElMessage, InputInstance } from 'element-plus';
import axios from 'axios';
let columns = [
    {
        title: ' ',
        slotName: 'add'
    },
    {
        title: '题号',
        dataIndex: 'topicId',
    },
    {
        title: '题目标题',
        dataIndex: 'title',
    },
    {
        title: '难度',
        dataIndex: 'difficulty',
    },
];
let data = ref([]);
let tableRef = ref();
interface Topic {
    topicId: number;
    title: string;
    content: string;
    labels?: { labelId: number; labelName: string }[];
}
interface ColumnData {
    columnId: number;
    columnName: string;
    topicVOS: Topic[];
}
let collapseData = ref<ColumnData[]>([]);
let inputValue = ref('')
let inputVisible = ref(false)
let inputValuedelete = ref('')
let inputVisibledelete = ref(false)
let InputRef = ref<InputInstance>()
let tokenmanager = localStorage.getItem('tokenmanager');
let headers = {
    Authorization: tokenmanager
};
let customStyle = {
    marginTop:'22px',
    borderRadius: '6px',
    marginBottom: '22px',
    overflow: 'hidden',
}
let addtopictocolumn = async (columnId:any,topicIds:any)=>{
    let data={
        columnId,
        topicIds:[topicIds],
    }
    try {
        let response = await axios({
            method: 'post',
            url: '/api/admin/topic/add_to_column',
            headers,
            data
        });
     console.log(response.data.code);
     console.log(data);
 if(response.data.code===200){
     ElMessage.success('题目添加成功')
 } else ElMessage.error('添加失败或已该题目')
    } catch (error) {
        console.log(error);
    }

}
let deletetopictocolumn=async()=>{
    
}
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
        let data = {
            columnName: inputValue.value,
            columnDescribe:''
        }
        let response = await axios({
            method: 'POST',
            url: '/api/admin/column/add_with_topic',
            headers,
            data
        })
        if (response.data.code === 200) {
            ElMessage.success('栏目添加成功')
            inputVisible.value = false
            inputValue.value = ''
            setTimeout(()=>{
                location.reload()
            },1000)
        }
        else {
            ElMessage.error('添加失败或已有该栏目')
        }
    } catch (error) {
        console.error(error);
    }
}
let handleInputConfirmdelete = async () => {
    try {
        let data = {
            columnId: ''
        }
        let response = await axios({
            method: 'DELETE',
            url: '/admin/column/delete/{columnId}',
            headers,
            data
        })
        console.log(response.data.code);
        console.log(data);
        if (response.data.code === 200) {
            ElMessage.success('成功删除该栏目')
            inputVisibledelete.value = false
            inputValuedelete.value = ''
        }
        else {
            ElMessage.error('删除失败或还未有该栏目的存在')
        }
    } catch (error) {
        console.error(error);
    }
}
onMounted(async()=>{
    try {
        let response = await axios.post('/api/column/gets',headers);
        console.log(response.data.data);
        collapseData.value = response.data.data.records;
    } catch (error) {
        console.error(error);
    };
    try {
        let response = await axios({
            method:'post',
            url:'/api/topic/gets',
            headers,
            data
});
        data.value = response.data.data.records;
    } catch (error) {
        console.log(error);
    }
})
</script>
<style scoped>
.table{
    color: black;
}
.trigger-demo-translate {
    padding: 10px;
    width: 700px;
    height: 488px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
.deletetopic{
    color: red;
    position: absolute;
    right: 15px;
}
.column{
    position: relative;
    height: 80vh;
    width: 88vw;
    margin: 0 auto;
    margin-top: 20px;
    font-size: 18px;
}
.adddeletecol{
    margin-bottom: 20px;
}
</style>
