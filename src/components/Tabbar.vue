<template>
  <div>
    <mt-tabbar fixed v-model="select">
      <mt-tab-item id="tab1">
        <router-link to='/pages/' tag="li">
          <i class="iconfont icon-index"></i>首页
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <router-link to='/pages/order' tag="li">
          <i class="iconfont icon-order"></i>订单
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <router-link to='/pages/collect' tag="li">
          <i class="iconfont icon-collect"></i>收藏
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <router-link to='/pages/me' tag="li">
          <i class="iconfont icon-my"></i>我的
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  name: 'Tabbar',
  data(){
    return {  
      select: 'tab1'  
    }
  },
  methods: {
    change(){
      console.log(this.data.select)
    }
  },

}

</script>
<style lang="scss" scoped>
body{
  color: #fff
}
.mint-tabbar {
  background: #141418;
  color: #fff;
  i{
    display: block;
    line-height: 1.5
  }
  .is-selected{
    background: inherit!important;
    color: #EF2432!important;
  }
}

</style>
