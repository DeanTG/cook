<template>
  <ul id="evaluation">
    <li v-for="(item,index) in evaluation" :key="index">
      <div class="consumerInfo">
        <img src="../../static/images/personal-center-title-bg.png" alt="">
        <div>
          <h6>
            {{item.eName | encrypt}}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="iconfont icon-star" v-for="i in item.score" :key="i"></i>
          </h6>
          <p>评价时间：{{item.update_time.substr(0,10)}}</p>
        </div>
      </div>
      <div class="evaluationPic">
        <div v-for="(val,index) in item.img_path" :key="index">
          <img :src="val" alt="">
        </div>
      </div>
      <p class="remark">{{item.remark}}</p>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Evaluation',
  data() {
    return {
      evaluation: []
    }
  },
  props: ['chefId'],
  mounted() {
    this.getEvaluation();
  },
  methods: {
    getEvaluation() {
      this.$http.post('', {
        requestCode: '30001',
        id: this.chefId,
        'page.currentPage': 1,
        'page.showCount': 200
      }).then((res) => {
        console.log(res)
        if (!res.data.objects.length) return
        res.data.objects.forEach((val, index, arr) => {
          if (val.img_path) {
            val.img_path = val.img_path.split(',');
          } else {
            val.img_path = []
          }
        });
        this.evaluation = res.data.objects;
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#evaluation {
  width: 90%;
  margin: 20px auto;
  li {
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 3px;
    background: $lightBg;
    .consumerInfo {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      &>div {
        flex: 1;
        margin-left: 20px;
        font-size: 12px;
        h6 {
          margin-bottom: 5px;
          i {
            color: $red;
          }
        }
        p {
          color: #777;
        }
      }
    }
    .evaluationPic{
      display: flex;
      &>div{
        flex: 0 0 30%;
        width: 30%;
        height: 70px;
        margin: 0 10px 5px 0;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .remark {
      line-height: 1.5;
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>
