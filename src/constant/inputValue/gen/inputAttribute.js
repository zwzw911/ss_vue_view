/*    gene by D:\ss_vue_express\server_common\maintain\convert2Client\generateClientInputAttribute.js  
* 字段的非rule属性，例如label，placeHolder，unique等 
*/

"use strict"


const inputAttribute=
{"user":{"name":{"label":"昵称","placeHolder":["昵称，由2-20个字符组成"],"placeHolderBkup":["昵称，由2-20个字符组成"],"unique":true},"account":{"label":"账号","placeHolder":["请输入您的手机号","请输入您的电子邮件地址"],"placeHolderBkup":["请输入您的手机号","请输入您的电子邮件地址"],"unique":true},"password":{"label":"密码","placeHolder":["密码，由6-20个字母、数字、特殊字符组成"],"placeHolderBkup":["密码，由6-20个字母、数字、特殊字符组成"],"inputType":"password"},"photoDataUrl":{"label":"用户头像","placeHolder":[""],"placeHolderBkup":[""]}}}

export {inputAttribute}