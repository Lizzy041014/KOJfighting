<!-- <template>
     <Editor :value="value" :mode="mode" :plugins="plugins" @change="handleChange" /> 
</template> -->
<!-- <script setup lang="ts">
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
const plugins = [
    gfm(),
    highlight(),
    Add more plugins here
];
/**
 * 定义组件属性类型
 */
interface Props {
    value: string;
    mode: string;
    handleChange: (v: string) => void;
}
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps < Props > (), {
    value: () => "",
    mode: () => "split",
    handleChange: (v: string) => {
        console.log(v);
    },
});
 </script> -->
<script setup lang="ts">
import "bytemd/dist/index.css"; // 引入编辑器样式文件
import zhHans from "bytemd/lib/locales/zh_Hans.json"; // 汉化
import { Editor,Viewer } from "@bytemd/vue-next"; // 引入组件
import gfm from "@bytemd/plugin-gfm"; // 插件：为编辑器新增删除线、表格等功能
import highlight from "@bytemd/plugin-highlight";
import { ref } from "vue";
// 编辑器输入的内容
const value = ref('');
// 插件列表
const plugins = [
    gfm(),
    highlight()
];

// 获取编辑内容
const handleChange = (v:string) => {
    value.value = v;
    console.log(value);
    
};
</script>
<template>
    <div class="bytemd">
        <Editor :value="value" :locale="zhHans" :plugins="plugins" @change="handleChange" mode="split"/>
    </div>
</template>
<style>
.bytemd{
    width: 800px;
}
</style>