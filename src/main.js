'use strict'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/*                    引入cookies               */
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

/*  引入iview（需npm install --save iview）     */
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

/*    引入element-ui      */
import { Tree } from 'element-ui'
Vue.component(Tree.name, Tree);


/*  引入vuex （需npm install --save vuex）    */
// import {headerInfo,footerInfo} from './globalState/headerFooterInfo'
// import {inputRelatePropertyInfo} from './globalState/inputRelateProperty'
import * as globalState from './globalState/globalState'
// import {inputRelatePropertyInfo} from './globalState/globalState'
import Vuex from 'vuex'
Vue.use(Vuex)
//通过模块的方法载入vuex的配置
let store=new Vuex.Store({
  modules:{
    // inputRelatePropertyInfo,
    // globalState,
    // footerInfo,
    headerInfo:globalState.headerInfo,
    footerInfo:globalState.footerInfo,
    inputRelatePropertyInfo:globalState.inputRelatePropertyInfo,
    // url:globalState.url,
    style:globalState.style,
  }
})


Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,//引入vuex定义的state
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
