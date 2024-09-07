import { ref } from 'vue';
import kexielogo from '@/assets/img/kexielogo.png';
import sousuo from '@/assets/img/搜索.png';
import { IconEdit } from '@arco-design/web-vue/es/icon';
import { ElMessage } from 'element-plus';
import axios from "axios";
import router from "@/router";


let showSidebar = ref(false);
let showOverlay = ref(false);
let showSearch = ref(false);
let searchText = ref('');
let selectedAvatar = ref('https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp');
let toggleSearch = () => {
    showSearch.value = !showSearch.value;
};
let toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
    showOverlay.value = !showOverlay.value;
};
let hideSidebar = () => {
    showSidebar.value = false;
    showOverlay.value = false;
};

let clearInput = () => {
    searchText.value = '';
};
export {
    showSidebar,
    showOverlay,
    showSearch,
    searchText,
    selectedAvatar,
    toggleSearch,
    toggleSidebar,
    hideSidebar,
    clearInput,
    kexielogo,
    sousuo,
    IconEdit,
    ElMessage,
    axios,
    router
};