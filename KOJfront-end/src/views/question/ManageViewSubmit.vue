<template>
    <div class="home">
        <ManagerNav />
        <div id="manageQuestionView">
            <a-table :ref="tableRef" :columns="columns" :data="dataList" :pagination="{
                pageSize: searchParams.pageSize,
                current: searchParams.current,
                total: total,
                showTotal: true,
            }">
                <template #tags="{ record }">
                    <a-space wrap>
                        <a-tag v-for="(tag, index) of record.tags" :key="index" color="green">{{ tag }}</a-tag>
                    </a-space>
                </template>
                <template #createTime="{ record }">
                </template>
                <template #optional="">
                    <a-space>
                        <a-button type="primary" @click="doUpdate()">修改</a-button>
                    </a-space>
                </template>
            </a-table>
        </div>
        <BasicFooter />
    </div>
</template>
<script setup lang="ts">
import { ref} from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
let dataList = ref([]);
let total = ref(0);
let tableRef = ref();
let searchParams = ref({
    pageSize: 10,
    current: 1,
});
let doUpdate = () => {
//     router.push({
//         path: "/update/question",
//         query: {
//             id: question.id,
//         },
//     });
};
let columns = [
    {
        title: "id",
        dataIndex: "id",
    },
    {
        title: "标题",
        dataIndex: "title",
    },
    {
        title: "标签",
        slotName: "tags",
    },
    {
        title: "提交数",
        dataIndex: "submitNum",
    },
    {
        title: "通过数",
        dataIndex: "acceptedNum",
    },
    {
        title: "用户id",
        dataIndex: "userId",
    },
    {
        title: "创建时间",
        slotName: "createTime",
    },
    {
        title: "操作",
        slotName: "optional",
    },
];
</script>
<style scoped>
#manageQuestionView {
    max-width: 1200px;
    margin: 10px auto;
}
</style>

