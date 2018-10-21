
<style scoped>
  .comment-border:first-child{
    border: 1px double rgb(200,200,200)
  }
  .comment-border{
    border-bottom: 1px double rgb(200,200,200);
    border-left: 1px double rgb(200,200,200);
    border-right: 1px double rgb(200,200,200);
  }
  .user-info-bg-color{
    background-color: #fafdfd;
  }
  /* 评论内容字数少时，高度；防止高度随字数多少变化 */
  .comment-min-height{
    min-height: 200px;
  }
</style>
<template>
  <div>
    <div id="existsComments">
      <template v-for="(item,idx) in commentListInfo">
        <div class="flex-flow-row-nowrap justify-content-flex-start comment-border comment-min-height" style="">
          <!-- comment author -->
          <div class="flex-flow-column-wrap justify-content-flex-start user-info-bg-color" >
            <img
              :style="{ width: '50px', height:  '50px'}"
              :src="item.authorId.photoDataUrl"
              class="marginAll3"

            />
            <p class="h5 text-align-left marginH3 color-dark-primary">{{item.authorId.name}}</p>
<!--            <p class="color-grey">
              <span class="marginR2">{{articleInfo.cDate}}</span>
              <span class="marginR2">阅读{{}}</span>
              <span>评论:{{}}</span>
            </p>-->
          </div>

          <!-- comment content -->
          <div class="flex-flow-column-nowrap justify-content-space-between paddingAll3" style="width:100%">
            <p class="text-align-left long-word-break" >{{item.content}}</p>
            <p class="text-align-right color-lightener-grey h6">{{item.cDate}}</p>
          </div>
        </div>
      </template>
    </div>


    <div id="postComments">

    </div>
  </div>

</template>
<script>
  export default {
    methods:{
    },
    computed:{

    },
    props:['commentListInfo'],
    data(){
      return {
        // comments:this.commentsInfo,
      }
    }

  }

</script>
