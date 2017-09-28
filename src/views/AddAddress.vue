<template>
  <div id="addAddress">
    <h6>
      <span @click="save">保存</span>
    </h6>
    <ul>
      <li>
        <div class="left">姓名</div>
        <div class="right"><input v-model="name" type="text" placeholder="请输入您的姓名"></div>
      </li>
      <li>
        <div class="left">性别</div>
        <div class="right radio">
          <span :class="{'active':radioVal==1}" @click="radioCheck(1)">男</span>
          <span :class="{'active':radioVal==2}" @click="radioCheck(2)">女</span>
        </div>
      </li>
      <li>
        <div class="left">手机</div>
        <div class="right"><input v-model="phone" type="text" placeholder="请输入您的手机号"></div>
      </li>
      <li>
        <div class="flex">
          <div class="left">地址</div>
          <div class="right address">
            <span>上海市浦东新区</span>
            <!-- <span class="checkArea">选择地区</span> -->
          </div>
        </div>
        <div><input v-model="address" type="text" placeholder="请输入详细地址"></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'AddAddress',
  data() {
    return {
      name: '',
      radioVal: 1,
      phone: '',
      address: ''
    }
  },
  methods: {
    radioCheck(i) {
      this.radioVal = i;
    },
    save() {
      if (!this.name) {
        this.$toast('请输入姓名')
        return
      }
      if (!this.phone) {
        this.$toast('请输入手机')
        return
      }
      if (!this.address) {
        this.$toast('请输入地址')
        return
      }
      this.$toast('新建地址成功')
      let timer = setTimeout(() => {
        this.$router.push({ path: '/address' })
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
#addAddress {
  width: 90%;
  margin: 20px auto 0;
  h6 {
    text-align: right;
    span {
      color: $red;
    }
  }
  ul {
    margin-top: 20px;
    border-radius: 3px;
    background: $lightBg;
    li {
      display: flex;
      line-height: 40px;
      padding: 0 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.14);
      color: #999;
      &:last-child {
        display: block;
        border-bottom: none;
      }
      .flex {
        display: flex;
        width: 100%;
      }
      .left {
        flex: 0 0 70px;
        width: 70px;
      }
      .right {
        flex: 1;
        text-align: right;
      }
      input {
        display: block;
        width: 100%;
        line-height: 14px;
        padding: 13px 0;
        border: none;
        background: transparent;
        color: #fff;
        outline: none;
        text-align: right;
      }
      .radio {
        color: #fff;
        span {
          display: inline-block;
          padding-left: 25px;
          margin-left: 20px;
          background: url('../../static/images/radio-unselect.png') left center no-repeat;
          background-size: 20px 20px;
          vertical-align: middle;
          &.active {
            background: url('../../static/images/radio-select.png') left center no-repeat;
            background-size: 20px 20px;
          }
        }
      }
      .address {
        color: #fff;
        .checkArea {
          padding: 4px 15px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          &::after {
            content: '';
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-left: 5px;
            background: url('../../static/images/tiaozhuan.png') no-repeat;
            background-size: 100% 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>


