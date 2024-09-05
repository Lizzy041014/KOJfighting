import { createRouter } from "vue-router"
//引入路由器模式
import { createWebHistory } from "vue-router";
import KojLogin from '@/views/users/KojLogin.vue'
import KojRegister from '@/views/users/KojRegister.vue'
import KojManagerHome from '@/views/KojManagerHome.vue'
import KojUserHome from '@/views/KojUserHome.vue'
import ManageUsers from '@/views/users/ManageUsers.vue'
import AddQuestionView from '@/views/question/AddQuestionView.vue'
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import EditQuestions from "@/views/question/EditQuestions.vue";
import ViewTotalDetailQusetions from '@/views/question/ViewTotalDetailQusetions.vue'
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
            meta: {
                roles:['普通用户'],
                access:'canAdmin'
            }
        },
        {
            path: '/manager',
            name: 'kojmanagerhome',
            component: KojManagerHome,
            meta: {
                roles: ['管理员']
            },
        },
        {
            path: "/manager/managerusers",
            name: "managerusers",
            component: ManageUsers,
        },
        {
            path: "/manager/add/question",
            name: "addquestion",
            component: AddQuestionView,
        },

        {
            path: "/manager/managequestions",
            name: "managequestions",
            component: ManageQuestionView,
        },
        {
            path: "/manager/viewquestions",
            name: "manageviewquestions",
            component: QuestionsView,
        },
        {
            path: '/view/question/:topic',
            name: 'viewquestion',
            component: EditQuestions,
            props: true 
        },
        {
            path: '/view/total/detailquestions',
            name: 'viewtotaldetailqusetions',
            component: ViewTotalDetailQusetions
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

