
<style scoped>
</style>
<template>
  <div>
    <div class="flex-flow-column-nowrap ">
      <span class="h4 bold font-cursive text-align-left">发表评论</span>

      <Form :model="createCommentsInfo.inputValue"
            ref="createComment"
            :rules="createCommentsInfo.rule"
      >
        <template v-for="(v,k) in createCommentsInfo.inputValue">
          <FormItem  :prop="k" :key="k"
                     :error="createCommentsInfo.inputTempData[k]['validResult']"
          >
            <Input
              @on-focus="focusInputPlaceHolderDisappear({keyName:k});onFocus()"
              @on-blur="blurInputPlaceHolderRestore({keyName:k});validSingleInputValueAndStoreResult({fieldName:k});onBlur();xssCheck({keyName:k});"
              @on-change="validSingleInputValueAndStoreResult({fieldName:k});xssCheck({keyName:k})"
              type="textarea" :autosize="{minRows: 2,maxRows: 5}"
              v-model="createCommentsInfo.inputValue[k]" :placeholder="createCommentsInfo.inputAttribute[k]['placeHolder'][0]"
            ></Input>
          </FormItem>
        </template>
      </Form>


      <div class="flex-flow-row-nowrap justify-content-flex-end">
        <Button type="primary" @click="saveComment">发表</Button>
      </div>

    </div>



  </div>

</template>
<script>
  /******************************/
  /**         3rd              **/
  /******************************/
  import {inf} from 'awesomeprint'
  /******************************/
  /**     common constant     **/
  /******************************/
  import * as nonValueEnum from '../../constant/enum/nonValueEnum'
  import * as url from '../../constant/url/url'
  /******************************/
  /**           网络           **/
  /******************************/
  import * as network from '../../function/network'

  export default {
    components: {},
    methods:{
      focusInputPlaceHolderDisappear({keyName}) {
        // inf('focusInputPlaceHolderDisappear keyName',keyName)
        // let fieldAttribute=this.createCommentsInfo.inputAttribute[keyName]
        this.createCommentsInfo.inputAttribute[keyName][nonValueEnum.InputAttributeFieldName.PLACE_HOLDER] = ['']

      },
      blurInputPlaceHolderRestore({keyName,idx}) {
        let fieldAttribute=this.createCommentsInfo.inputAttribute[keyName]

        if (null === this.createCommentsInfo.inputValue[keyName] || '' === this.createCommentsInfo.inputValue[keyName]) {
          this.createCommentsInfo.inputAttribute[keyName][nonValueEnum.InputAttributeFieldName.PLACE_HOLDER] = this.createCommentsInfo.inputAttribute[keyName][nonValueEnum.InputAttributeFieldName.PLACE_HOLDER_BKUP]
          // this.createCommentsInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER] = this.createCommentsInfo.inputAttribute[keyName][InputAttributeFieldName.PLACE_HOLDER_BKUP]
        }
      },
    //存储 单个input 的检测结果（null：为检测，非空字符：检测通过，空字符：检测通过）
      validSingleInputValueAndStoreResult({fieldName}) {

        //普通字段
        this.$refs['createComment'].validateField(fieldName, (validResult) => {
          // inf('fieldName',fieldName)
          inf('validSingleInputValueAndStoreResult',validResult)
          // inf('validSingleInputValueAndStoreResult fieldName validate result',validResult)
          this.createCommentsInfo.inputTempData[fieldName][nonValueEnum.InputTempDataFieldName.VALID_RESULT] = validResult

        })
      },
      onFocus(){
        this.$emit('onFocus')
      },
      onBlur(){
        this.$emit('onBlur')
      },
      xssCheck({keyName,idx}){

      },
      /******************************/
      /*******      网络      *******/
      /******************************/
      async saveComment(){
        let data={
          values:{
            [nonValueEnum.ValidatePart.RECORD_INFO]:{
              'content':this.createCommentsInfo.inputValue['content'],
              'articleId':this.$route.params.articleId,
            }
          }
        }
        network.sendRequestGetResult_async({urlOption:url.urlConfiguration.articleComment.createComment,data:data}).then(
          function(res){
            inf('res',res)
          },
          function(err){

          }
        )
      },
    },
    computed:{},
    props:['createCommentsInfo'],//和formItemInfo类似，只是其中所有都只有一个字段
    data(){
      return {
        // createCommentsInfo:this.createCommentInfo,
      }
        // comments:this.commentsInfo,

    }

  }

</script>
