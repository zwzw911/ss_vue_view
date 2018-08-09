/**
 * Created by 张伟 on 2018/8/1.
 */
'use strict'
// import {inf} from 'awesomeprint'
// const ap=require('awesomeprint')
//baseUrl: 数组，基本路由，每个元素如/user,/article
function generateProxyTable({baseUrl}){
  let result={}
  let target='http://127.0.0.1:3000' //发出的请求路由到那个路径
  let changeOrigin=true   //修改原始url
  for(let singleEle of baseUrl){
    result[singleEle]={
      target:target,
      changeOrigin:changeOrigin,
      pathRewrite:{
        [`^${singleEle}`]:`${singleEle}`
      }
    }
  }
  return result
}


module.exports= {
  generateProxyTable,
}
// ap.inf('result',generateProxyTable({baseUrl:['/user']}))
