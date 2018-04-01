/*    gene by D:\ss_vue_express\server_common\maintain\convert2Client\generateClientRule.js  
* 产生client的rule 
*/

"use strict"


const ruleForCreate=
{"user":{"name":[{"required":true,"trigger":"blur,change","message":"昵称不能为空","type":"string"},{"max":20,"trigger":"blur,change","message":"昵称最多20个字符","type":"string"},{"pattern":/^[\u4E00-\u9FFF\w]{2,20}$/,"trigger":"blur,change","message":"昵称必须由2-20个字符组成","type":"string"}],"account":[{"required":true,"trigger":"blur,change","message":"账号不能为空","type":"string"},{"pattern":/^(([\w\u4e00-\u9fa5\-]+\.)*[\w\u4e00-\u9fa5\-]+@([\w\u4e00-\u9fa5\-]+\.)+[A-Za-z]+|1\d{10})$/,"trigger":"blur,change","message":"账号必须是手机号或者email","type":"string"}],"password":[{"required":true,"trigger":"blur,change","message":"密码不能为空","type":"string"},{"pattern":/^[A-Za-z0-9~`!@#%&)(_=}{:\"><,;'\[\]\\\^\$\*\+\|\?\.\-]{6,20}$/,"trigger":"blur,change","message":"密码必须由6-20个字符组成","type":"string"}]}}
const ruleForUpdate=
{"user":{"name":[{"required":false,"trigger":"blur,change","message":"昵称不能为空","type":"string"},{"max":20,"trigger":"blur,change","message":"昵称最多20个字符","type":"string"},{"pattern":/^[\u4E00-\u9FFF\w]{2,20}$/,"trigger":"blur,change","message":"昵称必须由2-20个字符组成","type":"string"}],"account":[{"required":false,"trigger":"blur,change","message":"账号不能为空","type":"string"},{"pattern":/^(([\w\u4e00-\u9fa5\-]+\.)*[\w\u4e00-\u9fa5\-]+@([\w\u4e00-\u9fa5\-]+\.)+[A-Za-z]+|1\d{10})$/,"trigger":"blur,change","message":"账号必须是手机号或者email","type":"string"}],"password":[{"required":false,"trigger":"blur,change","message":"密码不能为空","type":"string"},{"pattern":/^[A-Za-z0-9~`!@#%&)(_=}{:\"><,;'\[\]\\\^\$\*\+\|\?\.\-]{6,20}$/,"trigger":"blur,change","message":"密码必须由6-20个字符组成","type":"string"}]}}

export {ruleForCreate,ruleForUpdate}