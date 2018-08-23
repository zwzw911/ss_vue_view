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
  <div style="position:relative">
    <!--<spin  fix>加载中...</spin>-->
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

      <Upload :action="uploadAction.attachment" :format="uploadFileDefine.common.attachmentType" :max-size="uploadFileDefine.article.article_attachment.maxSizeInMB*1024">
        <Button icon="md-add-circle">添加附件</Button>
      </Upload>
      <div class="flex-flow-row-wrap justify-content-center">
        <Button type="primary" :disabled="false===validResult">保存</Button>
        <Button type="default"  class="marginH5">取消</Button>
        <!--<Button type="success" :disabled="editable">编辑</Button>-->
        <!--<Button type="error" :disabled="!editable">删除</Button>-->
      </div>

    </Form>
  </div>

</template>
<script>
  /**   子组件   **/
  import selfFormItem from '../basicComponent/formItem'
  import selfAutoGenFormItem from '../basicComponent/autoGenFormItem'
  /**   网络   **/
  import {sendRequestGetResult_async} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'
  import {host} from '../../constant/envConfiguration/appSetting'
  /**   enum    **/
  import {ValidatePart} from '../../constant/enum/nonValueEnum'
  /**   配置    **/
  import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'

  /**   打印函数   ***/
  import {inf} from 'awesomeprint'
    export default {
      components:{selfFormItem,selfAutoGenFormItem},
      props: {'articleInfo':{type:Object},'editable':{type:Boolean}},
      async mounted(){
        await this.getUpdateArticle_async()
      },
      methods: {
        /********************/
        /**   网络操作    **/
        /********************/
        async getUpdateArticle_async(){
          sendRequestGetResult_async({urlOption:urlConfiguration.article.getUpdatedArticle,data:this.$route.params.articleId}).then(function (response) {
            inf('resononse',response)
          },function (err) {

          })
        },
        saveUpdate(){
          let data={values:{}}
          data.values[ValidatePart.RECORD_ID]=''
          //生成数据
          for(let singleKey in this.articleInfo.formItemInfo.inputTempData){
            //根据inputTempData的值判断inputValue是否被更改
          }
        },
        /*************************/
        /**   子组件emit事件   **/
        /*************************/
        validateAllItemResult(result){
          // inf('validateAllItemResult result',result)
          this.validResult=result
        },
      },
      computed: {},
      data() {
        // inf('this.route',this.$route.params)
          return {
            // editable:false,
            // additionalData:{recordId:'test'},
            // host:host,
            uploadAction:{
              attachment:`${host}/article/articleAttachment/${this.$route.params.articleId}`
            },
            uploadFileDefine:uploadFileDefine,
            validResult:true,
          }
      },
    }
</script>
