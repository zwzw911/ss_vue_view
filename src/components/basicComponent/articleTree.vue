<style scoped>

</style>
<template>
  <div>
    <el-tree :data="treeData" :props="defaultProps" :load="loadNode"  lazy node-key="id" @node-click="handleNodeClick" :render-content="renderContent"
             :expand-on-click-node="false"
             draggable
             :allow-drop="allowDrop"
             @node-drop="handleDrop"
             @node-drag-start="dragStart"
             class=""
             ref="tree"></el-tree>
    <modalFolderName :modal-folder-name-info="modalCreateFolderInfo" ref="createFolder" @returnFolderName="returnCreatedFolderName"></modalFolderName>
    <modalFolderName :modal-folder-name-info="modalRenameFolderInfo" ref="renameFolder" @returnFolderName="returnNewFolderName"></modalFolderName>
    <!--<Button type="primary" @click="showModalFolder">Display dialog box</Button>-->
  </div>

</template>
<script>
  import modalFolderName from './articleTreeModalInputFolderName'

  import {inf} from 'awesomeprint'
  import {sendRequestGetResult_async,setUpdateValue,resultErrorShow} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'
  import {ValidatePart} from '../../constant/enum/nonValueEnum'
  import {inputValueForUpdate} from '../../constant/inputValue/gen/inputValue'
  import {objectDeepCopy,genNeedInput} from '../../function/misc'
  import {articleTreeFolderInfo} from '../../constant/globalConfiguration/componentInfo'
  import {maxNumber} from '../../constant/globalConfiguration/globalConfiguration'
  export default {
    components:{modalFolderName},
    data() {

      return {
        /**   modalTree   **/
        modalCreateFolderInfo:{
          show:false,
          formItemInfo:articleTreeFolderInfo.formItemInfo,
        },
        modalRenameFolderInfo:{
          show:false,
          formItemInfo:articleTreeFolderInfo.formItemInfo,
        },
        /**   tree   **/
        treeData: [
        ],
        draggingNodeParent:null,
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf:'isLeaf'
        },
        createFolderName:null,//新建folder名
        currentFolder:null,
        renameFolderName:null,//新的folder name
// id:1,
      };
    },
    methods: {
      /**   modal folder    **/
      showModalCreateFolder(data){
        // console.log('showModalCreateFolder data',data)
        if(data.level>=maxNumber.folder.folderLevel){
          this.$Modal.warning({
            title: '无法创建目录',
            content: '达到最大目录深度，无法继续创建目录'
          });
          return false
        }else{
          this.modalCreateFolderInfo.show=true
        }

        // this.$refs.modalFolder.init()
      },
      showModalRenameFolder(data){
        // console.log('showModalRenameFolder data',data)
        this.modalRenameFolderInfo.show=true
        // this.$refs.modalFolder.init()
      },
      /****************/
      /**   tree    **/
      /****************/
      saveCurrentNode(node,data) {
        this.currentFolder=node
      },
      /** 创建folder **/
      async returnCreatedFolderName(folderName){
        this.createFolderName=folderName
        let data=await this.createFolder()
        this.currentFolder.data['children']=[]
        this.currentFolder.data['isLeaf']=false
        this.$refs.tree.append(data,this.currentFolder)
      },
      async createFolder(){
        let data={values:{}}
        let inputValueForUpdate_folder=objectDeepCopy(inputValueForUpdate.folder)
        inputValueForUpdate_folder.parentFolderId=this.currentFolder.data.id
        inputValueForUpdate_folder.name=this.createFolderName
        setUpdateValue(inputValueForUpdate_folder)
        data.values[ValidatePart.RECORD_INFO]=inputValueForUpdate_folder
        let result=await sendRequestGetResult_async({urlOption:urlConfiguration.folder.createFolder,data:data})
        if(result.rc>0){
          return resultErrorShow(this,result.msg)
        }
        result.msg['childNum']=0
        result.msg['isFolder']=true
        result.msg['isLeaf']=true
        result.msg['children']=[]
        // result.msg['isLeaf']=true
        return Promise.resolve(result.msg)
      },
      /** 修改folder name **/
      async returnNewFolderName(folderName){
        // let that=this
        this.renameFolderName=folderName
        if(this.currentFolder.data.name!==this.renameFolderName){
          let result=await this.renameFolder(this.renameFolderName)
          //所有reject已经被renameFolder处理，所以renameFolder返回必然是resolve
          this.currentFolder.data.name=this.renameFolderName
        }
      },
      async renameFolder(newFolderName){
        let data={values:{}}
        data.values[ValidatePart.RECORD_ID]=this.currentFolder.data.id
        data.values[ValidatePart.RECORD_INFO]={
          ['name']:newFolderName
        }
        let  result =await sendRequestGetResult_async({urlOption:urlConfiguration.folder.updateFolder,data:data})
        if(result.rc>0){
          return resultErrorShow(this,result.msg)
        }
      },
      /** 删除folder **/
      async removeFolder(node, nodeData) {
        let data={values:{}}
        data.values[ValidatePart.RECORD_ID]=nodeData.id
        let result=await sendRequestGetResult_async({urlOption:urlConfiguration.folder.deleteFolder,data:data})
        if(result.rc>0){
          return resultErrorShow(this,result.msg)
        }
        this.$refs.tree.remove(nodeData)
        return Promise.resolve(0)

      },

      /**   拖拽    **/
      allowDrop(draggingNode, dropNode, type){
        if(undefined===dropNode ){
          return false
        }else{
          //只能拖动到不同的目录（否则tree会无法处理）
          if(dropNode.data.id!==this.draggingNodeParent.data.id){
            return  dropNode.data.isFolder
          }else{
            return false
          }

        }

      },
      //只有在dragStart才能获得被拖动的node的父节点
      dragStart(draggingNode,ev){
        // let originalParentFolderNode=this.$refs.tree.currentNode.node.parent
        this.draggingNodeParent=draggingNode.parent
        // console.log('originalParentFolderNode',originalParentFolderNode.data.name)
      },
      //dropNode;node最终放入的node
      async handleDrop(draggingNode, dropNode, dropType, ev){
        // console.log('dropNode',deopNode)
        if(dropNode===null || undefined===dropNode){
          // this.draggingNodeParent=null
          return
        }
        if(this.draggingNodeParent.data.id===dropNode.data.id){
          // this.draggingNodeParent=null
          return
        }

        if(draggingNode.data.isFolder===true){
          let data={values:{}}
          data.values[ValidatePart.RECORD_ID]=draggingNode.data.id

          let inputValueForUpdate_folder=objectDeepCopy(inputValueForUpdate.folder)
          inputValueForUpdate_folder.parentFolderId=dropNode.data.id
          setUpdateValue(inputValueForUpdate_folder)
          data.values[ValidatePart.RECORD_INFO]=inputValueForUpdate_folder

          let result=await sendRequestGetResult_async({urlOption:urlConfiguration.folder.updateFolder,data:data})
          if(result.rc>0){
            return resultErrorShow(this,result.msg)
          }
          // return Promise.resolve(0)
        }
        if(draggingNode.data.isArticle===true){
          let data={values:{}}
          data.values[ValidatePart.RECORD_ID]=draggingNode.data.id

          let inputValueForUpdate_article=objectDeepCopy(inputValueForUpdate.article)
          inputValueForUpdate_article.folderId=dropNode.data.id
          setUpdateValue(inputValueForUpdate_article)
          data.values[ValidatePart.RECORD_INFO]=inputValueForUpdate_article

          // inputValueForUpdate.article.folderId=dropNode.data.id
          // delete  inputValueForUpdate.article.categoryId
          // data.values[ValidatePart.RECORD_INFO]=inputValueForUpdate.folder
          let result=await sendRequestGetResult_async({urlOption:urlConfiguration.article.updateArticle,data:data})
          if(result.rc>0){
            return resultErrorShow(this,result.msg)
          }
          // 更新parentFolder的isLeaf属性
          if(true===dropNode.data.isFolder){
            dropNode.data['childNum']+=1
            dropNode.data['isLeaf']=dropNode.data['childNum'] === 0
          }
          if(null!==this.draggingNodeParent && true===this.draggingNodeParent.data.isFolder){
            // inf('this.draggingNodeParent.data.name',this.draggingNodeParent.data.name)
            this.draggingNodeParent.data['childNum']-=1
            this.draggingNodeParent.data['isLeaf']=this.draggingNodeParent.data['childNum'] === 0
            this.draggingNodeParent=null
          }
          // inf('dropNode.data.name',dropNode.data.name)
          // inf('dropNode.data.childNum',dropNode.data.childNum)
          // inf('dropNode.data.isLeaf',dropNode.data.isLeaf)
        }
      },
      handleNodeClick(data) {
        // data.isOpen=!data.isOpen
        // console.log('handleNodeClick data', this.$refs.tree.currentNode.node.parent.data);
        // if(data.isArticle===true){
        //   window.open("http://127.0.0.1:8080");
        // }
      },
      /**   自定义icon     **/
      renderContent(h, { node, data, store }) {
        // let _this=this
        // console.log('renderContent node name',node.data.name)
        // inf('data.id',data.name)
        let createElement = arguments[0];
        let isFolder = arguments[1].data.isFolder;
        let iconSize=16
        let styleIconSize='font-size:'+iconSize+'px;'

        let iconDisable="color:grey;"
        let parentSpanClass='flex-flow-row-nowrap justify-content-space-between ',parentStyle='width:100%'
        let actionIconClass='flex-flow-row-nowrap justify-content-space-between ' //actionIconClass在css中用来定位，判断是否需要显示/隐藏
        let folderActionAddClass='ivu-icon ivu-icon-md-add-circle marginL2 color-info',folderActionRemoveClass='ivu-icon ivu-icon-md-remove-circle marginL2 color-error',folderActionRenameClass='ivu-icon ivu-icon-md-create marginL2 color-success'

        let articleActionRemoveClass='ivu-icon ivu-icon-md-remove-circle marginL2 color-error'
        let typeIcon='',typeStyle=''
        let actionIconCreateElement

        let addFolderId=data.id+'addFolder',removeFolderId=data.id+'removeFolder',renameFolderId=data.id+'renameFolder',removeArticleId=data.id+'removeArticle'

        let addFolderElement,removeFolderElement,renameFolderElement
        if(data.level>=maxNumber.folder.folderLevel){
          addFolderElement=createElement('Tooltip',{attrs: {id:addFolderId,class: '',style:'display: none',placement:'top',content:'达到最大目录深度，无法创建目录',delay:500}},[
            createElement('i', {attrs: {class: folderActionAddClass,style:styleIconSize+iconDisable},on:{'click':()=>{}}}), //;this.append(data)
          ])
        }else{
          addFolderElement=createElement('Tooltip',{attrs: {id:addFolderId,class: '',style:'display: none',placement:'top',content:'创建子目录',delay:500}},[
            createElement('i', {attrs: {class: folderActionAddClass,style:styleIconSize},on:{'click':()=>{this.showModalCreateFolder(data);this.saveCurrentNode(node,data);}}}), //;this.append(data)
          ])
        }

        removeFolderElement=createElement('Tooltip',{attrs: {id:removeFolderId,class: '',style:'display: none',placement:'top',content:'删除目录',delay:500}},[
          createElement('i', {attrs: {class: folderActionRemoveClass,style:styleIconSize},on:{'click':()=>{this.removeFolder(node,data)}}}),
        ])
        renameFolderElement=createElement('Tooltip',{attrs: {id:renameFolderId,class: '',style:'display: none',placement:'top',content:'更改目录名',delay:500}},[
          createElement('i', {attrs: {class: folderActionRenameClass,style:styleIconSize},on:{'click':()=>{this.showModalRenameFolder(data);this.saveCurrentNode(node,data);}}}),
        ])

        let removeArticleElement=createElement('Tooltip',{attrs: {id:removeArticleId,class: '',style:'display: none',placement:'top',content:'删除文档',delay:500}},[
          createElement('i', {attrs: {class: articleActionRemoveClass, id:removeArticleId,style:styleIconSize}}),
        ])

        if (isFolder===true) {
          typeIcon='ivu-icon ivu-icon-ios-folder marginR2'
          typeStyle="color:gold"
          //通过nodeHover/nodeLeave控制是否显示removeFolderElement
          actionIconCreateElement=createElement('span', {attrs:{class:actionIconClass,style:''}},[
            addFolderElement,removeFolderElement,renameFolderElement
          ])

        }else{
          typeIcon='ivu-icon ivu-icon-md-document marginR2'
          typeStyle="color:grey"
          actionIconCreateElement=createElement('span', {attrs:{class:actionIconClass,style:''}},[
            removeArticleElement,
          ])
        }

        /**     整个tree    **/
        return createElement('span', {attrs: {class: parentSpanClass,style:parentStyle,id:data.id},on:{'mouseover':()=>{this.nodeHover(data)},'mouseleave':()=>{this.nodeLeave(data)}}},[
          createElement('span',[
            createElement('i', {attrs: {class: typeIcon,style:typeStyle}}),
            // createElement('span', "     "),
            createElement('span', arguments[1].node.label),
          ]),
          actionIconCreateElement,
        ]);
      },
      nodeHover(data){
        // console.log('hover in')
        let ele
        if(true===data.isFolder){
          ele=document.getElementById(data.id+'addFolder')
          ele.style.cssText=''
          ele=document.getElementById(data.id+'renameFolder')
          ele.style.cssText=''
          if(true===data.isLeaf){
            ele=document.getElementById(data.id+'removeFolder')
            ele.style.cssText=''
          }
        }
        if(true===data.isArticle){
          ele=document.getElementById(data.id+'removeArticle')
          ele.style.cssText=''
        }
      },
      nodeLeave(data){
        // inf('nodeLeave data',data)
        let eleLeave
        if(true===data.isFolder){
          eleLeave=document.getElementById(data.id+'addFolder')
          eleLeave.style.cssText='display:none'
          eleLeave=document.getElementById(data.id+'renameFolder')
          eleLeave.style.cssText='display:none'
          eleLeave=document.getElementById(data.id+'removeFolder')
          eleLeave.style.cssText='display:none'
        }
        if(true===data.isArticle){
          // inf('data.id+\'removeArticle\'',data.id+'removeArticle')
          eleLeave=document.getElementById(data.id+'removeArticle')
          // inf('ele',ele)
          eleLeave.style.cssText='display:none'
        }
      },


      // node_drag_leave(){
      //
      // },
      //将server端传入的数据转换成tree的格式
      convertTreeData(serverData){
        // inf('convertTreeData node',node.data)
        let result=[]
        if(undefined!==serverData['folder'] && serverData['folder'].length>0){
          for(let singleEle of serverData['folder']){
            if(undefined!==singleEle['childNum']) {
              singleEle['isLeaf'] = singleEle['childNum'] === 0
              singleEle['isFolder'] = true
              // singleEle['isOpen'] = false
            }
            result.push(singleEle)
          }
        }
        //article永远为leaf
        if(undefined!==serverData['article'] && serverData['article'].length>0){
          for(let singleEle of serverData['article']){
            singleEle['isLeaf']= true
            singleEle['isArticle'] = true
            result.push(singleEle)
          }
        }
        // inf('result',result)
        return result
      },
      async loadNode(node, resolve) {
        let convertResult
        if (node.level === 0) {
          // console.log('level 0 loaded node', node);
          let result=await sendRequestGetResult_async({urlOption:urlConfiguration.folder.readFolderContent})
          if(result.rc>0){
            return resultErrorShow(this,result.msg)
          }

          convertResult=this.convertTreeData(result.msg)
          // this.data=convertResult
          // inf('node convertResult',node.data)
          return resolve(convertResult);
        }
        else{
          // let data={values:[ValidatePart.]}
          // console.log('level >0 loaded node', node.key);
          let result=await sendRequestGetResult_async({urlOption:urlConfiguration.folder.readFolderContent,data:node.key})
          if(result.rc>0){
            return resultErrorShow(this,result.msg)
          }
          // console.log('level >0 loaded result', result);
          // console.log('loadNode(node', result.msg)
          convertResult=this.convertTreeData(result.msg)
          // node.data.children=convertResult
          // inf('node convertResult',convertResult)
          return resolve(convertResult);
        }
      }
    }
  };
</script>
