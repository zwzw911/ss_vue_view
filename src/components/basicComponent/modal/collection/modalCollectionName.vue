<!--提供收藏夹名称供 收藏夹 进行 创建/改名 操作-->
<style scoped>
</style>
<template>
  <Modal v-model="modalInfo.configuration['show']" width="360"  :closable="true" >
    <p slot="header" style="text-align:left;height:24px;">
      <Icon v-if="undefined!==modalInfo.configuration['headerIcon']" :type="modalInfo.configuration['headerIcon']" :class="modalInfo.configuration['headerIconClass']">

      </Icon>
      <span :class="modalInfo.configuration['titleClass']">{{modalInfo.configuration['title']}}</span>
    </p>
    <div style="text-align:left">
      <!--v-if="true===modalInfo.configuration['show']"-->
      <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 "  label-position="left"
            ref="collectionNameForm" :model="collectionNameFormItemInfo.inputValue" :rules="collectionNameFormItemInfo.rule"
            :label-width="collectionNameFormItemInfo.labelWidth"
            @submit.native.prevent
      >
        <self-form-item
          :form-item-info="collectionNameFormItemInfo"
          @checkIfAllItemValidatedResultPass="checkIfAllItemValidatedResultPass"
          ref="formItem"
        >
        </self-form-item>
      </Form>


    </div>
    <div slot="footer">
      <!--;-->
      <Button
        :disabled="false===collectionNameValidateResult"
        v-if="modalInfo.configuration['yesButtonShow']" :type="modalInfo.configuration['yesButtonType']" size="large"  @click="clickYesButton()">{{modalInfo.configuration['yesButtonContent']}}</Button>
      <!---->
      <Button v-if="modalInfo.configuration['noButtonShow']" :type="modalInfo.configuration['noButtonType']" size="large"  @click="clickNoButton()">{{modalInfo.configuration['noButtonContent']}}</Button>
    </div>
  </Modal>
</template>

<script>
  /******************************/
  /*******     组件     *********/
  /******************************/
  import selfFormItem from '../../formItem'
  /******************************/
  /*******     3rd     *********/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /******************************/
  /*****  common function *******/
  /******************************/
  import * as misc from '../../../../function/misc'
  /******************************/
  /*****     constant     *******/
  /******************************/
  import {collectionNameInfo} from '../../../../constant/globalConfiguration/componentInfo'
  export default {
    components:{selfFormItem},
    props:{'modalInfo':{type:Object}} ,
    created(){

    },
    computed:{
/*          modalSetting(){
        return this.$store.state.modalResultState.modalSetting
      },*/
    },
    beforeCreate(){
      // this.collectionNameFormItemInfo=collectionNameInfo().formItemInfo
    },
      methods:{
/*      initFormItemInfo(){
        this.$refs['formItem'].initFormItemInfo()
      },*/
        checkIfAllItemValidatedResultPass(result){
          this.collectionNameValidateResult=result
        },
        checkIfLogin({rc,noLoginRc}){
          // inf('checkIfLogin rc',rc)
          // inf('checkIfLogin typeof rc',typeof rc)
          // inf('checkIfLogin noLoginRc',noLoginRc)
          // inf('checkIfLogin typeof noLoginRc',typeof noLoginRc)
          if(undefined!==rc && rc===parseInt(rc) && undefined!==noLoginRc ){
            if(noLoginRc.length>0){
              this.checkLoginFlag=true
              if(-1!==noLoginRc.indexOf(rc)){
                this.modalInfo.configuration['content']+='是否需要登录？'
                this.modalInfo.configuration['yesButtonContent']='确定'
                this.loginResult=false
                // this.$emit()
              }
            }
          }
        },
        clickYesButton(){
          // inf('clickYesButton 0')
          if(undefined!==this.modalInfo.configuration['yesButtonFunction']){
            this.modalInfo.configuration['yesButtonFunction']()
          }
          //返回选择收藏夹的结果
          // if(true===this.checkLoginFlag && false===this.loginResult){
          // inf('clickYesButton')
          // inf('this.collectionNameFormItemInfo.inputValue',this.collectionNameFormItemInfo.inputValue)
          // inf('this.collectionNameFormItemInfo.inputValue[\'name\']',this.collectionNameFormItemInfo.inputValue['name'])
            this.$emit('collectionName',this.collectionNameFormItemInfo.inputValue['name'])
          // }
          // this.$refs['formItem'].initFormItemInfo()
          this.$refs['collectionNameForm'].resetFields()
          this.modalInfo.configuration.show=false
          // this.$destroy()
        },
        clickNoButton(){
          if(undefined!==this.modalInfo.configuration['noButtonFunction']){
            this.modalInfo.configuration['noButtonFunction']()
          }
          this.$refs['collectionNameForm'].resetFields()
          this.modalInfo.configuration.show=false
        },
/*          cancel(){
            console.log(`cancel in `)
          this.$store.commit('hideModalResult',{})
//            console.log(``)
        }*/
      },
      data(){
          return {
            checkLoginFlag:false,//是否对notLogin进行了检测（根据是否设置了outData以及其下的rc和noLoginRc
            loginResult:true,//当checkLoginFlag为true的时候，检查是否login了

            collectionNameFormItemInfo:collectionNameInfo().formItemInfo ,
            collectionNameValidateResult:false,//收藏夹名称的验证结果
            // collectionName:'',//输入的收藏夹名称
          }
      },
  }
</script>
