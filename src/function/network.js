/**
 * Created by 张伟 on 2018/4/21.
 */
'use strict'
// import {url} from "../constant/url/url"
import axios from 'axios'
import {inf,wrn,err} from 'awesomeprint'
import {RequestMethod} from '../constant/enum/network'

import {error} from '../constant/error/error'

axios.defaults.retry = 2
axios.defaults.retryDelay = 1000
// inf('asiox defaults',axios.defaults)

const myAxios = axios.create({
  // baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
  timeout: 5000, // 请求的超时时间
  //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
  // headers: {
  // "Content-Type": "application/x-www-form-urlencoded"
  // },
  withCredentials: true // 允许携带cookie
})
myAxios.interceptors.response.use(undefined,function axiosRetryInterceptor(err) {
  // inf('asiox error',err)
  let config = err.config;
  // If config does not exist or the retry option is not set, reject
  if (config && config.retry) {
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
      // Reject with the error
      // inf('final err',err.response)
      return Promise.reject(error.axios.reachMaxRetry);
    }

    // Increase the retry count
    config.__retryCount += 1;
    inf('config.__retryCount',config.__retryCount)
    // Create new promise to handle exponential backoff
    let backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });
    // inf('recall')
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
      return myAxios(config);
    });
  }
});
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
  // inf('myaxios result',result)
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
