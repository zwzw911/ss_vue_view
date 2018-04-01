"use strict"


const additionalRuleForCreate=
{"captcha":[{"required":true,"trigger":"blur,change","message":"图形验证码不能为空","type":"string"},{"pattern":/^[\da-zA-Z]{4}$/,"trigger":"blur,change","message":"由4个英文或者数字组成","type":"string"}]}
const additionalRuleForUpdate=
  {"captcha":[{"required":true,"trigger":"blur,change","message":"图形验证码不能为空","type":"string"},{"pattern":/^[\da-zA-Z]{4}$/,"trigger":"blur,change","message":"由4个英文或者数字组成","type":"string"}]}

export {additionalRuleForCreate,additionalRuleForUpdate}