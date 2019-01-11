<!--只显示收藏夹，供用户选择
    直接显示所有收藏夹（因为最大2层），以便获得更好体验
 -->
<style scoped>
</style>
<template>
  <div>
    <self-spin :spin-info="spinInfo" v-if="spinInfo.show"></self-spin>
    <!--:render-content="renderContent"-->
    <!--lazy :load="loadNode"-->
    <el-tree :data="treeData" :props="defaultProps"
              node-key="id"
             @node-click="handleNodeClick"
             empty-text=""
             :expand-on-click-node="false"
             :default-expand-all="true"
             class=""
             ref="tree"
              v-if="false===spinInfo.show"
    >

    </el-tree>
  </div>

</template>
<script>
  /******************************/
  /**         component       **/
  /******************************/
  // import modalFolderName from './articleTreeModalInputFolderName'
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

    export default {
        props: {},
        components: {selfSpin},
        async mounted() {
          this.spinInfo.show=true
          await this.getAllCollection_async()

        },
        methods: {
          /**   自定义icon     **/
          renderContent(h, { node, data, store }) {},
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
                // if(undefined===singleEle['parentId']){
                  singleEle['isFolder']=true
                //如果是第二级收藏夹，则作为叶子（tree中就不会显示下拉箭头）
                if(undefined!==singleEle['parentId']){
                  singleEle['isLeaf']=true
                }else{
                  singleEle['isLeaf']=false
                }


                  // singleEle['children']=[]
                  result.push(singleEle)
                // }
              }
            }
            return result
          },
          //转换收藏夹数据
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
                      singleArticle['isFolder']=false
                      singleArticle['isLeaf']=true
                      result.push(singleArticle)
                    }
                  }

                // }
              // }
            }
            return result
          },
          //转换所有收藏夹数据（以便获得好的体验）
          convertAllCollectionData(serverData){
            if(undefined!==serverData){
              //1 首先获得topLevel
              for(let singleEle of serverData){
                if(undefined===singleEle['parentId']){
                  singleEle['isFolder']=true
                  singleEle['isLeaf']=false
                  singleEle['children']=[]
                  this.treeData.push(singleEle)
                  break
                }
              }
              //2 加入2nd level
              if(undefined!==this.treeData[0]){
                for(let singleEle of serverData){
                  if(undefined!==singleEle['parentId']){
                    singleEle['isFolder']=true
                    singleEle['isLeaf']=true
                    // singleEle['children']=[]
                    this.treeData[0]['children'].push(singleEle)
                    break
                  }
                }
              }

            }
          },
          async getAllCollection_async(){
            let that=this
            sendRequestGetResult_async({urlOption:urlConfiguration.collection.getAllCollection,data:undefined}).then(
              function (res) {
                if(res){
                  if(res.rc>0){
                    handleResult.commonHandlerForErrorResult({that:that,response:res,showType:'modal'})
                  }
                  // inf('all collection res',res)
                  that.convertAllCollectionData(res.msg)
                  // inf('all convert res',that.treeData)
                }else{
                  handleResult.commonHandlerForErrorResult({that:that,response:{rc:98765,msg:'没有响应，请稍后再试'},showType:'modal'})
                }
                that.spinInfo.show=false
              },
              function (err) {
                handleResult.commonHandlerForErrorResult({that:this,response:{rc:98765,msg:JSON.stringify(err)},showType:'modal'})
                that.spinInfo.show=false
              }
            )
          },
          async loadNode(node, resolve) {
            // inf('choose collection ')
            // inf('choose collection node.level',node.level)
            if(false===ifUserLogin({that:this})){
              this.$router.push('/login');
            }
            // inf('this.$store.state.userName',this.$store.state.headerInfo.userName)
            let convertResult

            this.spinInfo.show=true

            let result
            //因为collection只有2级，所以level=0，意味着获得所有收藏夹信息
            if (node.level === 0) {
              // console.log('level 0 loaded node', node);
              // console.log('urlConfiguration.collection.getCollection', urlConfiguration.collection.getCollection);
              result=await sendRequestGetResult_async({urlOption:urlConfiguration.collection.getTopCollection})

            }else if(node.level === 1){
              // console.log('level 1 loaded node', node);
              result=await sendRequestGetResult_async({urlOption:urlConfiguration.collection.getNonTopCollection})

            }
            else{
              // let data={values:[ValidatePart.]}
              //此处不支持显示article/topic
              /*console.log('level >0 loaded node', node.key);
              result=await sendRequestGetResult_async({urlOption:urlConfiguration.collection.getCollectionContent,data:node.key})
              convertResult=this.convertCollectionContentData(result.msg)
              this.spinInfo.show=false
              return resolve(convertResult);*/

            }
            if(result.rc>0){
              return handleResult.commonHandlerForErrorResult({that:this,response:result,showType:'modal'})
            }
            this.convertCollectionData(result.msg)
            convertResult=result.msg
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
            }
        },
    }
</script>
