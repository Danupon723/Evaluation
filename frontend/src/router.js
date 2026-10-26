import {createRouter,createWebHistory} from 'vue-router'

//login register
import login from './views/login.vue'
import register from './views/register.vue'

//layout


//admin
import admindashbord from './views/admin/admindashbord.vue'

//assessor
import assessordashbord from './views/Assessor/Assessordashbord.vue'

//users
import userdashbord from './views/users/userdashbord.vue'



const routes = [
    {path : '/' , name:'login' , component:login },
    {path :'/register' , name:'register' , component:register},

    // {
    //     path:'/admin',
    //     component:admindashbord,

    //     children:[

    //     ] ,
    //     meta:{requiresAuth:true}
    // },
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

router.beforeEach((to)=>{
    if(to.meta.requiresAuth && !localStorage.getItem('token')) {
        return '/'
    }
})

export default router