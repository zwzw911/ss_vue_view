<!--  使用单一rule和attribute，生成多个formItem（例如文档的tag）
props:
  autoGenFormItemInfo:
    fieldAttribute：对象，单个字段的属性
    fieldTempData:对象，单个字段的tempData，用来形成inputTempData        fieldIcon:字符，自增减
    fieldRule:对象，单个字段的rule
-->
<style scoped>
</style>
<template>
  <div :class="[ autoGenFormItemInfo.wholeArrangeMode==='v'  ? classVertical: classHorizontal]">
<!--    <div>
      <label :class="autoGenFormItemInfo.labelFontSize" :style="{width:autoGenFormItemInfo.labelWidth+'px'}">{{autoGenFormItemInfo.fieldAttribute.label}}</label>
    </div>-->
    <div >
      <Form label-position="left" class=""
            :model="inputValue" :label-width="autoGenFormItemInfo.labelWidth"
            :ref="autoGenFormItemInfo.refName" inline @submit.native.prevent
      >
      <!--<template v-for="(k,v) in inputValue.tags">-->
        <template  v-for="(ele,idx) in inputValue.tags" >
          <!--<div>-->
          <!--<Col span="24">-->
          <FormItem
            :prop="'tags.'+idx" :key="idx"
            :error="inputTempData[idx]['validResult']"
            :rules="autoGenFormItemInfo.fieldRule"
            :class="[autoGenFormItemInfo.showStarForRequire ? '':'noStarForRequire' ,
                      idx>0 && undefined===autoGenFormItemInfo.labelWidth ? 'inputLabel-hidden':'',
                      idx>0 && undefined!==autoGenFormItemInfo.labelWidth ? 'inputNoLabelWidth':'',
                      undefined===autoGenFormItemInfo.inputLabelSize ? '':autoGenFormItemInfo.inputLabelSize,
                      undefined===autoGenFormItemInfo.inputSize ? '':autoGenFormItemInfo.inputSize,]"
            :label=" autoGenFormItemInfo.fieldAttribute.label"
            class=""
          >
            <!--:class="{noStarForRequire: !autoGenFormItemInfo.showStarForRequire,'inputLabel-hidden':idx>0}"-->
            <!--<div>-->

            <Input
              @on-focus="focusInputPlaceHolderDisappear({idx:idx});dismissError({idx:idx});onFocus()"
              @on-blur="blurInputPlaceHolderRestore({idx:idx});validateDuplicate({idx:idx});validateIfAllItemPass_async();onBlur();"
              @on-change="validateDuplicate({idx:idx});validateIfAllItemPass_async();"
              :type="inputAttribute[idx]['inputType']" :autosize="inputAttribute[idx]['autoSize']"
              v-model="inputValue.tags[idx]" :placeholder="inputAttribute[idx]['placeHolder'][0]"
              :style="{width:autoGenFormItemInfo.inputWidth+'px'}"
              :class="[editable ? '':'inputUnEditAble']"
              :readonly="!editable"
            >

            <!--:class="[editable ? '':'inputUnEditAble', 'title'===inputAttribute[idx]['inputSize'] ? 'inputTitle':'']" :readonly="!editable"-->
            <span slot="prepend"  style="border-left: 0px" v-if="undefined!==autoGenFormItemInfo.icon  && null!==autoGenFormItemInfo.icon && ''!==autoGenFormItemInfo.icon">
                    <Icon :type="autoGenFormItemInfo.icon" size="20" :color="autoGenFormItemInfo.iconColor"></Icon>
              </span>
            <span slot="append" style="" :style="{visibility: editable ? 'visible':'hidden'}" class="cursorPointer"
                  v-if="editable===true"
                  @click="removeItem({idx:idx});validateIfAllItemPass_async">
                <Icon type="android-remove-circle" size="18"  color="#aaaaaa" title="移除"></Icon>
              </span>
            </Input>
            <!--</div>-->

            <!--              <span style="height:33px" :style="{visibility: editable ? 'visible':'hidden'}" class="flex-flow-row-nowrap align-items-center cursorPointer" @click="removeItem({idx:idx});validateIfAllItemPass_async">
                            <Icon type="android-remove-circle" size="18"  color="#ed3f14" title="移除"></Icon>
                          </span>-->
          </FormItem>
          <!--</Col>-->
          <!--<Col span="1">-->


          <!--</Col>-->
          <!--</div>-->

        </template>
      <!--</template>-->


      </Form>
    </div>

    <div>
      <!--,-->
      <Button type="primary" :class="{primaryButtonDisable:newButtonDisable,hidden:!editable}"  :disabled="newButtonDisable"
              @click="addItem();validateIfAllItemPass_async()">new</Button>
    </div>

<!--    <Button type="primary"
            @click="switchEditable">editable</Button>-->
    <!--<Button @click="validateAll_a">valid</Button>-->
  </div>
</template>
<script>
  import {objectDeepCopy,objectPartlyDeepCopy,searchEmptyValueIdxInArray,deleteDefinedEleInArray} from  '../../function/misc'
  import {InputAttributeFieldName,InputTempDataFieldName,ValidatePart} from '../../constant/enum/nonValueEnum'
  import {inf} from 'awesomeprint'

  export default {
      props: {'autoGenFormItemInfo':{type:Object},'setting':{type:Object},editable:{type:Boolean}},
      methods: {
        switchEditable(){
          this.editable=!this.editable
          if(false===this.editable){
            this.removeEmptyEle()
          }
        },

        removeEmptyEle(){
          let tobeDeletedIdx=searchEmptyValueIdxInArray({array:this.inputValue.tags})
          // inf('tobeDeletedIdx',tobeDeletedIdx)
          if(tobeDeletedIdx.length>0){
            deleteDefinedEleInArray({array:this.inputValue.tags,tobeDeletedIdx:tobeDeletedIdx})
            deleteDefinedEleInArray({array:this.inputTempData,tobeDeletedIdx:tobeDeletedIdx})
            deleteDefinedEleInArray({array:this.inputAttribute,tobeDeletedIdx:tobeDeletedIdx})
          }
          // this.newButtonDisable=true
        },
        addItem(){
          // inf('add item in ')
          // inf('this.inputValue.tags.length',this.inputValue.tags.length)
          // inf('this.autoGenFormItemInfo.maxNum ',this.autoGenFormItemInfo.maxNum)
          if(this.inputValue.tags.length<this.autoGenFormItemInfo.maxNum){
            this.inputValue.tags.push('')
            this.inputAttribute.push(objectDeepCopy(this.autoGenFormItemInfo.fieldAttribute))
            this.inputTempData.push(objectDeepCopy(this.autoGenFormItemInfo.fieldTempData))
          }
          //如果没加或者加完之后，达到上限
          if(this.inputValue.tags.length>=this.autoGenFormItemInfo.maxNum){
            this.newButtonDisable=true
          }

        },
        removeItem({idx}){
          this.inputValue.tags.splice(idx,1)
          this.inputAttribute.splice(idx,1)
          this.inputTempData.splice(idx,1)
          this.newButtonDisable=false
        },
        onFocus(){},
        onBlur(){},

        focusInputPlaceHolderDisappear({idx}){
          if (undefined === this.inputValue.tags[idx] || null === this.inputValue.tags[idx] || '' === this.inputValue.tags[idx]) {
            this.inputAttribute[idx][InputAttributeFieldName.PLACE_HOLDER] = ['']
          }
        },
        dismissError({idx}){
          // inf('idx',idx)
          this.inputTempData[idx][InputTempDataFieldName.VALID_RESULT]=""
        },
        //如果离开input时，inputValue为空，需要恢复placeholder内容
        blurInputPlaceHolderRestore({idx}) {
          // inf('blurInputPlaceHolderRestore in')
          // inf('blurInputPlaceHolderRestore keyName',keyName)
          if (undefined === this.inputValue.tags[idx] || null === this.inputValue.tags[idx] || '' === this.inputValue.tags[idx]) {
            this.inputAttribute[idx][InputAttributeFieldName.PLACE_HOLDER] = this.inputAttribute[idx][InputAttributeFieldName.PLACE_HOLDER_BKUP]
            // this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.formItemInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
          }
        },
        //存储 单个input 的检测结果（null：为检测，非空字符：检测通过，空字符：检测通过）
        validSingleInputValueAndStoreResult({idx}) {
          // inf('validSingleInputValueAndStoreResult in')
          // inf('formVariantName',formVariantName)
          // inf('type',type)
          // inf('a',Object.keys(this.$refs))
          //formItem放在2层template中，所以大概需要数组来引用
/*          this.$refs[this.autoGenFormItemInfo.refName].validateField(idx, (validResult) => {
            // inf('validSingleInputValueAndStoreResult',validResult)
            this.inputTempData[idx][InputTempDataFieldName.VALID_RESULT] = validResult
            // inf('this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT]',this.formItemInfo.inputTempData[fieldName][InputTempDataFieldName.VALID_RESULT])
          })*/
        },
        //是否有重复
        validateDuplicate({idx}){
          // inf('validateDuplicate in with idx',idx)
          let tobeCheckValue=this.inputValue.tags[idx]
          if(''!==tobeCheckValue){
            // this.inputTempData[idx][InputTempDataFieldName.VALID_RESULT] =null
            for(let index in this.inputValue.tags){
              // inf('index',index)
              //skip self
              if(idx!==parseInt(index)){
                let otherValue=this.inputValue.tags[index]
                // inf('tobeCheckValue',tobeCheckValue)
                // inf('otherValue',otherValue)
                if(tobeCheckValue===otherValue){
                  this.inputTempData[idx][InputTempDataFieldName.VALID_RESULT] = `重复值`
                  return
                }
              }
            }
          }
          this.inputTempData[idx][InputTempDataFieldName.VALID_RESULT] =''

        },
        async validateUnique({idx}) {},
        //同时考虑rule验证结果，和其他验证结果（例如是否有重复）
        async validateIfAllItemPass_async() {
          // 检查非rule验证结果
          let flag=true //默认通过validate
          for (let idx in this.inputTempData) {
            let singleFieldValidResult = this.inputTempData[idx][InputTempDataFieldName.VALID_RESULT]
            // let singleFieldRequired=this.autoGenFormItemInfo.fieldRule[0]['required']
            if (null !== singleFieldValidResult && '' !== singleFieldValidResult) {
              // inf('validateAllItemResult result false')
              flag=false
              this.$emit('validateAllItemResult',false)
              break

              // return
            }
          }

          //输入是否都符合rule定义
          let validateByRuleResult
          if(flag===true){
            validateByRuleResult = await this.validateByRule_async()
          }

          // flag=true
/*          inf('flag',flag)
          inf('validateByRuleResult',validateByRuleResult)*/
          this.$emit('validateAllItemResult',flag && validateByRuleResult)
        },
        async validateByRule_async(){
          let result=await this.$refs[this.autoGenFormItemInfo.refName].validate()
          return Promise.resolve(result)
        }
      },

      computed: {},
      data() {

          return {
            // allValue:{tags:this.autoGenFormItemInfo.inputValue},//无需从props传入
            inputValue:{tags:this.autoGenFormItemInfo.inputValue}, //为了直接返回值，采用传引用方式
            inputTempData:[],//根据fieldTempData生成
            inputAttribute:[],//为了实现placeHolder恢复和消失的效果，每个input需要单独的inputAttribute
            // ruleKey:Object.keys(this.autoGenFormItemInfo.rules)[0]

            newButtonDisable:false,//达到上限，为false（是否显示，通过editable控制）

            //采用style，优先级覆盖iview
            // buttonDisableStyle:this.$store.state.style.button.primary.disable,

            // editable:false,//是否可以进行编辑

            classVertical:'flex-flow-column-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',
            classHorizontal:'flex-flow-row-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start',
          }
      },
  }
</script>
