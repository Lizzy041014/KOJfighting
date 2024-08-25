<template>
    <div class="home">
        <ManagerNav />
        <div>
            <a-list>
                <a-list-item v-for="idx in 10" :key="idx">
                    <a-list-item-meta title="Beijing Bytedance"
                        description="Beijing is an enterprise located in China.">
                        <template #avatar>
                            <a-avatar shape="square">
                                <img alt="avatar"
                                    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
                            </a-avatar>
                        </template>
                    </a-list-item-meta>
                    <template #actions>
                        <a-input :style="{ width: '230px' }" placeholder="修改该用户的密码" allow-clear />
                        <icon-edit @click="changeUserPwd" />
                        <icon-delete @click="deleteUser" />
                        <a-switch checked-color="#f45e5e" unchecked-color="#75c5f0" />
                    </template>
                </a-list-item>
            </a-list>
        </div>
        <a-space direction="vertical" size="large">
            <a-pagination :total="50" show-total show-jumper show-page-size />
        </a-space>
    </div>
</template>

<script setup lang="ts" name="ManageUsers">
import { onMounted, ref, watchEffect } from "vue";
// import { Question, QuestionControllerService } from "../../../generated";
import { useRouter } from "vue-router";
function changeUserPwd(){

}
function deleteUser(){

}
</script>
<style scoped>
.arco-space-vertical{
    /* position: relative; */
    margin-left: 30%;
    margin-top: 2%;
    margin-bottom: 4%;

}
.demo-arrow {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    padding: 10px;
    width: 200px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
}
 .arco-list-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90vw;
    margin-left: 5%;
    margin-top: 5px;
 }
 .arco-list-medium .arco-list-content-wrapper .arco-list-content>.arco-list-item{
    width: 90vw;
    padding: 15px 20px
 }
 .arco-list-item-action{
    margin: 50px!important;
 }
 .arco-list-item-action>li:not(:last-child) {
     margin-right: 190px!important;
 }
</style>