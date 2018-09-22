<style scoped>
</style>

<template>
  <div class="">
    <div class="flex-flow-row-nowrap justify-content-space-between align-items-center bg-primary color-white radius1" >
      <span class="h4 paddingV1 paddingL4">最新文档</span>
      <span class="paddingR4">更多...</span>
    </div>
    <div class="marginT2 flex-flow-column-nowrap">
      <template v-for="(item,index) in contentInfo"  >
        <div class="flex-flow-row-nowrap  marginB4">
          <div class="flex-flow-column-nowrap">
            <img :style="{ width: userThumb.maxWidth+'px', height: userThumb.maxHeight + 'px'}" :src="item.authorInfo.userThumbSrc"/>
            <!--src: item.authorInfo.userThumbSrc-->
            <p >{{item.authorInfo.userName}}</p>
          </div>
          <div class="flex-flow-column-nowrap flex-grow-1">
            <p class="font_serif paddingL4 h4 long-word-break text-align-left " >{{item.articleInfo.content}}</p>
            <div class="flex-flow-row-nowrap justify-content-flex-end marginT4">
              <p class="">详细...</p>
            </div>

          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import {uploadFileDefine} from '../../constant/globalConfiguration/globalConfiguration'

  export default {
    props:['contentInfo'], //{articleInfo:[{title,content:}]}
      methods:{
        /*menuChange(name){
//          console.log(`menuchange in ${name}`)
        },
        clickMenu(name){
//            console.log(`${typeof TABLE.billType}`)
            console.log(`sidebar cilic is ${JSON.stringify(name)}`)
          let cName=''
          for(let submenu in this.sidebarName){
                for(let menuKey in this.sidebarName[submenu].children){
                    if(name===menuKey){
                      cName=this.sidebarName[submenu]['children'][menuKey]['name']
                      break
                    }
                }
          }

          this.$store.commit('setClickedTableAndMenu',{table:name,chineseName:cName})
          this.$store.commit('setClickedTable',{table:name,chineseName:cName})
          this.$store.commit('setCurrentTabelHeader',{currentColl:name})
//          console.log(`after commit`)
//          this.$store.commit('initAllACValue')
          //为当前coll的所有字段获得ac，以便为coll的所有记录服务
//          this.$store.dispatch('getAllFieldACValueByUpdate',{})

          this.$store.dispatch('search',{searchParams:{},currentPage:1})
          //点击coll时，初始获得所有外键的AC信息
//          this.$store.dispatch('initGetAllFieldValue',{searchParams:{},currentPage:1,currentColl:name})
//          console.log(`after dispatch`)
        }*/
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
          // contentInfo:this.contentInfo,
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
