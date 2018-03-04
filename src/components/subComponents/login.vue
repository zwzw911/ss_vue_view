<style scoped>
</style>

<template>
  <div class="">
    <div>
      <p class="h4 font-fantasy">登录</p>
    </div>
    <div>

            <!--:label-width="80"-->
      <div class="flex-flow-row-nowrap justify-content-flex-start paddingH4 marginV2">
        <p :style="showResultFlag ? '':hideOccupySpace" class="color-red h5">{{loginResultMsg}}</p>
      </div>


      <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4 " ref="userInputValue" :model="userInputValue" :rules="ruleForInput">
        <template v-for="(v,k) in userInputValue">
          <template v-if="undefined!==inputAttribute[k]['enum']">
            <FormItem :prop="k" :key="k" >
              <Select v-model="userInputValue[k]" :placeholder="inputAttribute[k]['placeHolder'][0]">
                <Option v-for="(enumValue,enumKey) in inputAttribute[k]['enum']" :value="enumKey" :key="enumKey">{{enumValue}}</Option>
              </Select>
            </FormItem>
          </template>
          <template v-else="">
            <FormItem  :prop="k" :key="k"  class="" :error="userInputTempData[k]['validResult']">
              <!---->
              <Input
                @on-focus="focusInputPlaceHolderDisappear({keyName:k});focusResetLoginResult()"
                @on-blur="blurInputPlaceHolderRestore({keyName:k});validSingleInputValue({formVariantName:'userInputValue',fieldName:k});checkSubmitButtonStatus({})"
                @on-change="validSingleInputValue({formVariantName:'userInputValue',fieldName:k});checkSubmitButtonStatus({});"
                :type="inputAttribute[k]['inputType']" v-model="userInputValue[k]" :placeholder="inputAttribute[k]['placeHolder'][0]"
              >
                <span slot="prepend"  style="">
                  <Icon :type="icon[k]" size="20" :color="iconColor"></Icon>
                </span>

              </Input>
              <!--<Input v-model="userInputValue.name.value" placeholder=""></Input>-->
            </FormItem>
          </template>
        </template>

        <img :src="captchaImg" width="78px" height="28px">
        <!--term of service-->
        <div class="flex-flow-row-nowrap justify-content-flex-start marginV4">
          <Checkbox v-model="rememberMe" @on-change="">

          </Checkbox>
          <span>记住我</span>

        </div>

        <FormItem class="">
          <Button long size="large" shape="circle" type="primary" @click="sendLoginInfo()" :style="submitButtonDisable ? buttonDisableStyle:''" :disabled="submitButtonDisable">登录</Button>
          <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
        </FormItem>
      </Form>

      <span class="h4">already?<a>link</a></span>
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
    props:['loginInfo'], //
    created(){

      if(true===this.$cookies.isKey('account')){
        this.userInputValue.account=this.$cookies.get('account')
        this.userInputTempData.account[InputTempDataFieldName.VALID_RESULT]=''
      }

      this.getCaptcha()
      /*axios.defaults.withCredentials = true //带cookie
      let result=axios.post('/user/captcha',
        {
          /!*          values: {
                      [ValidatePart.METHOD]: Method.MATCH,
                      [ValidatePart.RECORD_INFO]: this.userInputValue
                    }*!/
        })
        .then(function(result){
          inf('result',result)
          if(result.data.rc>0){
            that.loginResultMsg=result.data.msg
            that.showResultFlag=true
          }else{
            inf('result correct in')
            that.showResultFlag=false
            inf('after setr flag')
            that.captchaImg=result.data.msg


          }
        },function(err){})*/
    },
    mounted(){
      //获得captcha
      // this.$nextTick(function () {
      //   this.getCaptcha()
      // })
      // this.getCaptcha()
      // =await this.sendLoginInfo()
      // this.getCaptcha()
    },
    methods: {
      /********************************************/
      /*                    view                  */
      /********************************************/
      //存储 单个input 的检测结果（null：为检测，非空字符：检测通过，空字符：检测通过）
      validSingleInputValue({formVariantName, fieldName}) {
        // inf('validSingleInputValue in')
        // inf('formVariantName',formVariantName)
        // inf('type',type)
        // inf('a',Object.keys(this.$refs))
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
      async sendLoginInfo(){
        axios.defaults.withCredentials = true //带cookie
        let result=await axios.post(this.url.login,
          {
            values: {
              [ValidatePart.METHOD]: Method.MATCH,
              [ValidatePart.RECORD_INFO]: this.userInputValue
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
      //应用在created中，只能使用Promise，而不能使用async/await
      //应用在created中，如果要设置data中的数据，需要使用别名that而不能使用this
      getCaptcha(){
        const that=this
        axios.defaults.withCredentials = true //带cookie
        let result=axios.post('/user/captcha', {})
          .then(function(result){
        // inf('result',result)
          if(result.data.rc>0){
            that.loginResultMsg=result.data.msg
            that.showResultFlag=true
          }else{
            // inf('result correct in')
            that.showResultFlag=false
            // inf('after setr flag')
            that.captchaImg=result.data.msg

          }
        },function(err){})
      },


    },
    computed:{

    },
    data(){
      let usedFieldName=['account','password']
      let inputAttribute_tmp,userInputValue_tmp,userInputTempData_tmp,ruleForCreate_tmp
      let inputAttribute={},userInputValue={},userInputTempData={},ruleForCreate={}

      inputAttribute_tmp=objectDeepCopy(this.loginInfo.inputAttribute)
      inputAttribute_tmp.account[InputAttributeFieldName.PLACE_HOLDER]=['请输入手机号或邮箱']
      inputAttribute_tmp.account[InputAttributeFieldName.PLACE_HOLDER_BKUP]=['请输入手机号或邮箱']

      userInputValue_tmp=objectDeepCopy(this.loginInfo.initInputValue)
      userInputTempData_tmp=objectDeepCopy(this.loginInfo.inputTempData)

      ruleForCreate_tmp=objectDeepCopy(this.loginInfo.ruleForCreate)
      ruleForCreate_tmp.account[0].message='账号不能为空'
      ruleForCreate_tmp.account[1].message='账号必须是有效的手机号或邮箱'
      ruleForCreate_tmp.account[1].pattern=this.loginInfo.ruleForCreate.account[1].pattern
      ruleForCreate_tmp.password[1].pattern=this.loginInfo.ruleForCreate.password[1].pattern

// inf('1',this.loginInfo.ruleForCreate.account)
      for(let singleUsedFieldName of usedFieldName){
        //Object.assign在browser似乎无法正常运行，只能得到最后一次赋值
        inputAttribute[singleUsedFieldName]=inputAttribute_tmp[singleUsedFieldName]
        userInputValue[singleUsedFieldName]=userInputValue_tmp[singleUsedFieldName]
        userInputTempData[singleUsedFieldName]=userInputTempData_tmp[singleUsedFieldName]
        ruleForCreate[singleUsedFieldName]=ruleForCreate_tmp[singleUsedFieldName]
      }
      // inf('2',ruleForCreate)
      return {
        ruleForInput:ruleForCreate,
        inputAttribute:inputAttribute,
        userInputTempData:userInputTempData,
        userInputValue:userInputValue,

        loginResultMsg:'显示登录结果',//预先设置，用来占位
        showResultFlag:false,//判断登录结果
        buttonDisableStyle:{'background-color':`#8cc0f7`,'color':`white`},
        icon:{name:'person',account:'person',password:'locked'},
        iconColor:'#5cadff',
        hideOccupySpace:{visibility:'hidden'},
        rememberMe:false, //记住用户名
        submitButtonDisable:true,

        url:{
          login:'/user',
          // unique:'/user/uniqueCheck_async',
        },
        captchaImg:'',
      }
    }
  }
</script>
