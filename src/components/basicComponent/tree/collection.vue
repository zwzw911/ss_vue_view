<!--完整版，包括显示/移动/创建（收藏夹）/rename(收藏夹)-->
<style scoped>
</style>
<template>
  <div>
    <self-spin :spin-info="spinInfo" v-if="true===spinInfo.show"></self-spin>

    <!--<div v-if="false===spinInfo.show">-->
      <el-tree :data="treeData" :props="defaultProps" :render-content="renderContent"
               node-key="id"
               @node-click="handleNodeClick"
               lazy :load="loadNode"
               draggable :allow-drop="allowDrop"
               empty-text=""
               :expand-on-click-node="false"
               :default-expand-all="false"
               class=""
               ref="collectionTree"

      >
      </el-tree>
      <!--v-if="true===modalCreateCollectionNamePropInfo.configuration.show"-->
      <self-modal-collection-name
        :modal-info="modalCreateCollectionNamePropInfo"
        @collectionName="addCollection_async"
        ref="createCollectionName"
      ></self-modal-collection-name>
    <!--</div>-->

    <self-modal-collection-name
      :modal-info="modalUpdateCollectionNamePropInfo"
      @collectionName="updateCollection_async"
      ref="updateCollectionName"
    ></self-modal-collection-name>
  </div>

</template>
<script>
  /******************************/
  /**         component       **/
  /******************************/
  import selfModalCollectionName from '../modal/collection/modalCollectionName'
  import selfSpin from '../spin'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import {sendRequestGetResult_async,setUpdateValue} from '../../../function/network'
  // import {showErrorInModal} from '../../function/showResult'
  import * as handleResult from '../../../function/handleResult'
  import {objectDeepCopy,genNeedInput,ifUserLogin,routeTo,openNewPage} from '../../../function/misc'
  // import {ifUserLogin,routeTo} from '../../function/misc'
  /******************************/
  /**     common constant     **/
  /******************************/
  // import {urlConfiguration} from '../../constant/url/url'
  import {urlConfiguration} from '../../../constant/url/url'
  import {ValidatePart} from '../../../constant/enum/nonValueEnum'
  import {inputValueForUpdate} from '../../../constant/inputValue/gen/inputValue'
  import {articleTreeFolderInfo} from '../../../constant/globalConfiguration/componentInfo'
  import {maxNumber} from '../../../constant/globalConfiguration/globalConfiguration'
  import {modalCreateCollectionName,modalUpdateCollectionName} from '../../../constant/propsTemplate/modal'

    export default {
        props: {},
        components: {selfSpin,selfModalCollectionName},
        async mounted() {
          this.spinInfo.show=true
          // await this.getAllCollection_async()

        },
        methods: {
          /**   自定义icon     **/
          renderContent(h, { node, data, store }) {
            let createElement = arguments[0]
            let styleIconSize='font-size:16px;'
            console.log('node',node)
            console.log('data',data)
            // let isTopLevel
            //前缀icon
            let preIconClass={
              isFolder:'ivu-icon ivu-icon-ios-folder marginR2',
              isArticle:'ivu-icon ivu-icon-md-document marginR2',
              isTopic:'ivu-icon ivu-icon-md-document marginR2',
            }
            let preIconStyle={
              isFolder:'color:gold',
              isArticle:'color:grey',
              isTopic:'color:grey',
            }
            //action icon class
            let actionIconClass={
              //收藏夹的操作
              isFolder:{
                'delete':'ivu-icon ivu-icon-md-remove-circle color-error  marginL2',//只能对non top
                rename:'ivu-icon ivu-icon-md-create color-success  marginL2',//只能对non top
                add:'ivu-icon ivu-icon-md-add-circle  color-info marginL2',//只能对top
              },
              //article只能删除（添加在阅读文档 操作）
              isArticle:{
                'delete':'ivu-icon ivu-icon-md-remove-circle color-error  marginL2',
              },
              //topic只能删除（添加在阅读文档 操作）
              isTopic:{
                'delete':'ivu-icon ivu-icon-md-remove-circle color-error  marginL2',
              },
            }


            //创建action的element
            let actionElement={
              isFolder:{
                'delete':createElement('Tooltip',{attrs: {id:data.id+'deleteCollection',class: '',style:'display: none',placement:'top',content:'删除收藏夹',delay:500}},[
                  createElement('i', {attrs: {class: actionIconClass.isFolder.delete,style:styleIconSize},on:{'click':()=>{this.deleteCollection_async(node,data)}}}),
                ]),
                'rename':createElement('Tooltip',{attrs: {id:data.id+'renameCollection',class: '',style:'display: none',placement:'top',content:'收藏夹改名',delay:500}},[
                  createElement('i', {attrs: {class: actionIconClass.isFolder.rename,style:styleIconSize},on:{'click':()=>{this.showRenameCollection(node,data)}}}),
                ]),
                'add':createElement('Tooltip',{attrs: {id:data.id+'addCollection',class: '',style:'display: none',placement:'top',content:'新建收藏夹',delay:500}},[
                  createElement('i', {attrs: {class: actionIconClass.isFolder.add,style:styleIconSize},on:{'click':()=>{this.showAddCollection(node,data)}}}),
                ])
              },
              isArticle:{
                'delete':createElement('Tooltip',{attrs: {id:data.id,class: '',style:'display: none',placement:'top',content:'删除文档',delay:500}},[
                  createElement('i', {attrs: {class: actionIconClass.isArticle.delete,style:styleIconSize},on:{'click':()=>{this.deleteArticle_async(node,data)}}}),
                ]),
              },
            }


            /**     整个tree    **/
            let suffixIconCreateElement//创建action对应的元素
            let preIcon,preStyle
            if(data.isFolder){preIcon=preIconClass.isFolder;preStyle=preIconStyle.isFolder;suffixIconCreateElement=[actionElement.isFolder.add,actionElement.isFolder.delete,actionElement.isFolder.rename]} else
            if(data.isArticle){preIcon=preIconClass.isArticle;preStyle=preIconStyle.isArticle;suffixIconCreateElement=[actionElement.isArticle.delete]} else
            if(data.isTopic){preIcon=preIconClass.isTopic;preStyle=preIconStyle.isTopic}
            // preIcon=preIconClass[]
            return createElement('span', {attrs: {class: 'flex-flow-row-nowrap justify-content-space-between',style:'width:100%'},on:{'mouseover':()=>{this.showHideActionIcon({data:data,show:true})},'mouseleave':()=>{this.showHideActionIcon({data:data,show:false})}}},[
              createElement('span',[
                createElement('i', {attrs: {class: preIcon,style:preStyle}}),
                // createElement('span', "     "),
                createElement('span', arguments[1].node.label),
              ]),
              suffixIconCreateElement,
            ])
          },
          /**************************************************/
          /*******    tree node operation==>start    ********/
          /**************************************************/
          allowDrop(draggingNode, dropNode, type){
            if(undefined===dropNode ){
              return false
            }else{
              //只能拖动到不同的目录（否则tree会无法处理）
              if(dropNode.data.id!==draggingNode.parent.data.id){
                return  dropNode.data.isArticle || dropNode.data.isTopic
              }else{
                return false
              }

            }
          },
          async deleteCollection_async(node,data){
            let sendData={values:{
              [ValidatePart.RECORD_ID]:data.id
            }}
            let that=this
            sendRequestGetResult_async({urlOption:urlConfiguration.collection.deleteCollection,data:sendData}).then(
              function(res){
                if(res){
                  if(res.rc>0){
                    return handleResult.commonHandlerForErrorResult({that:that,response:res,showType:'modal'})
                  }
                  if(0===res.rc){
                    handleResult.commonHandlerForSuccessResult({that:that,response:{rc:0,msg:'收藏夹删除成功'}})
                    that.$refs.collectionTree.remove(data)
                  }
                }else{
                  handleResult.commonHandlerForErrorResult({that:that,response:{rc:98765,msg:'服务器没有响应'},showType:'modal'})
                }
              },
              function (err) {
                return handleResult.commonHandlerForErrorResult({that:that,response:err,showType:'modal'})
              }
            )
          },

          showRenameCollection(node,data){
            // inf('showAddCollection in')
            this.chooseNode=node
            this.chooseNodeData=data
            this.modalUpdateCollectionNamePropInfo.configuration.show=true
            // this.$refs['createCollectionName'].initFormItemInfo()
            // sendRequestGetResult_async({urlOption:urlConfiguration.collection.getTopCollection,data:undefined})
          },
          async updateCollection_async(collectionName){
            let sendData={values:{
               [ValidatePart.RECORD_ID]:this.chooseNodeData.id,
                [ValidatePart.RECORD_INFO]:{
                 'name':collectionName
                },
              }}
            let that=this
            sendRequestGetResult_async({urlOption:urlConfiguration.collection.updateCollectionName,data:sendData}).then(
              function (res) {
                if(res){
                  if(res.rc>0){
                    handleResult.commonHandlerForErrorResult({that:that,response:res,showType:'modal'})
                  }else{
                    handleResult.commonHandlerForSuccessResult({that:that,response:{rc:0,msg:`收藏夹更名成功`}})
                    that.chooseNodeData.name=collectionName
                    // inf('new  created collection', res)
                    // console.log('that.chooseNode', that.chooseNode)
                    // console.log('that.chooseNode.data', that.chooseNode.data)
                    // that.chooseNode.data.chileren={name:res.msg.name,id:res.msg.id}
                    // that.chooseNode.children={name}
                  }
                }
                else{
                  handleResult.commonHandlerForErrorResult({that:that,response:{rc:98765,msg:'服务器没有响应'},showType:'modal'})
                }
              },
              function(err){},

            )
          },

          showAddCollection(node,data){
            // inf('showAddCollection in')
            this.chooseNode=node
            this.chooseNodeData=data
            this.modalCreateCollectionNamePropInfo.configuration.show=true
            // this.$refs['createCollectionName'].initFormItemInfo()
            // sendRequestGetResult_async({urlOption:urlConfiguration.collection.getTopCollection,data:undefined})
          },
          async addCollection_async(collectionName){
            // inf('addCollection_async collectionName',collectionName)
            let that=this
            let data={values:{
              [ValidatePart.RECORD_INFO]:{
                'name':collectionName
              },
              }}
            sendRequestGetResult_async({urlOption:urlConfiguration.collection.createCollection,data:data}).then(
              function (res) {
                if(res){
                  if(res.rc>0){
                    handleResult.commonHandlerForErrorResult({that:that,response:res,showType:'modal'})
                  }else{
                    handleResult.commonHandlerForSuccessResult({that:that,response:{rc:0,msg:`新收藏夹${collectionName}创建成功`},showType:'modal'})
                    res.msg['isLeaf']=false
                    res.msg['isFolder']=true
                    that.$refs.collectionTree.append(res.msg,that.chooseNode)
                    // inf('new  created collection', res)
                    // console.log('that.chooseNode', that.chooseNode)
                    // console.log('that.chooseNode.data', that.chooseNode.data)
                    // that.chooseNode.data.chileren={name:res.msg.name,id:res.msg.id}
                    // that.chooseNode.children={name}
                  }
                }
                else{
                  handleResult.commonHandlerForErrorResult({that:that,response:{rc:98765,msg:'服务器没有响应'},showType:'modal'})
                }
              },
              function(err){},
            )
          },

          async deleteArticle_async(node,data){
            let parentNode=node.parent
            // console.log('parentNode name',parentNode.name)
            // console.log('parentNode.data name',parentNode.data.name)
            // console.log('parentNode.data id',parentNode.data.id)
            // return
            let sendData={values:{
                [ValidatePart.EDIT_SUB_FIELD]:{
                  articlesId:{
                    from:parentNode.data.id,
                    eleArray:[data.id]
                  }
                },
              }}
              // inf('deelte article data',sendData)
            let that=this
            sendRequestGetResult_async({urlOption:urlConfiguration.collection.addDeleteContent,data:sendData}).then(
              function(res){
                if(res){
                  if(res.rc>0){
                    return handleResult.commonHandlerForErrorResult({that:that,response:res,showType:'modal'})
                  }
                  if(0===res.rc){
                    handleResult.commonHandlerForSuccessResult({that:that,response:{rc:0,msg:'收藏夹删除成功'}})
                    that.$refs.collectionTree.remove(data)
                  }
                }else{
                  handleResult.commonHandlerForErrorResult({that:that,response:{rc:98765,msg:'服务器没有响应'},showType:'modal'})
                }
              },
              function (err) {
                return handleResult.commonHandlerForErrorResult({that:that,response:err,showType:'modal'})
              }
            )
          },
          async deleteTopic_async(node,data){},

          showHideActionIcon({data,show=false}){
            // console.log('hover in')
            let ele
            if(true===data.isFolder){
              let ifTopLevel=undefined===data['parentId']

              if(true===ifTopLevel){
                ele=document.getElementById(data.id+'addCollection')
                show ? ele.style.cssText='':ele.style.cssText='display:none'
              }else{
                ele=document.getElementById(data.id+'deleteCollection')
                show ? ele.style.cssText='':ele.style.cssText='display:none'
                ele=document.getElementById(data.id+'renameCollection')
                show ? ele.style.cssText='':ele.style.cssText='display:none'
              }
            }
            if(true===data.isArticle){
              ele=document.getElementById(data.id)
              show ? ele.style.cssText='':ele.style.cssText='display:none'
            }
          },

          /**************************************************/
          /*******    tree node operation==>end      ********/
          /**************************************************/
          handleNodeClick(data) {
            // inf('data',data)
            this.$emit('chooseCollectionId',data.id)
          },

          //转换收藏夹数据
          convertCollectionData(serverData){
            // inf('serverData',serverData)
            let result=[]
            if(serverData.length>0){
              //首先查找出top level
              for(let singleEle of serverData){
                singleEle['isFolder']=true
                singleEle['isLeaf']=false
                result.push(singleEle)
              }
            }
            return result
          },
          //转换收藏夹下的数据
          convertCollectionContentData(serverData){
            // inf('serverData',serverData)
            let result=[]

            if(undefined!==serverData){
              //首先查找出top level
              // for(let singleEle of serverData){
                // if(undefined===singleEle['parentId']){
              //转换articlesId中的数据
                  if(undefined!==serverData['articlesId'] && serverData['articlesId'].length>0){
                    // inf('articlesId exist')
                    for(let singleArticle of serverData['articlesId']){
                      // inf('singleArticle',singleArticle)
                      singleArticle['isLeaf']=true
                      singleArticle['isFolder']=false
                      singleArticle['isArticle']=true //用来判断是否为文档
                      singleArticle['isTopic']=false //用来判断是否为文档
                      result.push(singleArticle)
                    }
                  }

                // }
              // }
            }
            return result
          },


          async loadNode(node, resolve) {
            // inf('collection node.level',node.level)

            if(false===ifUserLogin({that:this})){
              this.$router.push('/login');
            }
            // inf('this.$store.state.userName',this.$store.state.headerInfo.userName)
            let convertResult
            //
            // this.spinInfo.show=true

            let result
            // let that=this
            //因为collection只有2级，所以level=0，意味着获得所有收藏夹信息
            if (node.level === 0) {
              // return resolve([{"name":"我的收藏","id":"073391f8ce69b16616918c5825873b0725c67c073e25599b18a84e02cade3985","isFolder":true,"isLeaf":false}])
              // console.log('level 0 loaded node', node);
              // console.log('urlConfiguration.collection.getCollection', urlConfiguration.collection.getCollection);
              result=await sendRequestGetResult_async({urlOption:urlConfiguration.collection.getTopCollection,data:undefined})
              convertResult=this.convertCollectionData(result.msg)
                /*.then(
                function(res){
                  convertResult=that.convertCollectionData(res.msg)
                  that.spinInfo.show=false
                  inf('convertResult',convertResult)
                  return resolve(convertResult);
                },
                function (err) {}
              )*/

            }else if(node.level === 1){
              // console.log('level 1 loaded node', node);
              result=await sendRequestGetResult_async({urlOption:urlConfiguration.collection.getNonTopCollection})
              convertResult=this.convertCollectionData(result.msg)
              // return resolve(convertResult);
            }
            else{
              // let data={values:[ValidatePart.]}
              //显示article/topic
              // console.log('level >0 loaded node', node.key);
              result=await sendRequestGetResult_async({urlOption:urlConfiguration.collection.getCollectionContent,data:node.key})
              convertResult=this.convertCollectionContentData(result.msg)
              // return resolve(convertResult);
              // this.spinInfo.show=false
              // return resolve(convertResult);

            }
/*            if(result.rc>0){
              return handleResult.commonHandlerForErrorResult({that:this,response:result,showType:'modal'})
            }*/
            // this.convertCollectionData(result.msg)
            // convertResult=result.msg
            // inf('convertResult',convertResult)
            this.spinInfo.show=false
            return resolve(convertResult);
            // this.data=convertResult
            // inf('node convertResult',node.data)

          },
        },
        data() {
            return {
              spinInfo:{
                show:false,
                msg:'读取收藏夹信息...',
              },

              /**   tree    **/
              //储存数据
              treeData: [
              ],
              //设置el-tree使用的字段
              defaultProps: {
                children: 'children',
                label: 'name',
                isLeaf:'isLeaf'
              },
              //临时存储被选择的节点数据
              chooseNode:undefined,
              chooseNodeData:undefined,
              /**   modal **/
              modalCreateCollectionNamePropInfo:objectDeepCopy(modalCreateCollectionName),
              modalUpdateCollectionNamePropInfo:objectDeepCopy(modalUpdateCollectionName),
            }
        },
    }
</script>
