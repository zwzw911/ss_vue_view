/**
 * Created by zhang wei on 2018/3/9.
 */
'use strict'
/*
* span:{width,offset}
* inputType:
* autoGen:boolean，input是否需要自增
* autoSize：当inputType为textarea，才需要设置
* uniqueCheckUrl:如果字段需要unique check，对应的urlConfiguration（url+method）
* */
import {extraAttributeFieldName} from '../../../constant/enum/keyEnum'

const extraAttribute={
  user:{
    name:{
      span:{
        width:undefined,//undefined=24, 1~24
        offset:undefined,//undefined=0, 1~24
      },
      inputType:'text', //text、password、textarea、url、email、date
      // autoSize:{minRows:1,maxRows:5}, //或者true
      // inputSize:'title', //使用超大字体
      [extraAttributeFieldName.UNIQUE_CHECK_URL]:{url:'/user/uniqueCheck',method:'post'},
    },
    account:{
      span:{
        width:undefined,//undefined=24, 1~24
        offset:undefined,//undefined=0, 1~24
      },
      inputType:'text',
      [extraAttributeFieldName.UNIQUE_CHECK_URL]:{url:'/user/uniqueCheck',method:'post'},
    },
    password:{
      span:{
        width:undefined,//undefined=24, 1~24
        offset:undefined,//undefined=0, 1~24
      },
      inputType:'password',
    }
  },

  article:{
    name:{
      inputType:'text'
    },
    status:{
      // inputType:'text'
    },
    tags:{
      inputType:'text',
      autoGen:true,
    },
    folderId:{},
    htmlContent:{
      inputType:'textarea',
      autoSize:{minRows:10,maxRows:20}, //或者true
    },
    // tags:{},//单独使用
    categoryId:{}
  },
}

export {extraAttribute}
