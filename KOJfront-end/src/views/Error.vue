<!-- SSS -->
<template>
  <!-- <form @submit.prevent="submitForm">
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
      <input type="text" v-model="example.topicId" @input="updateExample(index, 'topicId', $event.target.value)"
        placeholder="示例的 topicId" required @input="updateExample(index, 'topicId', $event.target.value)" />
      <input type="text" v-model="example.input" placeholder="示例输入" required
        @input="updateExample(index, 'topicId', $event.target.value)" />
      <input type="text" v-model="example.output" placeholder="示例输出" required
        @input="updateExample(index, 'topicId', $event.target.value)" />
      <input type="checkbox" v-model="example.showed" @input="updateExample(index, 'topicId', $event.target.value)" />
      显示
      <input type="checkbox" v-model="example.assessed" @input="updateExample(index, 'topicId', $event.target.value)" />
      评估
    </div>

    <div v-for="(labelId, index) in labelsId" :key="index">
      <input type="text" v-model="labelId[index]" />
    </div>

    <button type="submit">提交</button>
  </form> -->
</template>


