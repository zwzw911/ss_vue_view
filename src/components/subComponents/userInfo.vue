<style scoped>
</style>
<template>
<div style="">
  <div class="flex-flow-column-nowrap" style="overflow: auto">
    <p style="text-align:left" class="h3 font-monospace">基本信息</p>
    <hr class="marginT2">
    <div class="flex-flow-row-nowrap justify-content-flex-start align-items-center marginT4" >
      <label style="color:gray;" :style="{width:userIconLabelWidth+'px'}">头像</label>
      <self-user-icon :ref="ref.userIcon.userIconForUserInfo" :user-icon-info="userInfo.userIconInfo" class="marginL4"  @click="showCrop"></self-user-icon>
      <span @click="showCrop" class="marginL4">修改头像</span>

      <!--'border-width':cropBorderWidth.top+'px'+' '+cropBorderWidth.left+'px'-->
      <self-crop id="selfCropId" :ref="ref.crop.cropForUserInfo" :style="{visibility:cropHidden,}"
                 style=" position: fixed;width:100%;height:100%;top:0px;left:0px;border-style:solid;border-color:rgba(15,15,15,0.7);"
                 :crop-info="userInfo.cropInfo" @exitWithCroppedImg="getCroppedImg" z-index="2000"></self-crop>

<!--      <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4 "  label-position="left"
            :ref="ref.form.formForUserIconInfo" :model="formItemInfoForIconInput.inputValue" :rules="formItemInfoForIconInput.rule"
            :label-width="undefined===formItemInfoForIconInput.labelWidth ? 0:formItemInfoForIconInput.labelWidth">
        &lt;!&ndash;<self-form-item :form-item-info="formItemInfoForNonIconInput"></self-form-item>&ndash;&gt;
        <self-user-icon :ref="ref.userIcon.userIconForUserInfo" :user-icon-info="userInfo.userIconInfo" class="marginL4"  @click="showCrop"></self-user-icon>
      </Form>-->
    </div>

  </div>
  <div class="marginT7">
    <p style="text-align:left" class="h3 font-monospace">详细信息</p>
    <hr class="marginT2">
    <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4 marginT4"  label-position="left"
          :ref="ref.form.formForUserInfo" :model="formItemInfoForNonIconInput.inputValue" :rules="formItemInfoForNonIconInput.rule"
          :label-width="undefined===formItemInfoForNonIconInput.labelWidth ? 0:formItemInfoForNonIconInput.labelWidth">
      <self-form-item :form-item-info="formItemInfoForNonIconInput"
                      :ref="ref.formItem.formItemForUserInfo"
                      @validateAllItemResult="setFormItemWholeValidateResult" @uniqueCheckResult="setUniqueCheckResult"></self-form-item>
    </Form>
      <!--<self-form-item :form-item-info=""></self-form-item>-->
  </div>

  <Button size="large"  type="primary" @click="saveUserInfo_async" :style="validateFormItemResult ? '':buttonDisableStyle" :disabled="!validateFormItemResult">保存</Button>
<!--  :ref="ref.form.formForChangePassword" :model="formItemInfo.inputValue" :rules="formItemInfo.rule"
  :label-width="undefined===formItemInfo.labelWidth ? 0:formItemInfo.labelWidth">-->
<!--  <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4"  label-position="left"
       >

  </Form>-->
</div>
</template>
<script>
  // import {} from
  import * as misc from "../../function/misc"
  // import
  import {myAxios,pageViewWH,calcCenterParams} from "../helperLib/componentsHelperLib"
  import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart} from '../../constant/enum/nonValueEnum'
  import {inf} from 'awesomeprint'
  import {unique} from '../../constant/inputValue/manual/uniqueCheck'

  import selfUserIcon from './userIcon'
  import selfCrop from './crop'
  import selfFormItem from '../basicComponent/formItem'

  export default {
    components:{selfUserIcon,selfCrop,selfFormItem},
    async mounted(){
      // this.$options.methods.setCropCenter.bind(this)()
      this.setCropCenter()
      window.onresize= ()=>{
        this.setCropCenter()
      }
      await this.getUserInfo_async()
    },
    methods:{
      async getUserInfo_async(){
        let result=await myAxios.get(this.$store.state.url.user.getUserInfo)
        if(result.data.rc>0){

        }else{
          this.$refs[this.ref.userIcon.userIconForUserInfo].setImgSrc(result.data.msg['photoDataUrl'])

          for(let singleField of this.formItemInfoForNonIconInput.allowFields){
            if(undefined!==result.data.msg[singleField]){
              this.formItemInfoForNonIconInput.inputValue[singleField]=this.formItemInfoForNonIconInput.originInputValue[singleField]=result.data.msg[singleField]
            }
          }

        }
      },
      async saveUserInfo_async(){
        let value={}
        //获得修改的数据
        for(let singleField of this.formItemInfoForNonIconInput.allowFields){
          if(this.formItemInfoForNonIconInput.inputValue[singleField]!==this.formItemInfoForNonIconInput.originInputValue[singleField]){
            value[singleField]=this.formItemInfoForNonIconInput.inputValue[singleField]
          }
        }
        let finalValues={values:{
          [ValidatePart.RECORD_INFO]:value
          }}
        if(Object.keys(value).length>0){
          let result=await myAxios.put(this.$store.state.url.user.getUserInfo,finalValues)
          // inf('res',result)
          if(result.rc>0){

          }else{
            //button变成不可编辑状态
            this.validateFormItemResult=false
          }
        }
      },
      async getCroppedImg(croppedImg){
        this.userIconInfo.imgSrc=croppedImg
        //隐藏crop组件
        this.$options.methods.hideCrop.bind(this)()
        //
        this.$refs[this.ref.userIcon.userIconForUserInfo].setImgSrc(croppedImg)
        //上传dataUrl
        let result=await myAxios.put(this.$store.state.url.user.uploadUserPhoto,{
          values:{
            // [ValidatePart.METHOD]:Method.UPLOAD,
            [ValidatePart.RECORD_INFO]:{
              'photoDataUrl':croppedImg,
              // 'name':'test',
            }
          },
        })
        // inf('result',result)

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
// inf('change result',result)
//         return result
        this.validateFormItemResult=result && !this.validateIfInputValueNotChange()
        // this.checkSubmitButtonStatus()
      },
      setUniqueCheckResult(result){
        //返回：account重复
        if(result.fieldName==='name' && result.data.rc===61160){
          //判断是否和自己重复（通过判断是否修改了account）
          if(this.formItemInfoForNonIconInput.inputValue['name']===this.formItemInfoForNonIconInput.originInputValue['name']){
            this.formItemInfoForNonIconInput.inputTempData['name'][InputTempDataFieldName.VALID_RESULT]=''
            inf('after set null',this.formItemInfoForNonIconInput.inputTempData['name'][InputTempDataFieldName.VALID_RESULT])
            this.$refs[this.ref.formItem.formItemForUserInfo].validateIfAllItemPass()
          }
        }
      },

      validateIfInputValueNotChange(){
        for(let singleField of this.formItemInfoForNonIconInput.allowFields){
          if(this.formItemInfoForNonIconInput.inputValue[singleField]!==this.formItemInfoForNonIconInput.originInputValue[singleField]){
            return false
          }
        }

        return true
      }
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
      // inf('this.userInfo.userIconInfo',this.userInfo.userIconInfo)
      // let userIconInfo=misc.objectDeepCopy(this.userInfo.userIconInfo)
      // inf('userIconInfo',userIconInfo)
      //2 part: userIcon和其他userInfo：userIcon使用单独API处理
      // let allowFields=['photoDataUrl']
      // let userIconInput=misc.genNeedInput({source:this.$store.state.inputRelatePropertyInfo,collName:'user',allowFields:allowFields})

      let allowFields=['name']
      let userNonIconInput=misc.genNeedInput({source:this.$store.state.inputRelatePropertyInfo,collName:'user',allowFields:allowFields})
      return {
        formItemInfoForNonIconInput:{
          rule:userNonIconInput['rule'],
          inputAttribute:userNonIconInput['inputAttribute'],
          inputTempData:userNonIconInput['inputTempData'],
          originInputValue:misc.objectDeepCopy(userNonIconInput['inputValue']),//保存原始数据，判断是否可以发送update请求
          inputValue:userNonIconInput['inputValue'],
          // icon:icon,
          iconColor:'#5cadff',
          //如果未设置captchaInfo，就不会出现captcha
/*          captchaInfo:{
            captchaImgWidth:80, //px。事先确定好长宽，以便刷新时，如果有refreshIcon存在，此icon位置不会变化
            captchaImgHeight:33,
            refreshIcon:'refresh',//空：无刷新icon；否则显示
            captchaImgId:'captchaImgId',
            captchaURL:'/user/captcha',
          },*/
          unique:unique['user'], //如果未设，将不执行unique check，否则根据inputValue/manual/uniqueCheck.js中的设置，blur时执行unique
          labelWidth:60, //0或者undefined，则不显示label；其他数值，显示label

            allowFields:allowFields,
          //span:this.loginInfo.span, //formItem的宽度和offset
        },
        validateFormItemResult:false,//默认验证不通过或者尚未验证
        buttonDisableStyle:this.$store.state.style.button.primary.disable,
        /*formItemInfoForIconInput:{
          rule:userNonIconInput['rule'],
          inputAttribute:userNonIconInput['inputAttribute'],
          inputTempData:userNonIconInput['inputTempData'],
          inputValue:userNonIconInput['inputValue'],
          // icon:icon,
          iconColor:'#5cadff',
          //如果未设置captchaInfo，就不会出现captcha
          /!*          captchaInfo:{
                      captchaImgWidth:80, //px。事先确定好长宽，以便刷新时，如果有refreshIcon存在，此icon位置不会变化
                      captchaImgHeight:33,
                      refreshIcon:'refresh',//空：无刷新icon；否则显示
                      captchaImgId:'captchaImgId',
                      captchaURL:'/user/captcha',
                    },*!/
          // unique:unique['user'], //如果未设，将不执行unique check，否则根据inputValue/manual/uniqueCheck.js中的设置，blur时执行unique
          labelWidth:60, //0或者undefined，则不显示label；其他数值，显示label

          //span:this.loginInfo.span, //formItem的宽度和offset
        },*/
        userNonIconInput:userNonIconInput,

        // userIconInfo:misc.objectDeepCopy(this.userInfo.userIconInfo),
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
