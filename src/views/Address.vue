<template>
  <div id="address">
    <div id="manage" @click="manage" v-show="!fromPay">{{showDelete?'保存':'管理'}}</div>
    <ul>
      <li v-for="(item,index) in addressList" :key="index" @click="backPay(index)">
        <div class="delete" :class="{'show':showDelete}" @click="deleteAddress(index)"></div>
        <div class="addressBox">
          <div class="addressContent">
            <p>{{item.name}}</p>
            <p>{{item.phone | encrypt}}</p>
            <p>{{item.address}}</p>
          </div>
          <div :class="{'checked': index===def}" class="check" @click="changeAddressState(index)" v-show="!showDelete && !fromPay"></div>
        </div>
      </li>
    </ul>
    <router-link to="/addAddress" class="my-btn" v-show="!showDelete">新增地址</router-link>
  </div>
</template>
<script>
export default {
  name: 'Address',
  data() {
    return {
      addressList: [],
      def: -1,
      showDelete: false,
      fromPay: false,
    }
  },
  beforeMount() {
    if (JSON.parse(localStorage.getItem('order'))) this.fromPay = true
  },
  mounted() {
    this.getAddress()
  },
  methods: {
    getAddress() {
      this.$http.post('', {
        requestCode: "10100",
        member_id: '151'
      }).then((res) => {
        console.log(res)
        res.data.objects.forEach((val, index, arr) => {
          if (val.def == 0) {
            this.def = index
          }
        });
        this.addressList = res.data.objects
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteAddress(i) {
      this.$messagebox.confirm('确认删除地址？', '').then(() => {
        this.addressList.splice(i, 1)
      }, () => {
      })
    },
    changeAddressState(i) {
      if (this.def == i) {
        this.def = -1
      } else {
        this.def = i
      }
    },
    manage() {
      if (this.showDelete) {
        this.showDelete = false
      } else {
        this.showDelete = true
      }
    },
    backPay(i) {
      if (!this.fromPay) return
      let order = JSON.parse(localStorage.getItem('order'));
      order.address = this.addressList[i];
      this.$router.push({ path: '/pay' })
      localStorage.setItem('order', JSON.stringify(order))
    }
  }
}
</script>
<style lang="scss" scoped>
#address {
  width: 90%;
  margin: 0 auto;
  ul {
    padding-top: 20px;
  }
  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 3px;
    .delete {
      flex: 0 0 0;
      width: 0;
      height: 24px;
      margin-right: 0;
      background: url('../../static/images/busy.png') no-repeat;
      background-size: 100%;
      transition: all 0.3s linear;
      &.show {
        flex: 0 0 24px;
        width: 24px;
        margin-right: 20px;
        transition: all 0.3s linear;
      }
    }
    .addressBox {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 10px 15px;
      background: $lightBg;
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
      margin-left: 10px;
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
  padding: 20px 0 0;
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


