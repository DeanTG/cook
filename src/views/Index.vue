<template>
  <div id="index">
    <mt-header title="cook" fixed>
      <mt-button slot="left">上海</mt-button>
      <mt-button slot="right">关于我们</mt-button>
    </mt-header>
    <Swipe></Swipe>
    <nav>
      <router-link to="/private" class="item">厨师</router-link>
      <router-link to="/banquet" class="item">饭店</router-link>
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
  margin: 40px auto 0;
  justify-content: space-between;
  .item {
    display: inline-block;
    width: 47%;
    height: 180px;
    padding-top: 130px;
    border-radius: 10px;
    background: rgba(255,255,255,0.1) url('https://gw.alicdn.com/tps/TB1FDOHLVXXXXcZXFXXXXXXXXXX-183-129.png?imgtag=avatar') center 20px no-repeat;
    background-size: contain;
    vertical-align: top;
    color: $red;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    &:last-child {
      background: rgba(255,255,255,0.1) url('https://gw.alicdn.com/tps/TB1PlmNLVXXXXXEXFXXXXXXXXXX-183-129.png?imgtag=avatar') center 20px no-repeat;
      background-size: contain;
    }
  }
}
</style>
