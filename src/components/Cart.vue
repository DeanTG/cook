<template>
  <div id="cart">
    <div class="cartIcon">
      <span>1</span>
    </div>
    <div class="cartPrice">
      <div class="totalPrice">
        <em>20</em>元
      </div>
      <router-link to="/pay" class="booking">预定</router-link>
      <div class="booking-tips" style="display:none">200元起接单</div>
    </div>
    <div id="cartFood" style="display:none">
      <div>
        <span>已选菜单</span>
        <span>清空购物车</span>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Cart'
}
</script>
<style lang="scss" scoped>
#cart {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: $lightBlack;
  position: relative;
  .cartIcon {
    flex: 0 0 65px;
    width: 65px;
    height: 25px;
    border-right: solid 1px #fff;
    background: url('../../static/images/gouwuche.png') center center no-repeat;
    background-size: contain;
    position: relative;
    span {
      display: block;
      width: 15px;
      height: 15px;
      line-height: 15px;
      border-radius: 50%;
      background: $red;
      color: #fff;
      font-size: 9px;
      text-align: center;
      position: absolute;
      top: -2px;
      right: 10px;
    }
  }
  .cartPrice {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    .totalPrice {
      height: 50px;
      margin-left: 15px;
      em {
        font-size: 18px;
      }
    }
    .booking {
      display: block;
      width: 100px;
      height: 100%;
      background: $red;
      color: #fff;
      font-size: 18px;
      text-align: center;
    }
    .booking-tips {
      margin-right: 15px;
      color: $red;
      font-size: 12px;
    }
  }
}
#cartFood{
  padding-bottom: 30px;
  background: $black;
  position: absolute;
  bottom: 100%;
  left: 0;

}
</style>


