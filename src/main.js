// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/*  引入iview（需npm install --save iview）     */
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

/*  引入vuex （需npm install --save vuex）    */
import {headerInfo,footerInfo} from './globalState/headerFooterInfo'
import Vuex from 'vuex'
Vue.use(Vuex)
//通过模块的方法载入vuex的配置
var store=new Vuex.Store({
  modules:{
    headerInfo,
    footerInfo,
  }
})


Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,//引入vuex定义的state
  router,
  components: { App },
  template: '<App/>'
})
