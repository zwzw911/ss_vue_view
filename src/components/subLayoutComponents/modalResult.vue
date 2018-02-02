<style scoped>
</style>
<template>
  <Modal v-model="modalSetting['showFlag']" width="360"  :closable="true" >
    <p slot="header" style="text-align:left">
      <Icon :type="modalSetting['titleIcon']"></Icon>
      <span :class="modalSetting['titleClass']">{{modalSetting['titleContent']}}</span>
    </p>
    <div style="text-align:left">
      <p>{{modalSetting['content']}}</p>

    </div>
    <div slot="footer">
      <Button :type="modalSetting['buttonType']" size="large"  @click="cancel">{{modalSetting['buttonContent']}}</Button>
    </div>
  </Modal>
</template>

<script>
    export default {
        props: [],
        computed:{
          modalSetting(){
            return this.$store.state.modalResultState.modalSetting
          },
        },
        methods:{
          cancel(){
              console.log(`cancel in `)
            this.$store.commit('hideModalResult',{})
//            console.log(``)
          }
        },
        data(){
            return {}
        },
    }
</script>
