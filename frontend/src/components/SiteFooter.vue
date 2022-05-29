<template>
  <footer>
    <p>Copyright &copy; {{ year }}</p>
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
  background-color: rgb(0, 68, 40);
  padding-top: 47px;
  padding-bottom: 40px ;
}
</style>
