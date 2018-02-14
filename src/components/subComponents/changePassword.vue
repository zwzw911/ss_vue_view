<style scoped>
</style>

<template>
  <div class="">
    <div>
      <p class="h4 font-fantasy">修改密码</p>
    </div>
    <div>



      <div class="flex-flow-row-nowrap justify-content-flex-start paddingH4 marginV2">
        <p :style="showResultFlag ? '':hideOccupySpace" class="color-red h5">{{loginResultMsg}}</p>
      </div>


      <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4 " :label-width="80" ref="userInputValue" :model="userInputValue" :rules="ruleForInput">
        <template v-for="(v,k) in userInputValue">


            <FormItem  :prop="k" :key="k"  class="" :error="userInputTempData[k]['validResult']" :label="inputAttribute[k]['label']">
              <!---->
              <Input
                @on-focus="focusInputPlaceHolderDisappear({keyName:k});"
                @on-blur="blurInputPlaceHolderRestore({keyName:k});validSingleInputValue({formVariantName:'userInputValue',fieldName:k});checkSubmitButtonStatus({})"
                @on-change="validSingleInputValue({formVariantName:'userInputValue',fieldName:k});checkSubmitButtonStatus({});"
                :type="inputAttribute[k]['inputType']" v-model="userInputValue[k]" :placeholder="inputAttribute[k]['placeHolder'][0]"
              >
<!--                <span slot="prepend"  style="">
                  <Icon :type="icon[k]" size="20" :color="iconColor"></Icon>
                </span>-->

              </Input>
              <!--<Input v-model="userInputValue.name.value" placeholder=""></Input>-->
            </FormItem>

        </template>




        <FormItem class="">
          <Button size="large"  type="primary" @click="sendChangePasswordInfo()" :style="submitButtonDisable ? buttonDisableStyle:''" :disabled="submitButtonDisable">修改</Button>
          <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
        </FormItem>
      </Form>

      <!--<span class="h4">already?<a>link</a></span>-->
    </div>
  </div>
</template>

<script>
  'use strict'
  // import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  import {objectDeepCopy} from  '../../function/misc'
  import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'
  // import {regex} from '../../constant/regex/regex'
  import axios from 'axios'
  import {inf,wrn,err} from 'awesomeprint'

  export default {
    props:['changePasswordInfo'], //
/*    created(){
      if(true===this.$cookies.isKey('account')){
        this.userInputValue.account=this.$cookies.get('account')
        this.userInputTempData.account[InputTempDataFieldName.VALID_RESULT]=''
      }
    },*/
    methods: {
      /********************************************/
      /*                    view                  */
      /********************************************/
      //存储 单个input 的检测结果（null：为检测，非空字符：检测通过，空字符：检测通过）
      validSingleInputValue({formVariantName, fieldName}) {
        //formItem放在2层template中，所以大概需要数组来引用
        this.$refs[`${formVariantName}`].validateField(fieldName, (validResult) => {
          // inf('validResult',validResult)
          this.userInputTempData[fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
        })
      },
      //每个input blur或者check box click，都要检查素有input valida的状态以及check box的状态，以便决定是否enable 注册按钮
      checkSubmitButtonStatus({}) {
        // inf('checkSubmitButtonStatus in')
        for (let singleFieldName in this.userInputTempData) {
          let singleFieldValidResult = this.userInputTempData[singleFieldName][InputTempDataFieldName.VALID_RESULT]
          if (null === singleFieldValidResult || '' !== singleFieldValidResult) {
            this.submitButtonDisable = true
            return
          }
        }
/*        if (false === this.agreeTOS[type]) {
          this.submitButtonDisable = true
          return
        }*/
        // inf('checkSubmitButtonStatus successful')
        this.submitButtonDisable = false
      },
      //模拟safiri，点击input时，placeHolder内容消失
      focusInputPlaceHolderDisappear({keyName}) {
        if (null === this.userInputValue[keyName] || '' === this.userInputValue[keyName]) {
          this.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = ['']
        }
        // inf('after this.userInputValue[this.currentType]',this.inputAttribute[this.currentType][keyName][InputAttributeFieldName.PLACE_HOLDER])
      },
      //如果离开input时，inputValue为空，需要恢复placeholder内容
      blurInputPlaceHolderRestore({keyName}) {
        // inf('blurInputPlaceHolderRestore in')
        // inf('blurInputPlaceHolderRestore keyName',keyName)
        if (null === this.userInputValue[keyName] || '' === this.userInputValue[keyName]) {
          this.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }
      },
      focusResetLoginResult(){
        this.showResultFlag=false
      },


      /********************************************/
      /*                    axios                 */
      /********************************************/
      async sendChangePasswordInfo(){
        axios.defaults.withCredentials = true //带cookie
        let result=await axios.post(this.url.changePassword,
          {
            values: {
              // [ValidatePart.METHOD]: Method.MATCH,
              [ValidatePart.RECORD_INFO]: {
                'oldPassword':this.userInputValue['password'],
                'newPassword':this.userInputValue['newPassword'],
              }
            }
          })
        // =await this.sendLoginInfo()
        if(result.data.rc>0){
          this.loginResultMsg=result.data.msg
          this.showResultFlag=true
        }else{
          this.showResultFlag=false
          if(true===this.rememberMe){

            this.$cookies.set('account', this.userInputValue.account,'14d')
          }else{
            this.$cookies.remove('account')
          }

        }
      },



    },
    computed:{

    },
    data(){
      let usedFieldName=['password']
      let inputAttribute_tmp,userInputValue_tmp,userInputTempData_tmp,ruleForCreate_tmp
      let inputAttribute={},userInputValue={},userInputTempData={},ruleForCreate={}

      inputAttribute_tmp=objectDeepCopy(this.changePasswordInfo.inputAttribute)
      userInputValue_tmp=objectDeepCopy(this.changePasswordInfo.initInputValue)
      userInputTempData_tmp=objectDeepCopy(this.changePasswordInfo.inputTempData)
      ruleForCreate_tmp=objectDeepCopy(this.changePasswordInfo.ruleForCreate)
      ruleForCreate_tmp.password[1].pattern=this.changePasswordInfo.ruleForCreate.password[1].pattern

// inf('1',this.loginInfo.ruleForCreate.account)
      for(let singleUsedFieldName of usedFieldName){
        //Object.assign在browser似乎无法正常运行，只能得到最后一次赋值
        inputAttribute[singleUsedFieldName]=inputAttribute_tmp[singleUsedFieldName]
        userInputValue[singleUsedFieldName]=userInputValue_tmp[singleUsedFieldName]
        userInputTempData[singleUsedFieldName]=userInputTempData_tmp[singleUsedFieldName]
        ruleForCreate[singleUsedFieldName]=ruleForCreate_tmp[singleUsedFieldName]

      }

      let newFieldNames=['newPassword','againPassword']
      for(let singleNewFieldName of newFieldNames){
        inputAttribute[singleNewFieldName]=objectDeepCopy(inputAttribute['password'])
        userInputValue[singleNewFieldName]=objectDeepCopy(userInputValue['password'])
        userInputTempData[singleNewFieldName]=objectDeepCopy(userInputTempData['password'])
        ruleForCreate[singleNewFieldName]=objectDeepCopy(ruleForCreate['password'])
        ruleForCreate[singleNewFieldName][1].pattern=this.changePasswordInfo.ruleForCreate.password[1].pattern
      }

      //newPassword的validator
      const newPasswordCantSameAsOldPassword = (rule, value, callback) => {
        if(null!==this.userInputValue.password && ''!==this.userInputValue.password){
          if(value===this.userInputValue.password ){
            callback(new Error('新密码不能和旧密码一样'));
          }else{
            callback()
          }
        }

      };
      //againPassword的validator
      const  againPasswordMustSameAsNewPassword= (rule, value, callback) => {
        if(null!==this.userInputValue.newPassword && ''!==this.userInputValue.newPassword){
          if(value!==this.userInputValue.newPassword ){
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
        ruleForInput:ruleForCreate,
        inputAttribute:inputAttribute,
        userInputTempData:userInputTempData,
        userInputValue:userInputValue,

        loginResultMsg:'显示修改结果',//预先设置，用来占位
        showResultFlag:false,//判断登录结果
        buttonDisableStyle:{'background-color':`#8cc0f7`,'color':`white`},
        // icon:{name:'person',account:'person',password:'locked'},
        // iconColor:'#5cadff',
        hideOccupySpace:{visibility:'hidden'},
        // rememberMe:false, //记住用户名
        submitButtonDisable:true,

        url:{
          changePassword:'/user/changePassword',
          // unique:'/user/uniqueCheck_async',
        }
      }
    }
  }
</script>
