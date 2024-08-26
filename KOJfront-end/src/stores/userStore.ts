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
    role?:string
}
export const useAuthStore = defineStore('auth', {
    state: () => ({
        loginUser: {
            userRole: ACCESS_ENUM.NOT_LOGIN
        }
    }),
    actions: {
        //更新用户登陆状态
        setLoginUser(user: any) {
            this.loginUser = user;
        },
        checkPermission(needAccess: string) {
            return checkAccess(this.loginUser, needAccess);
        }
        //  const isLoggedIn = ref(false);

        // const login = (role, username) => {
        //     state.loginUser.userRole = role;
        //     state.loginUser.username = username;
        //     isLoggedIn.value = true;
        // };

        // const logout = () => {
        //     state.loginUser.userRole = ACCESS_ENUM.NOT_LOGIN;
        //     state.loginUser.username = '';
        //     isLoggedIn.value = false;
        // };

        // const checkLogin = () => {
        //     return isLoggedIn.value;
        // };
    }
});
export const useUserStore = defineStore('user', {
    state: (): UserInfo => ({
        username: '', 
        managername: '', 
        qq: '',
        password: '',
        gender: '',
        avartaUrl:'',
        role:''
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
        logoutUser() {
            this.username = '';
            localStorage.removeItem('username');
        },
        logoutManager() {
            this.managername = '';
            localStorage.removeItem('managername');
        },
        setPassword(password:string){
            this.password = password;
        },
        setEmail(email:string){
            this.email = email;
        },
        setQQ(qq: string) {
            this.qq = qq;
        },
        setGender(gender: string) {
            this.gender = gender;
            localStorage.setItem('gender', gender);
        },
        setRole(role:string){
            this.role=role;
            localStorage.setItem('role',role)
        },
        async fetchUserInfo() {
            // 可以添加API请求逻辑来获取用户信息,但素没有获取用户信息的api捏
        },
    },
});