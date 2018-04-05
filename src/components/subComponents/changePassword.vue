<style scoped>
</style>

<template>
  <div class="">
    <div>
      <p class="h4 font-fantasy">修改密码</p>
    </div>

    <div class="flex-flow-row-nowrap justify-content-flex-start paddingH4 marginV2">
      <p style="" class="color-red h5">
        <span>{{globalResultMsg}}</span>
        <span style="visibility:hidden">1</span>
      </p>
    </div>

    <!--:label-width="80"-->
    <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4 "  label-position="left"
          :ref="ref.form.formForChangePassword" :model="formItemInfo.inputValue" :rules="formItemInfo.rule"
          :label-width="undefined===formItemInfo.labelWidth ? 0:formItemInfo.labelWidth">
      <self-form-item :ref="ref.formItem.formItemChangePassword" :form-item-info="formItemInfo" @validateAllItemResult="setFormItemResult" @onBlur="checkSubmitButtonStatus"></self-form-item>


      <!--<FormItem class="">-->
        <Button long size="large" shape="circle" type="primary" @click="sendChangePasswordInfo_async()" :style="submitButtonDisable ? buttonDisableStyle:''" :disabled="submitButtonDisable">修改</Button>
        <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
      <!--</FormItem>-->
    </Form>

      <!--<span class="h4">already?<a>link</a></span>-->

  </div>
</template>

<script>
  'use strict'
  // import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  import {objectDeepCopy,objectPartlyDeepCopy} from  '../../function/misc'
  import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'
  import {myAxios,mergeAdditionalField} from '../helperLib/componentsHelperLib'
  import {inf,wrn,err} from 'awesomeprint'
  import selfFormItem from '../basicComponent/formItem'
  export default {
    components:{selfFormItem},
    props:['changePasswordInfo'], //
    methods: {
      /********************************************/
      /*                    formItem              */
      /********************************************/
      //获得整体验证结果后，立即设置button状态
      setFormItemResult(result){
        // inf('setFormItemResult in',result)
        this.validateFormItemResult=result
        this.checkSubmitButtonStatus()
      },

      //每个input blur或者check box click，都要检查素有input valida的状态以及check box的状态，以便决定是否enable 注册按钮
      checkSubmitButtonStatus() {
        // inf('checkSubmitButtonStatus in')
        if(false===this.validateFormItemResult){
          // inf('forminte  box in')
          this.submitButtonDisable = true
          return
        }
        // inf('checkSubmitButtonStatus successful')
        this.submitButtonDisable = false
      },

      /********************************************/
      /*                    axios                 */
      /********************************************/
      async sendChangePasswordInfo_async(){
        // axios.defaults.withCredentials = true //带cookie
        let result=await myAxios.post(this.url.changePassword,
          {
            values: {
              // [ValidatePart.METHOD]: Method.MATCH,
              [ValidatePart.RECORD_INFO]: {
                'oldPassword':this.formItemInfo.inputValue['password'],
                'newPassword':this.formItemInfo.inputValue['newPassword'],
              }
            }
          })
        // =await this.sendLoginInfo()
        if(result.data.rc>0){
          // captcha错误显示在input下
          let setCaptchaResult=this.$refs[this.ref.formItem.formItemChangePassword].checkIfCaptchaErrAndShow({data:result.data})
          //否则，显示在最顶上
          if(false===setCaptchaResult){
            let set99999Result=this.$refs[this.ref.formItem.formItemChangePassword].checkIf99999ErrAndShow({data:result.data})
            if(false===set99999Result){
              this.globalResultMsg=result.data.msg
            }
          }

          if(undefined!==this.formItemInfo.captchaInfo){
            await this.$refs[this.ref.formItem.formItemChangePassword].getCaptchaImg_async()
          }
          // this.showResultFlag=true
        }else{


        }
      },



    },
    computed:{

    },
    data(){
      let usedFieldName=['password']
      let propName='changePasswordInfo'
      // let inputAttribute_tmp,userInputValue_tmp,userInputTempData_tmp,ruleForCreate_tmp,icon_tmp
      let inputAttribute={},inputValue={},inputTempData={},ruleForCreate={}

      inputAttribute=objectPartlyDeepCopy({sourceObj:this[propName].inputAttribute,expectedKey:usedFieldName})
      inputValue=objectPartlyDeepCopy({sourceObj:this[propName].initInputValue,expectedKey:usedFieldName})
      inputTempData=objectPartlyDeepCopy({sourceObj:this[propName].inputTempData,expectedKey:usedFieldName})
      ruleForCreate=objectPartlyDeepCopy({sourceObj:this[propName].ruleForCreate,expectedKey:usedFieldName})

      ruleForCreate.password[1].pattern=this.changePasswordInfo.ruleForCreate.password[1].pattern

      let newFieldNames=['newPassword','againPassword']
      for(let singleNewFieldName of newFieldNames){
        inputAttribute[singleNewFieldName]=objectDeepCopy(inputAttribute['password'])
        inputValue[singleNewFieldName]=objectDeepCopy(inputValue['password'])
        inputTempData[singleNewFieldName]=objectDeepCopy(inputTempData['password'])
        ruleForCreate[singleNewFieldName]=objectDeepCopy(ruleForCreate['password'])
        ruleForCreate[singleNewFieldName][1].pattern=this.changePasswordInfo.ruleForCreate.password[1].pattern
      }

      //newPassword的validator
      const newPasswordCantSameAsOldPassword = (rule, value, callback) => {
        if(null!==this.formItemInfo.inputValue.password && ''!==this.formItemInfo.inputValue.password){
          if(value===this.formItemInfo.inputValue.password ){
            callback(new Error('新密码不能和旧密码一样'));
          }else{
            callback()
          }
        }

      };
      //againPassword的validator
      const  againPasswordMustSameAsNewPassword= (rule, value, callback) => {
        if(null!==this.formItemInfo.inputValue.newPassword && ''!==this.formItemInfo.inputValue.newPassword){
          if(value!==this.formItemInfo.inputValue.newPassword ){
            callback(new Error('两次输入密码不一致'));
          }else{
            callback()
          }
        }

      };

      ruleForCreate['newPassword'].push({ validator: newPasswordCantSameAsOldPassword, trigger: 'blur' })
      ruleForCreate['againPassword'].push({ validator: againPasswordMustSameAsNewPassword, trigger: 'blur' })

      inputAttribute['password'][InputAttributeFieldName.PLACE_HOLDER][0]='请输入旧密码'
      inputAttribute['password'][InputAttributeFieldName.PLACE_HOLDER_BKUP][0]='请输入旧密码'
      inputAttribute['newPassword'][InputAttributeFieldName.PLACE_HOLDER][0]='请输入新密码'
      inputAttribute['newPassword'][InputAttributeFieldName.PLACE_HOLDER_BKUP][0]='请输入新密码'
      inputAttribute['againPassword'][InputAttributeFieldName.PLACE_HOLDER][0]='请再次输入密码'
      inputAttribute['againPassword'][InputAttributeFieldName.PLACE_HOLDER_BKUP][0]='请再次输入密码'

      inputAttribute['password'][InputAttributeFieldName.LABEL]='旧密码'
      inputAttribute['newPassword'][InputAttributeFieldName.LABEL]='新密码'
      inputAttribute['againPassword'][InputAttributeFieldName.LABEL]='再输一次'
      // inf('2',ruleForCreate)
      return {
        formItemInfo:{
          rule:ruleForCreate,
          inputAttribute:inputAttribute,
          inputTempData:inputTempData,
          inputValue:inputValue,
          icon:undefined,
          iconColor:undefined,
          //如果未设置captchaInfo，就不会出现captcha
          captchaInfo:undefined,
          labelWidth:this.changePasswordInfo.labelWidth,//0或者undefined，则不显示label；其他数值，显示label

          span:this.changePasswordInfo.span, //formItem的宽度和offset
        },
        validateFormItemResult:'', //存储forItem整体验证结果
        ref:{
          formItem:{
            formItemChangePassword:'formItemChangePassword',
          },
          form:{
            formForChangePassword:'formForChangePassword',
          },
        },


        globalResultMsg:'',//全局错误信息
        buttonDisableStyle:{'background-color':`#8cc0f7`,'color':`white`},
        submitButtonDisable:true,

        url:{
          changePassword:'/user/changePassword',

        }
      }
    }
  }
</script>
