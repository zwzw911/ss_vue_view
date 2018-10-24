<style scoped>
</style>
<template>
  <div v-if="true===chooseFriendInfo.show">
    <AutoComplete
      v-model="chooseFriend"
      :data="availableFriend"
      @on-search="getAvailableFriends"
      placeholder=""
      style=""
      icon="md-search"
    >

    </AutoComplete>

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
      props: {'chooseFriendInfo': {type: Object}},
      components: {},
      mounted() {
      },
      methods: {
/*        func_test(){
          inf('func_test in')
        },*/
        async getAvailableFriends(){
          let that=this
            network.sendRequestGetResult_async({urlOption:urlConfiguration.userFriendGroup.searchFriend,queryString:`name=${this.chooseFriend}`}).then(
              function(res){
                if(res && res.rc===0){
                  that.chooseFriendRecords=res.msg
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
          chooseFriendRecords:undefined,
          // show:false,
          availableFriend:[],
          chooseFriend:undefined,//查询朋友的值
          options:undefined,
        }

      },
  }
</script>
