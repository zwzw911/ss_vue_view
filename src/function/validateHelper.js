/**
 * Created by zhang wei on 2018/2/16.
 */
'use strict'


const dataTypeCheck= {
  //是否已经赋值
  isSetValue(variant){
    return (undefined !== variant && null !== variant)
  },
  //已经赋值，赋的值是不是为空（string:空字符串；object:{},array:[]）
  isEmpty(value) {
    if (undefined === value || null === value ) {
      //console.log(`null/undefined/NaN checked`)
      return true
    }
    switch (typeof value) {
      case "string":
        return ( "" === value || 0 === value.length || "" === value.trim());
      case "object":
        if (true === this.isArray(value)) {
          return 0 === value.length

        } else {
          return 0 === Object.keys(value).length
        }
    }
    return false
  },

  isArray(obj) {
    return obj instanceof Array
  },

  isObject(obj){
    return typeof obj === 'object' && obj!==null && Object == obj.constructor;
  },
  isString(value){
    return typeof value === 'string'
  },
//检查是否有效日期; 返回false或者转换后的日期
  isDate(date) {
    let parsedDate=new Date(date)
    if(parsedDate.toLocaleString() ===  'Invalid Date'){
      return false
    }
    return parsedDate;
    //}
  },
  /*isInt(value) {
    //首先检查类型，只对number或者string进行处理（否则parseInt对array也起作用）
    let tmpType=typeof value
    if(tmpType!='number' && tmpType!='string'){
      return false
    }
    let parsedInt=parseInt(value)
    if(isNaN(parsedInt)){
      return false
    }
    //对于字符来说，如果小数点之后是全0，认为不是整数（即'1.0'不等于'1'）
    if (typeof value == 'string') {
      /!*console.log(`${value} is string`)
       console.log(parseInt(value).toString()===value)*!/
      if(parsedInt.toString() !== value){
        return false
      }
    }
    if (typeof value == 'number') {
      //对于数值来说，如果小数点之后是全0，认为是整数（即1.0等于1）
      if( parsedInt !== value){
        return false
      }
    }
    return parsedInt
    //return false
  },*/
  //严格模式，待检查值是数值（而不是字符）
  //value===parseInt(value)============> 1.0=>1
  isStrictInt(value){
    return ('number'===typeof value && !isNaN(parseInt(value)) && value===parseInt(value))
  },
  isStrictFloat(value){
    //json格式，可以传送原始数据格式
    //可能会出现1.0===>1  1234567891234567891234567899===>1.23456789e25，所以只能通过NaN判断是否为浮点
    return ('number'===typeof value && !isNaN(parseFloat(value)) && value===parseFloat(value))

  },
  //返回整数或者浮点数
  isStrictNumber(value){
    //json格式，可以传送原始数据格式
    //可能会出现1.0===>1  1234567891234567891234567899===>1.23456789e25，所以只能通过NaN判断是否为浮点
    return ('number'===typeof value && !isNaN(Number(value)) && value===Number(value))

  },
  //整数，但是超出int所能表示的范围（无法处理，大数会变成科学计数法，从而无法用regex判断）。所以只能处理string类型
  isNumber(value) {

    //是NaN，则确定必然是非number
    if(isNaN(value)){
      return false
    }
    //非NaN，还要排除是不是空数组或者空字符，这2个可以被转换成数字0
    let r=Number(value)
    //如果转换后是0，要判断是不是[]或者''转换得到的
    if(r===0){
      return r.toString() === value.toString()
    }
    return true
    //非字符，直接用isInt和isFloat判断
    /*        if('string' !== typeof value){
                //value=value.toString()
                return false //无法处理数字，因为大数字在赋值时被转换成科学计数法，从而无法用regex判断
            }else{
                //字符，使用
                return regex.number.test(value)
            }*/

  },

  //对于大的数字，parseFloat会转换成科学计数法(1.23e+56)
  isFloat(value){
    //首先检查类型，只对number或者string进行处理（否则parseInt对array也起作用）
    let tmpType=typeof value
    if(tmpType!='number' && tmpType!='string'){
      return false
    }
    let parsedValue=parseFloat(value)
    if(true===isNaN(parsedValue)){
      return false
    }
    if('string' === typeof value){
      //==，string隐式转换成数字进行比较
      if( parsedValue!=value){
        return false
      }
    }

    if (typeof value == 'number') {
      if(parsedValue !== value){
        return false
      }
    }

    return parsedValue
  },


  isPositive(value) {

    let parsedValue = parseFloat(value)
    /*        if(isNaN(parsedValue)){
     return false
     }*/
    return parsedValue > 0
  },
  isFolder(path) {
    return fs.existsSync(path) && fs.statSync(path).isDirectory()
  },

  isFile(file) {
    return fs.existsSync(file) && fs.statSync(file).isFile()
  },
  isBoolean(value){
    return (typeof value === 'boolean')
  },
  isObjectId(value){
    return this.isString(value) && regex.objectId.test(value)
  }
}

export {
  dataTypeCheck,
}
