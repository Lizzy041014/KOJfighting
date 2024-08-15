<!-- <MdEditor :value="value" :handle-change="onChange" />
    <CodeEditor :value="Codevalue" :handle-change="onCodeChange" /> -->
<!-- // import MdEditor from "@/components/MdEditor.vue";
// import CodeEditor from '@/components/CodeEditor.vue'
// const value = ref();

// const onChange = (v: string) => {
// value.value = v;
// };
// const Codevalue = ref();

// const onCodeChange = (v: string) => {
// Codevalue.value = v;
// } -->
<!-- .bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
display: none;
}  -->
<template>
    <div class="home">
     <ManagerNav/>
    </div>
</template>
<script setup>
import ManagerNav from '@/components/ManagerNav.vue'
import {ref} from "vue";
import {IconEdit} from '@arco-design/web-vue/es/icon';
import axios from "axios";
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
</script>
<style scoped>
.tag li p{
  font-size: 14px;
  width: 9vw;
}
</style>