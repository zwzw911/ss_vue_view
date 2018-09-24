
<style scoped>
</style>
<template>
  <div class="flex-flow-column-wrap align-content-flex-start align-items-flex-start">
    <div v-for="(val,idx) in attachmentListPropsInfo.currentAttachmentFileInfo" class="attachment-delete-icon-hover-show h4 marginT2">
      <a>{{attachmentListPropsInfo.currentAttachmentFileInfo[idx]['name']}}</a>
      <Tooltip placement="right" :delay=1000 content="删除附件">
        <Icon type="md-trash" class="color-error marginL2 cursor-pointer" style="align-self: flex-end" @click="deleteAttachment_async({idx:idx})"></Icon>
      </ToolTip>
    </div>
    <!--<div class="">-->
      <Upload
        :action="attachmentListPropsInfo.configuration.action"
        :format="attachmentListPropsInfo.configuration.format"
        :ref="attachmentListPropsInfo.configuration.refName"
        :max-size="attachmentListPropsInfo.configuration.maxSize"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :on-success="handleUploadSuccess"
        :show-upload-list="false"
        class="marginT4"
      >
        <!--:max-size="uploadFileDefine.article.article_attachment.maxSizeInMB*1024"-->

        <!--<Button icon="md-add-circle">添加附件</Button>-->
        <Button type="primary" icon="md-cloud-upload">上传附件</Button>
      </Upload>

    <!--</div>-->

  </div>
</template>
<script>
  /******************************/
  /**          网络            **/
  /******************************/
  import {sendRequestGetResult_async} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'
  import {host} from '../../constant/envConfiguration/appSetting'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**      错误（函数）       **/
  /******************************/
  import {showErrorInCenterMessage} from '../../function/showErrorResult'
  /******************************/
  /**        constant          **/
  /******************************/
  import {ValidatePart} from '../../constant/enum/nonValueEnum'


  export default  {
    /*{
        configuration:{
             action:处理上传请求的url,
             format:支持的后缀，数组
             maxSize：最大size，单位kb
             refName:Upload的ref，以便调用clearFiles
        },
        currentAttachmentFileInfo:[]
     }*/
    props:{'attachmentListPropsInfo':{type:Object}},
    methods:{
      /****************************/
      /*********   网络    ********/
      /****************************/
      getAttachmentList_async(){},
      async deleteAttachment_async({idx}){
        let data={values:{[ValidatePart.RECORD_ID]:this.attachmentListPropsInfo.currentAttachmentFileInfo[idx]['id']}}
        // inf('data',data)
        // inf('this.attachmentListPropsInfo.url.deleteAttachmentUrl',this.attachmentListPropsInfo.url.deleteAttachmentUrl)
        let result=await sendRequestGetResult_async({urlOption:this.attachmentListPropsInfo.url.deleteAttachmentUrl,data:data})
        if(undefined===result && result.rc===0){
        this.attachmentListPropsInfo.currentAttachmentFileInfo.splice(idx,1)
        }
      },
      addAttachment_async(){},
      /****************************/
      /**   子组件Upload事件    **/
      /****************************/
      //格式不支持
      handleFormatError (file) {
        let that=this
        showErrorInCenterMessage({that:that,msg:`文件${file.name}的格式不支持`})
        /*          this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                  });*/
      },
      //尺寸超出
      handleMaxSize (file) {
        let that=this
        showErrorInCenterMessage({that:that,msg:`文件${file.name}大小超过上限${this.attachmentListPropsInfo.maxSize}kb`})
        /*          this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                  });*/
      },
      handleUploadSuccess(response, file, fileList){
        if(response.rc>0){
          showErrorInCenterMessage({that:this,msg:response.msg})
          return
        }
        this.attachmentListPropsInfo.currentAttachmentFileInfo.push(response.msg[0])
        // inf('response',response)
        // inf('file',file)
        // inf('fileList',fileList)
        // this.$refs[this.attachmentListPropsInfo.refName].clearFiles()
      },
    },
    data(){
      return {
        // attachmentInfo:[{hanhName:'asdf.txt',name:'test.txt'},{hanhName:'asdf.txt',name:'test.txt'}], //记录附件信息{hashName:'用来执行操作',name:'只用于显示'},
      }
    },

  }
</script>
