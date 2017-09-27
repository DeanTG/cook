<template>
  <div id="comment">
    <h6>共{{comment.length}}条评论</h6>
    <ul>
      <li v-for="(item,index) in comment" :key="index">
        <header>
          <div>{{item.bName}}</div>
          <div>{{item.update_time.slice(0,-2)}}</div>
        </header>
        <div class="main">
          <p>评论：<span class="white">{{item.remark}}</span></p>
          <p>评星：<i class="iconfont icon-star" v-for="i in item.score" :key="i"></i></p>
          <div class="pic">
            <img :src="item.img_path?item.img_path:''" alt="">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Comment',
  data() {
    return {
      comment: []
    }
  },
  mounted(){
    this.getComment()
  },
  methods: {
    getComment() {
      this.$http.post('', {
        requestCode: '30002',
        id: '151',
        'page.showCount': '200',
        'page.currentPage': '1'
      }).then((res) => {
        console.log(res)
        this.comment = res.data.objects
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#comment {
  width: 90%;
  margin: 10px auto 0;
  color: rgba(255, 255, 255, 0.6);
  h6{
    font-size: 12px;
  }
  li{
    margin-top: 15px;
    border-radius: 3px;
    background: $lightBg;
    header{
      display: flex;
      justify-content: space-between;
      line-height: 48px;
      padding: 0 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    }
    .main{
      padding: 10px 15px;
      p{
        line-height: 1.5;
        margin-bottom: 10px;
        .white{
          color: #fff;
        }
        i{
          color: $red;
        }
      }
      img{
        width: 30%;
        height: 70px;
      }
    }
  }
}
</style>


