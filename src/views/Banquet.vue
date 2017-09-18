<template>
  <div id="banquet">
    <header>
      <h6 class="info">亲爱的用户，我们的厨师都是五星级大厨。请放心选择</h6>
      <SiftBox></SiftBox>
    </header>
    <ul id="companyList">
      <router-link to="/banquet" v-for="(item,index) in companyList" :key="index" tag="li">
        <div class="companyInfo">
          <img :src="item.head_img_path ? item.head_img_path : 'static/images/default_image_square.png'" alt="">
          <div>
            <p>{{item.org_name}}</p>
            <p>{{item.brief_introduction ? item.brief_introduction : '暂无数据'}}</p>
          </div>
        </div>
        <div class="location"><i class="iconfont icon-location"></i> {{item.address}}</div>
      </router-link>
    </ul>
    <TimePick></TimePick>
  </div>
</template>
<script>
import SiftBox from '../components/SiftBox.vue'
import TimePick from '../components/TimePick'
export default {
  name: 'Banquet',
  data(){
    return {
      companyList: [],
      userId: '',
      time: '',
    }
  },
  mounted(){
    this.fetchData()
    this.BUS.$on('dinnerTimeVal', (res) => {
      this.dinnerTime = res
      this.fetchData()
    })
  },
  methods:{
    fetchData(){
      this.$http.post('',{
        requestCode: "10104",
        type: 1,
        user_id: this.$data.userId,
        time: this.$data.time,
        'page.currentPage': 20,
        'page.showCount': 100
      }).then((res)=>{
        console.log(res)
        this.companyList = res.data.objects
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  components: {
    SiftBox,
    TimePick
  }
}

</script>
<style lang="scss" scoped>
  body{
    background: $black;
  }
  .info{
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
  #banquet{
    width: 90%;
    padding-bottom: 20px;
    margin: 0 auto;
    li{
      padding: 0 20px 10px;
      margin-top: 40px;
      border-radius: 4px;
      background: $lightBg;
      position: relative;
      .companyInfo{
        padding-left: 140px;
        margin-bottom: 10px;
        position: relative;
        &>img{
          width: 120px;
          height: 85px;
          position: absolute;
          top: -20px;
          left: 0;
        }
        &>div{
          min-height: 65px;
          padding-top: 10px;
          p{
            line-height: 1.5;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .location{
        i{
          color: $red;
        }
      }
    }
  }

</style>
