<template>
  <div class="container" >
    <!--<Layout>-->
    <Row>
      <Col span="7">
      <router-view />
      <!--<selfLogin :login-info="loginInfo"></selfLogin>-->
      <!--<selfRegister :register-info="registerInfo"></selfRegister>-->
      <!--<selfChangePassword :change-password-info="changePasswordInfo"></selfChangePassword>-->

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
  // import sidebar from '../subLayoutComponents/sidebar.vue'
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import {inputValueForCreate,inputValueForUpdate} from '../constant/inputValue/inputValue'
  import {ruleForCreate,ruleForUpdate} from '../constant/rule/rule'
  import {inputAttribute} from '../constant/inputValue/inputAttribute'
  import {inputTempData} from '../constant/inputValue/inputTempData'
  //
  // import selfModalResult from '../subLayoutComponents/modalResult.vue'
  export default {
      components:{selfLogin,selfRegister,selfChangePassword},
      computed:{

      },
    data () {
      return {
        registerInfo:{
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
        },
      }
    },
    methods:{

    }
  }
</script>
