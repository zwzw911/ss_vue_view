<template>
  <div class="container" style="overflow: auto">
    <!--<Layout>-->
    <!--type="flex" justify="center"-->
    <Row >
      <Col span="20">

      <self-update-article :article-info="articleInfo"  @validateAllItemResult="validateAllItemResult"></self-update-article>

      </Col>
    </Row>

    <!--<Button @click="switchEditable" :disabled="validateResult">siwtch</Button>-->
      <!--</div>-->

      <div span="24">
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
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import selfUpdateArticle from '../components/subComponents/articleForUpdate.vue'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../function/misc'
  /******************************/
  /**     common constant     **/
  /******************************/
  import * as componentInfo from '../constant/globalConfiguration/componentInfo'
  import {routePath} from '../constant/url/routePath'

  export default {
      components:{selfUpdateArticle,selfFooter,},
      computed:{

      },
    mounted(){
        //尚未登录，设置错误信息并显示登录页面
      if(false===misc.ifUserLogin({that:this})){
        this.$store.commit("setRedirectMsg",{msg:'redirect test'})
        misc.routeTo({that:this,path:routePath.redirectToLogin})
      }
    },
    data () {
      return {
/*        loginInfo:componentInfo.loginInfo,
        userInfo:componentInfo.userInfo,
        registerInfo:componentInfo.registerInfo,
        changePasswordInfo:componentInfo.changePasswordInfo,
        autoGenFormItemInfo:componentInfo.autoGenFormItemInfo,*/
        articleInfo:componentInfo.articleInfo(),
        footerInfo:componentInfo.footerInfo,
        // editable:false,
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
