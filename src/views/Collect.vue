<template>
  <div id="collect">
    <SiftBox class="collect-siftBox"></SiftBox>
    <div class="collect-chefList">
      <ChefList></ChefList>
    </div>
    <TimePick></TimePick>
  </div>
</template>
<script>
import SiftBox from '../components/SiftBox'
import TimePick from '../components/TimePick'
import ChefList from '../components/chefList'
export default {
  name: 'Collect',
  data() {
    return {
      selected: '1'
    }
  },
  mounted(){
    localStorage.removeItem('order')
  },
  components: {
    SiftBox,
    TimePick,
    ChefList
  }
}

</script>
<style lang="scss" scoped>
#collect {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 0 auto;
  // overflow: hidden;
}
.collect-siftBox{
  flex: 0 0 35px;
  width: 90%;
  margin: 0 auto;
}
.collect-chefList {
  flex: 1;
  width: 90%;
  margin: 20px auto 0;
  overflow: scroll;
}
</style>
