<!--
formItemInfo:
  rule
  inputValue:
  inputAttribute:
  inputTempData:
  icon: 数组，对每个需要设置icon的字段，设置一个icon字符；如果没有设置（undefined），或者是null或者''，则忽略图标
  iconColor: 字符
  unique：数组，指定对应字段，如果要进行unique的检测，对应的url

  labelWidth:40,  //undefined为0，不显示label
  editable:boolean。确定是否采用类inputUnEditAble，实现input无边框和readonly的效果
  showStarForRequire:boolean, //字段为require，是否显示红色*

  captchaInfo:子组件captcha需要的参数

@event:
  onFocus:每个input需要触发此事件给父组件，无返回值
  onBlur:每个input需要触发此事件给父组件，无返回值
  validateAllItemResult: 每个input blur时触发，告知父组件是否所有字段的input都合格了，boolean
-->
<style scoped>

</style>
<template>
  <div>
<!--  <Row>
    <Col
      :span="undefined===formItemInfo.span || undefined===formItemInfo.span[k] || undefined===formItemInfo.span[k]['span'] || undefined===formItemInfo.span[k]['span']['width'] ? '24':formItemInfo.span[k]['span']['width']"
      :offset="undefined===formItemInfo.span || undefined===formItemInfo.span[k] || undefined===formItemInfo.span[k]['span'] || undefined===formItemInfo.span[k]['span']['offset'] ? '0':formItemInfo.span[k]['span']['width']"
    >-->
    <template v-for="(v,k) in formItemInfo.inputValue">
      <template v-if="k!=='captcha'">
        <template v-if="undefined===formItemInfo.inputAttribute[k].autoGen || false===formItemInfo.inputAttribute[k].autoGen">
          <FormItem  :prop="k" :key="k"
                     :class="[formItemInfo.showStarForRequire ? '':'noStarForRequire' ,
                              undefined===formItemInfo.inputLabelSize ? '':formItemInfo.inputLabelSize,
                              undefined===formItemInfo.inputSize ? '':formItemInfo.inputSize,]"
                     :error="formItemInfo.inputTempData[k]['validResult']"
                     class=" "
                     :label="formItemInfo.inputAttribute[k]['label']">
            <template v-if="undefined!==formItemInfo.inputAttribute[k]['enum'] || 'select'===formItemInfo.inputAttribute[k]['inputType']">
              <!--<FormItem :prop="k" :key="k" :label="undefined!==formItemInfo.labelWidth && formItemInfo.labelWidth>0 ? formItemInfo.inputAttribute[k]['label']:''" :error="formItemInfo.inputTempData[k]['validResult']">-->
              <Select v-model="formItemInfo.inputValue[k]" :placeholder="formItemInfo.inputAttribute[k]['placeHolder'][0]" >
                <Option v-for="(enumValue,enumKey) in formItemInfo.inputAttribute[k]['enum']" :value="enumKey" :key="enumKey">{{enumValue}}</Option>

              </Select>
              <!--</FormItem>-->
            </template>
            <template v-else>

              <!--如果是textarea，且是richEditor-->
              <template v-if="'textarea'===formItemInfo.inputAttribute[k]['inputType'] && true===formItemInfo.inputAttribute[k]['useRichTextEditor']">
                <template v-if="'wangEditor'===formItemInfo['richTextEditorConfiguration']['name']">
                  <!--换行效果-->
                  <div :ref="k" style="display: table;width:100%" :class="[''!==formItemInfo.inputTempData[k]['validResult'] && null!==formItemInfo.inputTempData[k]['validResult'] ? 'wangEditor-error-border':'']"></div>
                  <!--复用formItem的validator-->
                  <Input
                    @on-focus="focusInputPlaceHolderDisappear({keyName:k});onFocus()"
                    @on-blur="blurInputPlaceHolderRestore({keyName:k});validSingleInputValue({fieldName:k});validateUnique({fieldName:k,formItemInfo:formItemInfo});validateIfAllItemPass();onBlur();"
                    @on-change="validSingleInputValue({fieldName:k});validateIfAllItemPass();"
                    :type="formItemInfo.inputAttribute[k]['inputType']" :autosize="formItemInfo.inputAttribute[k]['autoSize']"
                    v-model="formItemInfo.inputValue[k]" :placeholder="!editable ? '':formItemInfo.inputAttribute[k]['placeHolder'][0]"
                    :class="[editable ? '':'inputUnEditAble inputDisabled', 'title'===formItemInfo.inputAttribute[k]['inputSize'] ? 'inputTitle':'']"
                    :readonly="!editable" style="display: none;"
                  >

                  <!-- :disabled="!editable"-->
                  <!--class="inputUnEditAble"-->
                  <!--:disabled="editable"-->
                  <span slot="prepend"  style="border-left: 0px" v-if="undefined!==formItemInfo.icon && undefined!==formItemInfo.icon[k] && null!==formItemInfo.icon[k] && ''!==formItemInfo.icon[k]">
                        <Icon :type="formItemInfo.icon[k]" size="20" :color="formItemInfo.iconColor"></Icon>
                      </span>
                  </Input>
                </template>
              </template>
              <template v-else>
                <Input
                  @on-focus="focusInputPlaceHolderDisappear({keyName:k});onFocus()"
                  @on-blur="blurInputPlaceHolderRestore({keyName:k});validSingleInputValue({fieldName:k});validateUnique({fieldName:k,formItemInfo:formItemInfo});validateIfAllItemPass();onBlur();"
                  @on-change="validSingleInputValue({fieldName:k});validateIfAllItemPass();"
                  :type="formItemInfo.inputAttribute[k]['inputType']" :autosize="formItemInfo.inputAttribute[k]['autoSize']"
                  v-model="formItemInfo.inputValue[k]" :placeholder="!editable ? '':formItemInfo.inputAttribute[k]['placeHolder'][0]"
                  :class="[editable ? '':'inputUnEditAble inputDisabled', 'title'===formItemInfo.inputAttribute[k]['inputSize'] ? 'inputTitle':'']"
                  :readonly="!editable"
                >

                <!-- :disabled="!editable"-->
                <!--class="inputUnEditAble"-->
                <!--:disabled="editable"-->
                <span slot="prepend"  style="border-left: 0px" v-if="undefined!==formItemInfo.icon && undefined!==formItemInfo.icon[k] && null!==formItemInfo.icon[k] && ''!==formItemInfo.icon[k]">
                        <Icon :type="formItemInfo.icon[k]" size="20" :color="formItemInfo.iconColor"></Icon>
                      </span>
                </Input>
              </template>

              <!--<Input v-model="userInputValue.name.value" placeholder=""></Input>-->

            </template>
          </FormItem>
        </template>
        <!--autoGen-->
        <template v-else>
          <div :class="[ formItemInfo.wholeArrangeMode==='v'  ? classVertical: classHorizontal]">
            <div :class="[ formItemInfo.inputArrangeMode==='v'  ? classVertical: classHorizontal]">
              <!--<template   >-->
                <!--<div>-->
                <!--<Col span="24">-->
              <div :class="[formItemInfo.showStarForRequire ? '':'noStarForRequire' ,
                      undefined===formItemInfo.inputLabelSize ? '':formItemInfo.inputLabelSize,
                      undefined===formItemInfo.inputSize ? '':formItemInfo.inputSize,]"
                    class="ivu-form-item-required">
                <label class="ivu-form-item-label" v-if="formItemInfo.inputValue[k]===null || formItemInfo.inputValue[k].length===0">{{formItemInfo.inputAttribute[k].label}}</label>
              </div>

                <FormItem v-for="(ele,idx) in formItemInfo.inputValue[k]"
                  :prop="k+'.'+idx" :key="idx"
                  :error="formItemInfo.inputArrayTempData[k][idx]['validResult']"
                  :rules="formItemInfo.rule[k]"
                  :class="[formItemInfo.showStarForRequire ? '':'noStarForRequire' ,
                      idx>0 && formItemInfo.inputArrangeMode==='h' ? 'inputLabel-hidden':'',
                      idx>0 && formItemInfo.inputArrangeMode==='v' ? 'inputNoLabelWidth':'',
                      undefined===formItemInfo.inputLabelSize ? '':formItemInfo.inputLabelSize,
                      undefined===formItemInfo.inputSize ? '':formItemInfo.inputSize,
                      formItemInfo.wholeArrangeMode==='v'  ? 'marginR4':'',
                      ]"
                  :label=" formItemInfo.inputAttribute[k]['label']"
                  class=""
                >
                  <!--idx>0 && undefined===formItemInfo.labelWidth ? 'inputLabel-hidden':'',-->
                  <!--:class="{noStarForRequire: !formItemInfo.showStarForRequire,'inputLabel-hidden':idx>0}"-->
                  <!--<div>-->

                  <Input
                    @on-focus="focusInputPlaceHolderDisappear({keyName:k,idx:idx});dismissError({keyName:k,idx:idx});onFocus()"
                    @on-blur="blurInputPlaceHolderRestore({keyName:k,idx:idx});validateDuplicate({keyName:k,idx:idx});validateIfAllItemPass();onBlur();"
                    @on-change="validateDuplicate({keyName:k,idx:idx});validateIfAllItemPass();"
                    :type="formItemInfo.inputAttribute[k]['inputType']" :autosize="formItemInfo.inputAttribute[k]['autoSize']"
                    v-model="formItemInfo.inputValue[k][idx]" :placeholder="formItemInfo.inputArrayAttribute[k][idx]['placeHolder'][0]"
                    :style="{width:formItemInfo.inputWidth+'px'}"
                    :class="[editable ? '':'inputUnEditAble']"
                    :readonly="!editable"
                  >

                    <!--:class="[editable ? '':'inputUnEditAble', 'title'===inputAttribute[idx]['inputSize'] ? 'inputTitle':'']" :readonly="!editable"-->
                    <span slot="prepend"  style="border-left: 0px" v-if="undefined!==formItemInfo.icon  && null!==formItemInfo.icon && ''!==formItemInfo.icon">
                      <Icon :type="formItemInfo.icon" size="20" :color="formItemInfo.iconColor"></Icon>
                    </span>
                    <span slot="append" style="" :style="{visibility: editable ? 'visible':'hidden'}" class="cursorPointer"
                          v-if="editable===true"
                          @click="removeItem({keyName:k,idx:idx});validateIfAllItemPass">
                      <Icon type="android-remove-circle" size="18"  color="#aaaaaa" title="移除"></Icon>
                    </span>
                  </Input>
                </FormItem>
              <!--</template>-->
            </div>
            <div>
              <Button type="primary" size="small" :style="formItemInfo.addItemButtonDisable[k] ? buttonDisableStyle:''" :disabled="formItemInfo.addItemButtonDisable[k]" :class="{hidden:!editable}"
                      @click="addItem({keyName:k});validateIfAllItemPass()">添加</Button>
            </div>
          </div>

        </template>
      </template>
      <!--autoGen-->

    </template>

    <!--captcha; ref的父元素不能放在template中-->
    <div class="flex-flow-row-nowrap align-items-flex-start align-content-center justify-content-space-between flex-grow-1"
         v-if="undefined!==formItemInfo.captchaInfo">
      <FormItem  prop="captcha"   class=" marginR3" :error="formItemInfo.inputTempData['captcha']['validResult']">
        <!---->
        <Input
          @on-focus="focusInputPlaceHolderDisappear({keyName:'captcha'});onFocus()"
          @on-blur="blurInputPlaceHolderRestore({keyName:'captcha'});validSingleInputValue({fieldName:'captcha'});validateIfAllItemPass();onBlur();"
          @on-change="validSingleInputValue({fieldName:'captcha'});validateIfAllItemPass();"
          :type="formItemInfo.inputAttribute['captcha']['inputType']" v-model="formItemInfo.inputValue['captcha']" :placeholder="formItemInfo.inputAttribute['captcha']['placeHolder'][0]"
        >
        </Input>

      </FormItem>

      <selfCaptcha :ref="formItemInfo.captchaInfo.captchaImgId" class="radius1" :captchaInfo="formItemInfo.captchaInfo" @genCaptchaSuccess="genCaptchaSuccess" ></selfCaptcha>


    </div>
<!--    </Col>

  </Row>-->
  </div>
</template>
<script>
  import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart,RichTextEditor} from '../../constant/enum/nonValueEnum'
  import {extraAttributeFieldName} from '../../constant/enum/keyEnum'
  import {sendRequestGetResult_async} from '../../function/network'
  import selfCaptcha from './cpatcha'
  import {inf} from 'awesomeprint'
  import * as misc from '../../function/misc'
  import E from 'wangeditor'
  export default {
    components:{selfCaptcha},
    props: {'formItemInfo':{type:Object},editable:{type:Boolean,default:true}},
    watch: {
      editable (curVal, oldVal) {
        // inf('new editable value',curVal)
        this.setTriggerOfInput(curVal)
        // if(false===curVal){
        //   this.$parent.resetFields()
        // }
      },
    },
    mounted() {

      for(let singleKey in this.formItemInfo.inputAttribute){
        if('textarea'===this.formItemInfo.inputAttribute[singleKey]['inputType'] && true===this.formItemInfo.inputAttribute[singleKey]['useRichTextEditor']){
          if(RichTextEditor.WANG_EDITOR===this.formItemInfo.richTextEditorConfiguration.name){
            let editor = new E(this.$refs[singleKey])
            editor.customConfig.onchange = (html) => {
              // console.log('html',html)
              this.validateContent(singleKey,html)
            }
            editor.customConfig.onblur = (html) => {
              // console.log('html',html)
              this.validateContent(singleKey,html)
            }
            editor.create()
          }
        }
      }

    },
    methods: {
      /**   wangEditor  **/
      //keyName:字段名称
      //content:字段内容
      validateContent(keyName,content){
        this.formItemInfo.inputValue[keyName] = content
        this.$parent.validateField(keyName, (validResult) => {
          // inf('fieldName',fieldName)
          // inf('validSingleInputValue',validResult)
          this.formItemInfo.inputTempData[keyName][InputTempDataFieldName.VALID_RESULT] = validResult
          this.validateIfAllItemPass()
          // inf('this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT]',this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT])
        })
      },


      setTriggerOfInput(curVal){

        for(let singleFieldName in this.formItemInfo.rule){
          for(let idx in this.formItemInfo.rule[singleFieldName]){
            if(false===curVal){
              this.formItemInfo.rule[singleFieldName][idx]['trigger']=this.formItemInfo.rule[singleFieldName][idx]['trigger'].replace('blur','').replace(',','')
            }
            if(true===curVal){
              this.formItemInfo.rule[singleFieldName][idx]['trigger']+=',blur'
            }
          }

        }

      },
      //判断返回的值里是否为captcha的错误，是否话，错误信息显示在captcha的input下
      checkIfCaptchaErrAndShow({data}){
        // inf('checkIfCaptchaErrAndShow in')
        if(-1!==[60054,60056].indexOf(data.rc)){
          this.formItemInfo.inputTempData['captcha']['validResult']=data.msg
          return true
        }else{
          return false
        }
      },
      //判断返回的值里是否为99999的错误（字段server端验证失败），是的话，错误信息显示在captcha的input下
      checkIf99999ErrAndShow({data}){
        // inf('checkIf99999ErrAndShow in')
        if(data.rc===99999){
          for(let singleKey in data.msg){
            this.formItemInfo.inputTempData[singleKey][InputTempDataFieldName.VALID_RESULT]=data.msg[singleKey]['msg']
          }
          return true
        }
        return false
      },
      //将子组件captcha的getCaptchaImg_async方法暴露出来，供formitem的父组件调用
      getCaptchaImg_async(){
        if(undefined !== this.formItemInfo.captchaInfo){
          // inf('call getCaptchaImg_async')
          this.$refs[this.formItemInfo.captchaInfo.captchaImgId].getCaptchaImg_async()
        }
      },
      onFocus(){
        this.$emit('onFocus')
      },
      onBlur(){
        let that=this
        that.$emit('onBlur')
      },
      //模拟safiri，点击input时，placeHolder内容消失
      focusInputPlaceHolderDisappear({keyName,idx}) {
        let fieldAttribute=this.formItemInfo.inputAttribute[keyName]
        //如果是autoGen，直接在inputArrayTempData操作
        if(true===fieldAttribute[InputAttributeFieldName.AUTO_GEN]){
          if(undefined===idx){
            err(`for autoGen field ${keyName}, miss parameter idx`)
          }else{
            if (null === this.formItemInfo.inputValue[keyName][idx] || '' === this.formItemInfo.inputValue[keyName][idx]) {
              this.formItemInfo.inputArrayAttribute[keyName][idx][InputAttributeFieldName.PLACE_HOLDER] = ['']
            }
          }
        }
        //non autoGen
        else{
          if (null === this.formItemInfo.inputValue[keyName] || '' === this.formItemInfo.inputValue[keyName]) {
            this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = ['']
          }
        }

        // inf('after this.userInputValue[this.currentType]',this.inputAttribute[this.currentType][keyName][InputAttributeFieldName.PLACE_HOLDER])
      },

      //如果离开input时，inputValue为空，需要恢复placeholder内容
      blurInputPlaceHolderRestore({keyName,idx}) {
        // inf('blurInputPlaceHolderRestore in')
        // inf('blurInputPlaceHolderRestore keyName',keyName)
        let fieldAttribute=this.formItemInfo.inputAttribute[keyName]
        //如果是autoGen，直接在inputArrayTempData操作
        if(true===fieldAttribute[InputAttributeFieldName.AUTO_GEN]) {
          if (undefined === idx) {
            err(`for autoGen field ${keyName}, miss parameter idx`)
          } else {
            if (null === this.formItemInfo.inputValue[keyName][idx] || '' === this.formItemInfo.inputValue[keyName][idx] ) {
              this.formItemInfo.inputArrayAttribute[keyName][idx][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][idx][InputAttributeFieldName.PLACE_HOLDER_BKUP]
            }
          }
        }
        //non autoGen
        else{
          if (null === this.formItemInfo.inputValue[keyName] || '' === this.formItemInfo.inputValue[keyName]) {
            this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
            // this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
          }
        }

      },
      restorePlaceHolder({keyName,idx}){
        // inf('restorePlaceHolder in')
        let fieldAttribute=this.formItemInfo.inputAttribute[keyName]
        if(true===fieldAttribute[InputAttributeFieldName.AUTO_GEN]) {
          if (undefined === idx) {
            err(`for autoGen field ${keyName}, miss parameter idx`)
          }else{
            this.formItemInfo.inputArrayAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
          }

        }
        //non autoGen
        else{
          this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }

      },
      //存储 单个input 的检测结果（null：为检测，非空字符：检测通过，空字符：检测通过）
      validSingleInputValue({fieldName}) {
        //非编辑状态，不执行validate
        if(this.editable===false){
          return
        }
        //formItem放在2层template中，所以大概需要数组来引用
        this.$parent.validateField(fieldName, (validResult) => {
          // inf('fieldName',fieldName)
          // inf('validSingleInputValue',validResult)
          this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
          // inf('this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT]',this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT])
        })
      },
      //通过检测inputTempData中所有字段的valid_result，判断是否所有item validate pass
      //产生事件validateAllItemResult，返回boolean
      validateIfAllItemPass() {
        //非编辑状态，不执行validate
        if(this.editable===false){
          return
        }
        let flag=true //默认通过validate
        for (let singleFieldName in this.formItemInfo.inputAttribute) {
          let fieldAttribute=this.formItemInfo.inputAttribute[singleFieldName]
          if(true===fieldAttribute[InputAttributeFieldName.AUTO_GEN]){
            //autoGen的验证结果保存在inputArrayTempData中
            if(undefined===this.formItemInfo.inputArrayTempData[singleFieldName]){
              err(`field ${singleFieldName} is autoGen, but no related inputArrayTempData`)
            }else{
              for(let singleEle of this.formItemInfo.inputArrayTempData[singleFieldName]){
                let eleValidateResult=singleEle[InputTempDataFieldName.VALID_RESULT]
                if(null !==eleValidateResult && '' !==eleValidateResult){
                  flag=false
                  break
                }
              }
            }
          }
          //non autoGen
          else{
            let singleFieldValidResult = this.formItemInfo.inputTempData[singleFieldName][InputTempDataFieldName.VALID_RESULT]
            // inf('singleFieldName',singleFieldName)
            let singleFieldRequired=this.formItemInfo.rule[singleFieldName][0]['required']
            // inf('singleFieldRequired',singleFieldRequired)
            //必须字段未经验证，或者字段验证失败
            if ( true===singleFieldRequired && (null !== singleFieldValidResult && '' !== singleFieldValidResult)) {
              // inf('validateAllItemResult result false')
              // this.$emit('validateAllItemResult',false)
              // return
              flag=false
              break
            }

          }
        }
        // flag=true

        //输入是否都符合rule定义
/*        let validateByRuleResult
        if(flag===true){
          validateByRuleResult = await this.validateByRule_async()
        }*/

        this.$emit('validateAllItemResult',flag)
      },
      async validateByRule_async(){
        let result=await this.$parent.validate()
        return Promise.resolve(result)
      },
      //字段的unique检测
      //不知道为啥，props,data和computed中的数据，不能放在promise的then中使用，如果要做设置，只能通过参数传递
      async validateUnique({fieldName,formItemInfo}) {
        // return true
        //非编辑状态，不执行validate
        if(this.editable===false){
          return
        }
        //inputAttribute中定义了unique为true，且有value，并验证通过，且定义了unique check的URL，那么进行unique检测
        if (undefined !== this.formItemInfo.inputAttribute[fieldName][InputAttributeFieldName.UNIQUE]
          && true === this.formItemInfo.inputAttribute[fieldName][InputAttributeFieldName.UNIQUE]
          && null!==this.formItemInfo.inputValue[fieldName] && ''!==this.formItemInfo.inputValue[fieldName]
          && ''===this.formItemInfo.inputTempData[fieldName]['validResult']  //说明验证通过
          && undefined!==this.formItemInfo.inputAttribute[fieldName][extraAttributeFieldName.UNIQUE_CHECK_URL] //有指定的URL
          && true===this.editable
        ) {
          // inf('this.formItemInfo',this.formItemInfo.inputTempData)
          let data={
            values: {
              // [ValidatePart.METHOD]: Method.CREATE,
              [ValidatePart.SINGLE_FIELD]: {[fieldName]: this.formItemInfo.inputValue[fieldName]},
            }
          }
          let response=await sendRequestGetResult_async({urlOption:this.formItemInfo.inputAttribute[fieldName][extraAttributeFieldName.UNIQUE_CHECK_URL],data:data})

          if(response.rc>0){

            // inf('this.formItemInfo.inputTempData[fieldName]',formItemInfo)
            formItemInfo.inputTempData[fieldName]['validResult']=response.msg
            // this.$emit('validateAllItemResult',false)
            // inf('this.formItemInfo.inputTempData[fieldName][\'validResult\']',formItemInfo.inputTempData[fieldName]['validResult'])
          }else{
            formItemInfo.inputTempData[fieldName]['validResult']=''

          }
          //因为是异步函数，需要在Promise返回后，手工调用validateIfAllItemPass_async进行检查
          this.$options.methods.validateIfAllItemPass.bind(this)()
          // inf('err done')
          // this.$options.methods.onBlur.bind(this)()
          //如果需要对检查结果做特殊处理(例如，不需要显示错误结果)，此处为钩子
          this.$emit('uniqueCheckResult',{fieldName:fieldName,data:response})
        }
      },
      genCaptchaSuccess(){},

      /***************************************************/
      /**************    autoGenFormItem    *************/
      /***************************************************/
      dismissError({keyName,idx}){
        // inf('idx',idx)
        this.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT]=""
      },
      removeEmptyEle({keyName}){
        let tobeDeletedIdx=misc.searchEmptyValueIdxInArray({array:this.formItemInfo.inputValue[keyName]})
        // inf('tobeDeletedIdx',tobeDeletedIdx)
        if(tobeDeletedIdx.length>0){
          misc.deleteDefinedEleInArray({array:this.formItemInfo.inputValue[keyName],tobeDeletedIdx:tobeDeletedIdx})
          misc.deleteDefinedEleInArray({array:this.formItemInfo.inputArrayTempData,tobeDeletedIdx:tobeDeletedIdx})
          misc.deleteDefinedEleInArray({array:this.formItemInfo.inputArrayAttribute,tobeDeletedIdx:tobeDeletedIdx})
        }
      },
      addItem({keyName}){
        inf('keyname',keyName)
        if( null===this.formItemInfo.inputValue[keyName] || undefined=== this.formItemInfo.inputValue[keyName]){
          this.formItemInfo.inputValue[keyName]=[]
        }
        if(this.formItemInfo.inputValue[keyName].length<this.formItemInfo.numRange[keyName]['max']){
          this.formItemInfo.inputValue[keyName].push('')
          this.formItemInfo.inputArrayAttribute[keyName].push(misc.objectDeepCopy(this.formItemInfo.inputAttribute[keyName]))
          this.formItemInfo.inputArrayTempData[keyName].push(misc.objectDeepCopy(this.formItemInfo.inputTempData[keyName]))
        }
        //如果没加或者加完之后，达到上限
        if(this.formItemInfo.inputValue[keyName].length>=this.formItemInfo.numRange[keyName]['max']){
          this.formItemInfo.addItemButtonDisable[keyName]=true
        }
      },
      removeItem({keyName,idx}){
        this.formItemInfo.inputValue[keyName].splice(idx,1)
        this.formItemInfo.inputArrayAttribute[keyName].splice(idx,1)
        this.formItemInfo.inputArrayTempData[keyName].splice(idx,1)
        this.formItemInfo.addItemButtonDisable[keyName]=false
      },
      //是否有重复
      validateDuplicate({keyName,idx}){
        // inf('validateDuplicate in with idx',idx)
        let tobeCheckValue=this.formItemInfo.inputValue[keyName][idx]
        let keyValue=this.formItemInfo.inputValue[keyName]
        if(''!==tobeCheckValue){
          // this.inputTempData[idx][InputTempDataFieldName.VALID_RESULT] =null
          for(let index in keyValue){
            // inf('index',index)
            //skip self
            if(idx!==parseInt(index)){
              let otherValue=keyValue[index]
              // inf('tobeCheckValue',tobeCheckValue)
              // inf('otherValue',otherValue)
              if(tobeCheckValue===otherValue){
                this.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT] = `重复值`
                return
              }
            }
          }
        }
        this.formItemInfo.inputArrayTempData[keyName][idx][InputTempDataFieldName.VALID_RESULT] =''
      },
    },
    computed: {},
    data() {
      this.setTriggerOfInput(this.editable)
      return {
        newButtonDisable:false,//达到上限，为false（是否显示，通过editable控制）

        //采用style，优先级覆盖iview
        buttonDisableStyle:this.$store.state.style.button.primary.disable,

        classVertical:'flex-flow-column-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',
        classHorizontal:'flex-flow-row-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',
      }
    },
  }
</script>
