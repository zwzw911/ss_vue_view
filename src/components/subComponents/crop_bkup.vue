<style scoped>
  #cropContainer{
    position: absolute;
    z-index:3000;
    height:100%;
  }
</style>

<template>
  <div class="marginT7">
    <div class="flex-flow-row-nowrap justify-content-center align-items-center" style="z-index:4000;position:fixed;width:100%;height:100%;background: rgba(0, 0, 0, 0.8);top:0px;left:0px;" :style="{display:showPreviewFlag ? '':'none'}"
      @click="hidePreview"
    >
      <img id="croppedImg" style="padding:5px;border:1px solid rgb(200,200,200);border-radius:5px;"  :style="{width:cropImgWH.width+'px',height:cropImgWH.height+'px'}" class="" :src="cropImgDataUrl">
    </div>
    <div id="cropContainer" class="flex-flow-row-nowrap justify-content-flex-start" style="z-index:3000;height:100%;">

      <!--<div style="" class="">-->
        <div class="marginR7 flex-flow-column-nowrap justify-content-space-between" style="height:200px;">
          <!--        <Button type="primary" @click="" style="">选择图片</Button>
                  <form enctype="multipart/form-data" id="cropppedImgForm">
                    <img id="croppedImg" style="padding:5px;border:1px solid rgb(200,200,200);border-radius:5px;display:none"  class="marginT4">
                  </form>-->

          <input id="input_chooseImg" class="" type="file"  name="userIcon" style="display: none" @change="readImage()"/>
          <Button id="btn_chooseImg" class="" @click="delegateClick();">选择图片</Button>
          <Button id="btn_cropImg" class="" @click="cropImg();" :disabled="btnDisableFlag.btn_cropImg">裁剪</Button>

          <Button id='btn_cropImgOK' class="" :disabled="btnDisableFlag.btn_cropImgOK" @click="showPreview();">预览</Button>
          <Button id='btn_cropImgCancel' class="" @click="">退出</Button>
        </div>
      <!--</div>-->

      <div id="L0_container" :style="{'width':L1OrigImgMaxWH.width+'px','height':L1OrigImgMaxWH.height+'px'}" style="position: relative;border:0px solid;" class="bg-silver"
           @mouseup="mouseUp"  >
        <!-- img 必须使用visibility，而不是display，否则，在display之前，会无法读取img的pos属性
              left/top/width/height不能预先设置（而是要通过js原生方法设置），否则无法正确设置
        -->
        <img id='L1_origImg'  style="position: absolute; " :alt="loadedFileName" :src="L1OrigImgSrc"
             :style="{visibility:elementHideFlag.L1_origImg? 'hidden':''}"
             @load="initViewBasedOnImg();"
             @mousewheel="zoomCoverZone" @DOMMouseScroll="zoomCoverZone"
             />

        <!--@mousewheel="zoomCoverZone" @DOMMouseScroll="zoomCoverZone"-->
        <!--,top:L1OrigImagePos.top+'px', left:L1OrigImagePos.left+'px',-->
        <!--width:L1OrigImagePos.width+'px',height:L1OrigImagePos.height+'px'-->
        <!--width:elementHideFlag.L1_origImg ? '':L1OrigImagePos.width+'px',height:elementHideFlag.L1_origImg ? '':L1OrigImagePos.height+'px'-->
        <div id='L2_coverZone' style="position: absolute;border-style:solid;border-color:rgba(255,255,255,0.9);"
             :style="{display:elementHideFlag.L2_coverZone ? 'none':'',width:L2CoverZonePos.width+'px',height:L2CoverZonePos.height+'px',left:L2CoverZonePos.left+'px',top:L2CoverZonePos.top+'px',
             'border-width':L2BorderWidth}"
             draggable="true" >
          <!--@mousedown="mouseDown()" @mouseup="mouseUp()" @mousemove="mouseMove"-->
          <!--'border-left-width':L2_boardWidth.leftWidth+'px',borderBottomWidth:L2_boardWidth.bottomWidth+'px',borderRightWidth:L2_boardWidth.rightWidth+'px',borderTopWidth:L2_boardWidth.topWidth+'px',-->
        </div>

        <div id="L3_cropImgBorder" style="position:absolute;display:none;border-color:#ff6666;border-style:dashed;"
             :style="{display:elementHideFlag.L3_cropImgBorder ? 'none':'',width:L3_cropImgBorder.width+'px',height:L3_cropImgBorder.height+'px',left:L3_cropImgBorder.left+'px',top:L3_cropImgBorder.top+'px'}"
             @mousedown="mouseDown" @mouseup="mouseUp" @mousemove="mouseMove" @mousewheel="zoomCoverZone" @DOMMouseScroll="zoomCoverZone" >
          <!--<span>+</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  'use strict'
  // import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  import * as misc from  '../../function/misc'
  import * as helper from  './cropLib/helper'
  // import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'
  // import {regex} from '../../constant/regex/regex'
  import axios from 'axios'
  import {inf,wrn,err} from 'awesomeprint'


  import {error} from './cropLib/data'

  export default {
    props:['cropInfo'], //
    created(

    ){},
    methods: {
      hidePreview(){
        this.showPreviewFlag=false
      },
      showPreview(){
        this.showPreviewFlag=true
      },
      //裁剪图片
      cropImg(){
        let canvas=document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        //最终图片的大下，一定等于裁剪框的大小
        canvas.width=this.cropImgWH.width
        canvas.height=this.cropImgWH.height

        let cropPosBasedImg={}
        cropPosBasedImg['left']= (this.L1OrigImagePos.width>this.visiblePartPos.width) ? this.visiblePartPos.left:this.L1OrigImagePos.left
        cropPosBasedImg['width']= (this.L1OrigImagePos.width>this.visiblePartPos.width) ? this.visiblePartPos.width:this.L1OrigImagePos.width
        cropPosBasedImg['top']= (this.L1OrigImagePos.height>this.visiblePartPos.height) ? this.visiblePartPos.top:this.L1OrigImagePos.top
        cropPosBasedImg['height']= (this.L1OrigImagePos.height>this.visiblePartPos.height) ? this.visiblePartPos.height:this.L1OrigImagePos.height
        //left和top转换成基于image
        cropPosBasedImg['left']-=(this.L0ContainerPos.width-this.L1OrigImagePos.width)/2
        cropPosBasedImg['top']-=(this.L0ContainerPos.height-this.L1OrigImagePos.height)/2
        // inf('before ratio',cropPosBasedImg)
        // //ratio转换
        cropPosBasedImg['left']*=this.ratio
        cropPosBasedImg['top']*=this.ratio
        cropPosBasedImg['width']*=this.ratio
        cropPosBasedImg['height']*=this.ratio
        // inf('after ratio',cropPosBasedImg)
        ctx.drawImage(this.element.L1_origImg, cropPosBasedImg['left'], cropPosBasedImg['top'],cropPosBasedImg['width'] ,cropPosBasedImg['height'],0,0,canvas.width ,canvas.height);
        this.cropImgDataUrl=canvas.toDataURL('image/png');
        this.btnDisableFlag.btn_cropImgOK=false
        // return canvas.toDataURL('image/png');
      },
      mouseDown(){
        // inf('m down')
        this.mouseDownFlag=true

      },
      //设置在L0上，任意时候，如果检测到up，就停止移动裁剪框
      mouseUp(){
        this.mouseDownFlag=false
      },
      zoomCoverZone(e){

        // inf('before',this.visiblePartPos)
        //放大还是缩小
        let delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
          (e.detail && (e.detail > 0 ? -1 : 1)); // firefox
        //存储zoom后的WH，用来判别是否用（赋值给visiblePartPos）
        let afterZoomWH={width:0,height:0}
        //放大
        if(delta>0){
          helper.zoomUpVisiblePartPos({visiblePartPos:this.visiblePartPos,L1OrigImagePos:this.L1OrigImagePos,zoomStep:this.zoomStep})
        }
        //缩小
        else{
          afterZoomWH['width']=this.visiblePartPos.width-2*this.zoomStep.horizontal
          afterZoomWH['height']=this.visiblePartPos.height-2*this.zoomStep.vertical
          if(afterZoomWH.width>=this.visiblePartPos.minWidth && afterZoomWH.height>=this.visiblePartPos.minHeight){
            this.visiblePartPos.top+=this.zoomStep.vertical
            this.visiblePartPos.height=afterZoomWH['height']
            this.visiblePartPos.left+=this.zoomStep.horizontal
            this.visiblePartPos.width=afterZoomWH['width']
          }

        }
        // this.L2CoverZonePos.height+=this.zoomStep.vertical
        // this.L2CoverZonePos.width+=this.zoomStep.horizontal
        // inf('after',this.visiblePartPos)
        // helper.calcCoverZoneVisiblePartPos({visiblePartPos:this.visiblePartPos,mouseX:mouseX,mouseY:mouseY,cropImgWH:this.cropImgWH,L1OrigImagePos:this.L1OrigImagePos})
        helper.calcL2BoardWidthBaseOnVisiblePartPos({visiblePartPos:this.visiblePartPos,L0ContainerPos:this.L0ContainerPos,L2_boardWidth:this.L2_boardWidth})
        helper.calcL3BoardPosBaseOnVisiblePartPos({visiblePartPos:this.visiblePartPos,L3_cropImgBorder:this.L3_cropImgBorder,L3BorderWidth:this.L3BorderWidth})

        this.btnDisableFlag.btn_cropImgOK=true
      },
      mouseMove(e){
        // inf('m move',this.mouseDownFlag)
        if(true===this.mouseDownFlag){
          let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
          let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
          let mouseX = e.pageX || e.clientX + scrollX;
          let mouseY = e.pageY || e.clientY + scrollY;

          //转换成相对L0的x/y
          mouseX-=this.L0ContainerPos.left
          mouseY-=this.L0ContainerPos.top


          helper.calcCoverZoneVisiblePartPos({visiblePartPos:this.visiblePartPos,mouseX:mouseX,mouseY:mouseY,L1OrigImagePos:this.L1OrigImagePos})

          helper.calcL2BoardWidthBaseOnVisiblePartPos({visiblePartPos:this.visiblePartPos,L0ContainerPos:this.L0ContainerPos,L2_boardWidth:this.L2_boardWidth})

          helper.calcL3BoardPosBaseOnVisiblePartPos({visiblePartPos:this.visiblePartPos,L3_cropImgBorder:this.L3_cropImgBorder,L3BorderWidth:this.L3BorderWidth})

        }

      },
      //点击的是button，转换成点击input，实现选择文件的功能
      delegateClick(){
        this.input.input_chooseImg.click()
      },
      async readImage(){
        // console.log('read image in')
        let data=await misc.nativeReadFile_async({inputId:this.inputId.input_chooseImg,readType:'dataURL',maxSize:this.maxFileSize})
       // inf('data',data)
        if(data.rc>0){
          alert(data.msg)
        }

        this.loadedFileName=data.msg.fileName

        this.L1OrigImgSrc=data.msg.fileContent

        this.btnDisableFlag.btn_cropImg=false
        this.btnDisableFlag.btn_cropImgOK=true

      },

      hideView(){
        for(let singleView in this.elementHideFlag){
          this.elementHideFlag[singleView]=true
        }
      },
      showView(){
        // inf('test',this.element.L1_origImg.complete)
        for(let singleView in this.elementHideFlag){
          // inf('singleView',singleView)
          this.elementHideFlag[singleView]=false
        }

        // return
      },

      //根据载入的原始图片，设置3层view
      initViewBasedOnImg(){
        /*          获得载入原始图片的位置信息，并判定是否正确         */
        this.L1OrigImagePos=misc.objectDeepCopy(helper.getPosPara(this.element.L1_origImg))
        inf('before adjust this.L1OrigImagePos',this.L1OrigImagePos)
        //如果width/height为0，说明图片尚未载入
        if(0===this.L1OrigImagePos.width || 0===this.L1OrigImagePos.height){
          alert(this.error.imageNotReady.msg)
          return this.error.imageNotReady
        }

        //如果width/height超出定义，计算ratio
        this.ratio=helper.calcRatio({L1OrigImgMaxWH:this.L1OrigImgMaxWH,L1OrigImagePos:this.L1OrigImagePos})

        /*      获得div container的pos参数，以便图片居中      */
        this.L0ContainerPos=misc.objectDeepCopy(helper.getPosPara(this.element.L0_container))
        helper.calcL1OrigImagePosBaseRatio({L1OrigImagePos:this.L1OrigImagePos,ratio:this.ratio})
        // inf('after ratio',this.L1OrigImagePos)
        //计算L1 ratio后的width和height
        helper.setPos({element:this.element.L1_origImg,posPara:this.L1OrigImagePos})
        helper.calcImgPosToSetCenter({L0PosPara:this.L0ContainerPos,L1OrigImagePos:this.L1OrigImagePos})
        //计算ratio后的top/left
        helper.setPos({element:this.element.L1_origImg,posPara:this.L1OrigImagePos})
        // helper.adjustBT({pos:this.L1OrigImagePos,L0ContainerPos:this.L0ContainerPos})
// inf('after adjust this.L1OrigImagePos)',this.L1OrigImagePos)
        /*      计算虚拟的可见部分的参数，并使其居中                  */
        this.visiblePartPos.minWidth=this.visiblePartPos.width=Math.floor(this.cropImgWH.width/this.ratio)
        this.visiblePartPos.minHeight=this.visiblePartPos.height=Math.floor(this.cropImgWH.height/this.ratio)
        this.visiblePartPos.left=(this.L0ContainerPos.width-this.visiblePartPos.width)/2
        this.visiblePartPos.top=(this.L0ContainerPos.height-this.visiblePartPos.height)/2

        /*    cover zone 覆盖整个界面    */
        this.L2CoverZonePos.width=this.L1OrigImgMaxWH.width
        this.L2CoverZonePos.height=this.L1OrigImgMaxWH.height

        this.L2CoverZonePos.top=0  //起始点和L0container重合（因为是relative）
        this.L2CoverZonePos.left=0
        //设置coverZone的border width，实现居中效果
        helper.calcCoverZonePosToSetCenter({L1OrigImgMaxWH:this.L1OrigImgMaxWH,visiblePartPos:this.visiblePartPos,L2_boardWidth:this.L2_boardWidth})


        /*      计算L3_cropImgBorder的width和height       */
        this.L3_cropImgBorder.height=2*this.L3BorderWidth.top+this.visiblePartPos.height
        this.L3_cropImgBorder.width=2*this.L3BorderWidth.left+this.visiblePartPos.width
        //居中
        this.L3_cropImgBorder.top=(this.L0ContainerPos.height-this.L3_cropImgBorder.height)/2
        this.L3_cropImgBorder.left=(this.L0ContainerPos.width-this.L3_cropImgBorder.width)/2

        this.showView()

      },
    },
    computed:{
      element(){
        return {
          L0_container:document.getElementById('L0_container'),
          L1_origImg:document.getElementById('L1_origImg'),
          L2_coverZone:document.getElementById('L2_coverZone'),
          L3_cropImgBorder:document.getElementById('L3_cropImgBorder'),

        }
      },
      btn(){
        return {
          btn_chooseImg:document.getElementById('btn_chooseImg'),
          btn_cropImg:document.getElementById('btn_cropImg'),
          btn_cropImgOK:document.getElementById('btn_cropImgOK'),
          btn_cropImgCancel:document.getElementById('btn_cropImgCancel'),
        }
      },
      input(){
        return {
          input_chooseImg:document.getElementById('input_chooseImg'),
        }
      },
      L2BorderWidth(){

        return this.L2_boardWidth.topWidth+'px '+this.L2_boardWidth.rightWidth+'px '+this.L2_boardWidth.bottomWidth+'px '+this.L2_boardWidth.leftWidth+'px'
      }

    },
    data(){

      let parameter=helper.loadParameter({props_cropInfo:this.cropInfo})
      // inf('parameter',parameter)
      return {
        // parameter:parameter,//单独定义在data文件中
        maxFileSize:parameter.maxFileSize,
        L1OrigImgMaxWH:parameter.L1OrigImgMaxWH,
        L3BorderWidth:parameter.L3BorderWidth,
        cropImgWH:parameter.cropImgWH,
        zoomStep:parameter.zoomStep,
        error:error,

        elementId:{
          L1_origImg:'L1_origImg',
          L2_coverZone:'L2_coverZone',
          L3_cropImgBorder:'L3_cropImgBorder',
        },
        btnId:{
          btn_chooseImg:'btn_chooseImg',
          btn_cropImg:'btn_cropImg',
          btn_cropImgOK:'btn_cropImgOK',
          btn_cropImgCancel:'btn_cropImgCancel'
        },
        btnDisableFlag:{
          btn_cropImg:true,
          btn_cropImgOK:true,
        },
        inputId:{
          input_chooseImg:'input_chooseImg',
        },
        elementHideFlag:{
          L1_origImg:true,
          L2_coverZone:true,
          L3_cropImgBorder:true,
        },
        //container位置信息，在computed中获得
        L0ContainerPos:{
          top:0,
          bottom:0,
          left:0,
          right:0,
          width:0, //ie9以上支持
          height:0,//ie9以上支持
        },
        //载入图片的原始信息
        L1OrigImagePos:{
          top:0,
          bottom:0,
          left:0,
          right:0,
          width:0, //ie9以上支持
          height:0,//ie9以上支持
        },
        L2CoverZonePos:{
          top:0,
          left:0,
          width:0,
          height:0,
        },
        L2_boardWidth:{
          topWidth:0,
          bottomWidth:0,
          leftWidth:0,
          rightWidth:0,
        },
        //记录当前裁剪框的位置和大小
        L3_cropImgBorder:{
          top:0,
          left:0,
          width:0,
          height:0,
        },
        ratio:1,//如果图片超过L0的大小，需要自动缩小，ratio=原始大小:缩小图片
        // displayNone: 'none',
        L1OrigImgSrc:'',
        loadedFileName:null,
        mouseDownFlag:false,//检测mouse是否按下，以便决定是否处理mouseMove事件
        visiblePartPos : {left: 0, top: 0,width:0,height:0,minWidth:0,minHeight:0}, //minWidth/minHeight是根据ratio和cropImgWH计算出的,图片载入时确定，之后不变

        cropImgDataUrl:'',//crop后的数据

        showPreviewFlag:false,
        // L2BorderWidth:'',//设置4个方向的框宽
      }
    }
  }
</script>
