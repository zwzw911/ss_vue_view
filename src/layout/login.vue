<template>
  <div class="  container" style="height: 100%">
    <Row class="" style="height: 100%">
    <div class="flex-flow-column-nowrap align-content-space-between" style="height: 100%">
      <Col span="24" style="flex:1" class="bg-linear-gradient paddingAll2">

          <Col span="7" offset="14" class="border-left-separator">
          <selfLogin :login-info="loginInfo" class="paddingL4"></selfLogin>
          </Col>

      </Col>

      <Col span="24">
        <self-footer></self-footer>
      </Col>

    </div>
    </Row>

  </div>
</template>

<script>
  /******************************/
  /**         component       **/
  /******************************/
  // import selfRegister from '../components/subComponents/register.vue'
  import selfLogin from '../components/subComponents/login.vue'
  // import selfChangePassword from '../components/subComponents/changePassword.vue'
  // import selfUserInfo from '../components/subComponents/userInfo.vue'


  // import selfCrop from '../components/basicComponent/crop.vue'
  // import selfUserIcon from '../components/basicComponent/userIcon.vue'
  // import selfAutoGenFormItem from '../components/basicComponent/autoGenFormItem.vue'
  //
  // import selfArticleForUpdate from '../components/subComponents/articleForUpdate.vue'
  //
  // import selfTree from '../components/basicComponent/articleTree'
  // import selfLogout from '../components/basicComponent/logout'

  // import selfSidebar from '../components/subLayoutComponents/sidebar.vue'
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  // import selfHeader from '../components/subLayoutComponents/header.vue'

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
      // components:{selfSidebar,selfFooter,selfHeader,selfLogin,selfRegister,selfChangePassword,selfCrop,
      //   selfUserInfo,selfUserIcon,selfAutoGenFormItem,selfArticleForUpdate,selfTree,selfLogout},
    components:{selfLogin,selfFooter},
      computed:{

      },
    data () {
      return {
        loginInfo:componentInfo.loginInfo(),//misc.objectDeepCopy(    不要使用objectDeepInfo,否则会导致正则无法正确copy
        /*userInfo:componentInfo.userInfo,
        registerInfo:componentInfo.registerInfo,
        changePasswordInfo:componentInfo.changePasswordInfo,
        autoGenFormItemInfo:componentInfo.autoGenFormItemInfo,
        articleInfo:componentInfo.articleInfo,

        editable:false,

        validateResult:false,*/
      }
    },
    methods:{

      /*switchEditable(){
        this.editable=!this.editable
      },
      validateAllItemResult(result){
        this.validateResult=!result
      },*/
    }
  }
</script>
