import Vue from 'vue'
import VueRouter  from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
import Cookies from 'js-cookie'
Vue.use(VueRouter)
const router = new VueRouter ( {
    routes:[
        {
            path:'/',
            component: Main,
            redirect: '/home',
            children:[
                { path:'home', name:'home', component: Home}, // 首页
                { path:'user', name:'user', component: User}, // 用户管理
                { path:'mall', name:'mall', component: Mall},  // 商品管理
                { path:'pageone', name:'pageone',  component: PageOne},
                { path:'pagetwo', name:'pagetwo', component: PageTwo}
            ]
        },
        {   
            name:'login',
            path: '/login',
            component: Login
        }
    ]
})


router.beforeEach((to,from,next)=>{
    const token = Cookies.get('token')
    if(!token && to.name != 'login') {
        name({name:'login'})
    }else if(token && to.name === 'login'){
        next({name:'home'})
    }else{
        next()
    }
})
export default router

