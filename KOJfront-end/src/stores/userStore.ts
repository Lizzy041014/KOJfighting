// actions执行异步操作，并且触发mutations的更改（actions调用mutations）
import { defineStore } from 'pinia';
import ACCESS_ENUM from '@/access/accessEnum';
import checkAccess from '@/access/checkAccess';
interface UserInfo {
    username?: string;
    password?: string;
    email?:string;
    qq?: string;
    gender?: string;
    managername?: string;
    avartaUrl?:string
}
export const useAuthStore = defineStore('auth', {
    state: () => ({
        loginUser: {
            userRole: ACCESS_ENUM.NOT_LOGIN
        }
    }),
    actions: {
        setLoginUser(user: any) {
            this.loginUser = user;
        },
        checkPermission(needAccess: string) {
            return checkAccess(this.loginUser, needAccess);
        }
    }
});
export const useUserStore = defineStore('user', {
    state: (): UserInfo => ({
        username: '', 
        managername: '', 
        qq: '',
        password: '',
        gender: '',
        avartaUrl:''
    }),
    actions: {
        setAvartaUrl(avartaUrl:string){
            this.avartaUrl = avartaUrl
            localStorage.setItem('selectedAvatar', avartaUrl);
        },
        setUsername(username: string) {
            this.username = username
            localStorage.setItem('username', username);
        },
        setManagername(managername: string) {
          this.managername = managername;
            localStorage.setItem('managername', managername);
        },
        logout() {
            this.username = '';
            this.managername = '';
            localStorage.removeItem('username');
            localStorage.removeItem('managername');
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
            // 触发一个自定义事件
            window.dispatchEvent(new CustomEvent('genderUpdated'));
        },
        async fetchUserInfo() {
            // 这里可以添加API请求逻辑来获取用户信息
            // 假设返回一个Promise<UserInfo>
            // this.userInfo = await getUserInfoFromApi();
        },
    },
});