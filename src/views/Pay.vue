<template>
  <div id="pay">
    <div class="item">
      <div class="subItem">
        <div>{{address.name}}</div>
        <div>{{address.phone}}</div>
      </div>
      <div class="subItem">
        {{address.address}}
      </div>
      <div class="subItem">
        <div>用餐时间</div>
        <div>2017-09-10</div>
      </div>
    </div>
    <div class="item">
      <div class="subItem">
        支付时间
      </div>
      <div class="subItem">
        <div>微信支付</div>
        <div>1</div>
      </div>
      <div class="subItem">
        <div>账户余额</div>
        <div>1</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pay',
  data(){
    return {
      address: {}
    }
  },
  mounted(){
    this.getAddress()
  },
  methods: {
    getAddress(){
      this.$http.post('',{
        requestCode: "10100",
        member_id: '151'
      }).then((res)=>{
        if(!res.data.objects.length) return
        res.data.objects.forEach((val,index,arr)=>{
          if(val.def == 0){
            this.address = val
          }
        });
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#pay {
  width: 90%;
  margin: 10px auto;
  .item {
    margin-bottom: 15px;
    border-radius: 3px;
    background: $lightBg;
    .subItem{
      display: flex;
      justify-content: space-between;
      line-height: 36px;
      padding: 0 15px;
      border-bottom: solid 1px rgba(255, 255, 255, 0.15);
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>


