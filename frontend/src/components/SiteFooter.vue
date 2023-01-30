<template lang="en">
  <footer>
    <b><p style="color:white;">Copyright &copy; {{ year }}</p></b>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  setup () {
    const year = computed(() => new Date().getFullYear())
    return { year }
  }
}
</script>
<style lang="scss">
footer{
  bottom: 4px;
  height: 100%;
  background-color: rgb(41, 109, 64);
  padding-top: 47px;
  padding-bottom: 40px ;
}
</style>
