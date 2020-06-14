import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import User from '@/components/user/user.vue'
import Home from '@/components/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {path: 'user', name: 'user', component: User}
      ]
    }
  ]
})
