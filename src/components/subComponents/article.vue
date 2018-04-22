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
  </Form>
</template>
<script>
  import selfFormItem from '../basicComponent/formItem'
  import selfAutoGenFormItem from '../basicComponent/autoGenFormItem'
  import {inf} from 'awesomeprint'
    export default {
      components:{selfFormItem,selfAutoGenFormItem},
      props: {'articleInfo':{type:Object},'editable':{type:Boolean}},
      methods: {
        validateAllItemResult(result){
          this.$emit('validateAllItemResult',result)
        },
      },
      computed: {},
      data() {
          return {
            // editable:false,
          }
      },
    }
</script>
