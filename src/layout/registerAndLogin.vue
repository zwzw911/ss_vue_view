<template>
  <div class="container" >
    <!--<Layout>-->
    <Row>
      <Col span="7">

      <!--<router-view />-->
      <!--<selfLogin :login-info="loginInfo"></selfLogin>-->
      <!--<selfRegister :register-info="registerInfo"></selfRegister>-->
      <!--<selfChangePassword :change-password-info="changePasswordInfo"></selfChangePassword>-->
<!--      <Button @click="startCrop">裁剪</Button>
      <selfCrop :crop-info="cropInfo" @getCropImg="cropDone" :style="{display: showCropComponent? '':'none'}"></selfCrop>
      <img :src="cropImgDataURL" :style="{visibility:showCropImg?'':'hidden'}">-->
      <selfUserInfo  :user-info="userInfo"></selfUserInfo>
      </Col>
    </Row>


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
  import selfRegister from '../components/subComponents/register.vue'
  import selfLogin from '../components/subComponents/login.vue'
  import selfChangePassword from '../components/subComponents/changePassword.vue'
  import selfCrop from '../components/subComponents/crop.vue'
  import selfUserInfo from '../components/subComponents/userInfo.vue'
  // import sidebar from '../subLayoutComponents/sidebar.vue'
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import {inputValueForCreate,inputValueForUpdate} from '../constant/inputValue/inputValue'
  import {ruleForCreate,ruleForUpdate} from '../constant/rule/rule'
  import {inputAttribute} from '../constant/inputValue/inputAttribute'
  import {inputTempData} from '../constant/inputValue/inputTempData'
  import {inf} from 'awesomeprint'
  import * as misc from "../function/misc"
  //
  // import selfModalResult from '../subLayoutComponents/modalResult.vue'
  export default {
      components:{selfLogin,selfRegister,selfChangePassword,selfCrop,selfUserInfo},
      computed:{

      },
    data () {
      return {
        userInfo:{
          initInputValue:inputValueForCreate.user,
          inputAttribute:inputAttribute.user,
          // ruleForCreate:ruleForCreate.user,
          ruleForUpdate:ruleForUpdate.user,
          inputTempData:inputTempData.user,
        },
        /*showCropComponent:false,//显示组件
        showCropImg:false,//显示裁剪结果
        cropImgDataURL:'',


        cropInfo:{
          maxFileSize:2*1024*1024, //原始图片最大size
          L1OrigImgMaxWH:{
            width:600,
            height:480
          },
          L3BorderWidth:{
            left:5,
            top:5,
          },
          //最终裁剪出来的图片size
          cropImgWH:{
            width:100,
            height:100,
          },
          //滚轮滚动时，每次增加的像素
          zoomStep:{
            horizontal:5,//左右每边
            vertical:5,//上下每边
          },
        },*/
/*        registerInfo:{
          initInputValue:inputValueForCreate.user,
          inputAttribute:inputAttribute.user,
          ruleForCreate:ruleForCreate.user,
          ruleForUpdate:ruleForUpdate.user,
          inputTempData:inputTempData.user,
        },
        loginInfo:{

            initInputValue:inputValueForCreate.user,
            inputAttribute:inputAttribute.user,
            ruleForCreate:ruleForCreate.user,
            // ruleForUpdate:ruleForUpdate.user,
            inputTempData:inputTempData.user,

        },
        changePasswordInfo:{
          initInputValue:inputValueForCreate.user,
          inputAttribute:inputAttribute.user,
          ruleForCreate:ruleForCreate.user,
          // ruleForUpdate:ruleForUpdate.user,
          inputTempData:inputTempData.user,
        },
        footerInfo:{
          year:this.$store.state.footerInfo.year
        },*/
      }
    },
    methods:{
      /*cropDone(src){
        this.showCropComponent=false
        this.cropImgDataURL=src
        this.showCropImg=true


        // inf('src',src)
      },
      startCrop(){
        this.showCropComponent=true
        this.showCropImg=false
      },*/
    }
  }
</script>
