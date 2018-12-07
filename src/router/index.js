import Vue from 'vue'
import Router from 'vue-router'
/**   import page   **/
import mainPage from '../layout/mainPage'
import login from '../layout/login'
import register from '../layout/register'
import updateArticle from '../layout/updateArticle'
import userCenter from '../layout/userCenter'
import redirectToLogin from '../layout/redirectToLogin'
import registerAgreement from '../layout/registerAgreement'
import readArticle from '../layout/readArticle'
/**   routePath   **/
import {routePath} from "../constant/url/routePath";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: routePath.main,name: 'mainPage',component: mainPage},
    {path: routePath.login,name: 'login',component: login,},
    {path: routePath.register,name: 'register',component: register,},
    {path: routePath.registerAgreement,name: 'registerAgreement',component: registerAgreement},
    {path: routePath.userCenter,name: 'userCenter',component: userCenter,},
    {path: routePath.updateArticle,name: 'updateArticle',component: updateArticle},
    {path: routePath.redirectToLogin,name: 'redirectToLogin',component: redirectToLogin,},
    {path: routePath.readArticle,name: 'readArticle',component: readArticle,},
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
