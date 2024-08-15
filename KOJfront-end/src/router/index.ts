import { createRouter } from "vue-router"
//引入路由器模式
import { createWebHistory } from "vue-router";
import KojLogin from '@/views/users/KojLogin.vue'
import KojRegister from '@/views/users/KojRegister.vue'
import KojManagerHome from '@/views/KojManagerHome.vue'
import KojUserHome from '@/views/KojUserHome.vue'
import AddQuestionView from '@/views/question/AddQuestionView.vue'
//创建路由器
const router = createRouter({
    history: createWebHistory(),
    //管理路由
    routes: [  //一个一个的路由规则
        {
            //路径
            path: '/login',
            name: 'kojlogin',
            //组件绑定
            component: KojLogin
        },
        {
            //路径
            path: '/register',
            name: 'kojregister',
            //组件绑定
            component: KojRegister,
        },
        {

            path: '/userhome',
            name: 'kojuserhome',
            component: KojUserHome,
        },
        {

            path: '/managerhome',
            name: 'kojmanagerhome',
            component: KojManagerHome,
        },
        {
            path: "/add/question",
            name: "创建题目",
            component: AddQuestionView,
            meta: {
                hideInMenu: true,
            },
        },
        {
            path: "/",
            redirect: {
                name: "kojlogin",
            },
        },
    ]
})

export default router

