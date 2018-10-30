/**
 * Created by Ada on 2018/2/17.
 */
'use strict'
// import {inf,wrn,err} from 'awesomeprint'

/*    初始化img的位置参数，设成空，以便正确计算载入图片的位置参数   */
function init({ele_L1_origImg}){
  ele_L1_origImg.style.top=''
  // L1_origImg.bottom=0
  ele_L1_origImg.style.left=''
  // L1_origImg.right=0
  ele_L1_origImg.style.width=''
  ele_L1_origImg.style.height=''

}
//通过props从父组件传递进来的参数cropInfo
function loadParameter({props_cropInfo}){
 // console.log(JSON.stringify(props_cropInfo))
  //如果传入参数没有设置width/height，那么使用默认值
  let maxFileSize=2*1024*1024
  let L1OrigImgMaxWH={width:600, height:480}
  let L3BorderWidth={left:10,top:10}
  //最终裁剪出来的图片size
  let cropImgWH={width:100,height:100}
  //滚轮滚动时，每次增加的像素
  let zoomStep={horizontal:5,vertical:5}
  let containerMargin={top:10,bottom:10,left:10,right:10}

  if(undefined!==props_cropInfo){
    if(undefined!==props_cropInfo.maxFileSize){
      maxFileSize=props_cropInfo.maxFileSize
    }

    if(undefined!==props_cropInfo.L1OrigImgMaxWH && undefined!==props_cropInfo.L1OrigImgMaxWH.width){
      L1OrigImgMaxWH.width=props_cropInfo.L1OrigImgMaxWH.width
    }
    if(undefined!==props_cropInfo.L1OrigImgMaxWH && undefined!==props_cropInfo.L1OrigImgMaxWH.height){
      L1OrigImgMaxWH.height=props_cropInfo.L1OrigImgMaxWH.height
    }


    if(undefined!==props_cropInfo.L3BorderWidth && undefined!==props_cropInfo.L3BorderWidth.left){
      L3BorderWidth.left=props_cropInfo.L3BorderWidth.left
    }
    if(undefined!==props_cropInfo.L3BorderWidth && undefined!==props_cropInfo.L3BorderWidth.top){
      L3BorderWidth.top=props_cropInfo.L3BorderWidth.top
    }

    if(undefined!==props_cropInfo.cropImgWH && undefined!==props_cropInfo.cropImgWH.width){
      cropImgWH.width=props_cropInfo.cropImgWH.width
    }
    if(undefined!==props_cropInfo.cropImgWH && undefined!==props_cropInfo.cropImgWH.height){
      cropImgWH.height=props_cropInfo.cropImgWH.height
    }


    if(undefined!==props_cropInfo.zoomStep && undefined!==props_cropInfo.zoomStep.horizontal){
      zoomStep.horizontal=props_cropInfo.zoomStep.horizontal
    }
    if(undefined!==props_cropInfo.zoomStep && undefined!==props_cropInfo.zoomStep.vertical){
      zoomStep.vertical=props_cropInfo.zoomStep.vertical
    }

    if(undefined!==props_cropInfo.containerMargin){
      for(let singleDirection in containerMargin){
        if(undefined!==props_cropInfo.containerMargin[singleDirection]){
          containerMargin[singleDirection]=props_cropInfo.containerMargin[singleDirection]
        }
      }

    }
  }


  return {
    maxFileSize,
    L1OrigImgMaxWH,
    L3BorderWidth,
    cropImgWH,
    zoomStep,
    containerMargin,
  }
}

/*获得元素的位置参数
*
* */
function getPosPara(element){
  let result={}
  let pos=element.getBoundingClientRect()

  if(undefined ===element.naturalWidth){
    if(undefined === pos.width ){
      result.width=pos.right-pos.left
      result.height=pos.top-pos.bottom
    }else{
      result.width=pos.width
      result.height=pos.height
    }
  }else{
    result['width']=element.naturalWidth
    result['height']=element.naturalHeight
  }


  let posMember=['top','bottom','left','right']
  for(let singlePosMember of posMember){
    result[singlePosMember]=Math.round(pos[singlePosMember])
  }


  return result
}

/*
/!*    获得的bottom/right，基于container进行处理
* @pos:要修改的参数
* @L0ContainerPos：基准参数
* *!/
function adjustBT({pos,L0ContainerPos}){
  pos['right']-=L0ContainerPos['left']
  pos['bottom']-=L0ContainerPos['top']
}
*/


/*  设置元素的top/left/width/height（L1_img）
* @posPara:要设置的数据
* @element：数据设置到哪个元素上
* */
function setPos({element,posPara}){
  let posMember=['top','left','width','height']
  for(let singlePosMember of posMember){
    element.style[singlePosMember]=posPara[singlePosMember]+'px'
    // posVariant[singlePosMember]=posPara[singlePosMember]
  }
}

/*  根据LOMaxWH和L1的width/height，计算ratio
*
* 返回ratio
* */
function calcRatio({L1OrigImgMaxWH,L1OrigImagePos}){
  let widthRatio=1,heightRatio=1
  let tmp
  // if(L1OrigImagePos.width>L1OrigImgMaxWH.width ){
    tmp=parseFloat((L1OrigImagePos.width/L1OrigImgMaxWH.width).toFixed(2))
  widthRatio= tmp>1 ? tmp :1
  // }
  // if(L1OrigImagePos.height>L1OrigImgMaxWH.height){
    tmp=parseFloat((L1OrigImagePos.height/L1OrigImgMaxWH.height).toFixed(2))
  heightRatio= tmp>1 ? tmp :1
  // }
// inf('widthRatio',widthRatio)
//   inf('heightRatio',heightRatio)
  //高或宽小于裁剪框，者缩小裁剪框
  // if(widthRatio<1 || heightRatio<1){
  //   return widthRatio<heightRatio ? widthRatio:heightRatio
  // }else{
  if(widthRatio>=1 || heightRatio>=1){
    return widthRatio>=heightRatio ? widthRatio:heightRatio
  }

  // }

}
/*  根据ratio设置L1OrigImagePos
*
* */
function calcL1OrigImagePosBaseRatio({L1OrigImagePos,ratio}){
  if(ratio>=1){
    for(let singleAttr in L1OrigImagePos){
      L1OrigImagePos[singleAttr]=Math.floor(L1OrigImagePos[singleAttr]/ratio)
    }
    // L1OrigImagePos.width=Math.floor(L1OrigImagePos.width/ratio)
    // L1OrigImagePos.height=Math.floor(L1OrigImagePos.height/ratio)
  }
}
/*    重新计算L1_img的top和left，以便居中（相对L0_div）
      父div使用relative，以便在flex可以使用的情况下，子元素使用absolute（否则，absolute只能相对body元素）
* */
function calcImgPosToSetCenter({L0PosPara,L1OrigImagePos}){
    if(L1OrigImagePos.width<=L0PosPara.width){
      L1OrigImagePos.left=Math.floor((L0PosPara.width-L1OrigImagePos.width)/2)
      L1OrigImagePos.right=L1OrigImagePos.left+L1OrigImagePos.width
    }
  // L1OrigImagePos.left=L0PosPara.left
  // L1OrigImagePos.left=0
  if(L1OrigImagePos.height<=L0PosPara.height){
    L1OrigImagePos.top=Math.floor((L0PosPara.height-L1OrigImagePos.height)/2)
    L1OrigImagePos.bottom=L1OrigImagePos.top+L1OrigImagePos.height
  }
}

/*    重新计算L2_coverZone的top和left，以便居中（相对L0_div），还需要考虑用到borderWidth（用来实现遮罩的效果）
      父div使用relative，以便在flex可以使用的情况下，子元素使用absolute（否则，absolute只能相对body元素）
* */
function calcCoverZonePosToSetCenter({L1OrigImgMaxWH,L2_boardWidth,visiblePartPos}){
  L2_boardWidth.topWidth=L2_boardWidth.bottomWidth=(L1OrigImgMaxWH.height-visiblePartPos.height)/2
  L2_boardWidth.leftWidth=L2_boardWidth.rightWidth=(L1OrigImgMaxWH.width-visiblePartPos.width)/2
}

/*   初始化VisiblePartPos，使其居中
* */
function calcVisiblePartPosToCenter({visiblePartPos,L1OrigImgMaxWH,ratio,cropImgWH}){

}
/*    根据mouse的X/Y，计算L2可显示部分的left/top，作为L2 boardWidth和L3 top/left的依据
* @visiblePartPos:虚拟裁剪框
* @mouseX,mouseY: 鼠标相对于L0的坐标
* @L1OrigImagePos: 计算cover可见部分的边界
*
* 返回L2可显示部分的left/top
* */
function calcCoverZoneVisiblePartPos({visiblePartPos,mouseX,mouseY,L1OrigImagePos}) {
  //根据鼠标坐标，计算coverZone显示部分的left/top，依次计算出L2BoardWidth
// inf('visiblePartPos',visiblePartPos)
//   inf('visiblePartPos。width',visiblePartPos.width)
let halfVisiblePartPosWidth=(visiblePartPos.width / 2).toFixed(2)
  let halfVisiblePartPosHeight=(visiblePartPos.height / 2).toFixed(2)
  halfVisiblePartPosWidth=parseFloat(halfVisiblePartPosWidth)
  halfVisiblePartPosHeight=parseFloat(halfVisiblePartPosHeight)
  // inf('halfVisiblePartPosWidth',halfVisiblePartPosWidth)
  // inf('halfVisiblePartPosHeight',halfVisiblePartPosHeight)
  //如果图片的宽度大于裁剪框的宽度
  if(L1OrigImagePos.width>visiblePartPos.width){
    //超出img的left
    if (mouseX - halfVisiblePartPosWidth < L1OrigImagePos.left) {
      visiblePartPos.left = L1OrigImagePos.left
    }
    //是否超出right
    else if (mouseX + halfVisiblePartPosWidth > L1OrigImagePos.left + L1OrigImagePos.width) {
      visiblePartPos.left = L1OrigImagePos.left + L1OrigImagePos.width - visiblePartPos.width
    } else {
      visiblePartPos.left = mouseX - halfVisiblePartPosWidth
    }
  }else{
    visiblePartPos.left=L1OrigImagePos.left-(visiblePartPos.width-L1OrigImagePos.width)/2

  }

  //如果图片的高度大于裁剪框的高度
  if(L1OrigImagePos.height>visiblePartPos.height){
    //是否超出img的top
    if (mouseY - halfVisiblePartPosHeight < L1OrigImagePos.top) {
      visiblePartPos.top = L1OrigImagePos.top
    }
    //是否超出bottom
    else if (mouseY + halfVisiblePartPosHeight> L1OrigImagePos.top + L1OrigImagePos.height) {
      visiblePartPos.top = L1OrigImagePos.top + L1OrigImagePos.height - visiblePartPos.height
    } else {
      visiblePartPos.top = mouseY - halfVisiblePartPosHeight
    }
  }else{
    visiblePartPos.top=L1OrigImagePos.top-(visiblePartPos.height-L1OrigImagePos.height)/2
  }
// inf('calc visiblePartPos',visiblePartPos)
  //对计算值四舍五入
  for(let singleKey in visiblePartPos){
    visiblePartPos[singleKey]=Math.round(visiblePartPos[singleKey])
  }
  // inf('after round visiblePartPos',visiblePartPos)
  // return visiblePartPos
}

/* 根据函数calcCoverZoneVisiblePartPos计算得到的L2可见部分的top/left，计算L2的boardWidth
*
* */
function calcL2BoardWidthBaseOnVisiblePartPos({visiblePartPos,L0ContainerPos,L2_boardWidth}){
  L2_boardWidth.leftWidth=visiblePartPos.left
  L2_boardWidth.rightWidth=L0ContainerPos.width-visiblePartPos.left-visiblePartPos.width
  L2_boardWidth.topWidth=visiblePartPos.top
  L2_boardWidth.bottomWidth=L0ContainerPos.height-visiblePartPos.top-visiblePartPos.height
  // inf('calc L2_boardWidth',L2_boardWidth)
}
function setL2BoardWidth({L2_boardWidth,L2_coverZone}){
  // inf('to be set  L2_boardWidth',L2_boardWidth)
  L2_coverZone.style.borderLeftWidth=L2_boardWidth.leftWidth+'px'
  L2_coverZone.style.borderTopWidth=L2_boardWidth.topWidth+'px'
  L2_coverZone.style.borderRightWidth=L2_boardWidth.rightWidth+'px'
  L2_coverZone.style.borderBottomWidth=L2_boardWidth.bottomWidth+'px'
}
/* 根据函数calcCoverZoneVisiblePartPos计算得到的L2可见部分的top/left，计算L3的top/left
*
* */
function calcL3BoardPosBaseOnVisiblePartPos({visiblePartPos,L3_cropImgBorder,L3BorderWidth}){
  L3_cropImgBorder.width=visiblePartPos.width+2*L3BorderWidth.left
  L3_cropImgBorder.height=visiblePartPos.height+2*L3BorderWidth.top
  L3_cropImgBorder.left=visiblePartPos.left-L3BorderWidth.left
  L3_cropImgBorder.top=visiblePartPos.top-L3BorderWidth.top
}
function setL3_cropImgBorder({ele_L3_cropImgBorder,para_L3_cropImgBorder}){
  ele_L3_cropImgBorder.style.width=para_L3_cropImgBorder.width+'px'
  ele_L3_cropImgBorder.style.height=para_L3_cropImgBorder.height+'px'
  ele_L3_cropImgBorder.style.left=para_L3_cropImgBorder.left+'px'
  ele_L3_cropImgBorder.style.top=para_L3_cropImgBorder.top+'px'
}

/*  当zoom up的时候，计算VisiblePartPos
* @VisiblePartPos:可见部分的参数
* @L1OrigImagePos: 载入图片（经过ratio的）参数
* @zoomStep:每次放大的像素数
* */
function zoomUpVisiblePartPos({visiblePartPos,L1OrigImagePos,zoomStep}){
  // inf('visiblePartPos',visiblePartPos)
  let afterZoomPos={top:0,bottom:0,left:0,right:0,width:0,height:0}
  afterZoomPos['top']=visiblePartPos.top-zoomStep.vertical
  afterZoomPos['left']=visiblePartPos.left-zoomStep.horizontal

  afterZoomPos['width']=visiblePartPos.width+2*zoomStep.horizontal
  afterZoomPos['height']=visiblePartPos.height+2*zoomStep.vertical

  afterZoomPos['bottom']=afterZoomPos.top+afterZoomPos.height
  afterZoomPos['right']=afterZoomPos.left+afterZoomPos.width

  // inf('after afterZoomPos',afterZoomPos)
  // inf('L1OrigImagePos',L1OrigImagePos)
  //可以按照step扩大
  if(L1OrigImagePos.left<=afterZoomPos.left && L1OrigImagePos.top<=afterZoomPos.top && L1OrigImagePos.right>=afterZoomPos.right && L1OrigImagePos.bottom>=afterZoomPos.bottom){
    visiblePartPos.top=afterZoomPos['top']
    visiblePartPos.height=afterZoomPos['height']
    visiblePartPos.left=afterZoomPos['left']
    visiblePartPos.width=afterZoomPos['width']
  }
  //要扩大的像素数小于zoomStep，直接扩到最大
  else{
    //计算4个方向可扩的像素
    // inf('L1OrigImagePos',L1OrigImagePos)
    // inf('visiblePartPos',visiblePartPos)
    let gap={left:0,right:0,top:0,bottom:0}
    gap.left=visiblePartPos.left-L1OrigImagePos.left
    gap.top=visiblePartPos.top-L1OrigImagePos.top

    gap.bottom=L1OrigImagePos.bottom-(visiblePartPos.top+visiblePartPos.height)
    gap.right=L1OrigImagePos.right-(visiblePartPos.left+visiblePartPos.width)

    let minGap= Math.min(...Object.values(gap))

    visiblePartPos.top-=minGap
    visiblePartPos.height+=2*minGap
    visiblePartPos.left-=minGap
    visiblePartPos.width+=2*minGap
  }
}


/*  当zoom down 的时候，计算VisiblePartPos
* @VisiblePartPos:可见部分的参数
* @zoomStep:每次放大的像素数
* */
function zoomDownVisiblePartPos({visiblePartPos,zoomStep}){
  let afterZoomWH={width:0,height:0}
  afterZoomWH['width']=visiblePartPos.width-2*zoomStep.horizontal
  afterZoomWH['height']=visiblePartPos.height-2*zoomStep.vertical
  if(afterZoomWH.width>=visiblePartPos.minWidth && afterZoomWH.height>=visiblePartPos.minHeight){
    visiblePartPos.top+=zoomStep.vertical
    visiblePartPos.height=afterZoomWH['height']
    visiblePartPos.left+=zoomStep.horizontal
    visiblePartPos.width=afterZoomWH['width']
  }
}

/*    使用canvas裁剪图片
* */
function cropImg({cropImgWH,L1OrigImagePos,visiblePartPos,L0ContainerPos,ratio,ele_L1_origImg}){
  let canvas=document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  //最终图片的大下，一定等于裁剪框的大小
  canvas.width=cropImgWH.width
  canvas.height=cropImgWH.height

  let cropPosBasedImg={}
  cropPosBasedImg['left']= (L1OrigImagePos.width>visiblePartPos.width) ? visiblePartPos.left:L1OrigImagePos.left
  cropPosBasedImg['width']= (L1OrigImagePos.width>visiblePartPos.width) ? visiblePartPos.width:L1OrigImagePos.width
  cropPosBasedImg['top']= (L1OrigImagePos.height>visiblePartPos.height) ? visiblePartPos.top:L1OrigImagePos.top
  cropPosBasedImg['height']= (L1OrigImagePos.height>visiblePartPos.height) ? visiblePartPos.height:L1OrigImagePos.height
  //left和top转换成基于image
  cropPosBasedImg['left']-=(L0ContainerPos.width-L1OrigImagePos.width)/2
  cropPosBasedImg['top']-=(L0ContainerPos.height-L1OrigImagePos.height)/2
  // inf('before ratio',cropPosBasedImg)
  // //ratio转换
  cropPosBasedImg['left']*=ratio
  cropPosBasedImg['top']*=ratio
  cropPosBasedImg['width']*=ratio
  cropPosBasedImg['height']*=ratio
  // inf('after ratio',cropPosBasedImg)
  ctx.drawImage(ele_L1_origImg, cropPosBasedImg['left'], cropPosBasedImg['top'],cropPosBasedImg['width'] ,cropPosBasedImg['height'],0,0,canvas.width ,canvas.height);
  return canvas.toDataURL('image/png');
}


export {
  init,

  loadParameter,
  getPosPara,
  setPos,
  // adjustBT,

  calcRatio,
  calcL1OrigImagePosBaseRatio,
  calcImgPosToSetCenter,
  calcCoverZonePosToSetCenter,
  calcCoverZoneVisiblePartPos,
  calcL2BoardWidthBaseOnVisiblePartPos,
  calcL3BoardPosBaseOnVisiblePartPos,

  setL2BoardWidth,
  setL3_cropImgBorder,

  zoomUpVisiblePartPos,
  zoomDownVisiblePartPos,
  cropImg,
}
