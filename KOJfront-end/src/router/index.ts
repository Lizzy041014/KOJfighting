import { createRouter } from "vue-router"
//引入路由器模式
import { createWebHistory } from "vue-router";
import KojLogin from '@/views/users/KojLogin.vue'
import KojRegister from '@/views/users/KojRegister.vue'
import KojManagerHome from '@/views/KojManagerHome.vue'
import KojUserHome from '@/views/KojUserHome.vue'
import ManageUsers from '@/views/users/ManageUsers.vue'
import ManagerAddQuestionView from '@/views/question/ManagerAddQuestionView.vue'
import ManageQuestionView from "@/views/question/ManageViewSubmit.vue";
import UserQuestionsView from "@/views/question/ManagerQuestionsView.vue";
import ManagerEditQuestions from "@/views/question/ManagerEditQuestions.vue";
import UserViewTotalDetailQusetions from '@/views/question/UserViewTotalDetailQusetions.vue'
import UserDoQuestions from "@/views/question/UserDoQuestions.vue";
import UserViewTotalDetailLabelQusetions from "@/views/question/UserViewTotalDetailLabelQusetions.vue";
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
            component: ManagerAddQuestionView,
        },

        {
            path: "/manager/managequestions",
            name: "managequestions",
            component: ManageQuestionView,
        },
        {
            path: "/manager/viewquestions",
            name: "manageviewquestions",
            component: UserQuestionsView,
        },
        {
            path: '/view/question/:topic',
            name: 'viewquestion',
            component: ManagerEditQuestions,
            props: true 
        },
        {
            path: '/view/total/detailquestions',
            name: 'viewtotaldetailqusetions',
            component: UserViewTotalDetailQusetions
        },
        {
            path: '/user/doquestion/:topic',
            name: 'userdoquestion',
            component: UserDoQuestions,
            props: true 
        },
        {
            path: '/user/labelviewquestion/:label',
            name: 'userlabelviewquestion',
            component: UserViewTotalDetailLabelQusetions,
            props: true 
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

