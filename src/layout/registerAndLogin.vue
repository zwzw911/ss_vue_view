<template>
  <div class="container" style="overflow: auto">
    <!--<Layout>-->
    <Row>
      <Col span="6">

      <!--<router-view />-->
      <!--<selfLogin :login-info="loginInfo"></selfLogin>-->
      <!--<selfRegister  :register-info="registerInfo"></selfRegister>-->
      <!--<selfChangePassword :change-password-info="changePasswordInfo"></selfChangePassword>-->

      <!--<self-user-icon :user-icon-info="userIconInfo"></self-user-icon>-->

      <selfUserInfo :user-info="userInfo"></selfUserInfo>
<!--      <Button @click="startCrop">裁剪</Button>
      <selfCrop :crop-info="cropInfo" @getCropImg="cropDone" :style="{display: showCropComponent? '':'none'}"></selfCrop>
      <img :src="cropImgDataURL" :style="{visibility:showCropImg?'':'hidden'}">-->
      <!--<selfUserInfo  :user-info="userInfo"></selfUserInfo>-->

      </Col>
    </Row>


      <!--</div>-->

      <div class="footer">
        <!--<selfFooter :footer-info="footerInfo"></selfFooter>-->
      </div>
    <!--</Layout>-->
    <!--<selfModalResult></selfModalResult>-->









  </div>
</template>

<script>
  import selfRegister from '../components/subComponents/register.vue'
  import selfLogin from '../components/subComponents/login.vue'
  import selfChangePassword from '../components/subComponents/changePassword.vue'
  import selfUserInfo from '../components/subComponents/userInfo.vue'


  import selfCrop from '../components/subComponents/crop.vue'
  import selfUserIcon from '../components/subComponents/userIcon.vue'


  import selfSidebar from '../components/subLayoutComponents/sidebar.vue'
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import selfHeader from '../components/subLayoutComponents/header.vue'

  import {inf} from 'awesomeprint'
  import * as misc from "../function/misc"
  //
  // import selfModalResult from '../subLayoutComponents/modalResult.vue'

  import * as componentInfo from '../constant/globalConfiguration/componentInfo'
  export default {
      components:{sidebar,selfFooter,selfHeader,selfLogin,selfRegister,selfChangePassword,selfCrop,selfUserInfo,selfUserIcon},
      computed:{

      },
    data () {
      return {
        loginInfo:componentInfo.loginInfo,
        userInfo:componentInfo.userInfo,
        registerInfo:componentInfo.registerInfo,
        changePasswordInfo:componentInfo.changePasswordInfo,
        // footerInfo:componentInfo.footerInfo,
/*        userIconInfo:{
          borderStyle:'1px solid gray',
          borderClass:"radius1",

          // imgSrc:'../../../static/ico.jpg',
          imgWidth:'80px',
          imgHeight:'80px',
          imgPadding:'4px',
        },*/
/*        userInfo:{
          initInputValue:inputValueForCreate.user,
          inputAttribute:inputAttribute.user,
          // ruleForCreate:ruleForCreate.user,
          ruleForUpdate:ruleForUpdate.user,
          inputTempData:inputTempData.user,
        },*/

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
