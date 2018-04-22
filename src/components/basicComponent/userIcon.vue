<!--
    用户头像
-->
<style scoped>
</style>
<template>
  <!--<div >-->
    <img
        :src="usedUserIconInfo.imgSrc"
         :width="usedUserIconInfo.imgWidth" :height="usedUserIconInfo.imgHeight"
         :style="{padding:usedUserIconInfo.imgPadding,border:usedUserIconInfo.borderStyle }"  :class="usedUserIconInfo.borderClass"/>

    <!--<Icon v-if="undefined===usedUserIconInfo.imgSrc" type="ios-person-outline" size="80"></Icon>-->
  <!--</div>-->
</template>
<script>
  export default {
    methods:{
      //
      setImgSrc(imgSrc){
        // inf('setImgSrc in')
        this.usedUserIconInfo['imgSrc']=imgSrc
      },
    },
    computed:{},
    props:['userIconInfo'],
    data(){

      let usedUserIconInfo={}
      let defaultSetting={
        borderStyle:'1px solid gray',
        borderClass:"radius1",

        imgSrc:undefined,
        imgWidth:'100px',
        imgHeight:'100px',
        imgPadding:'4px',
      }
      for(let singleKey in defaultSetting){
        if(undefined===this.userIconInfo[singleKey]){
          usedUserIconInfo[singleKey]=defaultSetting[singleKey]
        }else{
          usedUserIconInfo[singleKey]=this.userIconInfo[singleKey]
        }
      }

      return {
        usedUserIconInfo,

      }
    }
  }

</script>
