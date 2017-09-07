<template>
  <div id="siftBox" class="space-between">
    <div id="timePicker" class="item" @click="pickTime">
      <span>用餐时间</span>
    </div>
    <div id="search" class="item" style="">
      <input v-model="name" type="text" placeholder="搜索烹饪师">
      <mt-button icon="search" @click="search"></mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SiftBox',
    data(){
      return {
        name: ''
      }
    },
    methods: {
      pickTime(){
      },
      search(){
      }
    }
  }
</script>
<style lang="scss" scoped>
  #siftBox{
    width: 90%;
    margin: 20px auto 0;
    text-align: center;
    &.space-between{
        display: flex;
        justify-content: space-between;
        .item{
          display: block;
        }
      }
    .item{
      display: inline-block;
      width: 110px;
      height: 32px;
      line-height: 32px;
      border-radius: 16px;
      text-align: center;
      overflow: hidden;
      position: relative;
    }
    #timePicker{
      background: $red;
      color: #fff;
    }
    #search{
      width: 120px;
      background: $lightBg;
      input{
        display: block;
        width: 100%;
        height: 100%;
        line-height: 32px;
        padding: 5px 40px 5px 10px;
        border: none;
        background: transparent;
        outline: none;
        color: #fff;
        font-size: 14px;
      }
      .mint-button{
        width: 40px;
        height: 100%;
        padding: 0;
        border: none;
        box-shadow: none;
        background: none;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
      }
    }
  }
  
</style>