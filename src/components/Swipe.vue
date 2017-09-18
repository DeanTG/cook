<template>
  <div>
    <mt-swipe :auto="4000">
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
      items: []
    }
  },
  mounted() {
    if (this.$route.path.substring(1) == 'chefDetails') {
      this.fetchDetailsData()
    } else {
      this.fetchData();
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
        console.log(this.items)
      }).catch((err) => {
        console.log(err)
      });
    },
    fetchDetailsData() {
      var axios = this.$http;
      var that = this;
      this.$http.all([getpic1(), getpic2()])
        .then(this.$http.spread(function(res1, res2) {
          that.items.push(res1.data.wzsMember.group_photo_path)
          res2.data.objects.forEach((value, index, array) => {
            that.items.push(value.img_path)
          })
        }));
      function getpic1() {
        return axios.post('', {
          requestCode: "10003",
          user_id: '3185',
          type: 1,
          login_name: '17895029210',
          id: '110'
        })
      }

      function getpic2() {
        return axios.post('', {
          requestCode: "20001",
          type: 0,
          xl_id: 1,
          member_id: '110',
          res_type: 1,
          'page.currentPage': 1,
          'page.showCount': 100
        })
      }
    }
  },
}

</script>
<style lang="scss">
.mint-swipe {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
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
