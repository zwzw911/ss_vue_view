/**
 * Created by 张伟 on 2018/10/18.
 */
'use strict'
import * as moment from "moment"

function isArray(obj) {
  //return obj && typeof obj === 'object' && Array == obj.constructor;
  return obj instanceof Array// return typeof obj === 'object'  && obj!==null && Array == obj.constructor;
}


function formatDate({record,fieldsToBeFormat,formatType}){
  if(undefined!==record){
    if(true===isArray(record)){
      for(let singleEle of record){
        formatSingleRecordDate({record:singleEle,fieldsToBeFormat:fieldsToBeFormat,formatType:formatType})
      }
    }else{
      formatSingleRecordDate({record:record,fieldsToBeFormat:fieldsToBeFormat,formatType:formatType})
    }
  }
}

function formatSingleRecordDate({record,fieldsToBeFormat,formatType}){
  if(undefined!==record && undefined!==fieldsToBeFormat && true===isArray(fieldsToBeFormat)){
    for(let singleField of fieldsToBeFormat){
      // console.log(record[singleField])
      record[singleField]=moment(record[singleField]).format("YYYY-MM-DD HH:mm")
      // console.log(record[singleField])
    }
  }
}

export {
  isArray,
  formatDate,
}

// formatSingleRecordDate({record:{"cDate":"2018-10-15T14:25:34.627Z"}})
