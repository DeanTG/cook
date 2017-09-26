<template>
  <div id="wallet">
    <div class="assets">{{assets}}</div>
    <div class="progress">
      <ul>
        <li :class="{'in': item.type==0}" v-for="(item,index) in progress" :key="index">
          <p>{{item.update_time}}</p>
          <div class="fee">
            <div>{{item.remark}}</div>
            <div class="money"><span v-show="item.type==0">+</span>{{item.money}}</div>
          </div>
        </li>
      </ul>
    </div>
    <button>充值</button>
  </div>
</template>
<script>
export default {
  name: 'Wallet',
  data() {
    return {
      assets: '',
      progress: []
    }
  },
  mounted() {
    this.getAssets()
    this.getProgress()
  },
  methods: {
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
    getProgress() {
      this.$http.post('', {
        requestCode: '10500',
        member_id: '151',
        'page.showCount': '50',
        'page.currentPage': '1',
      }).then((res) => {
        console.log(res)
        this.progress = res.data.objects
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#wallet {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  .assets {
    flex: 0 0 145px;
    height: 145px;
    line-height: 140px;
    margin-top: 10px;
    background: url('../../static/images/assets.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 38px;
    text-indent: 20px;
  }
  .progress {
    flex: 1;
    overflow: scroll;
    width: 95%;
    padding: 10px 15px;
    margin: 0 auto;
    background: $lightBg;
  }
  ul {
    margin: 0 auto;
    border-left: 2px solid rgba(255, 255, 255, 0.2);
  }
  li {
    padding: 0 0 30px 20px;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00B99A;
      position: absolute;
      top: 0;
      left: -5px;
    }
    &.in {
      &::before {
        background: $red;
      }
      .money{
        color: $red;
      }
    }
    p {
      margin-bottom: 15px;
      color: #999;
      font-size: 12px;
    }
    .fee {
      display: flex;
      justify-content: space-between;
    }
    .money {
      font-size: 18px;
      color: #00B99A;
    }
  }
  button {
    flex: 0 0 46px;
    display: block;
    height: 46px;
    line-height: 46px;
    margin: 10px 0 20px;
    border-radius: 23px;
    background: $red;
    color: #fff;
    text-align: center;
  }
}
</style>


