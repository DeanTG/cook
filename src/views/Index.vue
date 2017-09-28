<template>
  <div id="index">
    <mt-header title="cook" fixed>
      <mt-button slot="left">上海</mt-button>
      <mt-button slot="right">关于我们</mt-button>
    </mt-header>
    <Swipe></Swipe>
    <nav>
      <router-link to="/private" class="item"></router-link>
      <router-link to="/banquet" class="item"></router-link>
    </nav>
  </div>
</template>
<script>
import Swipe from '../components/Swipe.vue'
export default {
  name: 'Index',
  mounted(){
    localStorage.removeItem('order')
  },
  components: {
    Swipe
  }
}

</script>
<style lang="scss" scoped>
.mint-header {
  background: rgba(0, 0, 0, 0.3)
}

nav {
  display: flex;
  width: 90%;
  margin: 20px auto 0;
  justify-content: space-between;
  .item {
    display: inline-block;
    width: 47%;
    height: 275px;
    background: url(../../static/images/sirendingzhi.png) no-repeat;
    background-size: contain;
    vertical-align: top;
    &:last-child {
      background: url(../../static/images/jiayouyanxi.png) no-repeat;
      background-size: contain;
    }
  }
}
</style>
