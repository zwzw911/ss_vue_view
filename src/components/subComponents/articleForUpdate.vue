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
          :editable="attachmentListPropsInfo.editable"
          :form-item-info="articleInfo.formItemInfo"
          :formRefName="articleInfo.ref.form.articleForm"
          @checkIfAllItemValidatedResultPass="checkIfAllItemValidatedResultPass"
          :ref="articleInfo.ref.formItem.articleFormItem"
        ></self-form-item>

      </Form>


      <self-attachment-list :attachmentListPropsInfo="attachmentListPropsInfo"></self-attachment-list>
    </div>

    <div class="flex-flow-row-wrap justify-content-center marginTX">
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
  // import {showErrorInCenterMessage,showSuccessInCenterMessage} from '../../function/showResult'
  import * as handleResult from '../../function/handleResult'
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
  /******************************/
  /*******     3rd     *********/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../../function/misc'

    export default {
      components:{selfFormItem,selfAutoGenFormItem,selfAttachmentList},
      props: {'articleInfo':{type:Object}},
      async created(){
        // inf('this.articleInfo.formItemInfo.inputValue',this.articleInfo.formItemInfo.inputValue)
        await this.getUpdateArticle_async()
      },
      methods: {
        /********************/
        /**   网络操作    **/
        /********************/
        async getUpdateArticle_async(){
          let that=this
          sendRequestGetResult_async({urlOption:urlConfiguration.article.getUpdatedArticle,data:this.articleId}).then(function (response) {
            if(response.rc>0){
              handleResult.commonHandlerForErrorResult({that:that,response:response})
              return
            }
            // inf('resononse',response)
            // console.log(that)
            let neededFields=['name','status','allowComment','tags','htmlContent']

            let neededValue=misc.extractPartObject({sourceObj:response.msg,neededKeyNames:neededFields})
            // for(let neededField of neededFields){
            //   // that.articleInfo.formItemInfo.inputValue[neededField]=response.msg[neededField]
            //   neededValue[neededField]=response.msg[neededField]
            // }
            // inf('response.msg[\'articleAttachmentsId\']',response.msg['articleAttachmentsId'])
            that.$refs[that.articleInfo.ref.formItem.articleFormItem].loadServerData({valueFromDb:neededValue})

            that.attachmentListPropsInfo.currentAttachmentFileInfo=response.msg['articleAttachmentsId']
            // that.$refs[that.articleInfo.ref.formItem.articleFormItem].validAllInputValueAndStoreResult()
          },function (err) {

          })
        },
        async saveUpdate(){
          let that=this
          //1. 触发form的方法，检测是否所有input都符合条件，结果传递给本组件变量validResult
          this.$refs[this.articleInfo.ref.form.articleForm].validate((validResult)=>{
            // inf('validResult',validResult)
            that.validResult=validResult

            if(false===that.validResult){
              handleResult.commonHandlerForErrorResult({that:that,response:{rc:98765,msg:'某些输入项不正确'}})
              return
            }
            //2. 上传数据
            let data={values:{}}
            data.values[ValidatePart.RECORD_ID]=that.articleId
            //2.1 获得发生变化的字段
            data.values[ValidatePart.RECORD_INFO]=that.$refs[that.articleInfo.ref.formItem.articleFormItem].sanityInputValueBeforeSendToServer()
            if(0===Object.keys(data.values[ValidatePart.RECORD_INFO]).length){
              // alert('未作任何更改')
              handleResult.commonHandlerForSuccessResult({that:that,response:{rc:0,msg:'未作任何更改，无需保存'}})
              return
            }

            sendRequestGetResult_async({urlOption:urlConfiguration.article.updateArticle,data:data}).then(function (response) {
              // inf('update article resononse',response)
              // that.attachmentListPropsInfo.currentAttachmentFileInfo=response.msg['articleAttachmentsId']
              if(response.rc>0){
                handleResult.commonHandlerForErrorResult({that:that,response:response})
              }else{
                handleResult.commonHandlerForSuccessResult({that:that,response:{rc:0,msg:'文档更新成功'}})
              }
            },function (err) {
              // inf('update article err',err)
              handleResult.commonHandlerForErrorResult({that:that,response:err})
            })
          })




        },
        /*************************/
        /**   子组件formItem emit事件   **/
        /*************************/
        checkIfAllItemValidatedResultPass(result){
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
            articleId:this.$route.params.articleId,
            // editable:false,
            // additionalData:{recordId:'test'},
            // host:host,
            // articleInfo:componentInfo.articleInfo,

            validResult:false,

            // editable:true,//不是通过父组件传入，而是通过本组件的按钮 来控制
            attachmentListPropsInfo:{
              configuration:{
                action:`${host}/article/articleAttachment/${this.$route.params.articleId}`,
                maxSize:uploadFileDefine.article.article_attachment.maxSizeInMB*1024,//Mb==>kb
                format:uploadFileDefine.common.attachmentType,
                refName:'uploadAttachment',
              },
              //配置除了Upload的action之外，其他操作指定的url（例如，delete操作）
              url:{
                deleteAttachmentUrl:urlConfiguration.article.deleteAttachment, //for axios. already include host
                downloadAttachmentUrl:urlConfiguration.article.downloadAttachment,// for <a>, in subComponent include host
              },
              currentAttachmentFileInfo:[],
              editable:true,
            },
          }
      },
    }

</script>
