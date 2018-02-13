<style scoped>
</style>

<template>
  <div class="">
    <div>
      <p class="h4 color-lighten-red font-fantasy">REG</p>
    </div>
    <div>
      <!--<input placeholder="test"/>-->
      <Tabs :animated="false" class="flex-flow-column-nowrap " @on-click="clickTab">
        <template v-for="(tabValue,tabName,index) in tabInfo" >
          <TabPane :label="tabValue['label']"  :icon="tabValue['icon']" :name="tabName" :key="tabName">
            <!--:label-width="80"-->
            <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4" :ref="refString" :model="userInputValue.phone" :rules="ruleForCreate.phone">
              <template v-for="(v,k) in userInputValue[currentType]">
                <template v-if="undefined!==inputAttribute[currentType][k]['enum']">
                  <FormItem :prop="k" :key="k" >
                    <Select v-model="userInputValue[currentType][k]" :placeholder="inputAttribute[currentType][k]['placeHolder'][0]">
                      <Option v-for="(enumValue,enumKey) in inputAttribute[currentType][k]['enum']" :value="enumKey" :key="enumKey">{{enumValue}}</Option>

                    </Select>
                  </FormItem>
                </template>
                <template v-else="">
                  <FormItem  :prop="k" :key="k"  class="" :error="userInputTempData[currentType][k]['validResult']">
                    <template v-if="currentType==='phone'">
                      <Input
                        @on-focus="focusInputPlaceHolderDisappear(k)"
                        @on-blur="blurInputPlaceHolderRestore(k);validSingleInputValue({formVariantName:'userInputValue',fieldName:k,type:currentType});checkSubmitButtonStatus({type:currentType});validateNameUnique({type:currentType,fieldName:k,userInputTempData:userInputTempData})"
                        :type="inputAttribute[currentType][k]['inputType']" v-model="userInputValue['phone'][k]" :placeholder="inputAttribute[currentType][k]['placeHolder'][0]"
                      >
                      <span slot="prepend" >
                        <Icon :type="icon[currentType][k]" size="20"></Icon>
                      </span>
                      </Input>
                    </template>
                    <template v-if="currentType==='email'">
                      <Input
                        @on-focus="focusInputPlaceHolderDisappear(k)"
                        @on-blur="blurInputPlaceHolderRestore(k);validSingleInputValue({formVariantName:'userInputValue',fieldName:k,type:currentType});checkSubmitButtonStatus({type:currentType});validateNameUnique({type:currentType,fieldName:k,userInputTempData:userInputTempData})"
                        :type="inputAttribute[currentType][k]['inputType']" v-model="userInputValue['email'][k]" :placeholder="inputAttribute[currentType][k]['placeHolder'][0]"
                      >
                      </Input>
                    </template>

                  </FormItem>
                </template>
              </template>


              <!--term of service-->
              <div class="flex-flow-row-nowrap justify-content-flex-start marginV4">
                <Checkbox v-model="agreeTOS[currentType]" @on-change="checkSubmitButtonStatus({type:currentType})">

                </Checkbox>
                <span>asdf<a>trew</a></span>

              </div>

              <FormItem class="">
                <Button type="primary" @click="sendRegInfo({type:currentType})" long :disabled="submitButtonDisable[currentType]">REG</Button>
                <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
              </FormItem>
            </Form>
          </TabPane>
        </template>
      </Tabs>

    </div>
  </div>
</template>

<script>
  // import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  import {objectDeepCopy} from  '../../function/misc'
  import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'
  import {regex} from '../../constant/regex/regex'
  import axios from 'axios'
import {inf,wrn,err} from 'awesomeprint'

  export default {
    props:['registerInfo'], //
    methods: {
      /********************************************/
      /*                    view                  */
      /********************************************/
      //存储 单个input 的检测结果（null：为检测，非空字符：检测通过，空字符：检测通过）
      validSingleInputValue({formVariantName, fieldName, type}) {
        // inf('validSingleInputValue in')
        inf('a',Object.keys(this.$refs))
        //formItem放在2层template中，所以大概需要数组来引用
        this.$refs[`${formVariantName}.${type}`]['1'].validateField(fieldName, (validResult) => {
          // inf('validResult',validResult)
          this.userInputTempData[type][fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
        })
      },
      //每个input blur或者check box click，都要检查素有input valida的状态以及check box的状态，以便决定是否enable 注册按钮
      checkSubmitButtonStatus({type}) {
        // inf('checkSubmitButtonStatus in')
        for (let singleFieldName in this.userInputTempData[type]) {
          let singleFieldValidResult = this.userInputTempData[type][singleFieldName][InputTempDataFieldName.VALID_RESULT]
          if (null === singleFieldValidResult || '' !== singleFieldValidResult) {
            this.submitButtonDisable[type] = true
            return
          }
        }
        if (false === this.agreeTOS[type]) {
          this.submitButtonDisable[type] = true
          return
        }
        this.submitButtonDisable[type] = false
      },
      //模拟safiri，点击input时，placeHolder内容消失
      focusInputPlaceHolderDisappear(keyName) {
        inf('focusInputPlaceHolderDisappear in')
        if (null === this.userInputValue[this.currentType][keyName] || '' === this.userInputValue[this.currentType][keyName]) {
          this.inputAttribute[this.currentType][keyName][InputAttributeFieldName.PLACE_HOLDER] = ''
        }
      },
      //如果离开input时，inputValue为空，需要恢复placeholder内容
      blurInputPlaceHolderRestore(keyName) {
        // inf('blurInputPlaceHolderRestore in')
        if (null === this.userInputValue[this.currentType][keyName] || '' === this.userInputValue[this.currentType][keyName]) {
          this.inputAttribute[this.currentType][keyName][InputAttributeFieldName.PLACE_HOLDER] = this.inputAttribute[this.currentType][keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }

      },

      clickTab(name){
        this.currentType=name
        // this.refObj=this.userInputValue[name]
        // this.valueObj=this.userInputValue[name]
        // this.rulesObj=this.ruleForCreate[name]
      },

      /********************************************/
      /*                    axios                 */
      /********************************************/
      sendRegInfo({type}) {
        axios.post(this.url.user,
          {
            values: {
              [ValidatePart.METHOD]: Method.CREATE,
              [ValidatePart.RECORD_INFO]: this.userInputValue[type]
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //不知道为啥，data和computed中的数据，不能放在promise的then中使用，所以只能通过参数传递
      validateNameUnique({type,fieldName,userInputTempData}) {
        // inf('this.registerInfo.inputAttribute[fieldName]', this.registerInfo.inputAttribute[fieldName])

        if (undefined !== this.inputAttribute[type][fieldName][InputAttributeFieldName.UNIQUE] && true === this.inputAttribute[type][fieldName][InputAttributeFieldName.UNIQUE]) {
          axios.post(this.url.unique,
            {
              values: {
                // [ValidatePart.METHOD]: Method.CREATE,
                [ValidatePart.SINGLE_FIELD]: {[fieldName]: this.userInputValue[type][fieldName]},
              }
            })
            .then(function (response) {
              if(response.data.rc>0){
                userInputTempData[type][fieldName]['validResult']=response.data.msg
              }else{
                userInputTempData[type][fieldName]['validResult']=''
              }

            })
            .catch(function (error) {
              // console.log(error);
            });
        }
      },

    },
    computed:{
      //因为分成2中方式注册，所以对应的错误信息也要分开设置，并根据实际情况进行对应的修改
      ruleForCreate(){
        let phone=objectDeepCopy(this.registerInfo.ruleForCreate)
        let email=objectDeepCopy(this.registerInfo.ruleForCreate)
        phone.name[1].pattern=regex.name
        phone.account[0].message='手机号不能为空'
        phone.account[1].message='无效的手机号'
        phone.account[1].pattern=regex.phone //正则无法通过JSON.stringify转换，所以需要直接赋值
        phone.account[1].trigger='blur'   //patter的检测在blur才触发
        // //添加自定义unique的check
        // phone.name.push({{ validator: validateNameUnique, trigger: 'blur' }})

        email.name[1].pattern=regex.name
        email.account[0].message='电子邮件地址不能为空'
        //email的检测不使用正则，而使用async_validator的方式
        email.account[1]={ type: 'email', message: '无效电子邮件', trigger: 'blur' }
        // email.account[1].message=''
        // email.account[1].pattern=this.registerInfo.ruleForCreate.account[1].pattern //正则无法通过JSON.stringify转换，所以需要直接赋值
        // email.account[1].trigger='blur'   //patter的检测在blur才触发

        return {phone:phone,email:email}
      },
      //拆分inputAttribute中account的部分（placeHolder和placeHolderBkup，如此template中只要一个部分就可以）
      inputAttribute(){
        let phone=objectDeepCopy(this.registerInfo.inputAttribute)
        let email=objectDeepCopy(this.registerInfo.inputAttribute)
        phone.account[InputAttributeFieldName.PLACE_HOLDER]=[this.registerInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER][0]]
        phone.account[InputAttributeFieldName.PLACE_HOLDER_BKUP]=[this.registerInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER_BKUP][0]]

        email.account[InputAttributeFieldName.PLACE_HOLDER]=[this.registerInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER][1]]
        email.account[InputAttributeFieldName.PLACE_HOLDER_BKUP]=[this.registerInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER_BKUP][1]]

        return {phone:phone,email:email}
      },

      //如果要引用一个Object下的某个key（例如userInputValue.phone），在template中，只能使用.引用，而不能使用[]来引用，因此必须传递一个字符常量
      refString(){
        // return this.userInputValue[this.currentType]
        return `userInputValue.${this.currentType}`
      },
      /*ruleString(){
        if('phone'===this.currentType){
          return this.ruleForCreate.phone
        }else{
          return this.ruleForCreate.email
        }
        // return this.ruleForCreate[this.currentType]
      },
      valueString(){
        if('phone'===this.currentType){
          return this.userInputValue.phone
        }else{
          return this.userInputValue.email
        }

      },*/
    },
      data(){
        return {
          // test:'ttdjkeat',
          currentType:'phone',
          // refObj:userInputValue.phone,
          // valueObj:userInputValue.phone,
          // rulesObj:this.ruleForCreate.phone,
          icon:{
            phone:{name:'person',account:'android-phone-portrait',password:'locked'},
            email:{name:'person',account:'android-mail',password:'locked'},
          },
          tabInfo:{
            phone:{label:'手机注册',icon:'android-phone-portrait',name:'phone'},
            email:{label:'邮件注册',icon:'android-mail',name:'email'},
          },
          // contentInfo:this.contentInfo,
          userInputValue:{
            phone:objectDeepCopy(this.registerInfo.initInputValue),
            email:objectDeepCopy(this.registerInfo.initInputValue)
          },
          // testInputValue:objectDeepCopy(this.registerInfo.initInputValue),
          agreeTOS:{//两种注册方式使用独立的数据
            phone:false,
            email:false,
          }, //term of service
          submitButtonDisable:{
            phone:true,
            email:true
          },
          userInputTempData:{
              phone:objectDeepCopy(this.registerInfo.inputTempData),
              email:objectDeepCopy(this.registerInfo.inputTempData),
          },
          url:{
            user:'/user',
            unique:'/user/uniqueCheck_async',
          }
        }
      }
  }
</script>
