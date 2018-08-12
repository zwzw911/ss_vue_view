<style scoped>
</style>
<template>
<!--  <Form label-width="" label-position="top">
    <FormItem label="test1" class="flex-flow-column-nowrap justify-content-flex-start align-items-flex-start align-content-flex-start">
      <Input></Input>
    </FormItem>
    <FormItem label="test2">
      <Input></Input>
    </FormItem>
  </Form>-->
  <Form class=""
        label-position="left"
        :ref="articleInfo.ref.form.articleForm" :model="articleInfo.formItemInfo.inputValue"
        :rules="articleInfo.formItemInfo.rule"
        :label-width="articleInfo.formItemInfo.labelWidth"
        @submit.native.prevent
  >
<!--    <FormItem label="test">
      <Input></Input>
    </FormItem>-->

    <!--:ref="ref.formItem.formItemForLogin"-->
    <!--@validateAllItemResult="setFormItemResult" @onBlur="checkSubmitButtonStatus"-->
    <self-form-item  :editable="editable" :form-item-info="articleInfo.formItemInfo" :auto-gen-form-item-info="articleInfo.autoGenFormItemInfo" @validateAllItemResult="validateAllItemResult"></self-form-item>
    <!--<self-auto-gen-form-item :editable="editable" :auto-gen-form-item-info="articleInfo.autoGenFormItemInfo"></self-auto-gen-form-item>-->
    <div class="flex-flow-row-wrap justify-content-center">
      <Button type="primary" :disabled="false===validResult">保存</Button>
      <Button type="default"  class="marginH5">取消</Button>
      <!--<Button type="success" :disabled="editable">编辑</Button>-->
      <!--<Button type="error" :disabled="!editable">删除</Button>-->
    </div>

  </Form>
</template>
<script>
  import selfFormItem from '../basicComponent/formItem'
  import selfAutoGenFormItem from '../basicComponent/autoGenFormItem'

  import {ValidatePart} from '../../constant/enum/nonValueEnum'
  import {inf} from 'awesomeprint'
    export default {
      components:{selfFormItem,selfAutoGenFormItem},
      props: {'articleInfo':{type:Object},'editable':{type:Boolean}},
      methods: {
        validateAllItemResult(result){
          // inf('validateAllItemResult result',result)
          this.validResult=result
        },
        /**   网络操作    **/
        saveUpdate(){
          let data={values:{}}
          data.values[ValidatePart.RECORD_ID]=''
          //生成数据
          for(let singleKey in this.articleInfo.formItemInfo.inputTempData){
            //根据inputTempData的值判断inputValue是否被更改
          }
        },
      },
      computed: {},
      data() {
          return {
            // editable:false,
            validResult:null,
          }
      },
    }
</script>
