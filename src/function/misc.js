/**
 * Created by ada on 2018/2/7.
 */
'use strict'


function objectDeepCopy(sourceObj){
  if(undefined===sourceObj || null===sourceObj){
    return sourceObj
  }

  return JSON.parse(JSON.stringify(sourceObj))
}

/*  childArray中的每个元素都包含在parentArray中
*
* */
function ifArrayContainArray({parentArray,childArray}){
  if(childArray.length===0 || parentArray.length===0){
    return false
  }
  for(let singleChildEle of childArray){
    if(-1===parentArray.indexOf(singleChildEle)){
      return false
    }
  }
  return true
}

export {
  objectDeepCopy,
  ifArrayContainArray,
}

