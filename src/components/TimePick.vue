<template>
  <mt-popup v-model="popupVisible" position="bottom" pop-transition="pop-fade">
    <mt-picker :slots="dateSlots" @change="onDateChange" :defaultIndex="1" :visible-item-count="5" :show-toolbar="false"></mt-picker>
    <mt-button type="default" @click="closePopup">确定</mt-button>
  </mt-popup>
</template>
<script>
export default {
  name: 'TimePick',
  data() {
    return {
      popupVisible: false,
      startDate: new Date(),
      timeText: '',
      timeVal: '',
      dateSlots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        }
      ],
    }
  },
  mounted() {
    this.setDate()
    this.setTime('10:00', '20:00', 0)
    this.BUS.$on('openPicker', () => {
      this.popupVisible = true;
    })
  },
  methods: {
    setDate() {
      let oneDay = 24 * 60 * 60 * 1000,
        startDate = new Date(this.startDate || new Date());

      for (let i = 0; i < 30; i++) {
        let newDate = new Date(startDate.getTime() + i * oneDay),
          mm = (newDate.getMonth() + 1) < 10 ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1),
          dd = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate(),
          dataVal = startDate.getFullYear() + '-' + mm + '-' + dd,
          dataText = mm + '月' + dd + '日';
        this.dateSlots[0].values.push(dataText);
      }
    },
    setTime(start, end, delay1) {
      let startHM = (start || "10:00").split(":"),
        endHM = (end || "20:00").split(":"),
        delay = delay1 || 0;

      for (let i = startHM[0] - 0 + delay; i <= endHM[0]; i++) {
        if ((i == startHM[0] - 0 + delay) && startHM[1] == '30') {
          this.dateSlots[1].values.push(i + ":30");
        } else {
          this.dateSlots[1].values.push(i + ":00");
          if (i != endHM[0]) {
            this.dateSlots[1].values.push(i + ":30");
          }
        }
      }
    },
    onDateChange(picker, values, index) {
      /* if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      } */
      if (values[0] && values[1]) {
        let newVal = values[0].replace(/月/, '-'),
          dateVal = newVal.replace(/日/, '');
        this.timeText = values[0] + ' ' + values[1];
        this.timeVal = new Date().getFullYear() + '-' + dateVal + ' ' + values[1]
      }
    },
    closePopup() {
      this.BUS.$emit('dinnerTimeText', this.timeText)
      this.BUS.$emit('dinnerTimeVal', this.timeVal)
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
  border-radius: 8px;
  background: #fff;
}

.mint-button--default {
  width: 100%;
  height: 46px;
  line-height: 46px;
  margin-top: 10px;
  border-radius: 8px;
  background: #fff;
}

.mint-popup-bottom {
  width: 90%;
  bottom: 10px;
}
</style>
