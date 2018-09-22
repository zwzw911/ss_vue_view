<style scoped>
</style>

<template>
  <div class="">
    <div>
      <p class="h4 color-lightener-red font-fantasy">注册</p>
    </div>
    <div>
      <!--<input placeholder="test"/>-->
      <Tabs :animated="false" class="flex-flow-column-nowrap marginT6" @on-click="clickTab" :value="currentType">
        <!--<template v-for="(tabValue,tabName,index) in tabInfo" >-->
          <TabPane :label="tabInfo.phone['label']"  :icon="tabInfo.phone['icon']" :name="tabInfo.phone['name']">
            <!--:label-width="80"-->
            <div class="flex-flow-row-nowrap justify-content-flex-start marginV2">
              <p style="" class="color-red h5">
                <span>{{globalResultMsg[currentType]}}</span>
                <span style="visibility:hidden">1</span>
              </p>
            </div>

            <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1" label-position="left"
                  :label-width="undefined===formItemInfo[currentType].labelWidth ? 0:formItemInfo[currentType].labelWidth"
                  :ref="ref.form.phone" :model="formItemInfo.phone.inputValue" :rules="formItemInfo.phone.rule"
                  @submit.native.prevent
            >

              <self-form-item :ref="ref.formItem.phone" :form-item-info="formItemInfo.phone" @validateAllItemResult="setFormItemResult" @onBlur="checkSubmitButtonStatus"></self-form-item>
              <!--<selfCaptcha ref="selfCaptchaForEmail" :captcha-info="captchaInfo"></selfCaptcha>-->
              <!--term of service-->
<!--              <div class="flex-flow-row-nowrap justify-content-flex-start marginV4">
                <Checkbox v-model="agreeTOS[currentType]" @on-change="checkSubmitButtonStatus()">

                </Checkbox>
                <span>asdf<a>trew</a></span>

              </div>-->

<!--              <FormItem class="">
                <Button long size="large" shape="circle" type="primary" @click="sendRegInfo({type:currentType})" :style="submitButtonDisable[currentType] ? buttonDisableStyle:''" :disabled="submitButtonDisable[currentType]">注册</Button>
                &lt;!&ndash;<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>&ndash;&gt;
              </FormItem>-->
              <!--<Button long size="large" shape="circle" type="primary" @click="sendRegInfo({type:currentType})" :style="submitButtonDisable[currentType] ? buttonDisableStyle:''" :disabled="submitButtonDisable[currentType]">注册</Button>-->
            </Form>

          </TabPane>


          <!--<template v-for="(tabValue,tabName,index) in tabInfo" >-->
          <TabPane :label="tabInfo.email['label']"  :icon="tabInfo.email['icon']" :name="tabInfo.email['name']">
            <!--:label-width="80"-->
            <div class="flex-flow-row-nowrap justify-content-flex-start  marginV2">
              <p style="" class="color-red h5">
                <span>{{globalResultMsg[currentType]}}</span>
                <span style="visibility:hidden">1</span>
              </p>
            </div>

            <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 "
                  label-position="left"
                  :label-width="undefined===formItemInfo[currentType].labelWidth ? 0:formItemInfo[currentType].labelWidth"
                  :ref="ref.form.email" :model="formItemInfo.email.inputValue" :rules="formItemInfo.email.rule"
                  @submit.native.prevent
            >
              <self-form-item :ref="ref.formItem.email" :form-item-info="formItemInfo.email"></self-form-item>
              <!--term of service-->


<!--              <FormItem class="">
                <Button long size="large" shape="circle" type="primary" @click="sendRegInfo({type:currentType})" long :style="submitButtonDisable[currentType] ? buttonDisableStyle:''" :disabled="submitButtonDisable[currentType]">注册</Button>
                &lt;!&ndash;<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>&ndash;&gt;
              </FormItem>-->
              <!--<Button long size="large" shape="circle" type="primary" @click="sendRegInfo({type:currentType})" long :style="submitButtonDisable[currentType] ? buttonDisableStyle:''" :disabled="submitButtonDisable[currentType]">注册</Button>-->

            </Form>

          </TabPane>
      </Tabs>
      <div class="flex-flow-column-nowrap align-content-space-between justify-content-space-between marginV2 ">
        <div class="text-align-left marginB1">
          <Checkbox v-model="agreeTOS[currentType]" @on-change="checkSubmitButtonStatus()">
            阅读并同意<a href="/registerAgreement" target="_blank">注册协议</a>
          </Checkbox>
        </div>


        <Button long size="large" shape="circle" type="primary" @click="sendRegInfo({type:currentType})" long :style="submitButtonDisable[currentType] ? buttonDisableStyle:''" :disabled="submitButtonDisable[currentType]">注册</Button>

        <a class=" text-align-left marginT4" @click="routeToLogin">登录</a>
      </div>

    </div>
  </div>
</template>

<script>
  /******************************/
  /**         component       **/
  /******************************/
  import selfFormItem from '../basicComponent/formItem'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf,wrn,err} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import {objectDeepCopy,objectPartlyDeepCopy,routeTo} from  '../../function/misc'
  import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'
  import {sendRequestGetResult_async} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'


  export default {
    components:{selfFormItem},

    mounted(){
    },
    methods: {
      //获得整体验证结果后，立即设置button状态
      setFormItemResult(result){
        let type=this.currentType
        this.validateFormItemResult[type]=result
        this.checkSubmitButtonStatus()
      },

      //每个input blur或者check box click，都要检查素有input valida的状态以及check box的状态，以便决定是否enable 注册按钮
      checkSubmitButtonStatus() {
          let type=this.currentType

          if(null===this.validateFormItemResult[type] || false===this.validateFormItemResult[type]){
            // inf('forminte  box in')
            this.submitButtonDisable[type] = true
            return
          }
          if (false === this.agreeTOS[type]) {
          // inf('chekc box in')
            this.submitButtonDisable[type] = true
            return
          }
          // inf('checkSubmitButtonStatus successful')
          this.submitButtonDisable[type] = false
        // }

      },

      //点击tab，如果任意一个字段有对应的validResult,则执行resetFields的操作
      clickTab(name){
        this.currentType=name

        //刷新captcha
        this.$refs[this.ref.formItem[this.currentType]].getCaptchaImg_async()

        //获得除了当前点击tab的其他tab的名字，以便及时消除可能存在的错误信息（而不是等到点击此tab才消除，这样消除的过程会被观测到，体验差）
        for(let singleTabName of this.allTabNames){
          //非当前点击的tab，则提前进行判断，是否需要reset
          if(name!==singleTabName){
            let resetFlag=false
            for(let singleFieldName in this.formItemInfo[singleTabName].inputTempData){
              if(null!==this.formItemInfo[singleTabName].inputTempData[singleFieldName][InputTempDataFieldName.VALID_RESULT]){
                resetFlag=true
              }
            }
            // inf('resetFlag',resetFlag)
            // inf('singleTabName',singleTabName)
            if(true===resetFlag){
                this.$refs[this.ref.form[this.currentType]].resetFields()
                // inf('after formPhone reset ')
                for(let singleFieldName in this.formItemInfo[singleTabName].inputTempData){
                  // inf('singleTabName to restore',singleFieldName)
                  this.$refs[this.ref.formItem[this.currentType]].restorePlaceHolder({keyName:singleFieldName})
                  // this.$refs[`formItemForPhone`].blurInputPlaceHolderRestore({keyName:singleFieldName})
                }
              }
            }
          }
        },


      /********************************************/
      /**                   axios                **/
      /********************************************/
      async sendRegInfo() {
        let captcha=objectPartlyDeepCopy({sourceObj:this.formItemInfo[this.currentType].inputValue,expectedKey:['captcha']})
        let tmpInputValue= objectDeepCopy(this.formItemInfo[this.currentType].inputValue)
        delete tmpInputValue[ValidatePart.CAPTCHA]

        let data={
          values: {
            // [ValidatePart.METHOD]: Method.CREATE,
            [ValidatePart.RECORD_INFO]: tmpInputValue,
            [ValidatePart.CAPTCHA]:captcha.captcha,
          }
        }
        let result=await sendRequestGetResult_async({urlOption:urlConfiguration.user.register,data:data})
        // inf('result',result)
          // .then(function (result) {
            if(result.rc>0){
              // captcha错误显示在input下
              let setCaptchaResult=this.$refs[this.ref.formItem[this.currentType]].checkIfCaptchaErrAndShow({data:result})
              //否则，显示在最顶上
              if(false===setCaptchaResult){
                let set99999Result=this.$refs[this.ref.formItem[this.currentType]].checkIf99999ErrAndShow({data:result})
                if(false===set99999Result){
                  this.globalResultMsg[this.currentType]=result.msg
                }
              }

              //无论什么错误，都重新获得captcha
              if(undefined!==this.formItemInfo[this.currentType].captchaInfo){
                // inf('start call getCaptchaImg_async to regen')
                await this.$refs[this.ref.formItem[this.currentType]].getCaptchaImg_async()
              }
            }else{
              //消除global（最顶上）的错误
              this.globalResultMsg[this.currentType]=''
            }
      },

      /********************************************/
      /**                   route                **/
      /********************************************/
      routeToLogin(){
        routeTo({that:this,path:'/login'})
      },
    },

    computed:{


    },
    props:['registerInfo'], //
      data(){

        let phone=objectDeepCopy(this.registerInfo.formItemInfo),email=objectDeepCopy(this.registerInfo.formItemInfo)
        // inf('phone',phone)
        // inf('phone[\'inputAttribute\']',phone['inputAttribute'])
        // let usedFieldName=['name','account','password']
        // phone['inputAttribute']=objectDeepCopy({sourceObj:this.registerInfo.formItemInfo.inputAttribute})
        // email['inputAttribute']=objectPartlyDeepCopy({sourceObj:this.registerInfo.formItemInfo.inputAttribute,expectedKey:usedFieldName})
        phone['inputAttribute'].account[InputAttributeFieldName.PLACE_HOLDER]=[this.registerInfo.formItemInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER][0]]
        phone['inputAttribute'].account[InputAttributeFieldName.PLACE_HOLDER_BKUP]=[this.registerInfo.formItemInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER_BKUP][0]]
        email['inputAttribute'].account[InputAttributeFieldName.PLACE_HOLDER]=[this.registerInfo.formItemInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER][1]]
        email['inputAttribute'].account[InputAttributeFieldName.PLACE_HOLDER_BKUP]=[this.registerInfo.formItemInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER_BKUP][1]]

        // phone['inputTempData']=objectPartlyDeepCopy({sourceObj:this.registerInfo.inputTempData,expectedKey:usedFieldName})
        // email['inputTempData']=objectPartlyDeepCopy({sourceObj:this.registerInfo.inputTempData,expectedKey:usedFieldName})

        // phone['inputValue']=objectPartlyDeepCopy({sourceObj:this.registerInfo.initInputValue,expectedKey:usedFieldName})
        // email['inputValue']=objectPartlyDeepCopy({sourceObj:this.registerInfo.initInputValue,expectedKey:usedFieldName})

        phone['icon']={name:'ios-person',account:'ios-phone-portrait',password:'ios-lock'}
        email['icon']={name:'ios-person',account:'ios-mail',password:'ios-lock'}

        // phone['rule']=objectPartlyDeepCopy({sourceObj:this.registerInfo.formItemInfo.rule,expectedKey:usedFieldName})
        phone['rule'].name[1].pattern=this.registerInfo.formItemInfo.rule.name[1].pattern
        phone['rule'].account[0].message='手机号不能为空'
        phone['rule'].account[1].message='无效的手机号'
        phone['rule'].account[1].pattern=this.registerInfo.formItemInfo.rule.account[1].pattern //正则无法通过JSON.stringify转换，所以需要直接赋值
        phone['rule'].account[1].trigger='blur'   //patter的检测在blur才触发
        phone['rule'].password[1].pattern=this.registerInfo.formItemInfo.rule.password[1].pattern
        // email['rule']=objectPartlyDeepCopy({sourceObj:this.registerInfo.formItemInfo.rule,expectedKey:usedFieldName})
        email['rule'].name[1].pattern=this.registerInfo.formItemInfo.rule.name[1].pattern
        email['rule'].account[0].message='电子邮件地址不能为空'
        //email的检测不使用正则，而使用async_validator的方式
        email['rule'].account[1]={ type: 'email', message: '无效电子邮件', trigger: 'blur' }
        email['rule'].password[1].pattern=this.registerInfo.formItemInfo.rule.password[1].pattern



        // phone['unique']=objectPartlyDeepCopy({sourceObj:this.registerInfo.unique,expectedKey:usedFieldName})
        // email['unique']=objectPartlyDeepCopy({sourceObj:this.registerInfo.unique,expectedKey:usedFieldName})

        phone['iconColor']='#5cadff'
        email['iconColor']='#5cadff'

        phone['captchaInfo']['captchaImgId']='phone'
        phone['captchaInfo']['getAfterMounted']=true
        email['captchaInfo']['captchaImgId']='email'
        email['captchaInfo']['getAfterMounted']=false

        // mergeAdditionalField({arr_fieldName:['captcha'],inputAttribute:phone['inputAttribute'],inputTempData:phone['inputTempData'],inputValue:phone['inputValue'],icon:phone['icon'],ruleForCreate:phone['rule'],ruleForUpdate:undefined})
        // mergeAdditionalField({arr_fieldName:['captcha'],inputAttribute:email['inputAttribute'],inputTempData:email['inputTempData'],inputValue:email['inputValue'],icon:email['icon'],ruleForCreate:email['rule'],ruleForUpdate:undefined})
        // mergeAdditionalField({arr_fieldName:['captcha'],formItemInfo:phone})
        // mergeAdditionalField({arr_fieldName:['captcha'],formItemInfo:email})
        // phone['labelWidth']=this.registerInfo.labelWidth//0或者undefined，则不显示label；其他数值，显示label
        // email['labelWidth']=this.registerInfo.labelWidth//0或者undefined，则不显示label；其他数值，显示label

        // phone['span']=this.registerInfo.span  //formItem的宽度和offset
        // email['span']=this.registerInfo.span  //formItem的宽度和offset

        return {
          formItemInfo:{
            phone:phone,
            email:email,
          },
          //接收formItem检测结果
          validateFormItemResult:{
            phone:null,
            email:null,
          },
          globalResultMsg:{
            phone:"",
            email:"",
          },//全局错误信息
          ref:{
            formItem:{
              phone:'formItemForPhone',
              email:'formItemForEmail',
            },
            form:{
              phone:'formForPhone',
              email:'formForEmail',
            },
          },
          allTabNames:['phone','email'],
          currentType:'phone',
          buttonDisableStyle:{'background-color':`#8cc0f7`,'color':`white`},

          tabInfo:{
            phone:{label:'手机注册',icon:'android-phone-portrait',name:'phone'},
            email:{label:'邮件注册',icon:'android-mail',name:'email'},
          },

          agreeTOS:{//两种注册方式使用独立的数据
            phone:false,
            email:false,
          }, //term of service
          submitButtonDisable:{
            phone:true,
            email:true
          },
/*          url:{
            user:'/user',
            // unique:'/user/uniqueCheck_async',
          },*/
        }
      }
  }
</script>
