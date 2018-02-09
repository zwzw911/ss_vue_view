import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/layout/mainPage'
import registerAndLogin from '@/layout/registerAndLogin'

Vue.use(Router)

export default new Router({
  routes: [
/*    {
      path: '/',
      name: 'mainPage',
      component: mainPage
    }*/
    {
      path: '/',
      name: 'registerAndLogin',
      component: registerAndLogin,
    }
  ]
})
