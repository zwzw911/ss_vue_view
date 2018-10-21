<style scoped>
</style>
<template>
  <div v-if="true===show">
    <RadioGroup>
      <Radio label="apple">
        <Icon type="logo-apple"></Icon>
        <span>Apple</span>
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
        props: {'spinInfo': {type: Object}},
        components: {},
        mounted() {
        },
        methods: {
          async getAllFriendGroups(){
              sendRequestGetResult_async({urlOption:urlConfiguration.userFriendGroup.getAllFriendGroups}).then(
                function(res){},
                function(err){},
              )
          },
        },
        data() {
          return {
            chosenFriendGroup:undefined,
            show:false,

            options:undefined,
          }

        },
    }
</script>
