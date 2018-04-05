/**
 * Created by zhang wei on 2018/3/12.
 * 所有组件的props
 */
'use strict'


import {inputValueForCreate,inputValueForUpdate} from '../inputValue/gen/inputValue'
import {ruleForCreate,ruleForUpdate} from '../rule/rule'
import {inputAttribute} from '../inputValue/gen/inputAttribute'
import {inputTempData} from '../inputValue/gen/inputTempData'
import {icon} from '../inputValue/manual/icon'
import {unique} from '../inputValue/manual/uniqueCheck'
import {extraAttribute} from '../inputValue/manual/extraAttribute'

let registerInfo={
  initInputValue:inputValueForCreate.user,
    inputAttribute:inputAttribute.user,
    ruleForCreate:ruleForCreate.user,
    ruleForUpdate:ruleForUpdate.user,
    inputTempData:inputTempData.user,
    unique:unique.user,

    labelWidth:60, //0或者undefined，则不显示label；其他数值，显示label
    span:extraAttribute.user,
}

let loginInfo={

  initInputValue:inputValueForCreate.user,
    inputAttribute:inputAttribute.user,
    ruleForCreate:ruleForCreate.user,
    // ruleForUpdate:ruleForUpdate.user,
    inputTempData:inputTempData.user,
    icon:icon.user,
    unique:unique.user,

    labelWidth:80, //0或者undefined，则不显示label；其他数值，显示label

    span:extraAttribute.user,
}

let changePasswordInfo={
  initInputValue:inputValueForCreate.user,
    inputAttribute:inputAttribute.user,
    ruleForCreate:ruleForCreate.user,
    // ruleForUpdate:ruleForUpdate.user,
    inputTempData:inputTempData.user,

    labelWidth:80, //0或者undefined，则不显示label；其他数值，显示label

    span:extraAttribute.user,
}

let userInfo={
  cropInfo:{
    maxFileSize:10*1024*1024, //原始图片最大size
    L1OrigImgMaxWH:{
      width:600, //容纳原始图片的元素的大小
      height:480
    },
    L3BorderWidth:{
      left:5, //裁剪时边框的宽度
      top:5,
    },
    //最终裁剪出来的图片size
    cropImgWH:{
      width:100,
      height:100,
    },
    //滚轮滚动时，每次增加的像素
    zoomStep:{
      horizontal:5,//左右每边
      vertical:5,//上下每边
    },
    containerMargin:{
      top:10,left:10,bottom:10,right:10,
    }
  },
  userIconInfo:{
    borderStyle:'', //头像边框
    borderClass:"radius1", //头像边框的弧度

    imgSrc:undefined, //头像
    imgWidth:'80px', ///头像大小
    imgHeight:'80px',
    imgPadding:'4px', //头像和边框的间距
  }
}

let captchaInfo={
  captchaImgWidth:80, //px。事先确定好长宽，以便刷新时，如果有refreshIcon存在，此icon位置不会变化
  captchaImgHeight:33,
  refreshIcon:'refresh',//空：无刷新icon；否则显示
  captchaImgId:'phone',//防止多个子组件的img的id重复
  captchaURL:'/user/captcha',
  getAfterMounted:false,
}

let headerInfo={
  itemsInHeader:[{name:"注册",href:"register"},{name:"登录",href:"login"}],
    // userName:this.$store.state.headerInfo.userName
}

let footerInfo={
  // year:this.$store.state.footerInfo.year
}
export {
  registerInfo,
  loginInfo,
  changePasswordInfo,
  userInfo,

  captchaInfo,

  headerInfo,
  footerInfo,
}
