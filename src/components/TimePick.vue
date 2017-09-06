<template>
  <mt-datetime-picker
    ref="picker"
    type="time"
    v-model="pickerValue">
  </mt-datetime-picker>
</template>
<script>
  export default {
    name: 'TimePick',
    data(){
      return {
        pickerValue: ''
      }
    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
      }
    }
  }
</script>