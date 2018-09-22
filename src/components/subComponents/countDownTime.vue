<style scoped>
</style>
<template>
  <div class="flex-flow-row-wrap justify-content-center align-content-center" :class="countDownTimeInfo.fontSize">
    <div v-if="'simple'===countDownTimeInfo.type">
      <!--<span>{{countDownTimeInfo.msg}}</span>-->

      <span v-if="undefined===countDownTimeInfo.simple || false===countDownTimeInfo.simple.convertedToSecond">
        <span v-if="86400<=countDownTimeInfo.seconds || (undefined!==countDownTimeInfo.clock &&'day'===countDownTimeInfo.forceUnit)">
          {{formatCountDownLeftTime.day}}
          <span >天</span>
        </span>
        <span v-if="3600<=countDownTimeInfo.seconds || (undefined!==countDownTimeInfo.clock && ('day'===countDownTimeInfo.forceUnit || 'hour'===countDownTimeInfo.forceUnit))">
          {{formatCountDownLeftTime.hour}}
          <span>时</span>
        </span>
        <span v-if="60<=countDownTimeInfo.seconds || (undefined!==countDownTimeInfo.clock && ('day'===countDownTimeInfo.forceUnit || 'hour'===countDownTimeInfo.forceUnit || 'minute'===countDownTimeInfo.forceUnit))">
          {{formatCountDownLeftTime.minute}}
          <span>分</span>
        </span>
      </span>
      <span >
        {{formatCountDownLeftTime.second}}
        <span v-if="undefined===countDownTimeInfo.simple || true===countDownTimeInfo.simple.showUnit">
          秒
        </span>
      </span>

    </div>
    <div v-if="'clock'===countDownTimeInfo.type" class="flex-flow-row-wrap justify-content-space-between" :class="countDownTimeInfo.fontSize">
      <!--<span>{{countDownTimeInfo.msg}}</span>-->
      <span class="flex-flow-row-wrap justify-content-space-between" v-if="86400<=countDownTimeInfo.seconds || (undefined!==countDownTimeInfo.clock &&'day'===countDownTimeInfo.forceUnit)">
        <span class="bg-darken-primary color-white paddingAll1 radius1" >
          {{formatCountDownLeftTime.day}}
        </span>
        <span class="paddingAll1" >
        :
        </span>
      </span>

      <span class="flex-flow-row-wrap justify-content-space-between" v-if="3600<=countDownTimeInfo.seconds || (undefined!==countDownTimeInfo.clock && ('day'===countDownTimeInfo.forceUnit || 'hour'===countDownTimeInfo.forceUnit))">
        <span class="bg-darken-primary color-white paddingAll1 radius1" >
        {{formatCountDownLeftTime.hour}}
        </span>
        <span class="paddingAll1">
        :
        </span>
      </span>

      <span class="flex-flow-row-wrap justify-content-space-between" v-if="60<=countDownTimeInfo.seconds || (undefined!==countDownTimeInfo.clock && ('day'===countDownTimeInfo.forceUnit || 'hour'===countDownTimeInfo.forceUnit || 'minute'===countDownTimeInfo.forceUnit))">
        <span class="bg-darken-primary color-white paddingAll1 radius1" >
          {{formatCountDownLeftTime.minute}}
        </span>
        <span class="paddingAll1" >
          :
        </span>
      </span>

      <!--只是为了水平对齐-->
      <span class="flex-flow-row-wrap justify-content-space-between">
        <span class="bg-darken-primary color-white paddingAll1 radius1">
          {{formatCountDownLeftTime.second}}
        </span>
      </span>

      <!--<span>:</span>-->
    </div>
  </div>
</template>
<script>

  /******************************/
  /**    common function       **/
  /******************************/
  import * as misc from '../../function/misc'

  export default {
    /*
    *     seconds:倒计时的时间
    *     type: simple/clock。显示模式。 simple：只显示秒，最多15分钟，即900秒；clock：电子钟格式，最高单位日 13:13:13:13，剩余13日13小时13分钟13秒，最大30天，即259200
    *     forceUnit:'day/hour/minute',    //最高位显示的单位，如果时间不够，是否需要强制补0的最高单位。例如，时间只有60秒，是否需要显示小时，天 。如果是simple模式，且convertedToSecond=true，则forceUnit无效
    *         clock:{
    *
    *         }
    *         simple:{
    *           showUnit: true/false //是否显示时间单位，默认显示
    *           convertedToSecond；: true/false，  //是否以秒来显示
    *         },
    *     fontSize: h1/h2.../h6
    * */
    props:{'countDownTimeInfo':{type:Object}},
    components:{},
    created(){
      // console.log(this.countDownTimeInfo.type)
      if('clock'===this.countDownTimeInfo.type){
        // console.log('clock in')
        //clock模式下，必须对秒进行转换
        this.countDown({seconds:this.countDownTimeInfo.seconds,result:this.countDownLeftTime,formatResult:this.formatCountDownLeftTime,convertedToSecond:false,timeoutFunction:this.countDownTimeInfo.timeoutFunction})
      }
      if('simple'===this.countDownTimeInfo.type){

        //convertedToSeconds默认是false
        if(undefined===this.countDownTimeInfo.simple){
          // console.log('simple undefined')
          this.countDown({seconds:this.countDownTimeInfo.seconds,result:this.countDownLeftTime,formatResult:this.formatCountDownLeftTime,convertedToSecond:false,timeoutFunction:this.countDownTimeInfo.timeoutFunction})
        }else{
          // console.log('simple defined')
          this.countDown({seconds:this.countDownTimeInfo.seconds,result:this.countDownLeftTime,formatResult:this.formatCountDownLeftTime,convertedToSecond:this.countDownTimeInfo.simple.convertedToSecond,timeoutFunction:this.countDownTimeInfo.timeoutFunction})
        }
      }

    },
    methods: {
      /** 计算倒计时的时间
       *  @param:
       *  1. seconds: 剩余的时间
       *  2. result:使用传引用的方式获得计算结果，只支持 日/小时/分钟/秒
       *  3. formatResult: 格式化的值，如果是0，转换成00
       *  4. convertedToSecond: 是否直接显示秒数而不需进行转黄
       **/
      countDown({seconds, result, formatResult,convertedToSecond,timeoutFunction}) {
        // console.log(convertedToSecond)
        let timer = setInterval(function () {
          if(false===convertedToSecond){
            //初始化计算值
            result.day = 0
            result.hour = 0
            result.minute = 0
            result.second = 0
            //初始化format值

            if (seconds > 0) {
              result.day = Math.floor(seconds / (60 * 60 * 24));
              result.hour = Math.floor(seconds / (60 * 60)) - (result.day * 24);
              result.minute = Math.floor(seconds / 60) - (result.day * 24 * 60) - (result.hour * 60);
              result.second = Math.floor(seconds) - (result.day * 24 * 60 * 60) - (result.hour * 60 * 60) - (result.minute * 60);
            }

            for (let singleKey in result) {
              if (10 > result[singleKey]) {
                formatResult[singleKey] = `0${result[singleKey]}`
              } else {
                formatResult[singleKey] = `${result[singleKey]}`
              }
            }
            // seconds--;
          }else{
            if (seconds >= 0) {
              formatResult.second=seconds
            }

          }
          // console.log(formatResult.day+"天:"+formatResult.hour+"小时："+formatResult.minute+"分钟："+formatResult.second+"秒");
          seconds--;

          // console.log(seconds)
          if (seconds <= -1) {
            clearInterval(timer);
            if('function'===typeof timeoutFunction){
              timeoutFunction()
            }

          }
        }, 1000);


      }
    },

    data(){
      return {
        // countDownTimeInfo:{msg:'',seconds:90065,forceUnit:''},
        countDownLeftTime:{
          day:0,
          hour:0,
          minute:0,
          second:0,
        },
        formatCountDownLeftTime:{
          day:'',
          hour:'',
          minute:'',
          second:'',
        },
      }
    }
  }
</script>
