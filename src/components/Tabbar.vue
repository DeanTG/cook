<template>
  <mt-tabbar v-model="select">
    <mt-tab-item id="index">
      <router-link to='/pages/index' tag="li">
        <i class="iconfont icon-index"></i>首页
      </router-link>
    </mt-tab-item>
    <mt-tab-item id="order">
      <router-link to='/pages/order' tag="li">
        <i class="iconfont icon-order"></i>订单
      </router-link>
    </mt-tab-item>
    <mt-tab-item id="collect">
      <router-link to='/pages/collect' tag="li">
        <i class="iconfont icon-collect"></i>收藏
      </router-link>
    </mt-tab-item>
    <mt-tab-item id="me">
      <router-link to='/pages/me' tag="li">
        <i class="iconfont icon-my"></i>我的
      </router-link>
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      select: this.$route.path.substring(7)
    }
  }
}

</script>
<style lang="scss" scoped>
.mint-tabbar {
  background: $black;
  color: #fff;
  position: initial;
  top: initial;
  right: initial;
  bottom: initial;
  left: initial;
  i {
    display: block;
    line-height: 1.5
  }
  .is-selected {
    background: inherit!important;
    color: $red!important;
  }
}
</style>
