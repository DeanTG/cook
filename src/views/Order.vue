<template>
  <div id="order">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部订单</mt-tab-item>
      <mt-tab-item id="2">待评价</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        1
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        2
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  name: 'Order',
  data(){
    return {
      selected: '1'
    }
  }
}

</script>
<style lang="scss" scoped>
  .mint-navbar{
    background: $black;
  }
  .mint-navbar .mint-tab-item.is-selected{
    border-color: $red;
    color: $red;
  }
  .mint-tab-item-label{
    font-size: 14px!important;
  }
</style>
