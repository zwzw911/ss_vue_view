/**
 * Created by zhang wei on 2018/3/5.
 */
'use strict'
import axios from 'axios'
import * as ap from 'awesomeprint'

import {additionalInputAttribute} from '../../constant/additionalInputValue/inputAttribute'
import {additionalInputTempData} from '../../constant/additionalInputValue/inputTempData'
import {additionalInputValue} from '../../constant/additionalInputValue/inputValue'
import {additionalRuleForCreate,additionalRuleForUpdate} from '../../constant/additionalInputValue/rule'
import {additionalIcon} from '../../constant/additionalInputValue/icon'

function getPosPara(element){
  let result={}
  let pos=element.getBoundingClientRect()

  //获得元素的原始长宽
  if(undefined ===element.naturalWidth){
    if(undefined === pos.width ){
      result.width=pos.right-pos.left
      result.height=pos.top-pos.bottom
    }else{
      result.width=pos.width
      result.height=pos.height
    }
  }else{
    result['width']=element.naturalWidth
    result['height']=element.naturalHeight
  }


  let posMember=['top','bottom','left','right']
  for(let singlePosMember of posMember){
    result[singlePosMember]=Math.round(pos[singlePosMember])
  }


  return result
}

// function myAxios(){
  const myAxios = axios.create({
    // baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
    timeout: 5000, // 请求的超时时间
    //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
    // headers: {
    // "Content-Type": "application/x-www-form-urlencoded"
    // },
    withCredentials: true // 允许携带cookie
  })

/*// 发送请求前处理request的数据
  axios.defaults.transformRequest = [function (data) {
    let newData = ''
    for (let k in data) {
      newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
  }]

// request拦截器
  service.interceptors.request.use(
    config => {
      // 发送请求之前，要做的业务
      return config
    },
    error => {
      // 错误处理代码

      return Promise.reject(error)
    }
  )

// response拦截器
  service.interceptors.response.use(
    response => {
      // 数据响应之后，要做的业务
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )*/

//   return service
// }

/* 从constant/additionalInputValue中，将指定的字段，加入到当前的inputValue中（例如，添加captcha）
* @inputAttribute: 普通的（根据server产生的）inputAttribute
* @inputTempData: 普通的（根据server产生的）inputTempData
* @inputValue: 普通的（根据server产生的）inputValue
* @arr_fieldName: 需要从addition中merge到普通中的字段名
* @ruleForCreate/Update:
* */
function mergeAdditionalField({arr_fieldName,inputAttribute,inputTempData,inputValue,icon,ruleForCreate,ruleForUpdate}){
    //检测字段名是否在3个文件中都存在（additionalInputValue->additionalInputAttr/TempData/InputValue）
  // ap.inf('')
  for(let singleFieldName of arr_fieldName){
    if(undefined===additionalInputAttribute[singleFieldName]
      || undefined===additionalInputTempData[singleFieldName]
      || undefined===additionalInputValue[singleFieldName]
      || (undefined===additionalRuleForCreate[singleFieldName] && undefined===additionalRuleForUpdate[singleFieldName])

    ){
      // ap.inf('continue in')
      continue
    }
    inputAttribute[singleFieldName]=additionalInputAttribute[singleFieldName]
    inputTempData[singleFieldName]=additionalInputTempData[singleFieldName]
    inputValue[singleFieldName]=additionalInputValue[singleFieldName]
    icon[singleFieldName]=  additionalIcon[singleFieldName]

    if(undefined!==ruleForCreate){
      ruleForCreate[singleFieldName]=additionalRuleForCreate[singleFieldName]
    }
    if(undefined!==ruleForUpdate) {
      ruleForUpdate[singleFieldName] = additionalRuleForUpdate[singleFieldName]
    }
  }
}
export {getPosPara,myAxios,mergeAdditionalField}
