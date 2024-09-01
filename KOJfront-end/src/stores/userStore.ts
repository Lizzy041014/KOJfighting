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
    avartaUrl?:string;
    role?:string;
    managerToken?: string,
    managername?: string;
    managerpassword?: string;
    manageremail?: string;
    managerrole?: string
    managerid?:number
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
        qq: '',
        password: '',
        gender: '',
        avartaUrl:'',
        role:'',
        managerToken: '',
        managername: '',
        managerpassword:'',
        manageremail: '',
        managerrole: '',
        managerid:0
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
        logoutUser() {
            this.username = '';
            localStorage.removeItem('username');
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
        setManagername(managername: string) {
            this.managername = managername
            localStorage.setItem('managername', managername);
        },
        logoutManager() {
            this.managername = '';
            localStorage.removeItem('managername');
        },
        setManagerPassword(password: string) {
            this.password = password;
        },
        setManagerRole(role: string) {
            this.role = role;
            localStorage.setItem('role', role)
        },
        setManagerToken(storedManagerToken: string) {
            localStorage.getItem('tokenmanager');
            this.managerToken = storedManagerToken;
        },
        setManagerId(id:any) {
            localStorage.setItem('uploadUserId', id)
            this.managerid = id
        }
    },
});