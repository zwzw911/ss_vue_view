
<style scoped>
</style>
<template>
  <div>
    <div id="existsComments">
      <div v-for="(item,idx) in comments">

      </div>
    </div>


    <div id="postComments">

    </div>
  </div>

</template>
<script>
  export default {
    methods:{
    },
    computed:{},
    props:['commentsInfo'],
    data(){
      return {
        comments:this.commentsInfo,
      }
    }

  }

</script>
