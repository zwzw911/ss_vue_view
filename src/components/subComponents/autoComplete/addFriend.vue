<style scoped>
</style>
<template>
  <div>
    <self-choose-user :choose-user-info="chooseUserInfo"></self-choose-user>
    <Button type="primary" @click="addFriend">确定</Button>
  </div>

</template>
<script>
  /******************************/
  /**          子组件         **/
  /******************************/
  // import selfFormItem from '../basicComponent/formItem'
  // import selfAutoGenFormItem from '../basicComponent/autoGenFormItem'
  import selfChooseUser from '../../basicComponent/chooseUser'

  export default {
      props: {'spinInfo': {type: Object}},
      components: {selfChooseUser},
      mounted() {
      },
      methods: {
        async addFriend(){
          alert(this.chooseUserInfo.chosenValue)
        },
      },
      data() {
        return {
          chooseUserInfo:{
            show:true,
            queryFieldName:'name',//name/account
            chosenValue:'',//即时搜索值，也是选择值
            queryId:undefined,//选中的只能是文本，但是实际需要的是id，此变量存储id
          },
        }

      },
  }
</script>
