<template>
  <div class="container flex-flow-column-nowrap align-content-space-between" style=";height: 100%;">
<!--    <div class="header">
      <selfHeader :header-info="headerInfo"></selfHeader>
    </div>-->
    <Row class="" style="flex:1">
      <Tabs :animated="false" class="flex-flow-column-nowrap" @on-click="clickTab" :value="currentTabName">
        <TabPane label="我的收藏"   name="myCollection" class="paddingH4 marginT6">
          <Col span="8">
          <self-collection ></self-collection>
          </Col>
        </TabPane>
        <TabPane label="我的文档"   name="myArticle" class="paddingH4 marginT6">
          <!--<Col span="8">-->
            <self-tree v-if="'myArticle'===currentTabName"></self-tree>
          <!--</Col>-->
        </TabPane>
        <TabPane label="用户信息"   name="userInfo" class="paddingH4 marginT6">
          <Col span="12" offset="4">
          <!--<self-change-password :change-password-info="changePasswordInfo"></self-change-password>-->
            <self-user-info :user-info="userInfo" ref="userCenterUserInfo"></self-user-info>
          </Col>
        </TabPane>
        <TabPane label="修改密码"   name="changePassword" class="paddingH4 marginT6">
          <Col span="12" offset="4">
            <self-change-password :change-password-info="changePasswordInfo"></self-change-password>

          </Col>
        </TabPane>
      </Tabs>
    </Row>

    <!--<Button @click="switchEditable" :disabled="validateResult">siwtch</Button>-->
      <!--</div>-->
    <div class="footer">
      <selfFooter :footer-info="footerInfo"></selfFooter>
    </div>
    <!--</Layout>-->
    <!--<selfModalResult></selfModalResult>-->
  </div>
</template>

<script>

  /******************************/
  /**         component       **/
  /******************************/
  import selfTree from '../components/basicComponent/articleTree'
  import selfCollection from '../components/basicComponent/tree/collection'
  import selfChangePassword from '../components/subComponents/changePassword'
  import selfUserInfo from '../components/subComponents/userInfo'

  // import selfSidebar from '../components/subLayoutComponents/sidebar.vue'
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import selfHeader from '../components/subLayoutComponents/header.vue'
  /******************************/
  /**          网络            **/
  /******************************/
  import {sendRequestGetResult_async} from '../function/network'
  import {urlConfiguration} from '../constant/url/url'
  import {host} from '../constant/envConfiguration/appSetting'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from "../function/misc"
  /******************************/
  /**     common constant     **/
  /******************************/
  import * as componentInfo from '../constant/globalConfiguration/componentInfo'

  export default {
    components:{selfTree,selfChangePassword,selfUserInfo,selfFooter,selfHeader,selfCollection},
    computed:{

    },
    created(){

    },
    data () {
      return {
        changePasswordInfo:componentInfo.changePasswordInfo(),
        headerInfo:componentInfo.headerInfo,
        userInfo:componentInfo.userInfo(),
        footerInfo:componentInfo.footerInfo,
        validateResult:false,

        /**********************/
        /******  tab     *****/
        /**********************/
        currentTabName:'',
      }
    },
    methods:{
      /********************/
      /**   网络操作    **/
      /********************/

      validateAllItemResult(result){
        this.validateResult=!result
      },

      /********************/
      /**    tab操作     **/
      /********************/
      async clickTab(name){
        this.currentTabName=name
        switch (name){
          case "myCollection":
            // await this.$refs['selfCollection'].
            break;
          case 'myArticle':
            break;
          case 'userInfo':
            await this.$refs['userCenterUserInfo'].getUserInfo_async()
            break;
          case 'changePassword':
            break;
          default:
        }
      },
    }
  }
</script>
