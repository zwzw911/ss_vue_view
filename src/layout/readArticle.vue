<template>
  <div class="container flex-flow-column-nowrap align-content-space-between" style="overflow: visible;height: 100%;">
    <div class="header">
      <selfHeader :header-info="headerInfo"></selfHeader>
    </div>
    <Row class="flex-flow-row-nowrap justify-content-space-between marginTX" style="flex:1">
      <Col span="20">
        <self-read-article ref="article"></self-read-article>
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
  import selfReadArticle from '../components/subComponents/articleForRead.vue'

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
      components:{selfReadArticle,selfFooter,selfHeader},
      computed:{

      },
    async mounted(){
/*        //尚未登录，设置错误信息并显示登录页面
      if(false===misc.ifUserLogin({that:this})){
        this.$store.commit("setRedirectMsg",{msg:'redirect test'})
        misc.routeTo({that:this,path:routePath.redirectToLogin})
      }*/
      await this.$refs.article.getArticle_async()
    },
    data () {
      return {
        // articleInfo:componentInfo.articleInfo(),
        headerInfo:componentInfo.headerInfo,
        footerInfo:componentInfo.footerInfo,
        // validateResult:false,
      }
    },
    methods:{
/*      switchEditable(){
        this.editable=!this.editable
      },
      validateAllItemResult(result){
        this.validateResult=!result
      },*/
    }
  }
</script>
