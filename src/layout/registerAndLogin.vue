<template>
  <div class="container" style="overflow: auto">
    <!--<Layout>-->
    <!--type="flex" justify="center"-->
    <Row >
      <Col span="16">

      <!--<router-view />-->
      <selfLogin :login-info="loginInfo"></selfLogin>
      <!--<selfRegister  :register-info="registerInfo"></selfRegister>-->
      <!--<selfChangePassword :change-password-info="changePasswordInfo"></selfChangePassword>-->
      <!--<self-user-icon :user-icon-info="userIconInfo"></self-user-icon>-->
      <!--<selfUserInfo :user-info="userInfo"></selfUserInfo>-->
      <!--<self-auto-gen-form-item :auto-gen-form-item-info="autoGenFormItemInfo" :editable="true"></self-auto-gen-form-item>-->
      <self-article :article-info="articleInfo" :editable="true" @validateAllItemResult="validateAllItemResult"></self-article>
        <!--<Icon type="md-add-circle" size="32"></Icon>-->
<!--<self-tree></self-tree>-->
      <!--<self-logout></self-logout>-->
      </Col>
    </Row>

    <!--<Button @click="switchEditable" :disabled="validateResult">siwtch</Button>-->
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


  import selfCrop from '../components/basicComponent/crop.vue'
  import selfUserIcon from '../components/basicComponent/userIcon.vue'
  import selfAutoGenFormItem from '../components/basicComponent/autoGenFormItem.vue'

  import selfArticle from '../components/subComponents/article.vue'

  import selfTree from '../components/basicComponent/articleTree'
  import selfLogout from '../components/basicComponent/logout'

  import selfSidebar from '../components/subLayoutComponents/sidebar.vue'
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import selfHeader from '../components/subLayoutComponents/header.vue'

  import {inf} from 'awesomeprint'
  import * as misc from "../function/misc"
  //
  // import selfModalResult from '../subLayoutComponents/modalResult.vue'

  import * as componentInfo from '../constant/globalConfiguration/componentInfo'
  export default {
      components:{selfSidebar,selfFooter,selfHeader,selfLogin,selfRegister,selfChangePassword,selfCrop,
        selfUserInfo,selfUserIcon,selfAutoGenFormItem,selfArticle,selfTree,selfLogout},
      computed:{

      },
    data () {
      return {
        loginInfo:componentInfo.loginInfo,
        userInfo:componentInfo.userInfo,
        registerInfo:componentInfo.registerInfo,
        changePasswordInfo:componentInfo.changePasswordInfo,
        autoGenFormItemInfo:componentInfo.autoGenFormItemInfo,
        articleInfo:componentInfo.articleInfo,

        editable:false,

        validateResult:false,
      }
    },
    methods:{
      switchEditable(){
        this.editable=!this.editable
      },
      validateAllItemResult(result){
        this.validateResult=!result
      },
    }
  }
</script>
