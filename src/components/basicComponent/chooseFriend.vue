<!--显示friendGroup，以及其下的friend（可以隐藏或者显示） -->

<style scoped>
</style>
<template>
  <div class="flex-flow-column-wrap align-items-flex-start justify-content-flex-start">
    <div>
      <!--allFriendChange();-->
      <!--v-model="allFriendSelectionValue"-->
      <Checkbox  class="checkbox-border-grey" @on-change="getAllFriendSelection($event)"><span class="marginL1">全选</span></Checkbox>
    </div>

    <!--<div>-->
      <hr style="color:silver;width:100%" class="marginT2"/>
    <!--</div>-->


    <self-spin :spin-info="spinInfo"></self-spin>
    <template v-if="false===spinInfo.show">
      <div v-for="(friendGroup,idx) in availableFriendGroupsAndItsMember" :key="idx" class="marginT2">
        <Checkbox   :indeterminate="undefined!==friendGroup['friendsInGroup'] && friendGroup['friendsInGroup'].length>0 && friendGroupStatus[idx]==='part'"
                    :value="friendGroupStatus[idx]==='all'"
                    @on-change="getFriendsGroupSelection($event,idx)"
                    class="checkbox-border-grey"
        >
          <span class="marginL1">{{friendGroup['friendGroupName']}}</span>
        </Checkbox>
        <Icon type="md-arrow-dropdown" class="cursor-pointer" @click="getAllFriendGroupsMember({idx:idx})" v-show="undefined===showFriendsInGroup[idx] || true===showFriendsInGroup[idx]"></Icon>
        <Icon type="md-arrow-dropup" class="cursor-pointer" v-show="false===showFriendsInGroup[idx]" @click="showHideFriends({idx:idx,value:true})"></Icon>
        <!--v-if="undefined!==friendGroup['friendsInGroup']"-->
        <div class="flex-flow-row-wrap justify-content-flex-start align-items-center marginL4" v-show="false===showFriendsInGroup[idx]">
          <!--{{friendGroup['friendsInGroup'][0]['name']}}-->
          <CheckboxGroup v-if="undefined!==friendGroup['friendsInGroup']" v-model="selectedFriendInFriendGroup[idx]"
                         @on-change="checkFriendGroupChange($event,idx)">
            <!--  位于checkboxGroup中，checkbox的on-change事件无效 -->
            <Checkbox  v-for="(friend,friendIdx) in availableFriendGroupsAndItsMember[idx]['friendsInGroup']"
                       :key="friendIdx"
                       :label="friend['id']"
                       class="checkbox-border-grey"
                       >
              <span class="marginL1">{{friend['name']}}</span>
              <!--<span class="marginL1">{{friendIdx}}</span>-->
            </Checkbox>
          </CheckboxGroup>

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
  // import selfModalResult from './modal/modalResult.vue'
  // import selfModalLogin from './modal/modalLogin.vue'
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
      props: {'selectedFriendsInfo':{type:Object}},//页面上选择用户的值{allFriend:true,friendGroups:[],friends:[]}

      components: {selfSpin},
      async mounted() {
        this.spinInfo.show=true
        await this.getFriendGroups_async()
      },
      methods: {
        showHideFriends({idx,value}){
          inf('this.showFriendsInGroup[idx]',this.showFriendsInGroup[idx])
          if(undefined===this.showFriendsInGroup[idx]){
            this.$set(this.showFriendsInGroup,idx,false)
          }else{
            // inf('value',value)
            this.$set(this.showFriendsInGroup,idx,value)
            // inf('new this.showFriendsInGroup[idx]',this.showFriendsInGroup[idx])
          }

        },
        //组件modalResult emit显示login组件的事件

        checkFriendGroupChange(data,idx){
          // inf('checkFriendGroupChange data',data)
          // inf('checkFriendGroupChange idx',idx)
          if(undefined!==this.availableFriendGroupsAndItsMember[idx] && undefined!==this.availableFriendGroupsAndItsMember[idx]['friendsInGroup'] && this.availableFriendGroupsAndItsMember[idx]['friendsInGroup'].length>0){
            // inf('this.availableFriendGroupsAndItsMember[idx][friendsInGroup]',this.availableFriendGroupsAndItsMember[idx]['friendsInGroup'])
            let friendLength=this.availableFriendGroupsAndItsMember[idx]['friendsInGroup'].length
            let selectedFriendInGroupLength=data.length
            /**     数据处理       **/
            delete this.selectedFriendsInfo.allFriends
            /** 没有选择任何好友，则移除friendGroup，且移除friends中好友 **/
            if(0===selectedFriendInGroupLength){
              //friendGroups存在，且有数据，则进行判断
              if(undefined!==this.selectedFriendsInfo.friendGroups && this.selectedFriendsInfo.friendGroups.length>0){
                let existFriendGroupIdx=this.selectedFriendsInfo.friendGroups.indexOf(this.availableFriendGroupsAndItsMember[idx]['id'])
                if(-1!==existFriendGroupIdx){
                  this.selectedFriendsInfo.friendGroups.splice(existFriendGroupIdx,1)
                  if(this.selectedFriendsInfo.friendGroups.length===0){
                    delete this.selectedFriendsInfo.friendGroups
                  }
                }
              }
              //移除selectedFriendsInfo.friends中，所有availableFriendGroupsAndItsMember[idx]['friendsInGroup']的数据
              if(undefined!==this.availableFriendGroupsAndItsMember[idx]['friendsInGroup'] && this.availableFriendGroupsAndItsMember[idx]['friendsInGroup'].length>0){
                for(let singleFriend of this.availableFriendGroupsAndItsMember[idx]['friendsInGroup']){
                  // inf('this.selectedFriendsInfo.friends',this.selectedFriendsInfo.friends)
                  // inf('singleFriend[\'id\']',singleFriend['id'])
                  let existFriendIdx=this.selectedFriendsInfo.friends.indexOf(singleFriend['id'])
                  // inf('existFriendIdx',existFriendIdx)
                  if(-1!==existFriendIdx){
                    this.selectedFriendsInfo.friends.splice(existFriendIdx,1)
                    if(this.selectedFriendsInfo.friends.length===0){
                      delete this.selectedFriendsInfo.friends
                      //selectedFriendsInfo.friends已经删除干净，无需继续和availableFriendGroupsAndItsMember[idx]['friendsInGroup']进行比较
                      break
                    }
                  }
                }
              }
              // this.$set(this.friendGroupStatus,idx,'none')
            }
            /**  选择部分好友，则移除friendGroup，并将选择的好友加入selectedFriendsInfo.friends  **/
            if(0<selectedFriendInGroupLength && friendLength>selectedFriendInGroupLength){
              //friendGroups存在，且有数据，则从selectedFriendsInfo.friendGroups进行删除
              if(undefined!==this.selectedFriendsInfo.friendGroups && this.selectedFriendsInfo.friendGroups.length>0){
                let existFriendGroupIdx=this.selectedFriendsInfo.friendGroups.indexOf(this.availableFriendGroupsAndItsMember[idx]['id'])
                if(-1!==existFriendGroupIdx){
                  this.selectedFriendsInfo.friendGroups.splice(existFriendGroupIdx,1)
                  if(this.selectedFriendsInfo.friendGroups.length===0){
                    delete this.selectedFriendsInfo.friendGroups
                  }
                }
              }
              //遍历availableFriendGroupsAndItsMember[idx]['friendsInGroup']中所有好友，如果在data中，说明需要加入，否则需要从selectedFriendsInfo.friends中删除
              if(undefined!==this.availableFriendGroupsAndItsMember[idx]['friendsInGroup'] && this.availableFriendGroupsAndItsMember[idx]['friendsInGroup'] .length>0){
                //friends空，则直接将data中的数据加入
                if(undefined===this.selectedFriendsInfo.friends){
                  this.$set(this.selectedFriendsInfo,'friends',data)
                }
                //否则，需要判断 是删除，还是添加 （通过）
                else{
                  for(let singleFriend of this.availableFriendGroupsAndItsMember[idx]['friendsInGroup']){
                    let existFriendIdx=this.selectedFriendsInfo.friends.indexOf(singleFriend['id'])
                    //需要删除
                    if(-1===data.indexOf(singleFriend['id'])){
                      //在selectedFriendsInfo.friends中存在，执行删除
                      if(-1!==existFriendIdx){
                        this.selectedFriendsInfo.friends.splice(existFriendIdx,1)
                        if(this.selectedFriendsInfo.friends.length===0){
                          delete this.selectedFriendsInfo.friends
                        }
                      }
                    }
                    //需要添加
                    if(-1!==data.indexOf(singleFriend['id'])){
                      //在selectedFriendsInfo.friends中不存在，执行添加
                      if(-1===existFriendIdx){
                        this.selectedFriendsInfo.friends.push(singleFriend['id'])
                      }
                    }
                  }
                }

              }

              // this.$set(this.friendGroupStatus,idx,'part')
            }
            /** 选择了friendGroup下全部好友，则添加friendGroup，并将所有其下好友从selectedFriendsInfo.friends中移除  **/
            if(friendLength===selectedFriendInGroupLength){
              //首先处理friendGroups
              if(undefined===this.selectedFriendsInfo.friendGroups){
                this.$set(this.selectedFriendsInfo,'friendGroups',[])
              }
              this.selectedFriendsInfo.friendGroups.push(this.availableFriendGroupsAndItsMember[idx]['id'])
              //然后处理friends，从selectedFriendsInfo.friends删除所有availableFriendGroupsAndItsMember[idx]['friendsInGroup']
              if(undefined!==this.selectedFriendsInfo.friends){
                for(let singleFriend of this.availableFriendGroupsAndItsMember[idx]['friendsInGroup']){
                  let existFriendIdx=this.selectedFriendsInfo.friends.indexOf(singleFriend['id'])
                  if(-1!==existFriendIdx){
                    this.selectedFriendsInfo.friends.splice(existFriendIdx,1)
                    if(this.selectedFriendsInfo.friends.length===0){
                      delete this.selectedFriendsInfo.friends
                      break
                    }
                  }
                }
              }
              // this.$set(this.friendGroupStatus,idx,'all')
            }
            /**     显示部分 设置       **/
            if(0===selectedFriendInGroupLength){
              this.$set(this.friendGroupStatus,idx,'none')
            }
            if(0<selectedFriendInGroupLength && friendLength>selectedFriendInGroupLength){
              this.$set(this.friendGroupStatus,idx,'part')
            }
            if(friendLength===selectedFriendInGroupLength){
              this.$set(this.friendGroupStatus,idx,'all')
            }
          }
        },
        /**   存储checkbox的状态（选中还是非选中）（不能使用v-model，因为v-for的时候，多个checkbox绑定一个值）    **/
        getAllFriendSelection(event){
          // inf('AllFriend Selection value',event)
          // // console.log(selection)
          // console.log(p)
          // this.allFriendSelectionValue=event
          if(true===event){
            this.selectAllFriend()
          }else{
            this.deselectAllFriend()
          }
        },
        getFriendsGroupSelection(event,friendGroupIdx){
          inf('FriendsGroup Selection value',event)
          // 获得所有好友id，以便后续执行全选或者全不选的操作

          if(true===event){
            this.selectFriendGroups({friendGroupIdx:friendGroupIdx})
            // this.$set(this.selectedFriendInFriendGroup,friendGroupIdx,allFriendsIdInGroup)
          }else{
            this.deselectFriendGroups({friendGroupIdx:friendGroupIdx})
          }
        },


        /**         实际执行函数（不选择）          **/
        deselectAllFriend(){
          delete this.selectedFriendsInfo.allFriends
          /**   显示部分 处理    **/
          for(let idx in this.availableFriendGroupsAndItsMember){
            this.$set(this.friendGroupStatus,idx,'none')
            if(undefined!==this.availableFriendGroupsAndItsMember[idx]['friendsInGroup']){
/*              let allFriend=[]
              for(let singleFriend of this.availableFriendGroupsAndItsMember[idx]['friendsInGroup']){
                allFriend.push(singleFriend['name'])
              }*/
              // inf('allFriend',allFriend)
              this.$set(this.selectedFriendInFriendGroup,idx,[])
            }
          }
          // delete this.selectedFriendsInfo.friendGroups
          // delete this.selectedFriendsInfo.friends
        },
        deselectFriendGroups({friendGroupIdx}){
          delete this.selectedFriendsInfo.allFriends
          let friendGroupId=this.availableFriendGroupsAndItsMember[friendGroupIdx]['id']

          let existIdx=this.selectedFriendsInfo.friendGroups.indexOf(friendGroupId)
          if(-1!==existIdx){
            this.selectedFriendsInfo.friendGroups.splice(existIdx,1)
          }
          /**   显示部分 处理    **/
          // for(let idx in this.availableFriendGroupsAndItsMember){
            this.$set(this.friendGroupStatus,friendGroupIdx,'none')
            if(undefined!==this.availableFriendGroupsAndItsMember[friendGroupIdx]['friendsInGroup']){
              /*              let allFriend=[]
                            for(let singleFriend of this.availableFriendGroupsAndItsMember[idx]['friendsInGroup']){
                              allFriend.push(singleFriend['name'])
                            }*/
              // inf('allFriend',allFriend)
              this.$set(this.selectedFriendInFriendGroup,friendGroupIdx,[])
            }
          // }
        },
        /**         实际执行函数（选择）          **/
        selectAllFriend(){
          // inf('rt',rt)
          // inf('para',para)
          this.selectedFriendsInfo.allFriends=true
          delete this.selectedFriendsInfo.friendGroups
          delete this.selectedFriendsInfo.friends
          /**   显示部分 处理    **/
          for(let idx in this.availableFriendGroupsAndItsMember){
            //选中所有group
            this.$set(this.friendGroupStatus,idx,'all')
            //如果group下有好友，则把好友的id加入到checkboxGroup的v-model中
            if(undefined!==this.availableFriendGroupsAndItsMember[idx]['friendsInGroup']){
              let allFriend=[]
              for(let singleFriend of this.availableFriendGroupsAndItsMember[idx]['friendsInGroup']){
                allFriend.push(singleFriend['id'])
              }
              // inf('allFriend',allFriend)
              this.$set(this.selectedFriendInFriendGroup,idx,allFriend)
            }
          }
        },
        selectFriendGroups({friendGroupIdx}){
          delete this.selectedFriendsInfo.allFriends
          let friendGroup=this.availableFriendGroupsAndItsMember[friendGroupIdx]
          let friendGroupId=friendGroup['id']
          // inf('10 this.selectedFriendsInfo',this.selectedFriendsInfo)
          // inf('11 typeof this.selectedFriendsInfo.friendGroups',typeof this.selectedFriendsInfo.friendGroups)
          //尚未选择过任何group，初始化friendGroups为数组
          if(undefined===this.selectedFriendsInfo.friendGroups){
            this.selectedFriendsInfo.friendGroups=[]
            // inf('12 typeof this.selectedFriendsInfo.friendGroups',typeof this.selectedFriendsInfo.friendGroups)
          }
          //添加选择的friendGroup
          if(-1===this.selectedFriendsInfo.friendGroups.indexOf(friendGroupId)){
            this.selectedFriendsInfo.friendGroups.push(friendGroupId)
          }

          // inf('13 typeof this.selectedFriendsInfo.friendGroups',typeof this.selectedFriendsInfo.friendGroups)
          //选中的friendGroups下的friends，需要排除在this.selectedFriendsInfo.friends外
          if(undefined!==friendGroup['friendsInGroup'] && undefined!==this.selectedFriendsInfo.friends){
            // inf('friendGroup[\'friendsInGroup\']',friendGroup['friendsInGroup'])
            for(let singleFriend of friendGroup['friendsInGroup']){
              // inf('singleFriend',singleFriend)
              // inf('this.selectedFriendsInfo.friends',this.selectedFriendsInfo.friends)
              let existIdx=this.selectedFriendsInfo.friends.indexOf(singleFriend['id'])
              // inf('existIdx',existIdx)
              if(-1!==existIdx){
                this.selectedFriendsInfo.friends.splice(existIdx,1)
              }
            }
          }
          /**   显示部分 处理    **/
          // for(let idx in this.availableFriendGroupsAndItsMember){
            this.$set(this.friendGroupStatus,friendGroupIdx,'all')
            if(undefined!==this.availableFriendGroupsAndItsMember[friendGroupIdx]['friendsInGroup']){
              let allFriend=[]
              for(let singleFriend of this.availableFriendGroupsAndItsMember[friendGroupIdx]['friendsInGroup']){
                allFriend.push(singleFriend['id'])
              }
              // inf('allFriend',allFriend)
              this.$set(this.selectedFriendInFriendGroup,friendGroupIdx,allFriend)
            }
          // }
        },

        /***************************************/
        /************ 网络操作   **************/
        /*************************************/

        /**   根据groupId，获得group下所有member  **/
        async getAllFriendGroupsMember({idx:idx}){

          //2. 检测其中字段friendsInGroup是否存在，或者是否为空数组;不存在，或者是空数组，函数直接结束
          if(undefined===this.availableFriendGroupsAndItsMember[idx] || this.availableFriendGroupsAndItsMember[idx].length===0){
            return
          }
          //3. 如果是数组，且不为空，执行ajax读取数据，并赋值；
          let that=this
          let friendGroupId=this.availableFriendGroupsAndItsMember[idx]['id']
          //没有获得过friendsInGroup，则发送请求获取
          if(undefined===this.availableFriendGroupsAndItsMember[idx]['friendsInGroup']){
            network.sendRequestGetResult_async({urlOption:urlConfiguration.userFriendGroup.getAllFriendGroupsMember,data:friendGroupId}).then(
              function(res){
                // inf('res',res)
                if(res && res.rc===0){
                  /**   https://segmentfault.com/a/1190000014826146   **/
                  that.$set(that.availableFriendGroupsAndItsMember[idx],"friendsInGroup",res.msg['friendsInGroup'])
                  //初始化空数组，用来保存选中的好友
                  that.$set(that.selectedFriendInFriendGroup,idx,[])

                  that.showHideFriends({idx:idx,value:false})
                  // that.spinInfo.show=false
                }else{
                  handleResult.commonHandlerForErrorResult({that:that,response:res})
                }

              },
              function(err){
                handleResult.commonHandlerForErrorResult({that:that,response:err})
              },
            )
          }else{
            //已有数据，直接显示
            that.showHideFriends({idx:idx,value:false})
          }

        },
        async getFriendGroups_async(){
          let that=this

          network.sendRequestGetResult_async({urlOption:urlConfiguration.userFriendGroup.getAllFriendGroupsAndItsMember}).then(
            function(res){
              // inf('res',res)
              //只有返回res，才会处理
              if(res ){
                if(res.rc===0){
                  that.availableFriendGroupsAndItsMember=res.msg
                  that.spinInfo.show=false
                }else{
                  // that.modalResultPropInfo=
                  that.$emit('getFriendGroupError',res)
/*                  that.modalResultPropInfo.configuration.show=true
                  that.modalResultPropInfo.configuration.content=res.msg
                  // that.modalResultPropInfo.configuration.yesButtonFunction=that.test
                  // that.modalResultPropInfo.configuration.noButtonFunction=that.test
                  that.$refs['modalResult'].checkIfLogin({rc:res.rc,noLoginRc:[51732]})*/
                  // that.modalResultPropInfo.outData={noLoginRc:[51732]}
                  // handleResult.commonHandlerForErrorResult({that:that,response:res,showType:'modal'})
                }
              }

            },
            function(err){
              inf('err',err)
              handleResult.commonHandlerForErrorResult({that:that,response:err})
            },
          )
        },
/*        test (){
          alert('yes')
        },*/
      },
      data() {
        return {
          /** 组件信息  **/
          spinInfo:{
            msg:'读取好友信息...',
            show:true,
          },

          /**   因为checkbox的选择值是通过on-change的返回值（参数）获得的，而操作需要设置参数，
           *    因此需要通过一个函数，先把checkbox的返回值临时存储，然后另外一个函数读取**/
          allFriendSelectionValue:false,
          friendsGroupSelectionValue:false,
          friendsSelectionValue:false,




          // chooseFriendRecords:undefined,
          // show:false,
          availableFriendGroupsAndItsMember:[], //保存获取到的friendGroup以及其下的friend名称。allFriends/friendGroups/friends

          options:undefined,
          /**   记录friendGroup的一些中间状态，以便正确的根据选择的friend，设置friendGroup的  **/
          friendGroupStatus:{},//记录friendGroup选择好友的状态。key是idx，value是string：all/part/none==》好友分组 全选/部分选择/未选择
          selectedFriendInFriendGroup:{},//key是idx，value是数组。checkboxGroup必须v-model绑定一个数据(必须是数组)，on-change才能返回所有被选择的数据

          showFriendsInGroup:{},//是否显示group下的friends。用来确定显示哪个Icon。key是idx，value是booleans。
        }
      },
  }
</script>

