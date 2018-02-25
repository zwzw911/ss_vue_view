<style scoped>
</style>
<template>

</template>
<script>
  import * as misc from "../../function/misc"
  import axios from "axios"
  import {InputAttributeFieldName,InputTempDataFieldName,Method,ValidatePart} from '../../constant/enum/nonValueEnum'

  export default {
    props:['userInfo'],
    async created(){
      axios.defaults.withCredentials = true //带cookie
      let result=await axios.post(this.url.login,
        {
          values: {
            [ValidatePart.METHOD]: Method.R,
            [ValidatePart.RECORD_INFO]: this.userInputValue
          }
        })
    },
    methods:{
    },
    computed(){
      /*ruleForUpdate(){
        let copyRule=misc.objectDeepCopy(this.userInfo.ruleForUpdate)
        // let email=objectDeepCopy(this.registerInfo.ruleForCreate)
        copyRule.name[1].pattern=this.userInfo.ruleForUpdate.name[1].pattern
        copyRule.account[0].message='手机号不能为空'
        copyRule.account[1].message='无效的手机号'
        copyRule.account[1].pattern=this.registerInfo.ruleForUpdate.account[1].pattern //正则无法通过JSON.stringify转换，所以需要直接赋值
        copyRule.account[1].trigger='blur'   //patter的检测在blur才触发
        copyRule.password[1].pattern=this.registerInfo.ruleForUpdate.password[1].pattern
        // //添加自定义unique的check
        // phone.name.push({{ validator: validateNameUnique, trigger: 'blur' }})

        email.name[1].pattern=this.registerInfo.ruleForUpdate.name[1].pattern
        email.account[0].message='电子邮件地址不能为空'
        //email的检测不使用正则，而使用async_validator的方式
        email.account[1]={ type: 'email', message: '无效电子邮件', trigger: 'blur' }
        email.password[1].pattern=this.registerInfo.ruleForUpdate.password[1].pattern

        return {phone:phone,email:email}
      },*/
    },
    data(){
      return {

      }
    },
  }
</script>
