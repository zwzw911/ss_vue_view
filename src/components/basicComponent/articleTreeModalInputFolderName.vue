<style scoped>
</style>
<template>
  <div>
    <Modal
      v-model="modalFolderNameInfo.show"
      title="输入目录名称"
      width="300">
      <!--form：利用validator，而不是利用submit-->
      <Form class="flex-flow-column-nowrap justify-content-flex-start flex-grow-1 paddingH4 "  label-position="left"
            :ref="ref.form.folderForm" :model="formItemInfo.inputValue" :rules="formItemInfo.rule"
            :label-width="formItemInfo.labelWidth"
            @submit.native.prevent
      >
        <!--<p>test</p>-->
        <selfFromItem :editable="editable" :form-item-info="formItemInfo" @checkIfAllItemValidatedResultPass="setFormItemResult" @onBlur="checkSubmitButtonStatus"></selfFromItem>
      </Form>
      <div slot="footer">
        <Button type="default" size="large" @click="cancel" >取消</Button>
        <Button type="primary" size="large"  @click="ok" :disabled="submitButtonDisable" :class="{primaryButtonDisable:submitButtonDisable}" >确定</Button>
      </div>
    </Modal>
    <!--<Button type="primary" @click="modal1 = true">Display dialog box</Button>-->
  </div>

</template>
<script>
  import selfFromItem from './formItem'
  import {objectDeepCopy,genNeedInput} from '../../function/misc'
  import {inf} from 'awesomeprint'
  export default {
    components:{selfFromItem},
    props:['modalFolderNameInfo'],//{show:,}
    data() {
      // inf('modalFolderNameInfo.formItemInfo',this.modalFolderNameInfo.formItemInfo)
      return {
        formItemInfo:this.modalFolderNameInfo.formItemInfo,
        editable:true,
        ref:{
          form:{
            folderForm:'folderForm',
          }
          },
        submitButtonDisable:true,
        // buttonDisableStyle:this.$store.state.style.button.primary.disable,
        validateResult:false,
      }
    },
    methods: {
/*      init(){
        // inf('this.formItemInfo',this.formItemInfo)
        this.formItemInfo['inputValue']['name']=null
        this.formItemInfo['inputTempData']['name']['validResult']=null
      },*/
      setFormItemResult(result){
        this.validateResult=result
        this.submitButtonDisable=!result
// inf('setFormItemResult result',result)
//         inf('this.submitButtonDisable',this.submitButtonDisable)
//         console.log('setFormItemResult setFormItemResult',result)
//         this.validateFormItemResult=result
        // this.checkSubmitButtonStatus()
      },
      checkSubmitButtonStatus(){
        // console.log('checkSubmitButtonStatus in')
        // this.submitButtonDisable=true
      },
      ok () {
        if(true===this.validateResult){
          // inf('this.formItemInfo[\'inputValue\'][\'name\']',this.formItemInfo['inputValue']['name'])
          this.$emit('returnFolderName',this.formItemInfo['inputValue']['name'])
        }
        this.modalFolderNameInfo.show=false
        this.submitButtonDisable=true
        this.$refs[this.ref.form.folderForm].resetFields()
        // this.$Message.info('Clicked ok');
      },
      cancel () {
        this.modalFolderNameInfo.show=false
        this.submitButtonDisable=true
        this.$refs[this.ref.form.folderForm].resetFields()

      }
    }
  }
</script>
