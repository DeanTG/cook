<template>
  <div id="index">
    <mt-header title="吾掌勺" fixed>
      <mt-button slot="left">上海</mt-button>
      <router-link to="/explanation" slot="right">
        <mt-button>服务说明</mt-button>
      </router-link>
    </mt-header>
    <Swipe></Swipe>
  </div>
</template>
<script>
import Swipe from '../components/Swipe.vue'
export default {
  name: 'Index',
  components: {
    Swipe
  }
}

</script>
<style scoped>
  .mint-header{
    background: rgba(0, 0, 0, 0.3)
  }
</style>
