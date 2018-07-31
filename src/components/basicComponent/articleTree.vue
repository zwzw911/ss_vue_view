<style scoped>
/*.icon {
  .ivu-icon;
  .ivu-icon-ios-folder;
.marginR2;
}*/
</style>
<template>
  <el-tree :data="data" :props="defaultProps" :load="loadNode"  lazy node-key="id" node-click="handleNodeClick" :render-content="renderContent"
           draggable
           :allow-drop="allowDrop"
           @node-drop="handleDrop"
           class="h1"
  ></el-tree>
</template>
<script>
  import {inf} from 'awesomeprint'
  import {sendRequestGetResult_async,setUpdateValue} from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'
  import {ValidatePart} from '../../constant/enum/nonValueEnum'
  import {inputValueForUpdate} from '../../constant/inputValue/gen/inputValue'
  import {objectDeepCopy} from '../../function/misc'

  export default {
    data() {
      return {
        data: [
        ],
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf:'isLeaf'
        }
      };
    },
    methods: {
      allowDrop(draggingNode, dropNode, type){
        return  dropNode.data.isFolder
      },
      async handleDrop(draggingNode, dropNode, dropType, ev){
        // inf('handleDrop in')
        if(draggingNode.data.isFolder===true){
          let data={values:{}}
          data.values[ValidatePart.RECORD_ID]=draggingNode.data.id

          let inputValueForUpdate_folder=objectDeepCopy(inputValueForUpdate.folder)
          inputValueForUpdate_folder.parentFolderId=dropNode.data.id
          setUpdateValue(inputValueForUpdate_folder)
          data.values[ValidatePart.RECORD_INFO]=inputValueForUpdate_folder

          let result=await sendRequestGetResult_async({urlOption:urlConfiguration.folder.updateFolder,data:data})
          if(result.rc>0){
            return
          }
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
            return
          }
        }
      },
      handleNodeClick(data) {
        // data.isOpen=!data.isOpen
        // console.log('handleNodeClick data',data);
      },
      renderContent(h, { node, data, store }) {
        let createElement = arguments[0];
        let isFolder = arguments[1].data.isFolder;

        let icon='',style=''
        if (isFolder===true) {
          icon='ivu-icon ivu-icon-ios-folder marginR2'
          style="color:gold"
          // icon='icon'
        }else{
          icon='ivu-icon ivu-icon-ios-document marginR2'
          style="color:grey"
        }
        return createElement('span', [
          createElement('i', {attrs: {class: icon,style:style}}),
          // createElement('span', "     "),
          createElement('span', arguments[1].node.label)
        ]);

      },


      //将server端传入的数据转换成tree的格式
      convertTreeData(serverData){
        // inf('defaultProps',this.$data.defaultProps)
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
        return result
      },
      async loadNode(node, resolve) {
        let convertResult
        if (node.level === 0) {
          // console.log('level 0 loaded node', node);
          let result=await sendRequestGetResult_async({urlOption:urlConfiguration.folder.readFolderContent})
          if(result.rc>0){
            return
          }
          convertResult=this.convertTreeData(result.msg)
          // inf('node convertResult',convertResult)
          return resolve(convertResult);
        }
        else{
          // let data={values:[ValidatePart.]}
          // console.log('level >0 loaded node', node.key);
          let result=await sendRequestGetResult_async({urlOption:urlConfiguration.folder.readFolderContent,data:node.key})
          if(result.rc>0){
            return
          }
          // console.log('level >0 loaded result', result);
          convertResult=this.convertTreeData(result.msg)
          // inf('node convertResult',convertResult)
          return resolve(convertResult);
        }
      }
    }
  };
</script>
