<style scoped>
</style>
<template>
<div style="">
  <div class="flex-flow-column-nowrap" style="overflow: auto">
    <span style="text-align:left;width:100px;font-weight: bold" class="h3 font-monospace color-dark-primary">基本信息</span>
    <hr class="marginT2">
    <div class="flex-flow-row-nowrap justify-content-flex-start align-items-center marginT4" >
      <label style="color:gray;" :style="{width:userIconLabelWidth+'px'}">头像</label>
      <self-user-icon :ref="ref.userIcon.userIconForUserInfo" :user-icon-info="userInfo.userIconInfo" class="marginL4"  @click="showCrop"></self-user-icon>
      <span @click="showCrop" class="marginL4">修改头像</span>

      <!--'border-width':cropBorderWidth.top+'px'+' '+cropBorderWidth.left+'px'-->
      <self-crop id="selfCropId" :ref="ref.crop.cropForUserInfo" :style="{visibility:cropHidden,}"
                 :crop-info="userInfo.cropInfo" @exitWithCroppedImg="getCroppedImg" @exit="hideCrop"></self-crop>

    </div>

  </div>
  <div class="flex-flow-column-nowrap marginT7">
    <span style="text-align:left;width:100px;font-weight: bold" class="h3 font-monospace color-dark-primary">详细信息</span>
    <hr class="marginT2">
    <div>
      <Form class=" paddingH4 marginT4"  label-position="left"
            :ref="ref.form.formForUserInfo" :model="formItemInfoForNonIconInput.inputValue" :rules="formItemInfoForNonIconInput.rule"
            :label-width="undefined===formItemInfoForNonIconInput.labelWidth ? 0:formItemInfoForNonIconInput.labelWidth"
            @submit.native.prevent
      >
        <self-form-item :form-item-info="formItemInfoForNonIconInput"
                        :ref="ref.formItem.formItemForUserInfo"
                        @validateAllItemResult="setFormItemWholeValidateResult" @uniqueCheckResult="setUniqueCheckResult"></self-form-item>
      </Form>
    </div>

      <!--<self-form-item :form-item-info=""></self-form-item>-->
  </div>
  <!--;-->
  <Button class="marginT7" size="large"  type="primary" @click="saveUserInfo_async" :class="{primaryButtonDisable:validateFormItemResult}" :disabled="!validateFormItemResult">保存</Button>

</div>
</template>
<script>
  /******************************/
  /*****      component     ****/
  /******************************/
  import selfUserIcon from '../basicComponent/userIcon'
  import selfCrop from '../basicComponent/crop'
  import selfFormItem from '../basicComponent/formItem'
  /******************************/
  /****  common function    ****/
  /******************************/
  import * as misc from "../../function/misc"
  import {commonHandlerForErrorResult,commonHandlerForSuccessResult} from "../../function/handleResult"
  // import {showErrorInCenterMessage} from "../../function/showResult"
  /******************************/
  /****        网络         ****/
  /******************************/
  import {myAxios,pageViewWH,calcCenterParams} from "../helperLib/componentsHelperLib"
  import {sendRequestGetResult_async} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'
  /******************************/
  /****   common constant   ****/
  /******************************/
  import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart} from '../../constant/enum/nonValueEnum'
  /******************************/
  /****      3rd            ****/
  /******************************/
  import {inf} from 'awesomeprint'
  // import {unique} from '../../constant/inputValue/manual/not_used_uniqueCheck'


  export default {
    components:{selfUserIcon,selfCrop,selfFormItem},
    async mounted(){
      // this.$options.methods.setCropCenter.bind(this)()
      this.setCropCenter()
      window.onresize= ()=>{
        this.setCropCenter()
      }

      //作为子组件，由父组件决定何时getUserInfo_async，否则组件载入就会调用，可能短时间内和其他组件的请求集中在一起发送
      // await this.getUserInfo_async()
    },
    methods:{
/*      switchEditable(){
        this.editable=!this.editable
      },*/
      async getUserInfo_async(){
        let result=await sendRequestGetResult_async({urlOption:urlConfiguration.user.getUserInfo})
        // inf('result',result)
        if(result.rc>0){
          commonHandlerForErrorResult({that:this,response:result})
          // if(result.rc===50100){
          //   showErrorInCenterMessage({that:this,msg:result.msg})
          // }
        }else{
          this.$refs[this.ref.userIcon.userIconForUserInfo].setImgSrc(result.msg['photoDataUrl'])
          /****   设置formItem数据  ***/
          let neededFields=['name']
          // let neededValue=misc.extractPartObject({sourceObj:result.msg,neededKeyNames:neededFields})
          // inf('neededValue',neededValue)
          this.$refs[this.ref.form.formForUserInfo].resetFields()
          this.$refs[this.ref.formItem.formItemForUserInfo].clearAllItemError()
          this.$refs[this.ref.formItem.formItemForUserInfo].loadServerData({valueFromDb:result.msg,neededFields:neededFields})
          this.$refs[this.ref.formItem.formItemForUserInfo].saveAsOriginData({valueFromDb:result.msg,neededFields:neededFields})
/*          for(let singleField in this.formItemInfoForNonIconInput.inputValue){
            if(undefined!==result.msg[singleField]){
              this.formItemInfoForNonIconInput.inputValue[singleField]=this.formItemInfoForNonIconInput.originInputValue[singleField]=result.msg[singleField]
            }
          }*/

        }
      },
      async saveUserInfo_async(){
        let that=this
        //1. 触发form的方法，检测是否所有input都符合条件，结果传递给本组件变量validResult
        await this.$refs[this.ref.formItem.formItemForUserInfo].validateAllItemResult()
        if(false===this.validResult){
          commonHandlerForErrorResult({that:this,response:{rc:98765,msg:'某些输入项不正确'}})
          return
        }
        //2. 上传数据
        let data={values:{}}
        //2.1 获得发生变化的字段
        data.values[ValidatePart.RECORD_INFO]=this.$refs[this.ref.formItem.formItemForUserInfo].sanityInputValueBeforeSendToServer()
/*        for(let singleField in this.formItemInfoForNonIconInput.inputValue){
          if(this.formItemInfoForNonIconInput.inputValue[singleField]!==this.formItemInfoForNonIconInput.originInputValue[singleField]){
            value[singleField]=this.formItemInfoForNonIconInput.inputValue[singleField]
          }
        }
        let finalValues={values:{
          [ValidatePart.RECORD_INFO]:value
          }}*/
        if(Object.keys(data.values[ValidatePart.RECORD_INFO]).length>0){
          let result=await sendRequestGetResult_async({urlOption:urlConfiguration.user.saveUserInfo,data:data})
          // inf('res',result)
          if(result.rc>0){
            commonHandlerForErrorResult({that:this,response:result})
          }else{
            result.msg='用户信息更改成功'
            commonHandlerForSuccessResult({that:this,response:result})
            //button变成不可编辑状态
            this.validateFormItemResult=false
          }
        }
      },
      async getCroppedImg(croppedImg){
        // inf('croppedImg',croppedImg)
        this.userInfo.userIconInfo.imgSrc=croppedImg
        // inf('this.userInfo.userIconInfo.imgSrc',this.userInfo.userIconInfo.imgSrc)
        //隐藏crop组件
        this.$options.methods.hideCrop.bind(this)()
        //

        //上传dataUrl
        let data={
          values:{
            // [ValidatePart.METHOD]:Method.UPLOAD,
            [ValidatePart.SINGLE_FIELD]:{
              'photoDataUrl':croppedImg,
              // 'name':'test',
            }
          },
        }
        let result=await sendRequestGetResult_async({urlOption:urlConfiguration.user.uploadUserPhoto,data:data})
        if(result.rc>0){
          commonHandlerForErrorResult({that:this,response:result})
        }else{
          this.$refs[this.ref.userIcon.userIconForUserInfo].setImgSrc(croppedImg)
        }
      },
      showCrop(){
        this.cropHidden=''
      },
      hideCrop(){
        this.cropHidden='hidden'
      },
      setCropCenter(){
        let result=this.$refs[this.ref.crop.cropForUserInfo].getComponentSize()
        // inf('typeof result',typeof result)
        //selfCropId是白色的背景(height根据页面的高度变化，需要设置borderwidth实现遮罩)，result是实际组件的元素（cmdButtonGroup和L0/L1/L2）
        let elementCrop=document.getElementById('selfCropId')
        calcCenterParams({element:elementCrop,elementWH:result,withCover:true})
      },
      //从formItem获得整体验证结果
      setFormItemWholeValidateResult(result){
// inf('setFormItemWholeValidateResult result',result)
//         inf('this.$refs[this.ref.formItem.formItemForUserInfo].ifAnyFieldValueChanged() result',this.$refs[this.ref.formItem.formItemForUserInfo].ifAnyFieldValueChanged())
//         return result
        this.validateFormItemResult=result && this.$refs[this.ref.formItem.formItemForUserInfo].ifAnyFieldValueChanged()
        // this.checkSubmitButtonStatus()
      },
      setUniqueCheckResult(result){
        //返回：account重复
        if(result.fieldName==='name' && result.rc===61160){
          //判断是否和自己重复（通过判断是否修改了account）
          // if(this.formItemInfoForNonIconInput.inputValue['name']===this.formItemInfoForNonIconInput.originInputValue['name']){
          if(true===this.$refs[this.ref.formItem.formItemForUserInfo].ifSingleFieldValueChanged({keyName:'name'})){
            inf('name not change')
            this.formItemInfoForNonIconInput.inputTempData['name'][InputTempDataFieldName.VALID_RESULT]=''
            // inf('after set null',this.formItemInfoForNonIconInput.inputTempData['name'][InputTempDataFieldName.VALID_RESULT])
            this.$refs[this.ref.formItem.formItemForUserInfo].validateAllItemResult()
          }
        }
      },

/*      validateIfInputValueNotChange(){
        for(let singleField in this.formItemInfoForNonIconInput.inputValue){
          if(this.formItemInfoForNonIconInput.inputValue[singleField]!==this.formItemInfoForNonIconInput.originInputValue[singleField]){
            return false
          }
        }

        return true
      }*/
      //每个input blur或者check box click，都要检查素有input valida的状态以及check box的状态，以便决定是否enable 注册按钮
      /*checkSubmitButtonStatus() {
        // inf('checkSubmitButtonStatus in')

        if(false===this.validateFormItemResult){
          // inf('forminte  box in')
          this.submitButtonDisable = true
          return
        }

        // inf('checkSubmitButtonStatus successful')
        this.submitButtonDisable = false
      },*/
    },
    computed:{
      userIconLabelWidth(){
        if(undefined===this.userInfo.userIconInfo.imgPadding){
          return undefined===this.formItemInfoForNonIconInput.labelWidth ? 0:this.formItemInfoForNonIconInput.labelWidth
        }else{
          return undefined===this.formItemInfoForNonIconInput.labelWidth ? 0:this.formItemInfoForNonIconInput.labelWidth-parseInt(this.userInfo.userIconInfo.imgPadding.replace('px','')) //减去icon的padding，以便和其他的input对齐
        }

      },
/*      buttonDisable(){
        return this.validateFormItemResult
      }*/

    },
    props:['userInfo'],
    data(){
      // this.userInfo.formItemInfo['originInputValue']=misc.objectDeepCopy(this.userInfo.formItemInfo['inputValue'])
      return {
        // editable:false,
        formItemInfoForNonIconInput:this.userInfo.formItemInfo,

        validateFormItemResult:false,//默认验证不通过或者尚未验证
        // buttonDisableStyle:this.$store.state.style.button.primary.disable,

        ref:{
          formItem:{
            formItemForUserInfo:'formItemForUserInfo',
          },
          form:{
            formForUserIconInfo:'formForUserIconInfo',
            formForUserInfo:'formForUserInfo',
          },
          crop:{
            cropForUserInfo:'cropForUserInfo'
          },
          userIcon:{
            userIconForUserInfo:'userIconForUserInfo',
          },
        },
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
