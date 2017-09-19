<template>
  <div id="address">
    <div id="manage" @click="manage">管理</div>
    <ul>
      <li v-for="(item,index) in addressList" :key="index">
        <div class="delete"></div>
        <div class="addressBox">
          <div class="addressContent">
            <p>{{item.name}}</p>
            <p>{{item.phone}}</p>
            <p>{{item.address}}</p>
          </div>
          <div :class="item.def?'checked':''" class="check"></div>
        </div>
      </li>
    </ul>
    <router-link to="/addAddress" class="my-btn">新增地址</router-link>
  </div>
</template>
<script>
export default {
  name: 'Address',
  data() {
    return {
      addressList: [],
      checked: true
    }
  },
  mounted() {
    this.getAddress()
  },
  methods: {
    getAddress() {
      this.$http.post('', {
        requestCode: "10100",
        member_id: '3185'
      }).then((res) => {
        console.log(res)
        this.addressList = res.data.objects
      }).catch((err) => {
        console.log(err)
      })
    },
    manage() {
    }
  }
}
</script>
<style lang="scss" scoped>
#address {
  width: 90%;
  margin: 0 auto;
  li {
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 3px;
    background: $lightBg;
    .addressBox {
      display: flex;
      align-items: center;
    }
    .addressContent {
      flex: 1;
    }
    p {
      line-height: 1.5;
    }
    .check {
      flex: 0 0 24px;
      width: 24px;
      height: 24px;
      border: solid 2px $red;
      border-radius: 50%;
      &.checked {
        border: none;
        background: url('../../static/images/address-select.png') no-repeat;
        background-size: contain;
      }
    }
  }
}

#manage {
  padding: 20px 0;
  color: $red;
  text-align: right;
}

.my-btn {
  display: block;
  width: 300px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  border-radius: 20px;
  background: $red;
  color: #fff;
  text-decoration: none;
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>


