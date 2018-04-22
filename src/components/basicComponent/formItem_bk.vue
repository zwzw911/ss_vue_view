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
        <FormItem  :prop="k" :key="k"  :class="{noStarForRequire: !formItemInfo.showStarForRequire}" :error="formItemInfo.inputTempData[k]['validResult']"
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

              <!---->
              <Input
                @on-focus="focusInputPlaceHolderDisappear({keyName:k});onFocus()"
                @on-blur="blurInputPlaceHolderRestore({keyName:k});validSingleInputValue({fieldName:k});validateUnique({fieldName:k,formItemInfo:formItemInfo});validateIfAllItemPass_async();onBlur();"
                @on-change="validSingleInputValue({fieldName:k});validateIfAllItemPass_async();"
                :type="formItemInfo.inputAttribute[k]['inputType']" :autosize="formItemInfo.inputAttribute[k]['autoSize']"
                v-model="formItemInfo.inputValue[k]" :placeholder="formItemInfo.inputAttribute[k]['placeHolder'][0]"
                :class="[editable ? '':'inputUnEditAble', 'title'===formItemInfo.inputAttribute[k]['inputSize'] ? 'inputTitle':'']" :readonly="!editable"
              >

              <!-- -->
              <!--class="inputUnEditAble"-->
              <!--:disabled="editable"-->
              <span slot="prepend"  style="border-left: 0px" v-if="undefined!==formItemInfo.icon && undefined!==formItemInfo.icon[k] && null!==formItemInfo.icon[k] && ''!==formItemInfo.icon[k]">
                        <Icon :type="formItemInfo.icon[k]" size="20" :color="formItemInfo.iconColor"></Icon>
                      </span>
              </Input>
              <!--<Input v-model="userInputValue.name.value" placeholder=""></Input>-->

          </template>
        </FormItem>
      </template>

    </template>

    <!--ref的父元素不能放在template中-->
    <div class="flex-flow-row-nowrap align-items-flex-start align-content-center justify-content-space-between flex-grow-1"
         v-if="undefined!==formItemInfo.captchaInfo">
      <FormItem  prop="captcha"   class=" marginR3" :error="formItemInfo.inputTempData['captcha']['validResult']">
        <!---->
        <Input
          @on-focus="focusInputPlaceHolderDisappear({keyName:'captcha'});onFocus()"
          @on-blur="blurInputPlaceHolderRestore({keyName:'captcha'});validSingleInputValue({fieldName:'captcha'});validateIfAllItemPass_async();onBlur();"
          @on-change="validSingleInputValue({fieldName:'captcha'});validateIfAllItemPass_async();"
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
  import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'
  import selfCaptcha from './cpatcha'
  import {myAxios,mergeAdditionalField} from '../helperLib/componentsHelperLib'
  import {inf} from 'awesomeprint'
  export default {
    components:{selfCaptcha},
    props: {'formItemInfo':{type:Object},editable:{type:Boolean,default:true}},
    watch: {
      editable (val, oldVal) {
        inf('new editable value',val)
      },
    },
    mounted(){
      // this.$refs[this.formItemInfo.captchaInfo.captchaImgId].getCaptchaImg_async()
    },
    methods: {
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
        inf('checkIf99999ErrAndShow in')
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
          this.$refs[this.formItemInfo.captchaInfo.captchaImgId].getCaptchaImg_async()
        }
      },
      //模拟safiri，点击input时，placeHolder内容消失
      focusInputPlaceHolderDisappear({keyName}) {
        if (null === this.formItemInfo.inputValue[keyName] || '' === this.formItemInfo.inputValue[keyName]) {
          this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = ['']
        }
        // inf('after this.userInputValue[this.currentType]',this.inputAttribute[this.currentType][keyName][InputAttributeFieldName.PLACE_HOLDER])
      },
      onFocus(){
        this.$emit('onFocus')
      },
      onBlur(){
        let that=this
        that.$emit('onBlur')
      },
      //如果离开input时，inputValue为空，需要恢复placeholder内容
      blurInputPlaceHolderRestore({keyName}) {
        // inf('blurInputPlaceHolderRestore in')
        // inf('blurInputPlaceHolderRestore keyName',keyName)
        if (null === this.formItemInfo.inputValue[keyName] || '' === this.formItemInfo.inputValue[keyName]) {
          this.$options.methods.restorePlaceHolder.bind(this)({keyName})
          // this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }
      },
      restorePlaceHolder({keyName}){
        // inf('restorePlaceHolder in')
        this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
      },
      //存储 单个input 的检测结果（null：为检测，非空字符：检测通过，空字符：检测通过）
      validSingleInputValue({fieldName}) {
        // inf('validSingleInputValue in')
        // inf('formVariantName',formVariantName)
        // inf('type',type)
        // inf('a',Object.keys(this.$refs))
        //formItem放在2层template中，所以大概需要数组来引用
        this.$parent.validateField(fieldName, (validResult) => {
          // inf('validSingleInputValue',validResult)
          this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT] = validResult
          // inf('this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT]',this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT])
        })
      },
      //通过检测inputTempData中所有字段的valid_result，判断是否所有item validate pass
      //产生事件validateAllItemResult，返回boolean
      async validateIfAllItemPass_async() {
        // inf('validateIfAllItemPass_async in')
        let flag=true //默认通过validate
        for (let singleFieldName in this.formItemInfo.inputTempData) {

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
            this.$emit('validateAllItemResult',false)
            break
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
        //inputAttribute中定义了unique为true，且有value，并验证通过，且定义了unique check的URL，那么进行unique检测
        if (undefined !== this.formItemInfo.inputAttribute[fieldName][InputAttributeFieldName.UNIQUE]
          && true === this.formItemInfo.inputAttribute[fieldName][InputAttributeFieldName.UNIQUE]
          && null!==this.formItemInfo.inputValue[fieldName] && ''!==this.formItemInfo.inputValue[fieldName]
          && ''===this.formItemInfo.inputTempData[fieldName]['validResult']  //说明验证通过
          && undefined!==this.formItemInfo.unique && undefined!==this.formItemInfo.unique[fieldName] //有指定的URL
          && true===this.editable
        ) {
          // inf('this.formItemInfo',this.formItemInfo.inputTempData)
          let response=await myAxios.post(this.formItemInfo.unique[fieldName],
            {
              values: {
                // [ValidatePart.METHOD]: Method.CREATE,
                [ValidatePart.SINGLE_FIELD]: {[fieldName]: this.formItemInfo.inputValue[fieldName]},
              }
            })

          if(response.data.rc>0){

            // inf('this.formItemInfo.inputTempData[fieldName]',formItemInfo)
            formItemInfo.inputTempData[fieldName]['validResult']=response.data.msg
            // this.$emit('validateAllItemResult',false)
            // inf('this.formItemInfo.inputTempData[fieldName][\'validResult\']',formItemInfo.inputTempData[fieldName]['validResult'])
          }else{
            formItemInfo.inputTempData[fieldName]['validResult']=''

          }
          //因为是异步函数，需要在Promise返回后，手工调用validateIfAllItemPass_async进行检查
          this.$options.methods.validateIfAllItemPass_async.bind(this)()
          // inf('err done')
          // this.$options.methods.onBlur.bind(this)()
          //如果需要对检查结果做特殊处理(例如，不需要显示错误结果)，此处为钩子
          this.$emit('uniqueCheckResult',{fieldName:fieldName,data:response.data})
          // this.$emit('onBlur')
          //     inf('err done')
          /*              })
                        .catch(function (error) {
                          // console.log(error);
                        });*/
        }
      },
      genCaptchaSuccess(){},
      /*        checkParentButtonEnable(){
                this.$parent.checkSubmitButtonStatus()
              },*/
    },
    computed: {},
    data() {
      return {
        // copyFormItem: obj
      }
    },
  }
</script>
