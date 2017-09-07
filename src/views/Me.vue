<template>
  <div id="me">
    <header>
      <img src="../../static/images/personal-center-bg.png" alt="">
      <div class="personalInfo">
        <img :src="headImg?headImg :'../../static/images/personal-center-title-bg.png'" alt="">
        <div>
          <p>{{name?name: '小食客'}}</p>
          <p>{{phone?phone: ''}}</p>
        </div>
      </div>
    </header>
    <ul id="operate">
      <router-link to="/pages/me" tag="li">
        我的地址
      </router-link>
      <router-link to="/pages/index" tag="li">
        我的钱包
      </router-link>
      <router-link to="/pages/me" tag="li">
        我的优惠券
      </router-link>
      <router-link to="/pages/index" tag="li">
        我的评论
      </router-link>
      <router-link to="/pages/me" tag="li">
        我的消息
      </router-link>
      <li @click="signOut">
        退出登录
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Me',
  data() {
    return {
      userId: '3185',
      loginName: '17895029210',
      headImg: '',
      name: '',
      phone: ''
    }
  },
  mounted() {
    console.log(this)
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http.post('', {
        requestCode: '10003',
        user_id: this.$data.userId,
        login_name: this.$data.loginName,
        type: 0
      }).then((res) => {
        console.log(res)
        this.$data.headImg = res.data.wzsMember.head_img_path;
        this.$data.name = res.data.wzsMember.name;
        this.$data.phone = res.data.wzsMember.phone;
      })
    },
    signOut() {
      
    }
  }
}

</script>
<style lang="scss" scoped>
header {
  &>img {
    display: block;
    width: 100%;
    height: 150px;
  }
  .personalInfo {
    width: 80%;
    margin: 0 auto;
    position: relative;
    &>img {
      display: inline-block;
      width: 100px;
      height: 100px;
      margin-top: -30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    &>div {
      display: inline-block;
      line-height: 1.5;
      margin-left: 20px;
      vertical-align: middle;
    }
  }
}

#operate {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  padding: 0 15px;
  margin: 25px auto 0;
  position: relative;
  &::before,
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 8px;
    background: url(../../static/images/wzs-line.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0;
  }
  &::before {
    top: -15px;
  }
  &::after {
    bottom: -15px;
  }
  li {
    flex: 0 0 33.3%;
    padding: 70px 0 15px;
    border: $lightBlack solid 1px;
    background: rgba(255, 255, 255, 0.05) url('../../static/images/address-icon.png') center 20px no-repeat;
    background-size: 40px 40px;
    text-align: center;
    &:nth-of-type(2) {
      background-image: url('../../static/images/wallet-icon.png');
    }
    &:nth-of-type(3) {
      background-image: url('../../static/images/group.png');
    }
    &:nth-of-type(4) {
      background-image: url('../../static/images/comment-icon.png');
    }
    &:nth-of-type(5) {
      background-image: url('../../static/images/news-icon.png');
    }
    &:nth-of-type(6) {
      background-image: url('../../static/images/sign-out-icon.png');
    }
  }
}
</style>
