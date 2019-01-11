<style scoped>
</style>
<template>
  <div v-if="true===chooseFriendGroupInfo.show">
    <!---->
    <RadioGroup  v-model="chosenFriendGroup">
      <Radio v-for="(item,idx) in chosenFriendGroupRecords" :key="idx" :label="item.id">
        <!--<Icon type="logo-apple"></Icon>-->
        <span>{{item.friendGroupName}}</span>
      </Radio>
    </RadioGroup>

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
      props: {'chooseFriendGroupInfo': {type: Object}},
      components: {},
      mounted() {
      },
      methods: {
/*        func_test(){
          inf('func_test in')
        },*/
        async getAllFriendGroupRecords(){
          let that=this
            network.sendRequestGetResult_async({urlOption:urlConfiguration.userFriendGroup.getAllFriendGroups}).then(
              function(res){
                if(res && res.rc===0){
                  that.chosenFriendGroupRecords=res.msg
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
          chosenFriendGroupRecords:undefined,
          // show:false,
          chosenFriendGroup:undefined,//最终选择的朋友分组
          options:undefined,
        }

      },
  }
</script>
