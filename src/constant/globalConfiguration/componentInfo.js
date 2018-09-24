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
import {unique} from '../inputValue/manual/not_used_uniqueCheck'
import {extraAttribute} from '../inputValue/manual/extraAttribute'

import {mergeInputAttribute,objectPartlyDeepCopy,objectDeepCopy,genNeedInput} from '../../function/misc'
 import {RichTextEditor} from '../../constant/enum/keyEnum'

import * as globalConfiguration from './globalConfiguration'
import {inf} from 'awesomeprint'
import {urlConfiguration} from '../url/url'

const source={
  inputValueForCreate:inputValueForCreate,
  inputAttribute:inputAttribute,
  inputTempData:inputTempData,
  ruleForCreate:ruleForCreate,
  extraAttribute:extraAttribute,
}
// let collName='user'
function registerInfo(){
  let allowFields=['account','name','password']
  let registerInput=genNeedInput({source:source,collName:'user',allowFields:allowFields,additionalFields:['captcha']})
  let registerInfo={
    formItemInfo:{
      //data
      inputValue:objectDeepCopy(registerInput['inputValue']),
      inputTempData:objectDeepCopy(registerInput['inputTempData']),
      inputAttribute:registerInput['inputAttribute'],
      rule:registerInput['rule'],
      icon:registerInput['icon'],
      iconColor:'#5cadff',
      showStarForRequire:true,
      // inputLabelSize:'inputLabelH3',
      // inputSize:'inputH3',
      labelWidth:60, //0或者undefined，则不显示label；其他数值，显示label
      captchaInfo:{
        captchaImgWidth:80, //px。事先确定好长宽，以便刷新时，如果有refreshIcon存在，此icon位置不会变化
        captchaImgHeight:33,
        refreshIcon:'refresh',//空：无刷新icon；否则显示
        captchaImgId:'register',//防止多个子组件的img的id重复
        captchaURL:urlConfiguration.standAlone.captcha,
        getAfterMounted:false,
      },
    },
    // initInputValue:registerMergeResult['inputValue'],
    //   inputAttribute:registerMergeResult['inputAttribute'],
    //   ruleForCreate:registerMergeResult['rule'],
    //   // ruleForUpdate:ruleForUpdate.user,
    //   inputTempData:registerMergeResult['inputTempData'],
    //   unique:unique.user,
    //
    //
    //   span:extraAttribute.user,
  }
  return registerInfo
}


function loginInfo(){
  let allowFields=['account','password']
  let loginMergeResult=genNeedInput({source:source,collName:'user',allowFields:allowFields,additionalFields:['captcha']})
  let loginInfo={
    formItemInfo:{
      inputValue:objectDeepCopy(loginMergeResult['inputValue']),
      inputAttribute:loginMergeResult['inputAttribute'],
      rule:loginMergeResult['rule'],
      inputTempData:objectDeepCopy(loginMergeResult['inputTempData']),
      icon:loginMergeResult['icon'],
      iconColor:'#5cadff',

      showStarForRequire:true,
      labelWidth:60, //0或者undefined，则不显示label；其他数值，显示label

      captchaInfo:{
        captchaImgWidth:80, //px。事先确定好长宽，以便刷新时，如果有refreshIcon存在，此icon位置不会变化
        captchaImgHeight:33,
        refreshIcon:'refresh',//空：无刷新icon；否则显示
        captchaImgId:'login',//防止多个子组件的img的id重复
        captchaURL:urlConfiguration.standAlone.captcha,
        getAfterMounted:true,
      },
    },
  }
  return loginInfo
}

// inf('loginMergeResult[\'rule\']',loginMergeResult['rule'])
function changePasswordInfo(){
  let allowFields=['password']
  let changePasswordInput=genNeedInput({source:source,collName:'user',allowFields:allowFields,additionalFields:undefined})
  let changePasswordInfo={
    formItemInfo:{
      inputValue:objectDeepCopy(changePasswordInput['inputValue']),
      inputAttribute:changePasswordInput['inputAttribute'],
      rule:changePasswordInput['rule'],
      inputTempData:objectDeepCopy(changePasswordInput['inputTempData']),
      showStarForRequire:false,
      // icon:icon.user,
      // iconColor:'#5cadff',
      labelWidth:80, //0或者undefined，则不显示label；其他数值，显示label
    },
  }
  return changePasswordInfo
}

function userInfo(){
  let allowFields=['name']
  let userInput=genNeedInput({source:source,collName:'user',allowFields:allowFields,additionalFields:undefined})
  let userInfo={
    formItemInfo:{
      inputValue:objectDeepCopy(userInput['inputValue']),
      inputAttribute:userInput['inputAttribute'],
      rule:userInput['rule'],
      inputTempData:objectDeepCopy(userInput['inputTempData']),
      // icon:userInput['icon'],
      // iconColor:'#5cadff',
      showStarForRequire:false,


      labelWidth:80, //0或者undefined，则不显示label；其他数值，显示label
    },
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
  return userInfo
}


let captchaInfo={
  captchaImgWidth:80, //px。事先确定好长宽，以便刷新时，如果有refreshIcon存在，此icon位置不会变化
  captchaImgHeight:33,
  refreshIcon:'refresh',//空：无刷新icon；否则显示
  captchaImgId:'phone',//防止多个子组件的img的id重复
  // captchaURL:'/user/captcha',
  getAfterMounted:false,
}

let headerInfo={
  itemsInHeader:[{name:"注册",href:"register"},{name:"登录",href:"login"}],
    // userName:this.$store.state.headerInfo.userName
}

let footerInfo={
  year:'2018',
}

function autoGenFormItemInfo(){
  let mergeResult=mergeInputAttribute({sourceCollInputAttribute:inputAttribute.user,extraCollInputAttribute:extraAttribute.user,allowFields:['name']})
  let autoGenFormItemInfo={
    inputValue:[], //直接传入，以便可以自己使用（get的时候，直接传入，put的时候，直接获得修改后的值）
    fieldTempData:inputTempData.user.name,
    fieldAttribute:mergeResult.name,//inputAttribute.user.name
    fieldRule:ruleForCreate.user.name,

    // labelWidth:80, //0或者undefined，则不显示label；其他数值，显示label

    // icon:icon.user.name,
    // iconColor:'#5cadff',

    refName:'test', //组件含有form，需要使用单独的名字设置ref
    inputWidth:100,//px，每个input的长度
    maxNum:4, //最多几项

    showStarForRequire:false,

    wholeArrangeMode:'v',//2个部分：formItem(with label)/button排列方式  //用v，h的话，button无法和input水平对齐


    // inputLabelSize:'inputLabelH3',
    // inputSize:'inputH3',
    // labelWidth:80,
  }
  return autoGenFormItemInfo
}


/*
* 子组件：formItem+autoGenFormItem
* */
// let inputAttributeForTags=mergeInputAttribute({sourceCollInputAttribute:inputAttribute.article,extraCollInputAttribute:extraAttribute.article,allowFields:['tags']})
// inputValueForCreate.article.tags=[]

function articleInfo(){
  let allowFieldForArticle=['name','tags','htmlContent']//
  let articleInput=genNeedInput({collName:'article',allowFields:allowFieldForArticle})
// inf(' maxNum:articleInput[\'addItemButtonDisable\']', maxNum:articleInput['addItemButtonDisable'])
  let articleInfo={
    ref:{
      form:{
        articleForm:'articleForm',
      },
      formItem:{
        articleFormItem:'articleFormItem',//用来调用formitem的函数validateAll
      },
    },
    formItemInfo:{
      //data
      inputValue:objectDeepCopy(articleInput['inputValue']),
      inputTempData:objectDeepCopy(articleInput['inputTempData']),
      inputAttribute:articleInput['inputAttribute'],
      rule:articleInput['rule'],
      // icon:icon,
      // iconColor:'#5cadff',
      labelWidth:160, //若要实现label-left的效果，必须设置width，以便实现margin-left
      showStarForRequire:true,
      inputLabelSize:'inputLabelH3',
      inputSize:'inputH6',
      /**   richTextEditor configuration    **/
      richTextEditorConfiguration:{
        name:RichTextEditor.WANG_EDITOR,
      },
      /*    autoGen(repeat field) config      */
      inputArrayTempData:articleInput['inputArrayTempData'], //单个字段，所有生成input的attribute。由genNeedInput生成
      inputArrayAttribute:articleInput['inputArrayAttribute'],//单个字段，所有生成input的attribute。由genNeedInput生成
      addItemButtonDisable:articleInput['addItemButtonDisable'],
      numRange:articleInput['numRange'],
      inputWidth:100,//px，每个input的长度
      wholeArrangeMode:'h',//2个部分：label和input/icon排列方式  //用v，h的话，button无法和input水平对齐
      inputArrangeMode:'h',//autoGen时 formItem的排列方式  //label-position=left==>h  label-position=left==>v
    },
  }

  return articleInfo
}


//用在articleTree中，供用户输入文件夹名称
function articleTreeFolderInfo(){
  let allowFields=['name']
  let folderInput=genNeedInput({source:source,collName:'folder',allowFields:allowFields,additionalFields:undefined})
  let articleTreeFolderInfo={
    ref:{
      form:{
        folderForm:'folderForm',
      },
    },
    formItemInfo:{
      inputValue:objectDeepCopy(folderInput['inputValue']),
      inputTempData:objectDeepCopy(folderInput['inputTempData']),
      inputAttribute:folderInput['inputAttribute'],
      rule:folderInput['rule'],
      // icon:icon,
      // iconColor:'#5cadff',
      showStarForRequire:true,
      inputLabelSize:'inputLabelH5',
      inputSize:'inputH7',
    },
  }
  return articleTreeFolderInfo
}

// inf('articleTreeFolderInfo',articleTreeFolderInfo)
export {
  registerInfo,
  loginInfo,
  changePasswordInfo,
  userInfo,
  autoGenFormItemInfo,
  articleInfo,
  captchaInfo,

  headerInfo,
  footerInfo,

  articleTreeFolderInfo,
}
