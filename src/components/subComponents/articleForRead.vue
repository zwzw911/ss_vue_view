<style scoped>
</style>
<template>
  <div >

    <self-spin :spin-info="spinInfo"></self-spin>
    <div>
      <div id="error" v-if="''!==readArticleError" class="color-error">
        {{readArticleError}}
      </div>
      <div id="article" v-if="''===readArticleError && undefined!==articleInfo">
        <p id="articleTitle" class="h1 bolder font-serif">{{articleInfo.name}}</p>

        <div id="authorInfo" class="flex-flow-row-wrap justify-content-flex-start marginT7">
          <img :style="{ width: '50px', height:  '50px'}" :src="articleInfo.authorId.photoDataUrl"/>
          <div class="flex-flow-column-wrap justify-content-space-between marginL4">
            <p class="h4 text-align-left">{{articleInfo.authorId.name}}</p>
            <p class="color-grey">
              <span class="marginR2">{{articleInfo.cDate}}</span>
              <span class="marginR2">阅读{{}}</span>
              <span>评论:{{}}</span>
            </p>
          </div>
        </div>

        <p class="marginTX text-align-left marginBX" v-html="articleInfo.htmlContent">{{}}</p>

        <self-attachment-list :attachment-list-props-info="attachmentListPropsInfo"></self-attachment-list>
      </div>

      <div id="createComment">
        <self-create-comment :create-comments-info="createCommentInfo"></self-create-comment>
      </div>


      <div id="commentList">
        <self-comment-list></self-comment-list>
      </div>
    </div>




  </div>

</template>
<script>
  /******************************/
  /**          子组件         **/
  /******************************/
  // import selfFormItem from '../basicComponent/formItem'
  // import selfAutoGenFormItem from '../basicComponent/autoGenFormItem'
  import selfAttachmentList from '../subComponents/attachmentList'
  import selfCommentList from '../basicComponent/commentList'
  import selfCreateComment from '../basicComponent/createComment'
  import selfSpin from '../../components/basicComponent/spin'
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
  import * as nonValueEnum from '../../constant/enum/nonValueEnum'

  /******************************/
  /**          配置            **/
  /******************************/
  import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  /******************************/
  /**     common constant     **/
  /******************************/
  // import * as componentInfo from '../../constant/globalConfiguration/componentInfo'
  import * as inputAttribute from '../../constant/inputValue/gen/inputAttribute'
  import * as inputTempData from '../../constant/inputValue/gen/inputTempData'
  import * as rule from '../../constant/rule/rule'
  /******************************/
  /*******     3rd     *********/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../../function/misc'


  /**     generate specific constant  **/
  let commentInputAttribute=misc.objectDeepCopy(inputAttribute.inputAttribute.article_comment.content)
  commentInputAttribute[nonValueEnum.InputAttributeFieldName.PLACE_HOLDER]=commentInputAttribute[nonValueEnum.InputAttributeFieldName.PLACE_HOLDER_BKUP]=['评论内容至少15个字符']

    export default {
      components:{selfAttachmentList,selfCommentList,selfCreateComment,selfSpin},
      // props: {'articleInfo':{type:Object}},
      async mounted(){
        await this.getArticle_async()
      },
      methods: {
        /********************/
        /**   网络操作    **/
        /********************/
        async getArticle_async(){
          let that=this

          that.spinInfo.show=true

          sendRequestGetResult_async({urlOption:urlConfiguration.article.getArticle,data:this.articleId}).then(function (response) {
            that.spinInfo.show=false
            if(response.rc>0){
              if(response.rc===50284){
                // inf('response.msg',response.msg)
                that.readArticleError=response.msg
              }
              return
            }
            // inf('resononse',response)
            // console.log(that)
/*            let neededFields=['name','status','allowComment','tags','htmlContent','']

            let neededValue=misc.extractPartObject({sourceObj:response.msg,neededKeyNames:neededFields})
            // for(let neededField of neededFields){
            //   // that.articleInfo.formItemInfo.inputValue[neededField]=response.msg[neededField]
            //   neededValue[neededField]=response.msg[neededField]
            // }
            that.$refs[that.articleInfo.ref.formItem.articleFormItem].loadServerData({valueFromDb:neededValue})*/
            that.articleInfo=response.msg
            that.attachmentListPropsInfo.currentAttachmentFileInfo=response.msg['articleAttachmentsId']
          },function (err) {

          })
        },


      },
      computed: {},
      data() {
        // inf('this.route',this.$route.params)
          return {
            spinInfo:{
              msg:'读取文档...',
              show:true,
            },

            readArticleError:'',
            articleId:this.$route.params.articleId,
            userThumb:uploadFileDefine.user_photo,
            // editable:false,
            // additionalData:{recordId:'test'},
            // host:host,
            articleInfo:undefined,

/*            validResult:true,

            editable:true,//不是通过父组件传入，而是通过本组件的按钮 来控制*/
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
                downloadAttachmentUrl:urlConfiguration.article.downloadAttachment,
              },
              currentAttachmentFileInfo:[],
            },
            createCommentInfo:{
              inputValue:{
                content:null,
              },
              inputAttribute:{
                content:commentInputAttribute,
              },
              inputTempData:misc.objectPartlyDeepCopy({sourceObj:inputTempData.inputTempData.article_comment,expectedKey:['content']}),
              rule:rule.ruleForCreate.article_comment,//rule不能copy，防止其中regexp出错
            },
          }
      },
    }

</script>
