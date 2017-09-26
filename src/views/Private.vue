<template>
  <div id="private">
    <header>
      <h6 class="info">亲爱的用户，我们的厨师都是五星级大厨。请放心选择</h6>
      <SiftBox></SiftBox>
    </header>
    <ChefList></ChefList>
    <TimePick></TimePick>
  </div>
</template>
<script>
import ChefList from '../components/chefList.vue'
import SiftBox from '../components/SiftBox.vue'
import TimePick from '../components/TimePick.vue'
export default {
  name: 'Private',
  data() {
    return {
      userId: '151',
      dinnerTime: '',
      chefName: '',
    }
  },
  components: {
    ChefList,
    SiftBox,
    TimePick
  }
}

</script>
<style lang="scss" scoped>
body {
  background: $black;
}

#private {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

header,
.chefList {
  width: 90%;
  margin: 0 auto;
}

header {
  flex: 0 0 102px;
  padding-bottom: 20px;
}

.info {
  line-height: 30px;
  padding: 0;
  margin: 0;
  border-radius: 0 0 4px 4px;
  background: $lightBg;
  color: #ccc;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
}

</style>
