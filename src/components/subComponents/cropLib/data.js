/**
 * Created by Ada on 2018/2/17.
 */
'use strict'
// let misc=require('../../../function/misc')
import * as misc from '../../../function/misc'

let error={
  htmlElementNotFind: function (eleId) {
    //return {rc: 1, msg: 'can\'t find html element ' + eleId}
    return {rc: 1, msg: '没有找到html元素:' + eleId}
  },
  L1OrigImgMaxWHNotInt:function (WH) {
    //return {rc: 2, msg: 'The value of L1OrigImg->' + WH + ' can\'t be parsed into number'}
    return {rc: 2, msg: 'L1OrigImg->' + WH + '的值不是整数'}
  },
  /*        L1ViewImgMaxWHNotInt:function (WH) {
            //return {rc: 2, msg: 'The value of L1OrigImg->' + WH + ' can\'t be parsed into number'}
            return {rc: 3, msg: 'L1ViewImgMaxWH->' + WH + '的值不是整数'}
          },*/
  cropImgWHNotInt: function (WH) {
    //return {rc: 4, msg: 'The value of cropImgWH->' + WH + ' can\'t be parsed into number'}
    return {rc: 4, msg: 'cropImgWH->' + WH + '的值不是整数'}
  },
  cropZoneBorderWHNotInt: function (WH) {
    //return {rc: 6, msg: 'The value of L3BorderWidth->' + WH + ' can\'t be parsed into number'}
    return {rc: 6, msg: 'L3BorderWidth->' + WH + '的值不是整数'}
  },

  cropZoneWHNotPositive: function (WH) {
    //return {rc: 8, msg: 'The value of cropZoneWH->' + WH + ' can\'t be negative value'}
    return {rc: 8, msg: 'cropZoneWH->' + WH + '的值不是正数'}
  },
  cropZoneBorderWHNotPositive: function (WH) {
    //return {rc: 10, msg: 'The value of L3BorderWidth->' + WH + ' can\'t be negative value'}
    return {rc: 10, msg: 'L3BorderWidth->' + WH + '的值不是正数'}
  },

  L1origImgMaxWHNotPositive:function (WH) {
    //return {rc: 11, msg: 'The value of L1OrigImg->' + WH + ' can\'t be negative value'}
    return {rc: 11, msg: 'L1OrigImg->' + WH + '的值不是正数'}
  },
  //imageNotReady: {rc: 12, msg: 'read image info failed'},
  imageNotReady: {rc: 12, msg: '图片尚未加载完成，无法读取图片信息'},
  L1origImgMaxWHExceed:function (WH) {
    //return {rc: 14, msg: 'The value of L1OrigImgMaxWH->' + WH + ' exceed max value'}
    return {rc: 14, msg: `载入的图片高度或者宽度超出定义的最大值`}
  },
  /*        L1ViewImgMaxWHExceedL1origImgMaxWH:function(WH){
            return {rc: 16, msg: 'L1ViewImgMax->' + WH + '不能大于L1origImgMaxWH->'+WH}
          },*/
  viewImgTooSmallToCrop:function(){
    //return {rc: 18, msg: 'L1ViewImgMax的高度和宽度不能同时小于cropImgWH'}
    return {rc: 18, msg: '载入图片的长度和宽度不能小于裁剪后图片的长度和宽度'}
  },
}




// let finalResult=misc.objectDeepCopy(loadParameter({}))
// finalResult['error']=error
// module.exports= {finalResult}
// console.log(finalResult)
export  {error}

