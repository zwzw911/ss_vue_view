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
      <p :class="modalInfo.configuration['contentClass']">{{modalInfo.configuration['content']}}</p>

    </div>
    <div slot="footer">
      <!--;-->
      <Button v-if="modalInfo.configuration['yesButtonShow']" :type="modalInfo.configuration['yesButtonType']" size="large"  @click="clickYesButton()">{{modalInfo.configuration['yesButtonContent']}}</Button>
      <!---->
      <Button v-if="modalInfo.configuration['noButtonShow']" :type="modalInfo.configuration['noButtonType']" size="large"  @click="clickNoButton()">{{modalInfo.configuration['noButtonContent']}}</Button>
    </div>
  </Modal>
</template>

<script>
  /******************************/
  /*******     3rd     *********/
  /******************************/
  import {inf} from 'awesomeprint'
    export default {
      //{
      //    configuration:{
      //      show:boolean,
      //      headerIcon:string,headerIconClass:string,
      //      titleClass:string,title:string,
      //      contentClass:string,content:string,
      //      yesButtonShow:Boolean,yesButtonType:Boolean,yesButtonContent:string,yesButtonFunction:function
      //      noButtonShow:Boolean,noButtonContent:string,noButtonFunction:function //点击按钮后，需要执行的操作
      // },

      // }
        props:{'modalInfo':{type:Object}} ,
      created(){

      },
        computed:{
/*          modalSetting(){
            return this.$store.state.modalResultState.modalSetting
          },*/
        },
        methods:{
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
            if(undefined!==this.modalInfo.configuration['yesButtonFunction']){
              this.modalInfo.configuration['yesButtonFunction']()
            }
            //检查过login状态，结果并未login
            if(true===this.checkLoginFlag && false===this.loginResult){
              this.$emit('showLoginModal',true)
            }
            this.modalInfo.configuration.show=false
          },
          clickNoButton(){
            if(undefined!==this.modalInfo.configuration['noButtonFunction']){
              this.modalInfo.configuration['noButtonFunction']()
            }
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
            }
        },
    }
</script>
