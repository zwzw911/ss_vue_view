<style scoped>
</style>
<template>
<div style="">
  <div class="flex-flow-column-nowrap" style="overflow: auto">
    <p style="text-align:left" class="h3 font-monospace">基本信息</p>
    <hr class="marginT2">
    <div class="flex-flow-row-nowrap justify-content-flex-start align-items-center" >
      <label style="color:gray">头像</label>
      <self-user-icon :ref="ref.userIcon.userIconForUserInfo" :user-icon-info="userInfo.userIconInfo" class="marginL4"  @click="showCrop"></self-user-icon>
      <span @click="showCrop">修改头像</span>

      <self-crop :ref="ref.crop.cropForUserInfo" :style="{visibility:cropHidden,'border-width':cropBorderWidth.top+'px'+' '+cropBorderWidth.left+'px'}"
                 style="position: fixed;width:100%;height:100%;top:0px;left:0px;border-style:solid;border-color:rgba(15,15,15,0.7);"
                 :crop-info="userInfo.cropInfo" @exitWithCroppedImg="getCroppedImg" z-index="2000"></self-crop>
    </div>

  </div>
  <div>
    <p>详细信息</p>

  </div>
<!--  :ref="ref.form.formForChangePassword" :model="formItemInfo.inputValue" :rules="formItemInfo.rule"
  :label-width="undefined===formItemInfo.labelWidth ? 0:formItemInfo.labelWidth">-->
  <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4"  label-position="left"
       >

  </Form>
</div>
</template>
<script>
  import * as misc from "../../function/misc"
  import {myAxios,pageViewWH,setCenter} from "../helperLib/componentsHelperLib"
  import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'
  import {inf} from 'awesomeprint'

  import selfUserIcon from '../basicComponent/userIcon'
  import selfCrop from '../basicComponent/crop'

  export default {
    components:{selfUserIcon,selfCrop},
    mounted(){
      // this.$options.methods.setCropCenter.bind(this)()
      this.setCropCenter()
      window.onresize= ()=>{
        this.setCropCenter()
      }
    },
    methods:{
      getCroppedImg(croppedImg){
        this.userIconInfo.imgSrc=croppedImg
        //隐藏crop组件
        this.$options.methods.hideCrop.bind(this)()
        //
        this.$refs[this.ref.userIcon.userIconForUserInfo].setImgSrc(croppedImg)
      },
      showCrop(){
        this.cropHidden=''
      },
      hideCrop(){
        this.cropHidden='hidden'
      },
      setCropCenter(){
        setCenter({element:document.getElementById('cropContainer'),withPadding:true})
        /*/!*    crop组件居中    *!/
        //获得页面可视（不包括滚动条和工具栏）大小
        let pageViewWHParam=pageViewWH()
        // inf('pageViewWHParam',pageViewWHParam)
        //计算crop居中需要的参数（crop的WH是cropInfo中定义的）
        let cropWH=this.$refs[this.ref.crop.cropForUserInfo].getComponentSize()
        // inf('cropWH',cropWH)

        let WHMatch={
          width:'left',
          height:'top',
        }
        for(let singleWH in pageViewWHParam){
          if(pageViewWHParam[singleWH]>cropWH[singleWH]){
            this.cropVirtualPos[WHMatch[singleWH]]=parseInt((pageViewWHParam[singleWH]-cropWH[singleWH])/2)
          }else{
            this.cropVirtualPos[WHMatch[singleWH]]=0
          }
        }
        // inf('this.cropVirtualPos',this.cropVirtualPos)

        this.cropBorderWidth.top=this.cropVirtualPos.top
        this.cropBorderWidth.left=this.cropVirtualPos.left
        //计算padding*/
      },
    },
    computed:{

    },
    props:['userInfo'],
    data(){



      return {
        ref:{
          formItem:{
            formItemForUserInfo:'formItemForUserInfo',
          },
          form:{
            formForUserInfo:'formForUserInfo',
          },
          crop:{
            cropForUserInfo:'cropForUserInfo'
          },
          userIcon:{
            userIconForUserInfo:'userIconForUserInfo',
          },
        },
        userIconInfo:{
          // borderStyle:'',
          // imgPadding:'4px',
        },
// userInfoNew:this.userInfo,
        // cropInfo:this.userInfo.cropInfo,
        cropHidden:'hidden',

        //计算crop组件的虚拟位置（不包括padding）
        cropVirtualPos:{
          top:0,
          left:0,
        },
        //生成遮盖效果的borderWidth
        cropBorderWidth:{
          top:0,
          left:0,
        },
      }
    },
  }
</script>
