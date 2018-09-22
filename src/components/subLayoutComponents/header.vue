<!--<style scoped>

  .layout-header{
    background: azure;
    /*padding: 10px 0;*/
    /*overflow: hidden;*/
    /*height:40px;*/
    /*border:1px solid red;*/
    display:flex;
    flex-flow:row nowrap;
/*    flex-direction:row;
    flex-wrap:nowrap;*/
    justify-content: flex-end;
    align-items: center;
  }
  .layout-header-main{
    float: left;
    margin-right: 300px;
    /*border:1px solid red;*/
    /*height: 30px;*/
  }
  .layout-header-main a{
    color: black;
  }

</style>-->
<template>
  <div class="">
  <!--<div class="layout-header">-->
    <!--<div class="container height8 flex-flow-row-nowrap align-items-center">-->

      <!--<div class=" ">-->
        <!--<Row type="flex" justify="start" >-->
          <template v-if="userLogin">
            <Menu mode="horizontal" :theme="theme" active-name="1" @on-select="routeToAfterLogin">
              <div class="flex-flow-row-nowrap justify-content-space-between">
                <div>
                  <MenuItem name="userName" >
                    {{userName}}
                  </MenuItem>
                  <MenuItem name="logout" >
                    退出
                  </MenuItem>
                </div>
                <div>
                  <MenuItem name="myArticle">
                    我的文档
                  </MenuItem>
                  <MenuItem name="myCollection">
                    我的收藏
                  </MenuItem>
                </div>
              </div>

            </Menu>

<!--            <Dropdown  placement="bottom-start" transfer="transfer" :class="itemMargin">
              <a href="javascript:void(0)" class="a-text-color-white" :class="itemFontSize">
                {{userName}}
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>a</DropdownItem>
                <DropdownItem>b</DropdownItem>

              </DropdownMenu>
            </Dropdown>-->

            <!--<a href="#" class="a-text-color-white" :class="itemFontSize">退出</a>-->
          </template>
          <template v-else >
            <Menu mode="horizontal" :theme="theme" active-name="1" @on-select="routeToBeforeLogin">
              <div class="flex-flow-row-nowrap-reverse justify-content-space-between">
                <div>
                  <MenuItem name="login" >
                    登录
                  </MenuItem>
                  <MenuItem name="register" >
                    注册
                  </MenuItem>
                </div>
              </div>
            </Menu>
              <!--<a  @click="routeToLogin" class="a-text-color-white a-hover-color-dark-white" :class="[itemMargin,itemFontSize]">登录 </a>-->
              <!--<a @click="routeToRegister" class="a-text-color-white a-hover-color-dark-white" :class="itemFontSize">注册</a>-->
            <!--</Col>-->

          </template>
        <!--</Row>-->


      <!--</div>-->


    <!--</div>-->

  </div>
</template>


<script>
  /******************************/
  /**    common function       **/
  /******************************/
  // import {sendRequestGetResult_async,setUpdateValue} from '../../function/network'
  // import {showErrorInModal} from '../../function/showErrorResult'
  import {ifUserLogin,routeTo} from '../../function/misc'
  import {sendRequestGetResult_async} from '../../function/network'

  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'

  /******************************/
  /**    common constant       **/
  /******************************/
  import {urlConfiguration} from '../../constant/url/url'
  import {routePath} from '../../constant/url/routePath'

  export default {
      props:['headerInfo'],
      computed:{
        // userName(){return this.headerInfo.userName},
/*        userLogin(){
          // return ifUserLogin({that:this})
          return this.$cookies.isKey('loginDone')
        }*/
      },
    methods:{

      routeToBeforeLogin(menuName){
          switch (menuName){
            case 'login':
              routeTo({that:this,path:'/login'})
                  break;
            case 'register':
              routeTo({that:this,path:'/register'})
                  break;

          }
      },
      async routeToAfterLogin(menuName){
          switch (menuName){
            case 'userName':
              routeTo({that:this,path:'/userCenter'})
              break;
            case 'logout':
              let serverResult=await sendRequestGetResult_async({urlOption:urlConfiguration.user.logout})
              let result=this.$cookies.remove('connect.sid')
              this.$cookies.remove('loginDone')
              /**   logout，直接转到主页   **/
              //如果不是主页，执行跳转
              routeTo({that:this,path:routePath.main})
              //如果已经是主页，不会执行跳转
              this.userLogin=false
// this.userLogin()
              // this.userLogin()
              break;
          }

        // routeTo({that:this,path:'/userCenter'})
      },
    },
    data(){
        return{
          itemMargin:'marginR_2',//header中部件之间的间隔（例如用户名/退出，登录/注册）
          itemFontSize:'h5',
          transfer:true,
          theme:'light',

          //从cookie中读取，而不是globalState
          userName:this.$cookies.get('account'),
          userLogin:this.$cookies.isKey('loginDone'),
        }
    },
  }

</script>
