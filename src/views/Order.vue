<template>
  <ul id="order">
    <li v-for="(item,index) in orderList" :key="index">
      <header>
        <div>{{item.add_name}}（共{{item.number}}道菜）</div>
        <div>
          <span class="payState blue">{{payState[item.state]}}</span>
          <span class="right"></span>
        </div>
      </header>
      <section>
        <div class="orderFood" v-for="(val,i) in item.orderDetailList" :key="i">
          <div>{{val.name}}</div>
          <div>x{{val.number}}</div>
        </div>
      </section>
      <footer>
        <div class="payInfo">
          <div>用餐时间：{{item.dinner_time}}</div>
          <div class="price">¥
            <span>{{item.total_price}}</span>
          </div>
        </div>
        <div>备注详情：
          <span class="white">{{item.remark?item.remark:'暂无数据'}}</span>
        </div>
        <div class="btn" v-show="item.state==2 || item.state==3 || item.state==4">
          <button :class="{'blue':item.state==4}" @click="pushEvaluation" v-show="item.state==4">评价</button>
          <button @click="cancelOrder" v-show="item.state==2">退单</button>
        </div>
      </footer>
    </li>
  </ul>
</template>
<script>
export default {
  name: "Order",
  data() {
    return {
      orderList: [],
      payState: {
        "-1": "取消订单",
        "0": "待支付",
        "1": "支付中",
        "2": "已支付",
        "3": "厨师接单",
        "4": "交易完成",
        "5": "订单完成",
        "6": "退款中",
        "7": "退款成功",
        "8": "退款失败"
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$http
        .post("", {
          requestCode: "50001",
          member_id: "151",
          res_type: 0,
          "page.currentPage": 1,
          "page.showCount": 100,
          state: 0
        })
        .then(res => {
          console.log(res);
          this.orderList = res.data.objects ? res.data.objects.reverse() : [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    pushEvaluation() {
      this.$router.push({ path: "/pushEvaluation" });
    },
    cancelOrder() {
      this.$messagebox
        .confirm("用餐3小时内退款比例40.0%<br>用餐3小时外退款比例100.0%", "退单须知")
        .then(() => {}, () => {});
    }
  }
};
</script>
<style lang="scss" scoped>
#order {
  width: 90%;
  margin: 0 auto;
  li {
    line-height: 35px;
    padding-bottom: 10px;
    margin-top: 15px;
    border-radius: 3px;
    background: $lightBg;
    header,
    .orderFood,
    .payInfo {
      display: flex;
      justify-content: space-between;
    }
    header,
    section,
    footer {
      padding: 0 10px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.14);
    }
    header,
    footer {
      font-size: 12px;
      color: #999;
    }
    .payState {
      color: $red;
      &.blue {
        color: #1eb39d;
      }
    }
    .right {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("../../static/images/tiaozhuan.png") no-repeat;
      background-size: contain;
      vertical-align: middle;
    }
    footer {
      border-bottom: none;
      .price {
        color: #fff;
        span {
          font-size: 22px;
        }
      }
      .white {
        color: #fff;
      }
      .btn {
        text-align: right;
      }
      button {
        display: inline-block;
        width: 70px;
        height: 26px;
        line-height: 26px;
        border-radius: 13px;
        background: $red;
        color: #fff;
        font-size: 14px;
        text-align: center;
        &.blue {
          background: #02c5cd;
        }
      }
    }
  }
}
</style>
