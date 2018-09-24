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
  <div style="position:relative" class="flex-flow-row-wrap justify-content-space-around">
    <!--<spin  fix>加载中...</spin>-->
    <div>
      <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1"
            label-position="left"
            :ref="articleInfo.ref.form.articleForm" :model="articleInfo.formItemInfo.inputValue"
            :rules="articleInfo.formItemInfo.rule"
            :label-width="articleInfo.formItemInfo.labelWidth"
            @submit.native.prevent
      >

        <self-form-item
          :editable="editable"
          :form-item-info="articleInfo.formItemInfo"
          :formRefName="articleInfo.ref.form.articleForm"
          @validateAllItemResult="validateAllItemResult"
          :ref="articleInfo.ref.formItem.articleFormItem"
        ></self-form-item>

      </Form>


      <self-attachment-list :attachmentListPropsInfo="attachmentListPropsInfo"></self-attachment-list>
    </div>

    <div class="flex-flow-row-wrap justify-content-center">
      <Button type="primary" :disabled="false===validResult" @click="saveUpdate">保存</Button>
      <Button type="default"  class="marginH5">取消</Button>
      <!--<Button type="success" :disabled="editable">编辑</Button>-->
      <!--<Button type="error" :disabled="!editable">删除</Button>-->
    </div>
  </div>

</template>
<script>
  /******************************/
  /**          子组件         **/
  /******************************/
  import selfFormItem from '../basicComponent/formItem'
  import selfAutoGenFormItem from '../basicComponent/autoGenFormItem'
  import selfAttachmentList from '../subComponents/attachmentList'
  /******************************/
  /**          网络            **/
  /******************************/
  import {sendRequestGetResult_async} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'
  import {host} from '../../constant/envConfiguration/appSetting'
  /******************************/
  /**      错误（函数）       **/
  /******************************/
  import {showErrorInCenterMessage} from '../../function/showErrorResult'
  /******************************/
  /**           enum           **/
  /******************************/
  import {ValidatePart} from '../../constant/enum/nonValueEnum'
  /******************************/
  /**          配置            **/
  /******************************/
  import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  /******************************/
  /**     common constant     **/
  /******************************/
  // import * as componentInfo from '../../constant/globalConfiguration/componentInfo'

  /**   打印函数   ***/
  import {inf} from 'awesomeprint'
    export default {
      components:{selfFormItem,selfAutoGenFormItem,selfAttachmentList},
      props: {'articleInfo':{type:Object}},
      async mounted(){
        await this.getUpdateArticle_async()
      },
      methods: {
        /********************/
        /**   网络操作    **/
        /********************/
        async getUpdateArticle_async(){
          let that=this
          sendRequestGetResult_async({urlOption:urlConfiguration.article.getUpdatedArticle,data:this.$route.params.articleId}).then(function (response) {
            // inf('resononse',response)
            that.attachmentListPropsInfo.currentAttachmentFileInfo=response.msg['articleAttachmentsId']
          },function (err) {

          })
        },
        async saveUpdate(){
          //1. 出发form的方法，检测是否所有input都符合条件，结果传递给本组件变量validResult
          await this.$refs[this.articleInfo.ref.formItem.articleFormItem].validateIfAllItemPass()
          // console.log('this.validResult',this.validResult)
          if(true===this.validResult){
            let data={values:{}}
            data.values[ValidatePart.RECORD_ID]=''
            //生成数据
            for(let singleKey in this.articleInfo.formItemInfo.inputTempData){
              //根据inputTempData的值判断inputValue是否被更改
            }
          }

        },
        /*************************/
        /**   子组件formItem emit事件   **/
        /*************************/
        validateAllItemResult(result){
          // inf('validateAllItemResult result',result)
          this.validResult=result
        },

        /********************/
        /**   是否可编辑  **/
        /********************/

      },
      computed: {},
      data() {
        // inf('this.route',this.$route.params)
          return {
            // editable:false,
            // additionalData:{recordId:'test'},
            // host:host,
            // articleInfo:componentInfo.articleInfo,

            validResult:true,

            editable:true,//不是通过父组件传入，而是通过本组件的按钮 来控制
            attachmentListPropsInfo:{
              configuration:{
                action:`${host}/article/articleAttachment/${this.$route.params.articleId}`,
                maxSize:uploadFileDefine.article.article_attachment.maxSizeInMB*1024,//Mb==>kb
                format:uploadFileDefine.common.attachmentType,
                refName:'uploadAttachment',
              },
              //配置除了Upload的action之外，其他操作指定的url（例如，delete操作）
              url:{
                deleteAttachmentUrl:urlConfiguration.article.deleteAttachment,
              },
              currentAttachmentFileInfo:[],
            },
          }
      },
    }

</script>
