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
  <div class="container flex-flow-column-nowrap align-content-space-between" style="height:100%">
    <!--<Layout>-->
      <div class="header">
        <selfHeader :header-info="headerInfo"></selfHeader>
      </div>
      <div class="">
        <selfSearch :search-info="searchInfo"></selfSearch>
      </div>
      <div class="flex-flow-row-nowrap marginT7 flex-grow-1" >
        <div class="sideBar" style="" >
          <selfSideBar ref="sidebar"></selfSideBar>
        </div>


        <!--flex-grow-1:article 占据所有剩余空间-->
        <div  class="flex-grow-1 marginL4">
          <selfContent :content-info="contentInfo" ref="content"></selfContent>
        </div>
      </div>
      <!--</div>-->

      <div class="footer">
        <selfFooter :footer-info="footerInfo"></selfFooter>
      </div>



  </div>
</template>

<script>
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**         component       **/
  /******************************/
  import selfHeader from '../components/subLayoutComponents/header.vue'
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import selfSearch from '../components/subLayoutComponents/search.vue'
  import selfSideBar from '../components/subLayoutComponents/sidebar.vue'
  import selfContent from '../components/subLayoutComponents/mainPageContent.vue'
  /******************************/
  /**    common function       **/
  /******************************/
  import {ifUserLogin,routeTo} from '../function/misc'
  import * as handleResult from '../function/handleResult'
/*  /!******************************!/
  /!****        网络         ****!/
  /!******************************!/
  import {sendRequestGetResult_async} from '../function/network'
  import {urlConfiguration} from '../constant/url/url'*/
  /******************************/
  /**     common constant     **/
  /******************************/
  import * as componentInfo from '../constant/globalConfiguration/componentInfo'

  export default {
      components:{selfSearch,selfSideBar,selfContent,selfHeader,selfFooter},
      computed:{
      },
    async mounted(){
        let that=this
       this.getData_async()
          .then(
          function (res) {
          // 正确结果已经在子组件中处理，所以无需任何代码
        },
          function (err) {
            handleResult.commonHandlerForErrorResult({that:that,response:err})
            // inf('err',err)
          }
        )
    },
    data () {
      return {

        // headerInfo:{
        //   itemsInHeader:[{name:"注册",href:"register"},{name:"登录",href:"login"}],
        //   userName:this.$store.state.headerInfo.userName
        // },
        headerInfo:componentInfo.headerInfo,
        footerInfo:componentInfo.footerInfo,
        searchInfo:{
          config:{
            logoSrc:'/static/logo.png',
            buttonType:'primary',
          },
        },

        // footerInfo:{
        //   year:this.$store.state.footerInfo.year
        // },
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
      }
    },
    methods:{
        //单独函数调用子组件获取数据的方法，如此，当子组件reject，便可进行处理
        async getData_async(){
          /**   子组件的网络事件由父组件控制，以便判断是否已经有session   **/
          await this.$refs['sidebar'].getSideBarArticle_async()
          // inf('getSideBarArticle_async done')
          await this.$refs['content'].getMainPageArticle_async()
        }
    }
  }
</script>
