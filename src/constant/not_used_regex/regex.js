/**
 * Created by zhang wei on 2017-06-09.
 * 所有正则常量定义
 */
'use strict'
// ~`!@#%&)(_=}{:"><,;'\[\]\\\^\$\*\+\|\?\.\-  转义正则特殊字符
const regex={
  phone:/^1\d{10}$/,
  name:/^[\u4E00-\u9FFF\w]{2,20}$/,
}

export {
  regex,
}
