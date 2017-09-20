<template>
  <div id="goods">
    <ul id="menu">
      <li v-for="(menuItem,index) in menu" :key="index">
        {{menuItem.name}}
      </li>
    </ul>
    <ul id="foods">
      <li v-for="(foodItem,index) in foods" :key="index">
        <img :src="foodItem.img_path" alt="">
        <div class="foodInfo">
          <p>{{foodItem.name}}</p>
          <p>¥{{foodItem.price}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Goods',
  data() {
    return {
      menu: [],
      foods: []
    }
  },
  mounted() {
    this.getMenu()
    this.getFoods()
  },
  methods: {
    getMenu() {
      this.$http.post('', {
        requestCode: '20000',
        member_id: '110',
        res_type: 1
      }).then((res) => {
        this.menu = res.data.objects
      })
    },
    getFoods() {
      this.$http.post('', {
        requestCode: '20001',
        type: 0,
        xl_id: 1,
        member_id: '110',
        res_type: 1,
        'page.currentPage': 1,
        'page.showCount': 100
      }).then((res) => {
        console.log(res)
        this.foods = res.data.objects
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#goods {
  display: flex;
}

#menu {
  flex: 0 0 100px;
  width: 100px;
  border-right: 1px solid #888;
  font-size: 12px;
  li {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}

#foods {
  flex: 1;
  background: $lightBg;
  li {
    display: flex;
    padding: 15px;
    border-bottom: solid 1px $black;
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
      flex-wrap: wrap;
      align-content: space-between;
      p {
        width: 100%;
      }
    }
  }
}
</style>


