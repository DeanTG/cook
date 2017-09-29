<template>
  <div id="login">
    <div class="logo">
      <div class="logoPic"></div>
      <h1>名称</h1>
    </div>
    <div class="loginBox">
      <div class="item">
        <div class="left">账号：</div>
        <div class="right">
          <input v-model="userAccount" @input="checkAccount" type="text" placeholder="请输入手机号">
          <p v-show="showAccountErr">请输入正确的手机号</p>
        </div>
      </div>
      <div class="item">
        <div class="left">验证码：</div>
        <div class="right code">
          <input v-model="userCode" @input="checkCode" type="text" placeholder="请输入验证码">
          <button @click="sendCode">
            <span v-show="countTime==60">发送</span>
            <span v-show="countTime!=60">{{countTime}}s</span>
          </button>
          <p v-show="showCodeErr">请输入正确的验证码</p>
        </div>
      </div>
    </div>
    <button class="loginBtn" :class="{'disabled':account!=userAccount || code!=userCode}" @click="login">登录</button>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      account: '13333333333', //15950455203
      userAccount: '',
      code: '1234',
      userCode: '',
      showAccountErr: false,
      showCodeErr: false,
      countTime: 60,
    }
  },
  methods: {
    checkAccount() {
      if (this.account == this.userAccount) {
        this.showAccountErr = false
      } else {
        this.showAccountErr = true
      }
    },
    checkCode() {
      if (this.code == this.userCode) {
        this.showCodeErr = false
      } else {
        this.showCodeErr = true
      }
    },
    sendCode() {
      if (this.countTime != 60) return
      let timer = setInterval(() => {
        if (this.countTime == 0) {
          this.countTime = 60
          clearInterval(timer)
        } else {
          this.countTime -= 1;
        }
      }, 1000)
    },
    login() {
      if (this.userAccount != this.account || this.userCode != this.code) return
      this.$toast('登录成功')
      let timer = setTimeout(() => {
        localStorage.setItem('userId','151')
        this.$router.push({ path: '/pages' })
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  background: url('../../static/images/bg.png') no-repeat;
  background-size: 100% 100%;
  .logo {
    padding-top: 70px;
    .logoPic {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      border-radius: 5px;
      background: $red;
    }
    h1 {
      margin-top: 20px;
      color: #fff;
      font-size: 18px;
      font-weight: normal;
      text-align: center;
    }
  }
  .loginBox {
    margin-top: 50px;
    .item {
      display: flex;
      align-items: center;
      width: 80%;
      margin: 0 auto 30px;
      color: rgba(255, 255, 255, 0.6);
      .left {
        flex: 0 0 60px;
        width: 60px;
        text-align: right;
      }
      .right {
        flex: 1;
        margin-left: 5px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
        position: relative;
        &.code {
          display: flex;
          align-items: flex-end;
          padding-bottom: 4px;
          input {
            flex: 1;
          }
        }
        input {
          display: block;
          width: 100%;
          padding: 5px 0;
          border: none;
          background: transparent;
          color: #fff;
          outline: none;
        }
        button {
          flex: 0 0 50px;
          display: block;
          width: 50px;
          padding: 4px 0;
          margin-left: 5px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          background: none;
          color: #fff;
          font-size: 12px;
          text-align: center;
        }
        p {
          color: $red;
          font-size: 12px;
          position: absolute;
          bottom: -20px;
          left: 0;
        }
      }
    }
  }
  .loginBtn {
    display: block;
    width: 85%;
    height: 46px;
    line-height: 46px;
    margin: 70px auto 0;
    border-radius: 23px;
    background: $red;
    color: #fff;
    font-size: 16px;
    text-align: center;
    &.disabled {
      background: $lightBg;
    }
  }
}
</style>