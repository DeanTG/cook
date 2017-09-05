<template>
  <div id="main">
    <router-view></router-view>
    <Tabbar></Tabbar>
  </div>
</template>
<script>
import Tabbar from '../components/Tabbar.vue'
export default {
  name: 'Main',
  components: {
    Tabbar
  }
}

</script>
<style scoped>
  #main{
    padding-bottom: 56px
  }
</style>
