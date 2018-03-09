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

/*  部分copy对象
* @expectedKey:需要copy的key
* */
function objectPartlyDeepCopy({sourceObj,expectedKey}){
  if(undefined===sourceObj || null===sourceObj){
    return sourceObj
  }

  let copyObject={}
  for(let singleKey of expectedKey){
    if(undefined!==sourceObj[singleKey]){
      copyObject[singleKey]=JSON.parse(JSON.stringify(sourceObj[singleKey]))
    }
  }
  return copyObject
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

/*  使用html5原生的FileReader读取文件
* @inputId：选择文件的inputId
* @readType：以何种方式读取文件。text/dataURL/binary 3种
* @maxSize: 读取文件最大size。byte
* */
//0. 检测fileRead是否可用
//1，根据readType检测文件类型是否正确
//2. 检测文件size是否介于0和maxSize
//3. 根据readType读取文件
async function nativeReadFile_async({inputId,readType,maxSize}){
  //在onload触发之后，才能获得file内容，所以是异步操作
  return new Promise(function(resolve,reject){
    if(undefined === typeof FileReader){
      return reject({rc:1,msg:"当前浏览器版本过低，请升级到最新版本后重试"});

    }

    let reader=new FileReader()
    let file=document.getElementById(inputId).files[0]

    // console.log('file',file)
    if(undefined===file){
      return reject ({rc:2,msg:'请先选择要上传的文件'})
    }

    if(0===file.size){
      return reject({rc:3,msg:'文件内容为空'})

    }
    if(maxSize<file.size){
      return reject({rc:4,msg:'文件超过预定义大小'})
      // return deferred.promise;
    }

    switch (readType){
      case 'text':
        if('text/plain'!==file.type){
          return reject({rc:5,msg:'文件必须是文本文件'})
        }
        reader.readAsText(file)
        reader.onload=function(e){
          return resolve({rc:0,msg:{fileContent:this.result,fileName:file.name,fileSize:file.size}})
        }
        break;
      case 'dataURL':
        if('image/png'!==file.type && 'image/jpeg'!==file.type && 'image/gif'!==file.type){
          return reject({rc:6,msg:'文件必须是图片文件'})
        }
        reader.readAsDataURL(file)
        reader.onload=function(e){
          return resolve({rc:0,msg:{fileContent:this.result,fileName:file.name,fileSize:file.size}})
        }

        break;
      case 'binary':
        reader.readAsBinaryString(file)
        reader.onload=function(e){
          return resolve({rc:0,msg:{fileContent:this.result,fileName:file.name,fileSize:file.size}})
        }
        break;
    }
  })


}
export {
  objectPartlyDeepCopy,
  objectDeepCopy,
  ifArrayContainArray,
  nativeReadFile_async,
}

