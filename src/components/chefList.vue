<template>
  <ul class="chefList">
    <li v-for="(item,index) in chefList" :key="index" @click="toDetail(item.id,item.name)">
      <img class="foodPic" :src="item.dis_img_path?item.dis_img_path : 'static/images/default_image_square.png'" alt="">
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
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ChefList',
  data() {
    return {
      chefList: [],
      chefId: '151',
      dinnerTime: '',
      chefName: '',
    }
  },
  mounted() {
    if (this.$route.path.substring(1) == 'private') {
      this.fetchData()
    } else {
      this.fetchCollectData()
    }

    this.BUS.$on('dinnerTimeVal', (res) => {
      this.dinnerTime = res
      this.fetchData()
    })
    this.BUS.$on('collect_dinnerTimeVal', (res) => {
      this.dinnerTime = res
      this.fetchCollectData()
    })
    this.BUS.$on('searchChef', (res) => {
      this.chefName = res
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      this.chefList = []
      this.$http.post('', {
        requestCode: '10104',
        type: 0,
        user_id: this.chefId,
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
    fetchCollectData() {
      this.chefList = []
      this.$http.post('', {
        requestCode: '70003',
        user_id: '151',
        time: '',
        type: 0,
        'page.currentPage': 1,
        'page.showCount': 200,
      }).then((res) => {
        console.log(res)
        this.chefList = res.data.objects;
      }).catch((err) => {
        console.log(err)
      })
    },
    toDetail(id, name) {
      if (this.dinnerTime) {
        let order = {
          chef: {
            id: id,
            name: name
          },
          time: this.dinnerTime
        };
        this.$router.push({ path: '/chefDetails' })
        this.$store.dispatch('clearSelect')
        localStorage.setItem('order', JSON.stringify(order))
      } else {
        this.$toast('请先选择用餐时间')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chefList {
  flex: 1;
  overflow: scroll;
  li {
    padding-top: 165px;
    margin: 20px 0 40px;
    border-radius: 4px;
    background: $lightBg;
    position: relative;
    &:last-child {
      margin-bottom: 20px;
    }
    .foodPic {
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


