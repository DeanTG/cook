<template>
  <div id="cart">
    <div class="cartIcon" @click="cartFoodState">
      <span v-show="totalCount>0">{{totalCount}}</span>
    </div>
    <div class="cartPrice">
      <div class="totalPrice">
        <em>{{totalPrice?totalPrice:0}}</em>元
      </div>
      <div class="booking" v-show="totalPrice>=200" @click="toPay">预定</div>
      <div class="booking-tips" v-show="totalPrice<200">200元起接单</div>
    </div>
    <div id="cartFood" v-show="showCartFood">
      <div class="title">
        <div>已选菜单</div>
        <div @click="clear">清空购物车</div>
      </div>
      <ul>
        <li v-for="(item, index) in selectFood" :key="index">
          <div>{{item.name}}</div>
          <div>¥{{item.price}}</div>
          <div class="oprateCartFood">
            <span class="decrease" @click="decrease(index)"></span>
            <span>{{item.count}}</span>
            <span class="increase" @click="increase(index)"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Cart',
  data() {
    return {
      selectFood: [],
      showCartFood: false,
    }
  },
  props: ['order'],
  computed: {
    totalPrice() {
      let price = 0;
      this.selectFood.forEach((val, index, arr) => {
        price += Number(val.price * val.count)
      });
      return price
    },
    totalCount() {
      let count = 0;
      this.selectFood.forEach((val, index, arr) => {
        count += Number(val.count)
      });
      return count
    }
  },
  beforeMount() {
    let localOrder = JSON.parse(localStorage.getItem('order'));
    if (localOrder.food) {
      this.selectFood = localOrder.food;
    }
  },
  mounted() {
    this.BUS.$on('selectFood', (res) => {
      console.log(res)
      this.selectFood = res
    })
  },
  methods: {
    decrease(index) {
      this.selectFood[index].count -= 1;
      if (this.selectFood[index].count == 0) {
        this.selectFood.splice(index, 1)
        if (!this.selectFood.length) this.showCartFood = false;
      }
    },
    increase(index) {
      this.selectFood[index].count += 1;
    },
    clear() {
      this.$messagebox.confirm('确认清空购物车？', '').then(() => {
        this.selectFood = [];
        this.showCartFood = false
      }, () => {
      })
    },
    cartFoodState() {
      if (this.selectFood.length) {
        this.showCartFood = !this.showCartFood;
      }
    },
    toPay() {
      let order = this.order;
      order.food = this.selectFood
      this.$router.push({ path: '/pay' })
      localStorage.setItem('order', JSON.stringify(order))
    }
  }
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

#cartFood {
  width: 100%;
  padding-bottom: 30px;
  background: $black;
  position: absolute;
  bottom: 100%;
  left: 0;
  z-index: 1;
  ul{
    max-height: 240px;
    overflow: scroll;
  }
  .title,
  li {
    padding: 0 15px;
    border-bottom: 1px solid #303133;
  }
  .title {
    display: flex;
    justify-content: space-between;
    line-height: 36px;
    color: #999;
    font-size: 12px;
  }
  li {
    display: flex;
    line-height: 48px;
    &:last-child {
      border-bottom: none;
    }
    &>div {
      flex: 1;
      &:nth-of-type(2) {
        text-align: center;
      }
      &.oprateCartFood {
        text-align: right;
        span {
          display: inline-block;
          width: 21px;
          height: 21px;
          line-height: 21px;
          vertical-align: middle;
          text-align: center;
        }
      }
      .decrease {
        background: url('../../static/images/shanchu.png') no-repeat;
        background-size: contain;
      }
      .increase {
        background: url('../../static/images/tianjia.png') no-repeat;
        background-size: contain;
      }
    }
  }
}
</style>


