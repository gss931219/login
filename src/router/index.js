import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/login/login.vue'
import passWordLogin from '../view/login/passWordLogin.vue'
import Register from '../view/login/register/index.vue'
import Agreement from '../view/login/register/agreement.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/passWordLogin',
      name: 'passWordLogin',
      component: passWordLogin
    },
    {
      path: '/Agreement',
      name: 'Agreement',
      component: Agreement
    }

  ]
})
