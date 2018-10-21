<style scoped>
  .article-separate{
    border-bottom: 1px double rgb(200,200,200)
  }
  .article-separate:last-child{
    border-bottom: 0px double rgb(200,200,200)
  }
</style>

<template>
  <div class="">
    <!--将html转换为txt-->
    <div id="wangEditor" style="display:none"></div>
    <div class="flex-flow-row-nowrap justify-content-space-between align-items-center bg-color-primary color-white radius1" >
      <span class="h4 paddingV1 paddingL4">最新文档</span>
      <span class="paddingR4">更多...</span>
    </div>

    <self-spin :spin-info="spinInfo" class="marginT7"></self-spin>
    <p class="color-error" v-if="''!==loadDataErrMsg" style="margin:auto">{{loadDataErrMsg}}</p>
    <div class="marginT2 flex-flow-column-nowrap" v-if="false===spinInfo.show && ''===loadDataErrMsg">
      <template v-for="(item,index) in contentInfo"  >
        <div class="flex-flow-row-nowrap  marginB4 cursor-pointer article-separate paddingB3">
          <div class="flex-flow-column-nowrap">
            <img :style="{ width: userThumb.maxWidth+'px', height: userThumb.maxHeight + 'px'}" :src="item.authorId.photoDataUrl"/>
            <!--src: item.authorInfo.userThumbSrc-->
            <p >{{item.authorId.name}}</p>
          </div>
          <div class="flex-flow-column-nowrap flex-grow-1"  @click="readArticle({articleId:item['id']})">
            <p class="font_serif paddingL4 h4 long-word-break text-align-left h4 bold font-serif" >{{item.name}}</p>
            <p class="font_serif paddingL4 h4 long-word-break text-align-left h5 marginT4" style="color:grey" >{{item.htmlContent}}</p>
<!--            <div class="flex-flow-row-nowrap justify-content-flex-end marginT4">
              <p class="">详细...</p>
            </div>-->

          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  /******************************/
  /****        配置         ****/
  /******************************/
  import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'
  /******************************/
  /****  common function    ****/
  /******************************/
  import * as misc from "../../function/misc"
  import {commonHandlerForErrorResult,commonHandlerForSuccessResult} from "../../function/handleResult"
  /******************************/
  /****        网络         ****/
  /******************************/
  import {sendRequestGetResult_async} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'
  /******************************/
  /****        3rd          ****/
  /******************************/
  import E from 'wangeditor'
  import {routePath} from "../../constant/url/routePath";
  /******************************/
  /****       组件          ****/
  /******************************/
  import selfSpin from '../../components/basicComponent/spin'

  export default {
    components:{selfSpin},
    // props:['contentInfo'], //{articleInfo:[{title,content:}]}
    async mounted(){
      this.getMainPageArticle_async()
    },
      methods:{
        async getMainPageArticle_async(){
          let result=await sendRequestGetResult_async({urlOption:urlConfiguration.article.getMainPageArticle})
          // inf('result',result)
          if(result.rc>0){
            // commonHandlerForErrorResult({that:this,response:result})
            this.spinInfo.show=false
            this.loadDataErrMsg=result.msg
            // if(result.rc===50100){
            //   showErrorInCenterMessage({that:this,msg:result.msg})
            // }
          }else{
            //生成一个wangeditor来转换html为纯文本
            let editor=new E('wangEditor')
            editor.create()
            for(let idx in result.msg){
              //首先设置
              editor.txt.html(result.msg[idx]['htmlContent'])
              result.msg[idx]['htmlContent']=editor.txt.text()
            }
            this.contentInfo=result.msg
            this.spinInfo.show=false
            // return Promise.resolve()
            // commonHandlerForSuccessResult({that:this,response:{rc:0,m}})
          }
        },
        readArticle({articleId}){
          misc.openNewPage({url:`/getArticle/${articleId}`})
        },
      },

    computed:{
     /* sidebarOpenMenus(){
//          console.log(this.$store.state.mainState.sidebarOpenMenus)
        return this.$store.state.sidebarState.sidebarOpenMenus
      },
      sidebarActiveMenu(){
        return this.$store.state.sidebarState.sidebarActiveMenu
      }*/
    },
      data(){
        return {
          spinInfo:{
            msg:'读取文档...',
            show:true,
          },
          loadDataErrMsg:"",
          contentInfo:[],
          userThumb:uploadFileDefine.user_photo,
        }
          /*return {
            sidebarName: {
                configuration:{
//              key:'configuration',
//                name: 'configuration',
                  name:'配置信息',
                icon:'gear-b',
                children:
                  {
        //submenu中，将key的值绑定到name属性，当此menu被点击（on-select），name（也就是sidebarName的key）会被返回，所以最好英文
                    billType:{name: '单据类别'},
                    department:{name:'部门信息'},
                    employee:{name:  '员工信息'}
                  }
            },
            reimbursement:{
//              name: 'reimbursement',
              name:'报销信息',
              icon:'clipboard',
              children:
                {
                  bill:{name: '报销记录'},
                  'static':{name:'统计信息'}
                }


            }
          },
             /!* sidebarName:[
              {
                label: '配置信息',
                name: 'configuration',
                icon:'gear-b',
                children: [
                    //menu中，name属性作为key，会被返回，所以最好英文
                  {name:TABLE.billType.toString(),label: '单据类别'},
                  {name:TABLE.department.toString(), label: '部门信息'},
                  {name:TABLE.employee.toString(), label: '员工信息'}
                ]

              },
              {
                label:'报销信息',
                name: 'reimbursement',
                icon:'clipboard',
                children:[
                  {name:TABLE.bill.toString(),label:'报销记录'},
                  {label:'统计信息'}
                ]

              }
            ],*!/
          }*/

      }
  }
</script>
