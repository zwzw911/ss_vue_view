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
        <p :style="(loginResultMsg==='显示') ? hideOccupySpace:''" class="color-red h5">{{loginResultMsg}}</p>
      </div>


      <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4 " ref="userInputValue" :model="userInputValue" :rules="ruleForInput">
        <template v-for="(v,k) in userInputValue">
          <template v-if="k!=='captcha'">
            <template v-if="undefined!==inputAttribute[k]['enum']">
              <FormItem :prop="k" :key="k" >
                <Select v-model="userInputValue[k]" :placeholder="inputAttribute[k]['placeHolder'][0]">
                  <Option v-for="(enumValue,enumKey) in inputAttribute[k]['enum']" :value="enumKey" :key="enumKey">{{enumValue}}</Option>
                </Select>
              </FormItem>
            </template>
            <!--<template v-else-if="k==='captcha'">-->
            <!--</template>-->
            <template v-else="">
              <FormItem  :prop="k" :key="k"  class="" :error="userInputTempData[k]['validResult']">
                <!---->
                <Input
                  @on-focus="focusInputPlaceHolderDisappear({keyName:k});focusResetLoginResult()"
                  @on-blur="blurInputPlaceHolderRestore({keyName:k});validSingleInputValue({formVariantName:'userInputValue',fieldName:k});checkSubmitButtonStatus({})"
                  @on-change="validSingleInputValue({formVariantName:'userInputValue',fieldName:k});checkSubmitButtonStatus({});"
                  :type="inputAttribute[k]['inputType']" v-model="userInputValue[k]" :placeholder="inputAttribute[k]['placeHolder'][0]"
                >
                <span slot="prepend"  style="" v-if="null!==icon[k]">
                  <Icon :type="icon[k]" size="20" :color="iconColor"></Icon>
                </span>
                </Input>
                <!--<Input v-model="userInputValue.name.value" placeholder=""></Input>-->
              </FormItem>
            </template>
          </template>

        </template>

        <!--ref的父元素不能放在template中-->
        <div class="flex-flow-row-nowrap align-items-flex-start align-content-center justify-content-space-between flex-grow-1">
          <FormItem  prop="captcha"   class=" marginR3" :error="userInputTempData['captcha']['validResult']">
            <!---->
            <Input
              @on-focus="focusInputPlaceHolderDisappear({keyName:'captcha'});focusResetLoginResult()"
              @on-blur="blurInputPlaceHolderRestore({keyName:'captcha'});validSingleInputValue({formVariantName:'userInputValue',fieldName:'captcha'});checkSubmitButtonStatus({})"
              @on-change="validSingleInputValue({formVariantName:'userInputValue',fieldName:'captcha'});checkSubmitButtonStatus({});"
              :type="inputAttribute['captcha']['inputType']" v-model="userInputValue['captcha']" :placeholder="inputAttribute['captcha']['placeHolder'][0]"
            >
            </Input>

          </FormItem>

          <selfCaptcha ref="selfCaptcha" class="radius1" :captcha-info="captchaInfo" @genCaptchaSuccess="genCaptchaSuccess" ></selfCaptcha>


        </div>


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
  import selfCaptcha from './cpatcha'
  import {objectDeepCopy} from  '../../function/misc'
  import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'



  import {myAxios,mergeAdditionalField} from '../helperLib/componentsHelperLib'

  // import axios from 'axios'
  import {inf,wrn,err} from 'awesomeprint'

  export default {
    components:{selfCaptcha},
    props:['loginInfo'], //
    created(){

      if(true===this.$cookies.isKey('account')){
        this.userInputValue.account=this.$cookies.get('account')
        this.userInputTempData.account[InputTempDataFieldName.VALID_RESULT]=''
      }

      // this.getCaptcha()

    },
    mounted(){
      //获得captcha
      this.$refs.selfCaptcha.getCaptchaImg_async()
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
        this.loginResultMsg='显示'
      },

      genCaptchaSuccess(){
        // if(this.submitButtonDisable){
        //   this.userInputValue['captcha']=null
        //   this.userInputTempData['captcha']['validResult']=null
        // }

      },
      /********************************************/
      /*                    axios                 */
      /********************************************/
      async sendLoginInfo(){
        //captcha需要从inputValue中剥离，放入CAPTCHA
        let captcha=this.userInputValue[ValidatePart.CAPTCHA]
        //不能直接删除，否则iview的验证会认为此字段的值不存在
        let tmpInputValue= objectDeepCopy(this.userInputValue)
        delete tmpInputValue[ValidatePart.CAPTCHA]
        let result=await myAxios.post(this.url.login,
          {
            values: {
              [ValidatePart.METHOD]: Method.MATCH,
              [ValidatePart.RECORD_INFO]: tmpInputValue,
              [ValidatePart.CAPTCHA]:captcha,
            }
          })
        // =await this.sendLoginInfo()
        if(result.data.rc>0){
          //captcha的错误显示在captcha中
          if(-1!==[60054,60056].indexOf(result.data.rc)){
            this.userInputTempData['captcha']['validResult']=result.data.msg

          }else{
            this.loginResultMsg=result.data.msg
          }
          //验证错误，重新生成新的
          await this.$refs.selfCaptcha.getCaptchaImg_async()
          // this.showResultFlag=true
        }else{
          this.loginResultMsg='显示'
          // this.showResultFlag=false
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
      let usedFieldName=['account','password']
      let inputAttribute_tmp,userInputValue_tmp,userInputTempData_tmp,ruleForCreate_tmp,icon_tmp
      let inputAttribute={},userInputValue={},userInputTempData={},ruleForCreate={},icon={}

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

      icon_tmp=objectDeepCopy(this.loginInfo.icon)
// inf('1',this.loginInfo.ruleForCreate.account)
      for(let singleUsedFieldName of usedFieldName){
        //Object.assign在browser似乎无法正常运行，只能得到最后一次赋值
        inputAttribute[singleUsedFieldName]=inputAttribute_tmp[singleUsedFieldName]
        userInputValue[singleUsedFieldName]=userInputValue_tmp[singleUsedFieldName]
        userInputTempData[singleUsedFieldName]=userInputTempData_tmp[singleUsedFieldName]
        ruleForCreate[singleUsedFieldName]=ruleForCreate_tmp[singleUsedFieldName]
        icon[singleUsedFieldName]=icon_tmp[singleUsedFieldName]
      }
/*      err('before mergeAdditionalField')
      inf('before mergeAdditionalField inputAttribute result',inputAttribute)
      inf('before mergeAdditionalField inputTempData result',userInputTempData)
      inf('before mergeAdditionalField inputValue result',userInputValue)
      inf('before mergeAdditionalField ruleForCreate result',ruleForCreate)
      inf('before mergeAdditionalField icon result',icon)*/
      mergeAdditionalField({arr_fieldName:['captcha'],inputAttribute:inputAttribute,inputTempData:userInputTempData,inputValue:userInputValue,icon:icon,ruleForCreate:ruleForCreate,ruleForUpdate:undefined})
/*      err('after mergeAdditionalField')
      inf('mergeAdditionalField inputAttribute result',inputAttribute)
      inf('mergeAdditionalField inputTempData result',userInputTempData)
      inf('mergeAdditionalField inputValue result',userInputValue)
      inf('mergeAdditionalField ruleForCreate result',ruleForCreate)
      inf('mergeAdditionalField icon result',icon)*/
      return {
        ruleForInput:ruleForCreate,
        inputAttribute:inputAttribute,
        userInputTempData:userInputTempData,
        userInputValue:userInputValue,

        loginResultMsg:'显示',//预先设置，用来占位
        // showResultFlag:false,//判断登录结果
        buttonDisableStyle:{'background-color':`#8cc0f7`,'color':`white`},
        icon:icon,
        iconColor:'#5cadff',
        hideOccupySpace:{visibility:'hidden'},
        rememberMe:false, //记住用户名
        submitButtonDisable:true,

        url:{
          login:'/user',
          // unique:'/user/uniqueCheck_async',
        },


        captchaInfo:{
          captchaImgWidth:80, //px。事先确定好长宽，以便刷新时，如果有refreshIcon存在，此icon位置不会变化
          captchaImgHeight:33,
          refreshIcon:'refresh',//空：无刷新icon；否则显示
          captchaImgId:'captchaImgId',
          captchaURL:'/user/captcha',
        },
      }
    }
  }
</script>
