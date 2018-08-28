<template>
  <div class="container" style="overflow: auto">
    <!--<Layout>-->
    <!--type="flex" justify="center"-->
    <Row >
      <Col span="16">

      <self-update-article :article-info="articleInfo" :editable="true" @validateAllItemResult="validateAllItemResult"></self-update-article>

      </Col>
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
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import selfUpdateArticle from '../components/subComponents/articleForUpdate.vue'
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/

  /******************************/
  /**     common constant     **/
  /******************************/
  import * as componentInfo from '../constant/globalConfiguration/componentInfo'


  export default {
      components:{selfUpdateArticle,selfFooter,},
      computed:{

      },
    data () {
      return {
/*        loginInfo:componentInfo.loginInfo,
        userInfo:componentInfo.userInfo,
        registerInfo:componentInfo.registerInfo,
        changePasswordInfo:componentInfo.changePasswordInfo,
        autoGenFormItemInfo:componentInfo.autoGenFormItemInfo,*/
        articleInfo:componentInfo.articleInfo,
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
