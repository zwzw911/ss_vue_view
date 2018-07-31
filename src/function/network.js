/**
 * Created by 张伟 on 2018/4/21.
 */
'use strict'
// import {url} from "../constant/url/url"
import axios from 'axios'
import {inf,wrn,err} from 'awesomeprint'
import {RequestMethod} from '../constant/enum/network'

const myAxios = axios.create({
  // baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
  timeout: 5000, // 请求的超时时间
  //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
  // headers: {
  // "Content-Type": "application/x-www-form-urlencoded"
  // },
  withCredentials: true // 允许携带cookie
})

async function sendRequestGetResult_async({urlOption,data}){
  let result
  // inf('send data',data)
  switch (urlOption.method){
    case RequestMethod.PUT:
      result=await myAxios.put(urlOption.url,data)
          break;
    case RequestMethod.POST:
      result=await myAxios.post(urlOption.url,data)
          break;
    case RequestMethod.GET:
      if(undefined!==data){
        result=await myAxios.get(urlOption.url+'/'+data) //get/delete即使传入data，也不会发送出去
      }else{
        result=await myAxios.get(urlOption.url,data) //get/delete即使传入data，也不会发送出去
      }

      break;
    case RequestMethod.DELETE:
      result=await myAxios.delete(urlOption.url,{data:data}) //get/delete即使传入data，也不会发送出去
      break;
    default:
      err('unknown request method')
  }
  if(undefined!==result){
    return Promise.resolve(result.data)
  }else{
    return Promise.reject('cant get result')
  }
}
 function setUpdateValue(inputValueForUpdate){
  for(let singleKey in inputValueForUpdate){
    if(inputValueForUpdate[singleKey]==='notUsed'){
      delete inputValueForUpdate[singleKey]
    }
  }
 }
export {
  sendRequestGetResult_async,
  setUpdateValue,
}
