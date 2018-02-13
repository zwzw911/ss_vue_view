<style scoped>
</style>

<template>
  <div class="">
    <div>
      <p class="h4 color-lightener-red font-fantasy">注册</p>
    </div>
    <div>
      <!--<input placeholder="test"/>-->
      <Tabs :animated="false" class="flex-flow-column-nowrap marginT6" @on-click="clickTab">
        <!--<template v-for="(tabValue,tabName,index) in tabInfo" >-->
          <TabPane :label="tabInfo.phone['label']"  :icon="tabInfo.phone['icon']" :name="tabInfo.phone['name']">
            <!--:label-width="80"-->
            <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4" ref="userInputValue.phone" :model="userInputValue.phone" :rules="ruleForCreate.phone">
              <template v-for="(v,k) in userInputValue.phone">
                <template v-if="undefined!==inputAttribute.phone[k]['enum']">
                  <FormItem :prop="k" :key="k" >
                    <Select v-model="userInputValue.phone[k]" :placeholder="inputAttribute['phone'][k]['placeHolder'][0]">
                      <Option v-for="(enumValue,enumKey) in inputAttribute[currentType][k]['enum']" :value="enumKey" :key="enumKey">{{enumValue}}</Option>

                    </Select>
                  </FormItem>
                </template>
                <template v-else="">
                  <FormItem  :prop="k" :key="k"  class="" :error="userInputTempData['phone'][k]['validResult']">
                    <!---->
                    <Input
                      @on-focus="focusInputPlaceHolderDisappear({keyName:k,type:'phone'})"
                      @on-blur="blurInputPlaceHolderRestore({keyName:k,type:currentType});validSingleInputValue({formVariantName:'userInputValue',fieldName:k,type:'phone'});checkSubmitButtonStatus({type:'phone'});validateNameUnique({type:'phone',fieldName:k,userInputTempData:userInputTempData})"
                      @on-change="validSingleInputValue({formVariantName:'userInputValue',fieldName:k,type:'phone'});checkSubmitButtonStatus({type:currentType});"
                      :type="inputAttribute[[currentType]][k]['inputType']" v-model="userInputValue.phone[k]" :placeholder="inputAttribute.phone[k]['placeHolder'][0]"
                    >
                      <span slot="prepend"  style="border-left: 0px">
                        <Icon :type="icon[currentType][k]" size="20" :color="icon[currentType].color"></Icon>
                      </span>

                    </Input>
                    <!--<Input v-model="userInputValue.name.value" placeholder=""></Input>-->
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
                <Button long size="large" shape="circle" type="primary" @click="sendRegInfo({type:currentType})" :style="submitButtonDisable[currentType] ? buttonDisableStyle:''" :disabled="submitButtonDisable[currentType]">注册</Button>
                <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
              </FormItem>
            </Form>
          </TabPane>


          <!--<template v-for="(tabValue,tabName,index) in tabInfo" >-->
          <TabPane :label="tabInfo.email['label']"  :icon="tabInfo.email['icon']" :name="tabInfo.email['name']">
            <!--:label-width="80"-->
            <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4" ref="userInputValue.email" :model="userInputValue.email" :rules="ruleForCreate.email">
              <template v-for="(v,k) in userInputValue.email">
                <template v-if="undefined!==inputAttribute[currentType][k]['enum']">
                  <FormItem :prop="k" :key="k" >
                    <Select v-model="userInputValue[currentType][k]" :placeholder="inputAttribute[currentType][k]['placeHolder'][0]">
                      <Option v-for="(enumValue,enumKey) in inputAttribute[currentType][k]['enum']" :value="enumKey" :key="enumKey">{{enumValue}}</Option>

                    </Select>
                  </FormItem>
                </template>
                <template v-else="">
                  <FormItem  :prop="k" :key="k"  :error="userInputTempData['email'][k]['validResult']">
                    <!---->
                    <Input
                      @on-focus="focusInputPlaceHolderDisappear({keyName:k,type:'email'})"
                      @on-blur="blurInputPlaceHolderRestore({keyName:k,type:currentType});validSingleInputValue({formVariantName:'userInputValue',fieldName:k,type:'email'});checkSubmitButtonStatus({type:'email'});validateNameUnique({type:'email',fieldName:k,userInputTempData:userInputTempData})"
                      @on-change="validSingleInputValue({formVariantName:'userInputValue',fieldName:k,type:'email'});checkSubmitButtonStatus({type:currentType});"
                      :type="inputAttribute['email'][k]['inputType']" v-model="userInputValue['email'][k]" :placeholder="inputAttribute['email'][k]['placeHolder'][0]"
                    >
                      <span slot="prepend" >
                        <Icon :type="icon[currentType][k]" size="20" :color="icon[currentType].color"></Icon>
                      </span>
                    </Input>
                    <!--<Input v-model="userInputValue.name.value" placeholder=""></Input>-->
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
                <Button long size="large" shape="circle" type="primary" @click="sendRegInfo({type:currentType})" long :style="submitButtonDisable[currentType] ? buttonDisableStyle:''" :disabled="submitButtonDisable[currentType]">注册</Button>
                <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
              </FormItem>
            </Form>
          </TabPane>
      </Tabs>


      <span class="h4">already?<a>link</a></span>
    </div>
  </div>
</template>

<script>
  // import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  import {objectDeepCopy} from  '../../function/misc'
  import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'
  // import {regex} from '../../constant/regex/regex'
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
        // inf('formVariantName',formVariantName)
        // inf('type',type)
        // inf('a',Object.keys(this.$refs))
        //formItem放在2层template中，所以大概需要数组来引用
        this.$refs[`${formVariantName}.${type}`].validateField(fieldName, (validResult) => {
          // inf('validResult',validResult)
          this.userInputTempData[type][fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
        })
      },
      //每个input blur或者check box click，都要检查素有input valida的状态以及check box的状态，以便决定是否enable 注册按钮
      checkSubmitButtonStatus({type}) {
        inf('checkSubmitButtonStatus in')
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
        inf('checkSubmitButtonStatus successful')
        this.submitButtonDisable[type] = false
      },
      //模拟safiri，点击input时，placeHolder内容消失
      focusInputPlaceHolderDisappear({keyName,type}) {
        if (null === this.userInputValue[type][keyName] || '' === this.userInputValue[type][keyName]) {
          this.inputAttribute[type][keyName][InputAttributeFieldName.PLACE_HOLDER] = ['']
        }
        // inf('after this.userInputValue[this.currentType]',this.inputAttribute[this.currentType][keyName][InputAttributeFieldName.PLACE_HOLDER])
      },
      //如果离开input时，inputValue为空，需要恢复placeholder内容
      blurInputPlaceHolderRestore({keyName,type}) {
        // inf('blurInputPlaceHolderRestore in')
        // inf('blurInputPlaceHolderRestore keyName',keyName)
        if (null === this.userInputValue[type][keyName] || '' === this.userInputValue[type][keyName]) {
          this.inputAttribute[type][keyName][InputAttributeFieldName.PLACE_HOLDER] = this.inputAttribute[type][keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }

      },

      //点击tab，如果任意一个字段有对应的validResult,则执行resetFields的操作
      clickTab(name){
        this.currentType=name
        //获得除了当前点击tab的其他tab的名字，以便及时消除可能存在的错误信息（而不是等到点击此tab才消除，这样消除的过程会被观测到，体验差）
        for(let singleTabName of this.allTabNames){
          if(name!==singleTabName){
            let resetFlag=false
            for(let singleFieldName in this.userInputTempData[singleTabName]){
              if(null!==this.userInputTempData[singleTabName][singleFieldName][InputTempDataFieldName.VALID_RESULT]){
                resetFlag=true
              }
            }
            if(true===resetFlag){

              this.$refs[`userInputValue.${singleTabName}`].resetFields()
              // inf('restore ph')
              // inf('currtne tyep',singleTabName)
              for(let singleFieldName in this.userInputTempData[singleTabName]){
                // inf('restore singleFieldName',singleFieldName)
                this.blurInputPlaceHolderRestore({keyName:singleFieldName,type:singleTabName})
              }
            }

          }
        }

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

        if (undefined !== this.inputAttribute[type][fieldName][InputAttributeFieldName.UNIQUE]
            && true === this.inputAttribute[type][fieldName][InputAttributeFieldName.UNIQUE]
            && null!==this.userInputValue[type][fieldName] && ''!==this.userInputValue[type][fieldName]
            && ''===this.userInputTempData[type][fieldName]['validResult']  //说明验证通过
        ) {
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
        phone.name[1].pattern=this.registerInfo.ruleForCreate.name[1].pattern
        phone.account[0].message='手机号不能为空'
        phone.account[1].message='无效的手机号'
        phone.account[1].pattern=this.registerInfo.ruleForCreate.account[1].pattern //正则无法通过JSON.stringify转换，所以需要直接赋值
        phone.account[1].trigger='blur'   //patter的检测在blur才触发
        phone.password[1].pattern=this.registerInfo.ruleForCreate.password[1].pattern
        // //添加自定义unique的check
        // phone.name.push({{ validator: validateNameUnique, trigger: 'blur' }})

        email.name[1].pattern=this.registerInfo.ruleForCreate.name[1].pattern
        email.account[0].message='电子邮件地址不能为空'
        //email的检测不使用正则，而使用async_validator的方式
        email.account[1]={ type: 'email', message: '无效电子邮件', trigger: 'blur' }
        email.password[1].pattern=this.registerInfo.ruleForCreate.password[1].pattern

        return {phone:phone,email:email}
      },

      refString(){
        // inf('this.currentType',this.currentType)
        return `userInputValue.${this.currentType}`
      },

    },
      data(){
        let phone=objectDeepCopy(this.registerInfo.inputAttribute)
        let email=objectDeepCopy(this.registerInfo.inputAttribute)
        phone.account[InputAttributeFieldName.PLACE_HOLDER]=[this.registerInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER][0]]
        phone.account[InputAttributeFieldName.PLACE_HOLDER_BKUP]=[this.registerInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER_BKUP][0]]

        email.account[InputAttributeFieldName.PLACE_HOLDER]=[this.registerInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER][1]]
        email.account[InputAttributeFieldName.PLACE_HOLDER_BKUP]=[this.registerInfo.inputAttribute.account[InputAttributeFieldName.PLACE_HOLDER_BKUP][1]]

        // return {phone:phone,email:email}
        return {
          inputAttribute:{phone:phone,email:email},
          // test:'ttdjkeat',
          allTabNames:['phone','email'],
          currentType:'phone',
          buttonDisableStyle:{'background-color':`#8cc0f7`,'color':`white`},
          icon:{
            phone:{name:'person',account:'android-phone-portrait',password:'locked',color:'#5cadff'},
            email:{name:'person',account:'android-mail',password:'locked',color:'#5cadff'},
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
