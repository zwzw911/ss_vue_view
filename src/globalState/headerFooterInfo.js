/**
 * Created by Ada on 2018/02/01.
 */
'use strict'


let headerInfo={
  state:{
    userName:'',
    articleId:'',
  },
  getters:{},
  mutations:{
    loginSuccessful(state,payload){
      state.userName=payload.userName
    },
    loginOut(state){
      state.userName=''
    },
/*    setArticleId(state,articleId){
      state.articleId=articleId
    },*/
  },
  actions:{}
}

let footerInfo={
  state:{
    year:'2018',
  },
  getters:{},
  mutations:{
  },
  actions:{}
}


export {
  headerInfo,
  footerInfo,
}
