// src/stores/userStore.ts
import { defineStore } from 'pinia';

interface UserInfo {
    username?: string;
    password?: string;
    email?:string;
    qq?: string;
    gender: string;
}

export const useUserStore = defineStore('user', {
    state: (): UserInfo => ({
        username: '', 
        qq: '',
        password: '',
        gender: ''
    }),
    actions: {
        setUsername(username: string) {
            this.username = username;
            localStorage.setItem('username', username);
        },
        logout() {
            this.username = '';
            localStorage.removeItem('username');
        },
        setPassword(password:string){
            this.password = password;
        },
        setEmail(email:string){
            this.email = email;
        },
        setQq(qq: string) {
            this.qq = qq;
        },
        setGender(gender: string) {
            this.gender = gender;
        },
        async fetchUserInfo() {
            // 这里可以添加API请求逻辑来获取用户信息
            // 假设返回一个Promise<UserInfo>
            // this.userInfo = await getUserInfoFromApi();
        },
    },
});