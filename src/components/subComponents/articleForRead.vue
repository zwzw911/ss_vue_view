<style scoped>
  .content-min-height{
    min-height: 250px;
  }
</style>
<template>
  <div >

    <self-spin :spin-info="spinInfo"></self-spin>
    <div v-if="false===spinInfo.show">
      <template v-if="''!==readArticleError">
        <div id="error" v-if="" class="color-error">
          {{readArticleError}}
        </div>
      </template>
      <template v-else>
        <div id="article" v-if="''===readArticleError && undefined!==articleInfo">
          <p id="articleTitle" class="h1 bolder font-serif">{{articleInfo.name}}</p>

          <div id="authorInfo" class="flex-flow-row-wrap justify-content-flex-start marginT7">
            <img :style="{ width: '50px', height:  '50px'}" :src="articleInfo.authorId.photoDataUrl"/>
            <div class="flex-flow-column-wrap justify-content-space-between marginL4">
              <p class="h4 text-align-left">
                <span class="">
                {{articleInfo.authorId.name}}
                </span>
                <!--<span class="h4 bg-color-darken-success">关注</span>-->
                <Button type="success" size="small" class="" icon="md-add">关注</Button>
              </p>

              <p class="color-grey">

                <span class="marginR2">{{articleInfo.cDate}}</span>
                <span class="marginR2">阅读{{}}</span>
                <span>评论:{{}}</span>
              </p>
            </div>
          </div>

          <p class="text-align-left h4 marginT3">
            <span class="cursor-pointer marginR2" @click="articleLike">
              <Icon type="md-thumbs-up" class="color-success"/>
              赞
            </span>
            <span class="marginR7 h5 color-grey">{{staticResult.like}}</span>
            <span class="cursor-pointer marginR2"  @click="articleDislike">
              <Icon type="md-thumbs-down" class="color-warning"/>
              踩
            </span>
            <span class="marginR7 h5 color-grey">{{staticResult.dislike}}</span>
            <span class="cursor-pointer marginR6" @click="chooseFriendGroup()" >
              <Icon type="md-share" class="color-primary"/>
              分享
            </span>
            <self-choose-friend-group :chooseFriendGroupInfo="chooseFriendGroupInfo" ref="refChooseFriendGroup"></self-choose-friend-group>
            <self-choose-friend :chooseFriendInfo="chooseFriendInfo" ref="refChooseFriend"></self-choose-friend>
            <!--<self-choose-user :chooseUserInfo="chooseUserInfo" ref="refChooseUser"></self-choose-user>-->
            <self-add-friend></self-add-friend>
            <span class="cursor-pointer marginR6"><Icon type="md-filing" class="color-primary"/>收藏</span>
          </p>
          <p class="marginTX text-align-left marginBX content-min-height" v-html="articleInfo.htmlContent"></p>

          <self-attachment-list :attachment-list-props-info="attachmentListPropsInfo"></self-attachment-list>
        </div>


        <template v-if="articleInfo.allowComment==='1'">
          <template v-if="ifUserLogin===false">
            <p class="bg-color-darken-white paddingAll3">
              <span @click="routeToLogin" class="color-info cursor-pointer">登录</span>后发表评论
            </p>
          </template>
          <template v-else>
            <div id="createComment">
              <self-create-comment :create-comments-info="createCommentInfo"></self-create-comment>
            </div>
          </template>
          <div id="comment" >



            <div id="commentList">
              <self-comment-list :commentListInfo="commentListInfo"></self-comment-list>
            </div>
          </div>
        </template>
        <template v-else>
          <p class="color-lighten-red text-align-left">作者禁止评论文档</p>
        </template>

      </template>

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
  import selfChooseFriendGroup from '../../components/basicComponent/chooseFriendGroup'
  import selfChooseFriend from '../../components/basicComponent/chooseFriend'
  import selfAddFriend from '../../components/subComponents/autoComplete/addFriend'
  /******************************/
  /**          网络            **/
  /******************************/
  import * as network from '../../function/network'
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
  import {routePath} from '../../constant/url/routePath'
  // import * as nonValueEnum from '../../constant/enum/nonValueEnum'
  /******************************/
  /*******     3rd     *********/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../../function/misc'
  import * as formatData from '../../function/formatData'

  /**     generate specific constant  **/
  let commentInputAttribute=misc.objectDeepCopy(inputAttribute.inputAttribute.article_comment.content)
  commentInputAttribute[nonValueEnum.InputAttributeFieldName.PLACE_HOLDER]=commentInputAttribute[nonValueEnum.InputAttributeFieldName.PLACE_HOLDER_BKUP]=['评论内容至少15个字符']

    export default {
      components:{selfAttachmentList,selfCommentList,selfCreateComment,selfSpin,selfChooseFriendGroup,selfChooseFriend,selfAddFriend},
      // props: {'articleInfo':{type:Object}},
      async mounted(){
        await this.getArticle_async()
      },
      methods: {
        routeToLogin(){
          misc.routeTo({that:this,path:routePath.login})
        },
        /********************/
        /**   网络操作    **/
        /********************/
        async getArticle_async(){
          let that=this

          that.spinInfo.show=true

          network.sendRequestGetResult_async({urlOption:urlConfiguration.article.getArticle,data:this.articleId}).then(function (response) {
            that.spinInfo.show=false
            if(response.rc>0){

              // if(response.rc===50284){
                // inf('response.msg',response.msg)
                that.readArticleError=response.msg
              // }
              //文档编号不正确
              if(response.rc===50206){
                that.readArticleError="文档编号不正确，请登录后重新打开"
              }
              return
            }

            // let articleInfo=response.msg.article
            // let staticResult=response.msg.staticResult

            formatData.formatDate({record:response.msg.article,fieldsToBeFormat:["cDate"]})
            that.articleInfo=response.msg.article
            that.attachmentListPropsInfo.currentAttachmentFileInfo=response.msg['articleAttachmentsId']

            formatData.formatDate({record:response.msg['articleCommentsId'],fieldsToBeFormat:["cDate"]})
            that.commentListInfo=response.msg['articleCommentsId']


            that.staticResult=response.msg.staticResult

          },function (err) {
            // handleResult.commonHandlerForErrorResult({that:that,response:err})
            that.readArticleError=err.msg
            that.spinInfo.show=false
// inf('getArticle_async err',err)
          })
        },


        async articleLike(){
          // inf('articleLike in')
          let that=this
          let data={
            values:{
              [nonValueEnum.ValidatePart.SINGLE_FIELD]: {['articleId']: this.articleId},
            }
          }
          // inf('articleLike data',data)
          network.sendRequestGetResult_async({urlOption:urlConfiguration.articleLikeDislike.like,data:data}).then(function (response) {
            // that.spinInfo.show=false
            if(response.rc>0){
              // if(response.rc===50284){
              // inf('response.msg',response.msg)
              handleResult.commonHandlerForErrorResult({that:that,response:response,showType:'modal'})
              // that.readArticleError=response.msg
              // }
              return
            }


          },function (err) {
            // handleResult.commonHandlerForErrorResult({that:that,response:err})
            that.readArticleError=err.msg

          })
        },
        async articleDislike(){
          let that=this
          let data={
            values:{
              [nonValueEnum.ValidatePart.SINGLE_FIELD]: {['articleId']: this.articleId},
            }
          }

          network.sendRequestGetResult_async({urlOption:urlConfiguration.articleLikeDislike.dislike,data:data}).then(function (response) {
            // that.spinInfo.show=false
            if(response.rc>0){
              handleResult.commonHandlerForErrorResult({that:that,response:response,showType:'modal'})
              return
            }

          },function (err) {
            // handleResult.commonHandlerForErrorResult({that:that,response:err})
            that.readArticleError=err.msg

          })
        },
        async chooseFriendGroup(){
          // this.chooseFriendGroupInfo.show=true
          // await this.$refs["refChooseFriendGroup"].getAllFriendGroupRecords()
          //
          // this.chooseFriendInfo.show=true
          // await this.$refs["refChooseFriend"].getAvailableFriends()

          this.chooseUserInfo.show=true
          await this.$refs["refChooseUser"].searchUser()
        },
      },
      computed: {},
      data() {
        // inf('this.route',this.$route.params)
          return {
/*            ref:{
              chooseFriendGroup:"chooseFriendGroup",
            },*/
            ifUserLogin:misc.ifUserLogin({that:this}),
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

            chooseFriendGroupInfo:{
              show:false
            },
            chooseFriendInfo:{
              show:false
            },
/*            chooseUserInfo:{
              show:false,
              queryFieldName:'name',//name/account
            },*/


            articleInfo:undefined,
            staticResult:undefined,

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

            commentListInfo:undefined,
          }
      },
    }

</script>
