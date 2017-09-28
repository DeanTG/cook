<template>
  <div>
    <mt-swipe :class="rightPagination?'rightPagination':''" :auto="4000">
      <mt-swipe-item v-for="(item, index) in items" :key="item.id">
        <img :src="item" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  name: 'Swipe',
  data() {
    return {
      items: [],
      rightPagination: false
    }
  },
  props:['chefId'],
  mounted() {
    if (this.$route.path== '/pages/index') {
      this.fetchData()
    } else {
      this.fetchDetailsData()
      this.rightPagination = true
    }
  },
  methods: {
    fetchData() {
      this.$http.post('', {
        requestCode: '60000',
        type: 0
      }).then((res) => {
        res.data.objects.forEach((value, index, array) => {
          this.items.push(value.link)
        })
      }).catch((err) => {
        console.log(err)
      });
    },
    fetchDetailsData() {
      let getGroupPic = () => {
        return this.$http.post('', {
          requestCode: "10003",
          user_id: '3185',
          type: 1,
          login_name: '17895029210',
          id: this.chefId
        })
      }
      let getSpecialityPic = () => {
        return this.$http.post('', {
          requestCode: "20001",
          type: 0,
          xl_id: 1,
          member_id: this.chefId,
          res_type: 1,
          'page.currentPage': 1,
          'page.showCount': 100
        })
      }
      this.$http.all([getGroupPic(), getSpecialityPic()])
        .then(this.$http.spread((res1, res2) => {
          this.items.push(res1.data.wzsMember.group_photo_path)

          res2.data.objects.forEach((value, index, array) => {
            this.items.push(value.img_path)
          })
        })).catch((err) => {
          console.log(err)
        });;
    }
  },
}

</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 180px;
  img {
    width: 100%;
    height: 100%;
  }
}

.rightPagination .mint-swipe-indicators {
  left: initial;
  right: 10px;
  transform: translateX(0)
}

.mint-swipe-indicator {
  border-radius: 0;
  background: #fff;
  transform: rotate(45deg);
  &.is-active {
    background: $red!important;
    opacity: 1;
  }
}
</style>
