/**
 * Created by 张伟 on 2018/12/16.
 * 将子组件的props的完整模板放置此文件，方便使用
 */
'use strict'

/**   component/subLayoutComponents/modalResult   **/
const modalResultError={
  configuration:{
    show:false,//是否显示本组件
    headerIcon:'md-close-circle',
    headerIconClass:'h3 color-error',
    titleClass:'marginL2',
    title:'错误',
    content:'操作错误',
    contentClass:'marginL7 h5',

    yesButtonShow:true,
    yesButtonType:'primary',//、dashed、text、info、success、warning、error,
    yesButtonContent:'确定',
    yesButtonFunction:undefined,

    noButtonShow:true,
    noButtonType:'dashed',
    noButtonContent:'退出',
    noButtonFunction:undefined, //点击按钮后，需要执行的操作
  },


}

const modalResultSuccess={
  configuration:{
    show:false,//是否显示本组件
    headerIcon:'md-checkmark-circle',
    headerIconClass:'h3 color-success',
    titleClass:'marginL2',
    title:'成功',
    content:'操作成功',
    contentClass:'marginL7 h5',

    yesButtonShow:true,
    yesButtonType:'primary',//、dashed、text、info、success、warning、error,
    yesButtonContent:'确定',
    yesButtonFunction:undefined,

    noButtonShow:true,
    noButtonType:'dashed',
    noButtonContent:'退出',
    noButtonFunction:undefined, //点击按钮后，需要执行的操作
  },
}

const modalResultLogin={
  configuration:{
    show:false,//是否显示本组件
    headerIcon:undefined,
    headerIconClass:'h3 color-success',
    titleClass:'marginL2',
    title:'登录',
    content:'操作成功',
    contentClass:'marginL7 h5',

    yesButtonShow:true,
    yesButtonType:'primary',//、dashed、text、info、success、warning、error,
    yesButtonContent:'确定',
    yesButtonFunction:undefined,

    noButtonShow:true,
    noButtonType:'dashed',
    noButtonContent:'退出',
    noButtonFunction:undefined, //点击按钮后，需要执行的操作
  },
}

const modalChooseFriend={
  configuration:{
    show:false,//是否显示本组件
    headerIcon:undefined,
    headerIconClass:'h3 color-success',
    titleClass:'marginL2',
    title:'选择好友',
    content:'',
    contentClass:'',

    yesButtonShow:true,
    yesButtonType:'primary',//、dashed、text、info、success、warning、error,
    yesButtonContent:'确定',
    yesButtonFunction:undefined,

    noButtonShow:true,
    noButtonType:'dashed',
    noButtonContent:'退出',
    noButtonFunction:undefined, //点击按钮后，需要执行的操作
  },
}

const modalChooseCollection={
  configuration:{
    show:false,//是否显示本组件
    headerIcon:undefined,
    headerIconClass:'h3 color-success',
    titleClass:'marginL2',
    title:'选择收藏夹',
    content:'',
    contentClass:'',

    yesButtonShow:true,
    yesButtonType:'primary',//、dashed、text、info、success、warning、error,
    yesButtonContent:'确定',
    yesButtonFunction:undefined,

    noButtonShow:true,
    noButtonType:'dashed',
    noButtonContent:'退出',
    noButtonFunction:undefined, //点击按钮后，需要执行的操作
  },
}

const modalCreateCollectionName={
  configuration:{
    show:false,//是否显示本组件
    headerIcon:undefined,
    headerIconClass:'h3 color-success',
    titleClass:'marginL2',
    title:'新建收藏夹名称',
    content:'',
    contentClass:'',

    yesButtonShow:true,
    yesButtonType:'primary',//、dashed、text、info、success、warning、error,
    yesButtonContent:'确定',
    yesButtonFunction:undefined,

    noButtonShow:true,
    noButtonType:'dashed',
    noButtonContent:'退出',
    noButtonFunction:undefined, //点击按钮后，需要执行的操作
  },
}
const modalUpdateCollectionName={
  configuration:{
    show:false,//是否显示本组件
    headerIcon:undefined,
    headerIconClass:'h3 color-success',
    titleClass:'marginL2',
    title:'新建收藏夹名称',
    content:'',
    contentClass:'',

    yesButtonShow:true,
    yesButtonType:'primary',//、dashed、text、info、success、warning、error,
    yesButtonContent:'确定',
    yesButtonFunction:undefined,

    noButtonShow:true,
    noButtonType:'dashed',
    noButtonContent:'退出',
    noButtonFunction:undefined, //点击按钮后，需要执行的操作
  },
}
module.exports={
  modalResultError,
  modalResultSuccess,
  modalResultLogin,
  modalChooseFriend,
  modalChooseCollection,
  modalCreateCollectionName,
  modalUpdateCollectionName,
}
