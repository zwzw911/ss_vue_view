<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
    <!--<selfFooter ></selfFooter>-->
  </div>

</template>

<script>
  import selfFooter from './components/subLayoutComponents/footer.vue'
export default {
  name: 'App',
  components:{selfFooter},
}
</script>

<style>
#app {
  font-family: 'Avenir', "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
