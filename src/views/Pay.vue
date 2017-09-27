<template>
  <div id="pay">
    <div class="item">
      <div class="subItem noBorder">
        <div>{{address.name}}</div>
        <div>{{address.phone}}</div>
      </div>
      <router-link to='/address' class="subItem" tag='div'>
        <div>{{address.address}}</div>
        <div class="right"></div>
      </router-link>
      <div class="subItem">
        <div class="grey">用餐时间</div>
        <div>{{order.time}}</div>
      </div>
    </div>
    <div class="item">
      <div class="subItem">
        支付方式
      </div>
      <div class="subItem">
        <div>微信支付</div>
        <div class="check" :class="{'checked':checkVal==1}" @click="payWay(1)"></div>
      </div>
      <div class="subItem">
        <div>账户余额（¥{{assets}}元）</div>
        <div class="check" :class="{'checked':checkVal==2}" @click="payWay(2)"></div>
      </div>
    </div>
    <div class="item">
      <div class="subItem">
        <div>{{order.chef.name}}</div>
        <div class="red">共{{order.food.length}}道菜</div>
      </div>
      <div class="subItem">
        <ul class="foodList">
          <li v-for="(item,index) in order.food" :key="index">
            <div>{{item.name}}</div>
            <div>x{{item.count}}</div>
            <div>¥{{item.price}}</div>
          </li>
        </ul>
      </div>
      <div class="subItem grey">
        <div>
          <input type="checkbox" :checked="isClean" @click="check"> 请阿姨上门清洗餐具
        </div>
        <div>
          ¥{{clean}}
        </div>
      </div>
      <div class="subItem">
        <div class="grey">
          共计
        </div>
        <div>
          ¥{{totalPrice}}
        </div>
      </div>
    </div>
    <button class="pay">确认支付</button>
  </div>
</template>
<script>
export default {
  name: 'Pay',
  data() {
    return {
      order: JSON.parse(this.$route.query.order),
      address: {},
      assets: '',
      checkVal: 1,
      clean: 25,
      isClean: false
    }
  },
  computed: {
    totalPrice() {
      let price = 0;
      this.order.food.forEach((val, index, arr) => {
        price = price + val.count * val.price
      })
      if (this.isClean) {
        price += this.clean
      }
      return price
    }
  },
  mounted() {
    console.log(this.order)
    this.getAddress()
    this.getAssets()
  },
  methods: {
    getAddress() {
      this.$http.post('', {
        requestCode: "10100",
        member_id: '151'
      }).then((res) => {
        if (!res.data.objects.length) return
        console.log(res)
        res.data.objects.forEach((val, index, arr) => {
          if (val.def == 0) {
            this.address = val
          }
        });
      }).catch((err) => {
        console.log(err)
      })
    },
    getAssets() {
      this.$http.post('', {
        requestCode: '10501',
        member_id: '151'
      }).then((res) => {
        console.log(res)
        this.assets = res.data.objects.assets
      }).catch((err) => {
        console.log(err)
      })
    },
    payWay(i) {
      this.checkVal = i
    },
    check() {
      this.isClean = !this.isClean
    }
  }
}
</script>
<style lang="scss" scoped>
#pay {
  width: 90%;
  margin: 10px auto;
  .item {
    margin-bottom: 15px;
    border-radius: 3px;
    background: $lightBg;
    .grey {
      color: #999;
    }
    .red {
      color: $red;
    }
    .subItem {
      display: flex;
      justify-content: space-between;
      line-height: 36px;
      padding: 0 15px;
      border-bottom: solid 1px rgba(255, 255, 255, 0.15);
      &:last-child,
      &.noBorder {
        border-bottom: none;
      }
      .right {
        width: 20px;
        height: 20px;
        margin-top: 8px;
        background: url('../../static/images/tiaozhuan.png') no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
      }
    }
    .check {
      width: 24px;
      height: 24px;
      margin-top: 6px;
      border: solid 2px $red;
      border-radius: 50%;
      &.checked {
        width: 26px;
        height: 26px;
        border: none;
        background: url('../../static/images/address-select.png') no-repeat;
        background-size: contain;
      }
    }
    input[type="checkbox"] {
      background: none;
    }
    .foodList {
      width: 100%;
      li {
        display: flex;
        &>div {
          flex: 1;
          &:nth-of-type(2) {
            text-align: center;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }
  .pay {
    display: block;
    width: 90%;
    height: 46px;
    line-height: 46px;
    margin: 40px auto 0;
    border-radius: 23px;
    background: $red;
    color: #fff;
    text-align: center;
  }
}
</style>


