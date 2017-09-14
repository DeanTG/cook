<template>
  <mt-popup v-model="popupVisible" position="bottom" pop-transition="pop-fade">
    <mt-picker :slots="dateSlots" @change="onDateChange" :visible-item-count="4" :show-toolbar="false"></mt-picker>
    <mt-button type="default" @click="closePopup">确定</mt-button>
  </mt-popup>
</template>
<script>
export default {
  name: 'TimePick',
  data() {
    return {
      popupVisible: false,
      dateSlots: [
        {
          flex: 1,
          values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
          className: 'slot1',
          textAlign: 'center'
        }, {
          flex: 1,
          values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
    }
  },
  mounted() {
    this.BUS.$on('openPicker', () => {
      this.popupVisible = true;
    })
  },
  methods: {
    onDateChange() {
    },
    handleTime() {
    },
    closePopup() {
      this.popupVisible = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.mint-popup {
  background: transparent;
}

.picker {
  padding: 20px 0;
  border-radius: 4px;
  background: #fff;
}

.mint-button--default {
  width: 100%;
  margin-top: 10px;
  background: #fff;
}

.mint-popup-bottom {
  width: 90%;
  bottom: 10px;
}
</style>
