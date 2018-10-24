<!--
查找（已经注册的）用户
-->

<style scoped>
</style>
<template>
  <div v-if="true===chooseUserInfo.show">
<!--    <AutoComplete v-if="'name'===chooseUserInfo.queryFieldName"
      v-model="chooseUserInfo.queryValue"

      @on-search="searchUser"
      @on-select="setId"
      placeholder=""
      style=""
      icon="md-search"
    >
      <Option :value="item.name" :key="item.id" v-for="(item,idx) in availableUsers" class="flex-flow-row-nowrap align-content-center">
        <img
          :src="item.photoDataUrl"
          width="25px" height="25px"/>
          &lt;!&ndash;:style="{padding:usedUserIconInfo.imgPadding,border:usedUserIconInfo.borderStyle }"  :class="usedUserIconInfo.borderClass"/>&ndash;&gt;
        <span class="marginL4 h4 font-monospace">{{item.name}}</span>
        &lt;!&ndash;<span>{{item.id}}</span>&ndash;&gt;
      </Option>
    </AutoComplete>-->

    <Select
      v-model="chooseUserInfo.chosenValue"
      filterable
      remote
      :remote-method="searchUser"
      :loading="loading">
      <Option v-for="(item, idx) in availableUsers" :value="item.id" :key="idx" class="flex-flow-row-nowrap align-content-center ">
<!--<div>-->
        <img
          :src="item.photoDataUrl"
          width="25px" height="25px" class="marginR4"/>
        {{item.name}}
<!--</div>-->

        <!---->
        <!--<span >{{item.name}}</span>-->
      </Option>
    </Select>

  </div>
</template>
<script>
  /******************************/
  /**          子组件         **/
  /******************************/

  /******************************/
  /**          网络            **/
  /******************************/
  import * as network from '../../function/network'
  import {urlConfiguration} from '../../constant/url/url'
  import {host} from '../../constant/envConfiguration/appSetting'
  /******************************/
  /**      错误（函数）       **/
  /******************************/
  import * as handleResult from '../../function/handleResult'
  /******************************/
  /**           enum           **/
  /******************************/
  import * as nonValueEnum from '../../constant/enum/nonValueEnum'

  /******************************/
  /**          配置            **/
  /******************************/

  /******************************/
  /**     common constant     **/
  /******************************/
  import * as inputAttribute from '../../constant/inputValue/gen/inputAttribute'
  import * as inputTempData from '../../constant/inputValue/gen/inputTempData'
  import * as rule from '../../constant/rule/rule'
  import {routePath} from '../../constant/url/routePath'

  /******************************/
  /*******     3rd     *********/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../../function/misc'
  import * as formatData from '../../function/formatData'

  export default {
      props: {'chooseUserInfo': {type: Object}}, //{show:boolean,queryFieldName:'name/account',queryValue:undefined}
      components: {},
      mounted() {
      },
      methods: {
/*        chooseItem(idx){
          inf('idx',idx)
          alert(idx)
        },*/
        async searchUser(searchValue){
          // alert(searchValue)
          let that=this
          that.loading=true
          if(undefined!==searchValue && ''!==searchValue){
            network.sendRequestGetResult_async({urlOption:urlConfiguration.user.search,queryString:`name=${searchValue}`}).then(
              function(res){
                if(res && res.rc===0){
                  that.availableUsers=res.msg
                }else{
                  that.availableUsers=[]
                  handleResult.commonHandlerForErrorResult({that:that,response:res})
                }
                that.loading=false
              },
              function(err){
                that.availableUsers=[]
                handleResult.commonHandlerForErrorResult({that:that,response:err})
                that.loading=false
              },
            )
          }else{
            that.availableUsers=[]
          }

        },
      },
      data() {
        return {
          loading:false,
          // queryUserRecords:undefined,
          // show:false,
          // chosenUser:undefined,//最终选择的用户
          availableUsers:[],//查询后得到的候选用户
          // queryValue:undefined,//查询用户的查询值，以及最终的选择值
          // options:undefined,
        }

      },
  }
</script>
