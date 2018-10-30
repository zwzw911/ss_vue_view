<style scoped>
</style>

<template>
  <div class="">
<!--    <div>
      <p class="h4 font-fantasy">修改密码</p>
    </div>-->

<!--    <div class="flex-flow-row-nowrap justify-content-flex-start paddingH4 marginV2">
      <p style="" class="color-red h5">
        <span>{{globalResultMsg}}</span>
        <span style="visibility:hidden">1</span>
      </p>
    </div>-->

    <!--:label-width="80"-->
    <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4 "  label-position="left"
          :ref="ref.form.formForChangePassword" :model="formItemInfo.inputValue" :rules="formItemInfo.rule"
          :label-width="undefined===formItemInfo.labelWidth ? 0:formItemInfo.labelWidth">
      <self-form-item :ref="ref.formItem.formItemChangePassword" :form-item-info="formItemInfo" @checkIfAllItemValidatedResultPass="setFormItemResult" @onBlur="checkSubmitButtonStatus"></self-form-item>


      <!--<FormItem class="">-->

        <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
      <!--</FormItem>-->
    </Form>
    <Button size="large"  type="primary" @click="sendChangePasswordInfo_async()" :class="{primaryButtonDisable:submitButtonDisable}" :disabled="submitButtonDisable">修改</Button>
      <!--<span class="h4">already?<a>link</a></span>-->

  </div>
</template>

<script>
  'use strict'
  /******************************/
  /**         component       **/
  /******************************/
  import selfFormItem from '../basicComponent/formItem'
  /******************************/
  /**    common function       **/
  /******************************/
  import {objectDeepCopy,objectPartlyDeepCopy} from  '../../function/misc'
  import * as handleResult from '../../function/handleResult'
  /******************************/
  /**     common constant     **/
  /******************************/
  import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf,wrn,err} from 'awesomeprint'
  /******************************/
  /**          网络            **/
  /******************************/
  import {sendRequestGetResult_async} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'


  export default {
    components:{selfFormItem},
    props:['changePasswordInfo'], //
    methods: {
      /********************************************/
      /*                    formItem              */
      /********************************************/
      //获得整体验证结果后，立即设置button状态
      setFormItemResult(result){
        inf('setFormItemResult in',result)
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
        let data={
          values: {
            // [ValidatePart.METHOD]: Method.MATCH,
            [ValidatePart.RECORD_INFO]: {
              'oldPassword':this.formItemInfo.inputValue['password'],
              'newPassword':this.formItemInfo.inputValue['newPassword'],
            }
          }
        }

        let result=await sendRequestGetResult_async({urlOption: urlConfiguration.user.changePassword,data:data})
        if(result.rc>0){
          handleResult.commonHandlerForErrorResult({that:this,response:result})
        }else{
          handleResult.commonHandlerForSuccessResult({that:this,response:{rc:0,msg:'密码修改成功'}})
          this.$refs[this.ref.formItem.formItemChangePassword].initFormItemInfo()
        }
 /*       if(result.rc>0){
          // captcha错误显示在input下
          let setCaptchaResult=this.$refs[this.ref.formItem.formItemChangePassword].checkIfCaptchaErrAndShow({data:result})
          //否则，显示在最顶上
          if(false===setCaptchaResult){
            let set99999Result=this.$refs[this.ref.formItem.formItemChangePassword].checkIf99999ErrAndShow({data:result})
            if(false===set99999Result){
              this.globalResultMsg=result.msg
            }
          }
          if(undefined!==this.formItemInfo.captchaInfo){
            await this.$refs[this.ref.formItem.formItemChangePassword].getCaptchaImg_async()
          }

          // this.showResultFlag=true
        }else{
        }*/
      },



    },
    computed:{

    },
    data(){
/*      let usedFieldName=['password']
      let propName='changePasswordInfo'
      // let inputAttribute_tmp,userInputValue_tmp,userInputTempData_tmp,ruleForCreate_tmp,icon_tmp
      let inputAttribute={},inputValue={},inputTempData={},ruleForCreate={}

      inputAttribute=objectPartlyDeepCopy({sourceObj:this[propName].inputAttribute,expectedKey:usedFieldName})
      inputValue=objectPartlyDeepCopy({sourceObj:this[propName].initInputValue,expectedKey:usedFieldName})
      inputTempData=objectPartlyDeepCopy({sourceObj:this[propName].inputTempData,expectedKey:usedFieldName})
      ruleForCreate=objectPartlyDeepCopy({sourceObj:this[propName].ruleForCreate,expectedKey:usedFieldName})*/

      // ruleForCreate.password[1].pattern=this.changePasswordInfo.ruleForCreate.password[1].pattern

      let newFieldNames=['newPassword','againPassword']
      for(let singleNewFieldName of newFieldNames){
        this.changePasswordInfo.formItemInfo.inputAttribute[singleNewFieldName]=objectDeepCopy(this.changePasswordInfo.formItemInfo.inputAttribute['password'])
        this.changePasswordInfo.formItemInfo.inputValue[singleNewFieldName]=objectDeepCopy(this.changePasswordInfo.formItemInfo.inputValue['password'])
        this.changePasswordInfo.formItemInfo.inputTempData[singleNewFieldName]=objectDeepCopy(this.changePasswordInfo.formItemInfo.inputTempData['password'])
        this.changePasswordInfo.formItemInfo.rule[singleNewFieldName]=objectDeepCopy(this.changePasswordInfo.formItemInfo.rule['password'])
        this.changePasswordInfo.formItemInfo.rule[singleNewFieldName][1].pattern=this.changePasswordInfo.formItemInfo.rule.password[1].pattern
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

      this.changePasswordInfo.formItemInfo.rule['newPassword'].push({ validator: newPasswordCantSameAsOldPassword, trigger: 'blur' })
      this.changePasswordInfo.formItemInfo.rule['againPassword'].push({ validator: againPasswordMustSameAsNewPassword, trigger: 'blur' })

      this.changePasswordInfo.formItemInfo.inputAttribute['password'][InputAttributeFieldName.PLACE_HOLDER][0]='请输入旧密码'
      this.changePasswordInfo.formItemInfo.inputAttribute['password'][InputAttributeFieldName.PLACE_HOLDER_BKUP][0]='请输入旧密码'
      this.changePasswordInfo.formItemInfo.inputAttribute['newPassword'][InputAttributeFieldName.PLACE_HOLDER][0]='请输入新密码'
      this.changePasswordInfo.formItemInfo.inputAttribute['newPassword'][InputAttributeFieldName.PLACE_HOLDER_BKUP][0]='请输入新密码'
      this.changePasswordInfo.formItemInfo.inputAttribute['againPassword'][InputAttributeFieldName.PLACE_HOLDER][0]='请再次输入密码'
      this.changePasswordInfo.formItemInfo.inputAttribute['againPassword'][InputAttributeFieldName.PLACE_HOLDER_BKUP][0]='请再次输入密码'

      this.changePasswordInfo.formItemInfo.inputAttribute['password'][InputAttributeFieldName.LABEL]='旧密码'
      this.changePasswordInfo.formItemInfo.inputAttribute['newPassword'][InputAttributeFieldName.LABEL]='新密码'
      this.changePasswordInfo.formItemInfo.inputAttribute['againPassword'][InputAttributeFieldName.LABEL]='再输一次'
      // inf('2',ruleForCreate)
      return {
        formItemInfo:this.changePasswordInfo.formItemInfo,
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
        // buttonDisableStyle:{'background-color':`#8cc0f7`,'color':`white`},
        submitButtonDisable:true,


      }
    }
  }
</script>
