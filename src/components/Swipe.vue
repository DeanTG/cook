<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in items" :key="item.id">
        <img :src="item.link" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  name: 'Swipe',
  data(){
    return {
      items: []
    }
  },
  mounted(){
    this.fetchData();
  },
  methods:{
    fetchData(){
      this.$http.post('',{
        requestCode: '60000',
        type: 0
      }).then((res)=>{
        this.items = res.data.objects;
      }).catch((err)=>{
        console.log(err)
      });
    }
  },
}

</script>
<style lang="scss">
  .mint-swipe{
    height: 200px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .mint-swipe-indicator {
    border-radius: 0;
    background: #fff;
    transform: rotate(45deg);
    &.is-active{
      background: $red!important;
      opacity: 1;
    }
  }
</style>
