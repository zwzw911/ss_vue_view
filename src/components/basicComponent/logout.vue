<style scoped>
</style>
<template>
  <span @click="logout">退出</span>
</template>
<script>
    import {sendRequestGetResult_async} from '../../function/network'
    import {urlConfiguration} from '../../constant/url/url'
    import {inf} from 'awesomeprint'
    export default {
        components: {},
        props: [],
        methods: {
          async logout(){
            // inf('document.cookie',document.cookie)
            inf('this.$cookies.keys()',this.$cookies.keys() )
            inf('this.$cookies.isKey(\'connect.sid\')',this.$cookies.isKey('connect.sid') )

            // 首先删除server端session（先删除client端的session，导致发送到server的请求无session，然后server又会自动分配一个新session了）
            let serverResult=await sendRequestGetResult_async({urlOption:urlConfiguration.user.logout})
            let result=this.$cookies.remove('connect.sid')
            // }
            // this.$cookies.remove('account')
            //
            // inf('result',result)
          },
        },
        computed: {},
        data() {
            return {}
        },
    }
</script>
