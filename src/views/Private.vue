<template>
  <div id="private">
    <header>
      <h6 class="info">亲爱的用户，我们的厨师都是五星级大厨。请放心选择</h6>
      <SiftBox :time.sync="dinnerTime" :name.sync="chefName" @searchChef="searchChef"></SiftBox>
    </header>
    <ul class="chefList">
      <router-link to="/chefDetails" v-for="(item,index) in chefList" :key="index" tag="li">
        <img :src="item.dis_img_path?item.dis_img_path : 'static/images/default_image_square.png'" alt="">
        <div class="details">
          <div class="details-left">
            <div class="avatar">
              <img :src="item.head_img_path ? item.head_img_path : 'static/images/picheader.png'" alt="">
              <i class="busy" v-if="item.state == 1 || item.cook_state == 2"></i>
            </div>
            <p>{{item.name}}</p>
          </div>
          <div class="details-right">
            <p>擅长：{{item.good_at_cook?item.good_at_cook: '暂无数据'}}</p>
            <p>好评：
              <i v-for="index in item.score" :key="index" class="iconfont icon-star"></i>
            </p>
          </div>
        </div>
      </router-link>
    </ul>
    <TimePick></TimePick>
  </div>
</template>
<script>
import SiftBox from '../components/SiftBox.vue'
import TimePick from '../components/TimePick.vue'
export default {
  name: 'Private',
  data() {
    return {
      userId: '',
      chefList: [],
      dinnerTime: '',
      chefName: '',
    }
  },
  mounted() {
    this.fetchData()
    this.BUS.$on('dinnerTimeVal', (res) => {
      this.dinnerTime = res
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      this.chefList = []
      this.$http.post('', {
        requestCode: '10104',
        type: 0,
        user_id: this.userId,
        time: this.dinnerTime,
        name: this.chefName,
        'page.currentPage': 1,
        'page.showCount': 200
      }).then((res) => {
        console.log(res)
        this.chefList = res.data.objects;
      }).catch((err) => {
        console.log(err)
      })
    },
    searchChef(name) {
      this.fetchData()
    }
  },
  /* beforeRouteLeave(to, from, next) {
    console.log(to)
  }, */
  components: {
    SiftBox,
    TimePick
  }
}

</script>
<style lang="scss" scoped>
body {
  background: $black;
}

.info {
  line-height: 30px;
  padding: 0;
  margin: 0;
  border-radius: 0 0 4px 4px;
  background: $lightBg;
  color: #ccc;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
}

#private {
  width: 90%;
  padding-bottom: 20px;
  margin: 0 auto;
}

.chefList {
  overflow: hidden;
  li {
    padding-top: 165px;
    margin-top: 40px;
    border-radius: 4px;
    background: $lightBg;
    position: relative;
    &>img {
      display: block;
      width: 90%;
      height: 185px;
      border-radius: 4px;
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
    }
    .details {
      display: flex;
      width: 90%;
      padding-bottom: 10px;
      margin: 0 auto;
      color: #fff;
    }
    .details-left {
      width: 100px;
      text-align: center;
    }
    .avatar {
      display: inline-block;
      width: 60px;
      height: 60px;
      margin: -30px 0 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border: $red solid 2px;
        border-radius: 30px;
      }
      .busy {
        display: block;
        width: 20px;
        height: 20px;
        background: url(../../static/images/busy.png) no-repeat;
        background-size: contain;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .details-right {
      flex: 1;
      margin-top: 20px;
      overflow: hidden;
      p {
        line-height: 1.5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      i {
        color: $red;
      }
    }
  }
}
</style>
