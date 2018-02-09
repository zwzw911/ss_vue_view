<template>
  <div class="container" >
    <!--<Layout>-->
    <Row>
      <Col span="7">
      <selfRegister :register-info="registerInfo"></selfRegister>
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

  // import sidebar from '../subLayoutComponents/sidebar.vue'
  import selfFooter from '../components/subLayoutComponents/footer.vue'
  import {inputValueForCreate,inputValueForUpdate} from '../constant/inputValue/inputValue'
  import {ruleForCreate,ruleForUpdate} from '../constant/rule/rule'
  import {inputAttribute} from '../constant/inputValue/inputAttribute'
  import {inputTempData} from '../constant/inputValue/inputTempData'
  //
  // import selfModalResult from '../subLayoutComponents/modalResult.vue'
  export default {
      components:{selfRegister,selfFooter},
      computed:{

//                 isFixed(){
// //                  this.$store.commit('initAllFieldInInputAttr')
//                   return this.$store.state.htmlState.ifFooterFixed
//       //            console.log(`result is ${result}`)
//       //            return result
//                 },
//         sidebarActiveMenu(){
//                     return this.$store.state.sidebarState.sidebarActiveMenu
//       },
//         sidebarActiveMenuChineseName(){
//           return this.$store.state.sidebarState.sidebarActiveMenuChineseName
//         }
      /*        browserHeight(){
                  console.log(`height is ${this.$store.state.mainState.screenHeight}`)
                  return this.$store.state.mainState.screenHeight
              }*/
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

        footerInfo:{
          year:this.$store.state.footerInfo.year
        },
      }
    },
    methods:{

    }
  }
</script>
