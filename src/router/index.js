import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/layout/mainPage'
import registerAndLogin from '@/layout/registerAndLogin'

import register from '../components/subComponents/register'
import login from '../components/subComponents/login'
import changePassword from '../components/subComponents/changePassword'


import {inputValueForCreate,inputValueForUpdate} from '../constant/inputValue/inputValue'
import {ruleForCreate,ruleForUpdate} from '../constant/rule/rule'
import {inputAttribute} from '../constant/inputValue/inputAttribute'
import {inputTempData} from '../constant/inputValue/inputTempData'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: registerAndLogin
    },


    /*{
      path: '/',
      name: 'registerAndLogin',
      component: registerAndLogin,
      children: [
        {
          path: 'register',
          component: register,
          props:{
            registerInfo:{
              initInputValue:inputValueForCreate.user,
              inputAttribute:inputAttribute.user,
              ruleForCreate:ruleForCreate.user,
              // ruleForUpdate:ruleForUpdate.user,
              inputTempData:inputTempData.user,
            },

          },
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'login',
          component: login,
          props:{
            loginInfo:{
              initInputValue:inputValueForCreate.user,
              inputAttribute:inputAttribute.user,
              ruleForCreate:ruleForCreate.user,
              // ruleForUpdate:ruleForUpdate.user,
              inputTempData:inputTempData.user,
            },

          },
        },
        {
          path: '/changePassword',
          name: 'changePassword',
          component: changePassword,
          props: {
            changePasswordInfo: {
              initInputValue: inputValueForCreate.user,
              inputAttribute: inputAttribute.user,
              ruleForCreate: ruleForCreate.user,
              // ruleForUpdate:ruleForUpdate.user,
              inputTempData: inputTempData.user,
            },
          },
        }
      ]
    }*/



  ]
})
