/**
 * Created by 张伟 on 2018/9/27.
 */
'use strict'

const appSetting={
  //如果true，则不使用this.$router.go()跳转，而是只使用router index中的配置载入组件。此种方式会导致F5刷新页面时无法重新载入组件，且如果URL未在server定义，会显示server的错误
  //如果是false，则尽量使用this.$router.go()
  singlePage:false,

}

export {
  appSetting,
}
