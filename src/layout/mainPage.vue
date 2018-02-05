<style scoped>
  .layout{
    /*border: 1px solid #d7dde4;*/
    /*background: #f5f7f9;*/
    position: relative;
    /*border-radius: 4px;*/
    overflow: hidden;
    /*height:100%;*/
  }
  .layout-logo{
    width: 100px;
    /*height: 30px;*/
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    /*top: 15px;*/
    left: 20px;
  }
  .layout-logo-center{
    height: 30px;
    top: 15px;
  }
  .layout-header{
    /*width: 100px;*/
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }



  .layout-content{
    min-height: 400px;
    /*margin: 15px;*/
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
/*  .layout-content-main{
    padding: 10px;
  }*/
/*  .layout-ceiling{
    background: #464c5b;
    padding: 10px 0;
    overflow: hidden;
  }
  .layout-ceiling-main{
    float: right;
    margin-right: 15px;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }*/
</style>
<template>
  <div class="container" >
    <!--<Layout>-->
      <div class="header">
        <selfHeader :header-info="headerInfo"></selfHeader>
      </div>
      <div class="">
        <selfSearch :search-info="searchInfo"></selfSearch>
      </div>
      <div class="flex-flow-row-nowrap marginT7 " >
        <div class="sideBar" style="" >
          <selfSideBar></selfSideBar>
        </div>
        <!--flex-grow-1:占据所有剩余空间-->
        <div  class="flex-grow-1 marginL4" >
          <selfContent :content-info="contentInfo"></selfContent>
        </div>
      </div>
      <!--</div>-->

      <div class="footer">
        <!--<selfFooter :footer-info="footerInfo"></selfFooter>-->
      </div>
    <!--</Layout>-->
    <!--<selfModalResult></selfModalResult>-->






    <!--<div class="container">

      <div class="layout-header">
        <div class="layout-logo layout-logo-center"></div>
      </div>


    </div>


    <div class="container">
      <div class="layout-content marginT_2" >
        <Row>
          <Col span="5">
            &lt;!&ndash;<Menu active-name="1-2" width="auto" :open-names="['1']">&ndash;&gt;
            <sidebar></sidebar>
          </Col>
          <Col span="19">
          <template v-if="sidebarActiveMenu!==''">
            <h1 class="marginT_7">{{sidebarActiveMenuChineseName}}</h1>
            <div class="paddingT_7 marginH_2">
              &lt;!&ndash;<self-table :headtitle="headTitle" :rows="tableData"></self-table>&ndash;&gt;
              <selfTable ></selfTable>
            </div>
          </template>

          </Col>
        </Row>
      </div>
    </div>





      <selfFooter :class="[{'fixed-footer':isFixed},'horizontal-center']" ></selfFooter>-->


  </div>
</template>

<script>
  import selfHeader from '../components/subLayoutComponents/header.vue'
  import selfSearch from '../components/subLayoutComponents/search.vue'
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import selfSideBar from '../components/subLayoutComponents/sidebar.vue'
  import selfContent from '../components/subLayoutComponents/mainPageContent.vue'
  // import sidebar from '../subLayoutComponents/sidebar.vue'
  // import selfFooter from '../subLayoutComponents/footer.vue'
  //
  // import selfModalResult from '../subLayoutComponents/modalResult.vue'
  export default {
      components:{selfHeader,selfSearch,selfSideBar,selfContent},
      computed:{

//                 isFixed(){
// //                  this.$store.commit('initAllFieldInInputAttr')
//                   return this.$store.state.htmlState.ifFooterFixed
//       //            console.log(`result is ${result}`)
//       //            return result
//                 },
//         sidebarActiveMenu(){
//                     return this.$store.state.sidebarState.sidebarActiveMenu
//       },
//         sidebarActiveMenuChineseName(){
//           return this.$store.state.sidebarState.sidebarActiveMenuChineseName
//         }
      /*        browserHeight(){
                  console.log(`height is ${this.$store.state.mainState.screenHeight}`)
                  return this.$store.state.mainState.screenHeight
              }*/
      },
    data () {
      return {
        headerInfo:{
          itemsInHeader:[{name:"注册",href:"register"},{name:"登录",href:"login"}],
          userName:this.$store.state.headerInfo.userName
        },
        searchInfo:{
          config:{
            logoSrc:'/static/logo.png',
            buttonType:'primary',
          },
        },
        footerInfo:{
          year:this.$store.state.footerInfo.year
        },
        contentInfo:[
          {
            articleInfo:
              {title:'title1',content:'content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1content1'},
            authorInfo:
              {userThumbSrc:'/static/logo.png',userName:'dasf'},
          },
          {
            articleInfo:
              {title:'title1',content:'content1'},
            authorInfo:
              {userThumbSrc:'/static/logo.png',userName:'dasf'},
          }
        ],



          /*headTitle:[
              {
            type: 'selection',
            width: 60,
            align: 'center'
          },
            {title:'年龄',key:'age'},
            /!*{
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render (row, column, index) {
                return `<i-button type="primary" size="small" @click="edit(${index})" icon="edit"></i-button> <i-button type="error" size="small" @click="remove(${index})" icon="trash-b"></i-button>`;
              }
            }*!/
          ],
          tableData:[
              {age:'1',id:1},{age:'2',id:2}],*/
//        sidebarName:[{name:"test",slotName:"slottest"},{name:"test111111",slotName:"slottest1"}]



      }
    },
    methods:{

    }
  }
</script>
