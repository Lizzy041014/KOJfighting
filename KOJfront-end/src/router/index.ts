import { createRouter } from "vue-router"
//引入路由器模式
import { createWebHistory } from "vue-router";
import KojLogin from '@/views/users/KojLogin.vue'
import KojRegister from '@/views/users/KojRegister.vue'
import KojManagerHome from '@/views/KojManagerHome.vue'
import KojUserHome from '@/views/KojUserHome.vue'
import AddQuestionView from '@/views/question/AddQuestionView.vue'
import ManageUsers from '@/views/users/ManageUsers.vue'
// import { useAuthStore } from '@/stores/userStore';
// import ACCESS_ENUM from '@/access/accessEnum';
//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: [ 
        {
            path: '/login',
            name: 'kojlogin',
            component: KojLogin
        },
        {
            path: '/register',
            name: 'kojregister',
            component: KojRegister,
        },
        {
            path: '/userhome',
            name: 'kojuserhome',
            component: KojUserHome,
            // meta: {
            //     access:ACCESS_ENUM.USER
            // }
        },
        {
            path: '/manager',
            name: 'kojmanagerhome',
            component: KojManagerHome,
            // meta: {
            //     access: ACCESS_ENUM.ADMIN
            // },
        },
        {
            path: "/manager/add/question",
            name: "addquestion",
            component: AddQuestionView,
        },
        {
            path: "/manager/managerusers",
            name: "managerusers",
            component: ManageUsers,
        },
        {
            path: "/",
            redirect: {
                name: "kojlogin",
            },
        },
    ]
})
// router.beforeEach((to, from, next) => {
//     const authStore = useAuthStore();
//     if (to.meta.requiresAdmin && !authStore.checkPermission(ACCESS_ENUM.ADMIN)) {
//         next('/login');
//     } else if (to.meta.requiresUser && !authStore.checkPermission(ACCESS_ENUM.USER)) {
//         next('/login');
//     } else {
//         next();
//     }
// });
export default router

