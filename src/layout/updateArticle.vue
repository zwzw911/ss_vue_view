<template>
  <div class="container flex-flow-column-nowrap align-content-space-between" style="overflow: visible;height: 100%;">
    <div class="header">
      <selfHeader :header-info="headerInfo"></selfHeader>
    </div>
    <Row class="flex-flow-row-nowrap justify-content-space-between marginTX" style="flex:1">
      <Col span="20">
        <self-update-article :article-info="articleInfo"  @validateAllItemResult="validateAllItemResult"></self-update-article>
      </Col>
    </Row>
    <div class="footer">
      <selfFooter :footer-info="footerInfo"></selfFooter>
    </div>
  </div>
</template>

<script>
  /******************************/
  /**         component       **/
  /******************************/
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import selfHeader from '../components/subLayoutComponents/header.vue'
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
      components:{selfUpdateArticle,selfFooter,selfHeader},
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
        articleInfo:componentInfo.articleInfo(),
        headerInfo:componentInfo.headerInfo,
        footerInfo:componentInfo.footerInfo,
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
