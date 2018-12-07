<!--显示friendGroup，以及其下的friend（可以隐藏或者显示） -->

<style scoped>
</style>
<template>
  <div class="flex-flow-column-wrap align-items-flex-start justify-content-flex-start">
    <div>
      <Checkbox><span class="marginL1">全选</span></Checkbox>
    </div>
    <self-spin :spin-info="spinInfo"></self-spin>
    <template v-if="false===spinInfo.show">
      <div v-for="(friendGroup,idx) in availableFriendGroupsAndItsMember">
        <Checkbox><span class="marginL1">{{friendGroup['friendGroupName']}}</span></Checkbox>
        <Icon type="md-arrow-down" class="cursor-pointer" @click="getAllFriendGroupsMember({idx:idx})"></Icon>
        <Icon type="md-arrow-up" class="cursor-pointer"></Icon>
        <div class="flex-flow-row-wrap justify-content-flex-start align-items-center marginL1">
          <Checkbox v-for="(friend,friendIdx) in friendGroup['friendsInGroup']" :key="friendIdx">
            <span class="marginL1">{{friend['name']}}</span>
          </Checkbox>
        </div>
      </div>
    </template>


  </div>
  <!--<div v-if="true===chooseFriendInfo.show">
    <AutoComplete
      v-model="chooseFriend"
      :data="availableFriend"
      @on-search="getAvailableFriends"
      placeholder=""
      style=""
      icon="md-search"
    >

    </AutoComplete>

  </div>-->
</template>
<script>
  /******************************/
  /**          子组件         **/
  /******************************/
  import selfSpin from '../../components/basicComponent/spin.vue'
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
  // import * as handleResult from '../../function/handleResult'

  export default {
      props: {'chooseFriendInfo': {type: Object}},
      components: {selfSpin},
      async mounted() {
        this.spinInfo.show=true
        await this.getFriendGroups()
      },
      methods: {
/*        func_test(){
          inf('func_test in')
        },*/
        /**   根据groupId，获得group下所有member  **/
        async getAllFriendGroupsMember({idx:idx}){

          //2. 检测其中字段friendsInGroup是否存在，或者是否为空数组;不存在，或者是空数组，函数直接结束
          if(undefined===this.availableFriendGroupsAndItsMember[idx] || this.availableFriendGroupsAndItsMember[idx].length===0){
            return
          }
          //3. 如果是数组，且不为空，执行ajax读取数据，并赋值；
          let that=this
          let friendGroupId=this.availableFriendGroupsAndItsMember[idx]['id']
          network.sendRequestGetResult_async({urlOption:urlConfiguration.userFriendGroup.getAllFriendGroupsMember,data:friendGroupId}).then(
            function(res){
              // inf('res',res)
              if(res && res.rc===0){
                that.availableFriendGroupsAndItsMember[idx]['friendsInGroup']=res.msg['friendsInGroup']
                // that.spinInfo.show=false
              }else{
                handleResult.commonHandlerForErrorResult({that:that,response:res})
              }

            },
            function(err){
              handleResult.commonHandlerForErrorResult({that:that,response:err})
            },
          )
        },
        async getFriendGroups(){
          let that=this

          network.sendRequestGetResult_async({urlOption:urlConfiguration.userFriendGroup.getAllFriendGroupsAndItsMember}).then(
            function(res){
              // inf('res',res)
              if(res && res.rc===0){
                that.availableFriendGroupsAndItsMember=res.msg
                that.spinInfo.show=false
              }else{
                handleResult.commonHandlerForErrorResult({that:that,response:res})
              }

            },
            function(err){
              handleResult.commonHandlerForErrorResult({that:that,response:err})
            },
          )
        },
      },
      data() {
        return {
          /** 组件信息  **/
          spinInfo:{
            msg:'读取好友信息...',
            show:true,
          },

          chooseFriendRecords:undefined,
          // show:false,
          availableFriendGroupsAndItsMember:[], //以friendGroup的形式
          chooseFriend:undefined,//查询朋友的值
          options:undefined,
        }

      },
  }
</script>
