
<style scoped>
</style>
<template>
  <div class="flex-flow-column-wrap align-content-flex-start align-items-flex-start">
    <div v-for="(val,idx) in attachmentListPropsInfo.currentAttachmentFileInfo" class=" h4 marginT2">
      <span>{{attachmentListPropsInfo.currentAttachmentFileInfo[idx]['name']}}</span>
      <span class="marginL2">
        <Tooltip placement="right" :delay=500 content="删除附件" v-if="true===attachmentListPropsInfo.editable">
          <Icon type="md-trash" class="color-error cursor-pointer" style="align-self: flex-end" @click="deleteAttachment_async({idx:idx})" v-if="true===attachmentListPropsInfo.editable"></Icon>
        </ToolTip>
        <Tooltip placement="right" :delay=500 content="下载附件" >
          <!--@click="downloadAttachment_async({idx:idx})"-->
          <a :href="[host+attachmentListPropsInfo.url.downloadAttachmentUrl.url+'/'+attachmentListPropsInfo.currentAttachmentFileInfo[idx]['id']]">
            <Icon type="md-download" class="color-primary cursor-pointer" style="align-self: flex-end" >
            </Icon>
          </a>
        </ToolTip>
      </span>

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
        <Button type="primary" icon="md-cloud-upload" v-if="true===attachmentListPropsInfo.editable">上传附件</Button>
      </Upload>

    <!--</div>-->

  </div>
</template>
<script>
  /******************************/
  /**          网络            **/
  /******************************/
  import * as network from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'
  import {host} from '../../constant/envConfiguration/appSetting'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**      错误（函数）       **/
  /******************************/
  // import {handleResult.commonHandlerForErrorResult} from '../../function/showResult'
  import * as handleResult from '../../function/handleResult'
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
/*      async downloadAttachment_async({idx}){
        // inf('downloadAttachment_async in')
        let result=await network.sendRequestGetResult_async({urlOption:this.attachmentListPropsInfo.url.downloadAttachmentUrl,data:this.attachmentListPropsInfo.currentAttachmentFileInfo[idx]['id']})
        inf('downloadAttachment_async result',result)
        if(result.rc===0){
          network.downloadFile({fileContent:result.msg,fileName:result.msg.content.fileName})
        }
      },*/
      async deleteAttachment_async({idx}){
        let data={values:{[ValidatePart.RECORD_ID]:this.attachmentListPropsInfo.currentAttachmentFileInfo[idx]['id']}}
        // inf('data',data)
        // inf('this.attachmentListPropsInfo.url.deleteAttachmentUrl',this.attachmentListPropsInfo.url.deleteAttachmentUrl)
        let result=await network.sendRequestGetResult_async({urlOption:this.attachmentListPropsInfo.url.deleteAttachmentUrl,data:data})
        if(undefined!==result && result.rc===0){
          let fileName=this.attachmentListPropsInfo.currentAttachmentFileInfo[idx]['name']
          this.attachmentListPropsInfo.currentAttachmentFileInfo.splice(idx,1)
          handleResult.commonHandlerForSuccessResult({that:this,response:{rc:0,msg:`附件 ${fileName} 删除成功`}})
        }
      },
      addAttachment_async(){},
      /****************************/
      /**   子组件Upload事件    **/
      /****************************/
      //格式不支持
      handleFormatError (file) {
        let that=this
        handleResult.commonHandlerForErrorResult({that:that,response:{rc:98765,msg:`文件${file.name}的格式不支持`}})
        /*          this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                  });*/
      },
      //尺寸超出
      handleMaxSize (file) {
        let that=this
        handleResult.commonHandlerForErrorResult({that:that,response:{rc:98765,msg:`文件${file.name}大小超过上限${this.attachmentListPropsInfo.maxSize}kb`}})
        /*          this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                  });*/
      },
      handleUploadSuccess(response, file, fileList){
        if(response.rc>0){
          handleResult.commonHandlerForErrorResult({that:this,response:response})
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
        host:host,
        // attachmentInfo:[{hanhName:'asdf.txt',name:'test.txt'},{hanhName:'asdf.txt',name:'test.txt'}], //记录附件信息{hashName:'用来执行操作',name:'只用于显示'},
      }
    },

  }
</script>
