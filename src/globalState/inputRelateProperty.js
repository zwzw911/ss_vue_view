/**
 * Created by Ada on 2018/02/01.
 */
'use strict'

import {inputValueForCreate,inputValueForUpdate} from '../constant/inputValue/gen/inputValue'
import {inputAttribute} from '../constant/inputValue/gen/inputAttribute'
import {inputTempData} from '../constant/inputValue/gen/inputTempData'
import {ruleForCreate,ruleForUpdate} from '../constant/rule/rule'

// inputRule/Attribute/Value/Tempdata，不可改变，实际copy副本，然后使用
let inputRelatePropertyInfo={
  state:{
    inputValueForCreate:inputValueForCreate,
    inputValueForUpdate:inputValueForUpdate,
    inputAttribute:inputAttribute,
    inputTempData:inputTempData,
    ruleForCreate:ruleForCreate,
    ruleForUpdate:ruleForUpdate,
  },
  getters:{},
  mutations:{
  },
  actions:{}
}



export {
  inputRelatePropertyInfo,

}
