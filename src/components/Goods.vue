<template>
  <div id="goods" ref="goods">
    <ul id="menu">
      <li v-for="(menuItem,index) in menu" :key="index" :class="{'active': menuIndex == index}" @click="selectMenu(index,menuItem.type,menuItem.id)">
        {{menuItem.name}}
      </li>
    </ul>
    <ul id="foods" ref="foods">
      <li v-for="(foodItem,index) in foods" :key="index">
        <img :src="foodItem.img_path" alt="">
        <div class="foodInfo">
          <p>{{foodItem.name}}</p>
          <p>¥{{foodItem.price}}</p>
          <button class="add" @click="increase([foodItem])"></button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions} from 'vuex'
export default {
  name: 'Goods',
  data() {
    return {
      menu: [],
      menuIndex: '',
      foods: [],
      selectFood: [],
    }
  },
  props: ['chefId'],
  beforeMount() {
    let localOrder = JSON.parse(localStorage.getItem('order'));
    if (localOrder.food) {
      this.selectFood = localOrder.food;
    }
  },
  mounted() {
    let vh = document.documentElement.clientHeight;
    this.$refs.goods.style.height = vh - 99 + 'px';
    this.getMenu()
  },
  methods: {
    ...mapActions(['increase']),
    getMenu() {
      this.$http.post('', {
        requestCode: '20000',
        member_id: this.chefId,
        res_type: 1
      }).then((res) => {
        console.log(res)
        this.menu = res.data.objects
        this.getFoods(res.data.objects[0].type, res.data.objects[0].id)
      }).catch((err) => {
        console.log(err)
      })
    },
    selectMenu(index, type, cate) {
      this.menuIndex = index;
      this.getFoods(type, cate)
    },
    getFoods(type, cate) {
      this.$refs.foods.scrollTop = 0;
      this.$http.post('', {
        requestCode: '20001',
        type: type,
        xl_id: cate,
        member_id: this.chefId,
        res_type: 1,
        'page.currentPage': 1,
        'page.showCount': 100
      }).then((res) => {
        console.log(res)
        this.foods = res.data.objects
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#goods {
  display: flex;
  width: 100%;
  overflow: hidden;
}

#menu {
  flex: 0 0 100px;
  width: 100px;
  border-right: 1px solid #888;
  font-size: 12px;
  overflow: scroll;
  li {
    height: 50px;
    line-height: 50px;
    text-align: center;
    &.active {
      background: $lightBg;
    }
  }
}

#foods {
  flex: 1;
  background: $lightBg;
  overflow: scroll;
  li {
    display: flex;
    padding: 15px;
    border-bottom: solid 1px $black;
    &:last-child {
      border-bottom: none;
    }
    &>img {
      flex: 0 0 100px;
      width: 100px;
      height: 70px;
    }
    .foodInfo {
      display: flex;
      flex: 1;
      margin-left: 20px;
      line-height: 1.5;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      .add {
        display: block;
        width: 26px;
        height: 26px;
        background: url('../../static/images/tianjia.png') no-repeat;
        background-size: contain;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
}
</style>


