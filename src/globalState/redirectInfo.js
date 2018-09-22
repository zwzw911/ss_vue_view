/**
 * Created by Ada on 2018/02/01.
 */
'use strict'

/**   为了获得redirect的提示信息，下采用全局变量   **/
let redirectInfo={
  state:{
    msg:'',
    // articleId:'',
  },
  getters:{},
  mutations:{
    setRedirectMsg(state,payload){
      state.msg=payload.msg
    },

/*    setArticleId(state,articleId){
      state.articleId=articleId
    },*/
  },
  actions:{}
}



export {
  redirectInfo,

}
