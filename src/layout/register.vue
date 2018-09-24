<template>
  <div class="container" style="height: 100%">
    <Row class="" style="height: 100%">
      <div class="flex-flow-column-nowrap align-content-space-between" style="height: 100%">
        <Col span="24" style="flex:1" class="bg-linear-gradient paddingAll2">

        <Col span="7" offset="14" class="border-left-separator">
          <self-register :register-info="registerInfo" class="marginL4"></self-register>
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
  import selfRegister from '../components/subComponents/register.vue'
  import selfFooter from '../components/subLayoutComponents/footer.vue'

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
      components:{selfRegister,selfFooter},
      computed:{

      },
    data () {
      return {
/*        loginInfo:componentInfo.loginInfo,
        userInfo:componentInfo.userInfo,*/
        registerInfo:componentInfo.registerInfo(),
/*        changePasswordInfo:componentInfo.changePasswordInfo,
        autoGenFormItemInfo:componentInfo.autoGenFormItemInfo,
        articleInfo:componentInfo.articleInfo,

        editable:false,

        validateResult:false,*/
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
