<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
.routerlink{
  color:#09ff00;
  &:hover{
    color:#a6ff00;
  }
}
header {
  top: 10px;
  right: 10px;
}
</style>
