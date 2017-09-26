<template>
  <div id="main">
    <div class="mainView">
      <router-view></router-view>
    </div>
    <Tabbar class="tabbar"></Tabbar>
  </div>
</template>
<script>
import Tabbar from '../components/Tabbar.vue'
export default {
  name: 'Main',
  components: {
    Tabbar
  }
}

</script>
<style lang="scss" scoped>
#main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .mainView {
    flex: 1;
    overflow: scroll;
  }
  .tabbar {
    flex: 0 0 56px;
  }
}
</style>
