<template>
  <div id="chefDetails">
    <div class="chefDetails-main">
      <Swipe :chefId="chefId"></Swipe>
      <div id="collect" :class="isCollected?'isCollected':''" class="iconfont icon-collect" @click="collect"></div>
      <div id="chefInfo" ref="chefInfo">
        <div class="avatar"><img :src="chef.head_img_path" alt=""></div>
        <h6 class="name">{{chef.name}}</h6>
        <p>
          <span>简介：</span>
          <span>{{chef.brief_introduction?chef.brief_introduction:'暂无数据'}}</span>
        </p>
        <p>
          <span>擅长：</span>
          <span>{{chef.good_at_cook?chef.good_at_cook:'暂无数据'}}</span>
        </p>
        <div class="star">
          <i class="iconfont icon-star" v-for="i in chef.score" :key="i"></i>
        </div>
      </div>
      <mt-navbar class="subNav" v-model="selected">
        <mt-tab-item id="1">大厨菜谱</mt-tab-item>
        <mt-tab-item id="2">用户评价</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <Goods :chefId="chefId"></Goods>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <Evaluation :chefId="chefId"></Evaluation>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <Cart class="cart" v-show="this.selected==1"></Cart>
  </div>
</template>
<script>
import Swipe from '../components/Swipe'
import Goods from '../components/Goods'
import Evaluation from '../components/Evaluation'
import Cart from '../components/Cart'
export default {
  name: 'ChefDetails',
  data() {
    return {
      isCollected: false,
      chef: {},
      chefId: this.$route.query.chefId,
      selected: '1'
    }
  },
  mounted() {
    this.getChefInfo();
  },
  methods: {
    getChefInfo() {
      this.$http.post('', {
        requestCode: "10003",
        user_id: '3185',
        type: 1,
        login_name: '17895029210',
        id: this.chefId
      }).then((res) => {
        console.log(res)
        this.chef = res.data.wzsMember
        if (res.data.wzsMember.collect_state == 1) {
          this.isCollected = true
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    collect() {
      if (this.isCollected) {
        this.$messagebox.confirm('确认取消收藏？', '').then(() => {
          this.$http.post('', {
            requestCode: '70002',
            collector_id: this.chefId,
            user_id: '3185'
          }).then((res) => {
            this.isCollected = false;
          }).catch((err) => {
            console.log(err)
          })
        }, () => {
        })
      } else {
        this.$http.post('', {
          requestCode: '70001',
          collector_id: this.chefId,
          user_id: '3185'
        }).then((res) => {
          this.isCollected = true;
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  },
  components: {
    Swipe,
    Goods,
    Evaluation,
    Cart
  }
}
</script>
<style lang="scss" scoped>
#chefDetails {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .chefDetails-main {
    flex: 1;
    overflow: scroll;
    position: relative;
  }
  .cart {
    flex: 0 0 50px;
  }
}

#collect {
  position: absolute;
  top: 20px;
  right: 20px;
  &.isCollected {
    color: $red;
  }
}

.subNav {
  margin: 10px 0 3px;
}

#chefInfo {
  .avatar {
    width: 90px;
    height: 90px;
    margin: -45px auto 0;
    border: solid 2px $red;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    z-index: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    margin: 10px 0;
    font-size: 14px;
    text-align: center;
  }
  p {
    display: flex;
    margin: 0 20px;
    line-height: 1.5;
    font-size: 13px;
    &>span {
      display: block;
    }
    &>span:first-child {
      flex: 0 0 40px;
      width: 40px;
    }
    &>span:last-child {
      flex: 1;
      word-break: break-all;
    }
  }
  .star {
    margin-top: 10px;
    color: $red;
    text-align: center;
  }
}

.mint-navbar {
  background: $black;
}

.mint-navbar .mint-tab-item.is-selected {
  border-color: $red;
  color: $red;
}
</style>


