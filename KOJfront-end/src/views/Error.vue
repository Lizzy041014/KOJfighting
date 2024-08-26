<!-- SSS -->
<template>
  <form @submit.prevent="submitForm">
    <input type="text" v-model="uploadUserId" placeholder="上传用户 ID" required />
    <input type="text" v-model="title" placeholder="题目标题" :minlength="2" :maxlength="32" required />
    <textarea v-model="content" placeholder="题目内容" :minlength="2" :maxlength="1000" required></textarea>
    <select v-model="difficulty" required>
      <option value="低">低</option>
      <option value="中">中</option>
      <option value="高">高</option>
    </select>
    <input type="text" v-model="limitedMemory" placeholder="限制内存" required />
    <input type="text" v-model="limitedTime" placeholder="限制时间" required />
    <textarea v-model="inputDescribe" placeholder="输入描述" :minlength="2" :maxlength="1000" required></textarea>
    <textarea v-model="outputDescribe" placeholder="输出描述" :minlength="2" :maxlength="1000" required></textarea>
    <textarea v-model="precautions" placeholder="注意事项"></textarea>
    <input type="text" v-model="from" placeholder="来源" required />

    <div v-for="(example, index) in examples" :key="index">
      <input type="text" v-model="example.topicId" placeholder="示例的 topicId" required />
      <input type="text" v-model="example.input" placeholder="示例输入" required />
      <input type="text" v-model="example.output" placeholder="示例输出" required />
      <input type="checkbox" v-model="example.showed" /> 显示
      <input type="checkbox" v-model="example.assessed" /> 评估
    </div>

    <div v-for="(labelId, index) in labelsId" :key="index">
      <input type="text" v-model="labelId" />
    </div>

    <button type="submit">提交</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const uploadUserId = ref('');
const title = ref('');
const content = ref('');
const difficulty = ref('');
const limitedMemory = ref('');
const limitedTime = ref('');
const inputDescribe = ref('');
const outputDescribe = ref('');
const precautions = ref('');
const from = ref('');

const examples = ref([
  {
    topicId: '',
    input: '',
    output: '',
    showed: false,
    assessed: false
  }
]);

const labelsId = ref([]);

function submitForm() {
  // 在这里进行表单提交的逻辑，例如发送请求到后端
  console.log({
    uploadUserId: uploadUserId.value,
    title: title.value,
    content: content.value,
    difficulty: difficulty.value,
    limitedMemory: limitedMemory.value,
    limitedTime: limitedTime.value,
    inputDescribe: inputDescribe.value,
    outputDescribe: outputDescribe.value,
    precautions: precautions.value,
    from: from.value,
    examples: examples.value,
    labelsId: labelsId.value
  });
}
</script>

