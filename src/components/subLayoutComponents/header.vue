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
            <Menu mode="horizontal" :theme="theme" active-name="1" >
              <div class="flex-flow-row-nowrap justify-content-space-between">
                <div>
                  <MenuItem name="userName">
                    {{userName}}
                  </MenuItem>
                  <MenuItem name="logout">
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
            <!--<Col >-->
              <a href="#" class="a-text-color-white a-hover-color-dark-white" :class="[itemMargin,itemFontSize]">登录 </a>
              <a href="#" class="a-text-color-white a-hover-color-dark-white" :class="itemFontSize">注册</a>
            <!--</Col>-->

          </template>
        <!--</Row>-->


      <!--</div>-->


    <!--</div>-->

  </div>
</template>


<script>
  // headerInfo:{
  //   itemsInHeader:[{name:"注册",href:"register"},{name:"登录",href:"login"}],
  //     userName:this.$store.state.userInfo.userName
  // },
  export default {
      props:['headerInfo'],
      computed:{
        userName(){return this.headerInfo.userName},
        userLogin(){
          return this.headerInfo.userName!==''
        }
      },
    data(){
        return{
          itemMargin:'marginR_2',//header中部件之间的间隔（例如用户名/退出，登录/注册）
          itemFontSize:'h5',
          transfer:true,
          theme:'light',
        }

    },
  }

</script>
