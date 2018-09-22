/**
 * Created by 张伟 on 2018/8/25.
 */
'use strict'

/******************************/
/**    common function       **/
/******************************/
import {pageViewWH} from '../components/helperLib/componentsHelperLib'

//网络操作返回的结果进行判别，如果有错误，显示
function showErrorInModal({that,msg}){
  that.$Modal.error({
    title: '错误',
    content: msg
  });
}

/**   使用message显示错误   **/
function showErrorInCenterMessage({that,msg,title='错误'}){
  let {W,H}=pageViewWH()
  let top=parseInt(H)/2
  // that.$Notice.config({
  //   top:200,
  // })
  that.$Notice.error({
    title: '错误 ',
    desc: msg,
    // top:top,
  });
}
export {
  showErrorInModal,
  showErrorInCenterMessage,
}
