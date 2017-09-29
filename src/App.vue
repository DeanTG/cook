<template>
  <div id="app">
    <router-view></router-view>
    <Loading v-show="loading"></Loading>
  </div>
</template>
<script>
import Loading from './components/Loading'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: mapGetters(['loading']),
  components: {
    Loading
  }
}

</script>
<style lang="scss">
@import '../static/fonts/iconfont.css';
@import './assets/style/style.scss';
</style>
