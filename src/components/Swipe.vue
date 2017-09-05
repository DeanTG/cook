<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  name: 'Swipe',
  mounted(){
    //获取数据
    this.fetchData();
  },
  methods:{
    fetchData(){
      let _this=this;
      this.$http.post('',{
        requestCode: '60000',
        type: 0
      }).then(function(res){
        console.log(res)
      }).catch(function(err){
        console.error(err);
      });
    }
  },
}

</script>
<style scoped>
  .mint-swipe{
    height: 200px;
  }
</style>
