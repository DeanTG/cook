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
      endDate: '',
      startTime: '10:00',
      endTime: '20:00',
      delayTime: 3,
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
      dateSlotsTimeVal: [],
      dateSlotsTimeVal1: []
    }
  },
  mounted() {
    this.setDate(this.startDate, this.endDate, this.startTime, this.endTime, this.delayTime)
    this.BUS.$on('openPicker', () => {
      this.popupVisible = true;
    })
  },
  methods: {
    setDate(start, end, sTime, eTime, delay) {
      let oneDay = 24 * 60 * 60 * 1000,
        startDate = new Date(start || new Date()),
        dayLength = end ? Math.round((new Date(end) - new Date(start || new Date()).getTime()) / oneDay) : 30,
        currentH = new Date().getHours(),
        index = 0;
      if (currentH >= this.endTime.split(':')[0] - this.delayTime) {
        index = 1;
      }
      for (let i = index; i < dayLength; i++) {
        let newDate = new Date(startDate.getTime() + i * oneDay),
          mm = (newDate.getMonth() + 1) < 10 ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1),
          dd = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate(),
          dataText = mm + '月' + dd + '日';
        this.dateSlots[0].values.push(dataText);
      }
      this.dateSlotsTimeVal = this._setTime(sTime, eTime, 0)
      this.dateSlotsTimeVal1 = this._setTime(sTime, eTime, delay)
    },
    _setTime(start, end, delay) {
      let timeVal = [],
        startHM = (start || "10:00").split(":"),
        endHM = (end || "20:00").split(":"),
        delayH = delay || 0,
        newStartHM = ((startHM[0] - 0 + delayH) + ':00').split(':'),
        currentH = new Date().getHours(),
        currentM = new Date().getMinutes();

      if (delayH) {
        if (currentM < 30) {
          newStartHM = ((currentH - 0 + delayH) + ':30').split(':')
        } else {
          newStartHM = ((currentH - 0 + delayH + 1) + ':00').split(':')
        }
      }

      for (let i = newStartHM[0]; i <= endHM[0]; i++) {
        if ((i == newStartHM[0]) && newStartHM[1] == '30') {
          timeVal.push(i + ":30");
        } else {
          timeVal.push(i + ":00");
          if (i != endHM[0]) {
            timeVal.push(i + ":30");
          }
        }
      }
      return timeVal;
    },
    onDateChange(picker, values, index) {
      if (this.delayTime && (new Date().getHours() < this.endTime.split(':')[0] - this.delayTime)) {
        this.dateSlots[1].values = this.dateSlotsTimeVal1;
      } else {
        this.dateSlots[1].values = this.dateSlotsTimeVal;
      }
      if (values[0] && values[1]) {
        let newVal = values[0].replace(/月/, '-'),
          dateVal = newVal.replace(/日/, '');
        this.timeText = values[0] + ' ' + values[1];
        this.timeVal = new Date().getFullYear() + '-' + dateVal + ' ' + values[1]
      }
    },
    closePopup() {
      this.BUS.$emit('dinnerTimeText', this.timeText)
      if (this.$route.path.substring(1) == 'private') {
        this.BUS.$emit('dinnerTimeVal', this.timeVal)
      } else {
        this.BUS.$emit('collect_dinnerTimeVal', this.timeVal)
      }
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
