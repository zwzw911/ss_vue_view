"use strict"


const ruleForCreate=
{"user":{"name":{"type":"string","pattern":{},"required":true},"account":{"type":"string","pattern":{},"required":true},"password":{"type":"string","pattern":{},"required":true},"userType":{"type":"string","enum":["10"],"required":true}}}
const ruleForUpdate=
{"user":{"name":{"type":"string","pattern":{},"required":false},"account":{"type":"string","pattern":{},"required":false},"password":{"type":"string","pattern":{},"required":false}}}

module.exports={ruleForCreate,ruleForUpdate}