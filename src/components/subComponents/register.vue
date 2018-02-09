<style scoped>
</style>

<template>
  <div class="">
    <div>
      <!--<p class="h4 color-lighten-red font-cursive">REG</p>-->
      <p class="h4 color-lighten-red font-fantasy">REG</p>
      <!--<p class="h4 color-lighten-red font-monospace">REG</p>-->
      <!--<p class="h4 color-lighten-red font-serif">REG</p>-->
    </div>
    <div>
      <!--<input placeholder="test"/>-->
      <Tabs :animated="false" class="flex-flow-column-nowrap " >
        <TabPane label="手机注册" class="" icon="android-phone-portrait ">
          <!--:label-width="80"-->
          <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4" ref="userInputValue.phone" :model="userInputValue.phone" :rules="ruleForCreate.phone">
            <template v-for="(v,k) in userInputValue.phone">
              <template v-if="undefined!==registerInfo.inputAttribute[k]['enum']">
                  <FormItem :prop="k" :key="k" >
                    <Select v-model="userInputValue.phone[k]" :placeholder="registerInfo.inputAttribute[k]['placeHolder'][0]">
                      <Option v-for="(enumValue,enumKey) in registerInfo.inputAttribute[k]['enum']" :value="enumKey" :key="enumKey">{{enumValue}}</Option>

                    </Select>
                  </FormItem>
              </template>
              <template v-else="">
                    <FormItem  :prop="k" :key="k"  class="">
                      <!---->
                      <Input  @on-focus="focusInputPlaceHolderDisappear(k)" @on-blur="blurInputPlaceHolderRestore(k);validSingleInputValue({formVariantName:'userInputValue',fieldName:k,type:'phone'});checkSubmitButtonStatus({type:'phone'})" :type="registerInfo.inputAttribute[k]['inputType']" v-model="userInputValue.phone[k]" :placeholder="registerInfo.inputAttribute[k]['placeHolder'][0]"></Input>
                      <!--<Input v-model="userInputValue.name.value" placeholder=""></Input>-->
                    </FormItem>
              </template>
            </template>


            <!--term of service-->
            <div class="flex-flow-row-nowrap justify-content-flex-start marginV4">
              <Checkbox v-model="agreeTOS.phone" @on-change="checkSubmitButtonStatus({type:'phone'})">

              </Checkbox>
              <span>asdf<a>trew</a></span>

            </div>

            <FormItem class="">
              <Button type="primary" @click="" long :disabled="submitButtonDisable.phone">REG</Button>
              <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
            </FormItem>
          </Form>
        </TabPane>


        <TabPane label="邮箱注册" class="" icon="android-mail">
          <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4" ref="userInputValue.email" :model="userInputValue.email" :rules="ruleForCreate.email">
            <template v-for="(v,k) in userInputValue.email">
              <template v-if="undefined!==registerInfo.inputAttribute[k]['enum']">
                <FormItem :prop="k" :key="k" >
                  <Select v-model="userInputValue.email[k]" :placeholder="registerInfo.inputAttribute[k]['placeHolder'][0]">
                    <Option v-for="(enumValue,enumKey) in registerInfo.inputAttribute[k]['enum']" :value="enumKey" :key="enumKey">{{enumValue}}</Option>

                  </Select>
                </FormItem>
              </template>
              <template v-else="">
                <template v-if="k==='account'">
                  <FormItem  :prop="k" :key="k"  class="">
                    <Input  @on-focus="focusInputPlaceHolderDisappear(k)" @on-blur="blurInputPlaceHolderRestore(k);validSingleInputValue({formVariantName:'userInputValue',fieldName:k,type:'email'});checkSubmitButtonStatus({type:'email'})" :type="registerInfo.inputAttribute[k]['inputType']" v-model="userInputValue.email[k]" :placeholder="registerInfo.inputAttribute[k]['placeHolder'][1]"></Input>
                    <!--<Input v-model="userInputValue.name.value" placeholder=""></Input>-->
                  </FormItem>
                </template>
                <template v-else="">
                  <FormItem  :prop="k" :key="k"  class="">
                    <Input  @on-focus="focusInputPlaceHolderDisappear(k)" @on-blur="blurInputPlaceHolderRestore(k);validSingleInputValue({formVariantName:'userInputValue',fieldName:k,type:'email'});checkSubmitButtonStatus({type:'email'})" :type="registerInfo.inputAttribute[k]['inputType']" v-model="userInputValue.email[k]" :placeholder="registerInfo.inputAttribute[k]['placeHolder'][0]"></Input>
                    <!--<Input v-model="userInputValue.name.value" placeholder=""></Input>-->
                  </FormItem>
                </template>


              </template>
            </template>


            <!--term of service-->
            <div class="flex-flow-row-nowrap justify-content-flex-start marginV4">
              <Checkbox v-model="agreeTOS.email" @on-change="checkSubmitButtonStatus({type:'email'})">
              </Checkbox>
              <span>asdf<a>trew</a></span>
            </div>

            <FormItem class="">
              <Button type="primary" @click="" long  :disabled="submitButtonDisable.email">REG</Button>
              <!--<Button type="ghost" @click="handleReset('userInputValue')" style="margin-left: 8px">Reset</Button>-->
            </FormItem>
          </Form>
        </TabPane>

      </Tabs>

    </div>
  </div>
</template>

<script>
  import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  import {objectDeepCopy} from  '../../function/misc'
  import {InputAttributeFieldName,InputTempDataFieldName} from '../../constant/enum/nonValueEnum'


  export default {
    props:['registerInfo'], //
    methods:{
      //存储 单个input 的检测结果（null：为检测，非空字符：检测通过，空字符：检测通过）
      validSingleInputValue({formVariantName,fieldName,type}){
        this.$refs[`${formVariantName}.${type}`].validateField(fieldName,(validResult)=>{
          this.userInputTempData[type][fieldName][InputTempDataFieldName.VALID_RESULT]=validResult
        })
      },
      //每个input blur或者check box click，都要检查素有input valida的状态以及check box的状态，以便决定是否enable 注册按钮
      checkSubmitButtonStatus({type}){
        for(let singleFieldName in this.userInputTempData[type]){
          let singleFieldValidResult=this.userInputTempData[type][singleFieldName][InputTempDataFieldName.VALID_RESULT]
          if(null===singleFieldValidResult || ''!==singleFieldValidResult){
            this.submitButtonDisable[type]=true
            return
          }
        }
        if(false===this.agreeTOS[type]){
          this.submitButtonDisable[type]=true
          return
        }
        this.submitButtonDisable[type]=false
      },
      handleSubmit (name,accountType) {



      },

      handleReset (name) {
        this.$refs[name].resetFields();
      },

      //模拟safiri，点击input时，placeHolder内容消失
      focusInputPlaceHolderDisappear(keyName){
        if(null===this.userInputValue[keyName] || ''===this.userInputValue[keyName]){
          this.registerInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER]=''
        }
      },
      //如果离开input时，inputValue为空，需要恢复placeholder内容
      blurInputPlaceHolderRestore(keyName){
        if(null===this.userInputValue[keyName] || ''===this.userInputValue[keyName]){
          this.registerInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER]= this.registerInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }

      }
    },

    computed:{
      //因为分成2中方式注册，所以对应的错误信息也要分开设置，并根据实际情况进行对应的修改
      ruleForCreate(){
        let phone=objectDeepCopy(this.registerInfo.ruleForCreate)
        let email=objectDeepCopy(this.registerInfo.ruleForCreate)
        phone.account[1].message='账号不是有效的手机号'
        phone.account[1].pattern=this.registerInfo.ruleForCreate.account[1].pattern //正则无法通过JSON.stringify转换，所以需要直接赋值
        phone.account[1].trigger='blur'   //patter的检测在blur才触发
        email.account[1].message='账号不是有效的电子邮件'
        email.account[1].pattern=this.registerInfo.ruleForCreate.account[1].pattern //正则无法通过JSON.stringify转换，所以需要直接赋值
        email.account[1].trigger='blur'   //patter的检测在blur才触发

        return {phone:phone,email:email}
      },
     /* sidebarOpenMenus(){
//          console.log(this.$store.state.mainState.sidebarOpenMenus)
        return this.$store.state.sidebarState.sidebarOpenMenus
      },
      sidebarActiveMenu(){
        return this.$store.state.sidebarState.sidebarActiveMenu
      }*/
    },
      data(){
      // console.log(JSON.stringify(this.registerInfo.initInputValue))
        // console.log(JSON.stringify(this.registerInfo.initInputValue)userInputValue.name.value)
        return {
          // contentInfo:this.contentInfo,
          userInputValue:{
            phone:objectDeepCopy(this.registerInfo.initInputValue),
            email:objectDeepCopy(this.registerInfo.initInputValue)
          },
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



          // userInputAttribute:this.registerInfo.inputAttribute,
        }
          /*return {
            sidebarName: {
                configuration:{
//              key:'configuration',
//                name: 'configuration',
                  name:'配置信息',
                icon:'gear-b',
                children:
                  {
        //submenu中，将key的值绑定到name属性，当此menu被点击（on-select），name（也就是sidebarName的key）会被返回，所以最好英文
                    billType:{name: '单据类别'},
                    department:{name:'部门信息'},
                    employee:{name:  '员工信息'}
                  }
            },
            reimbursement:{
//              name: 'reimbursement',
              name:'报销信息',
              icon:'clipboard',
              children:
                {
                  bill:{name: '报销记录'},
                  'static':{name:'统计信息'}
                }


            }
          },
             /!* sidebarName:[
              {
                label: '配置信息',
                name: 'configuration',
                icon:'gear-b',
                children: [
                    //menu中，name属性作为key，会被返回，所以最好英文
                  {name:TABLE.billType.toString(),label: '单据类别'},
                  {name:TABLE.department.toString(), label: '部门信息'},
                  {name:TABLE.employee.toString(), label: '员工信息'}
                ]

              },
              {
                label:'报销信息',
                name: 'reimbursement',
                icon:'clipboard',
                children:[
                  {name:TABLE.bill.toString(),label:'报销记录'},
                  {label:'统计信息'}
                ]

              }
            ],*!/
          }*/

      }
  }
</script>
