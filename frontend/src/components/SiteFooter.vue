<template>
  <html lang="en">
  <footer>
    <b><p style="color:white;">Copyright &copy; {{ year }}</p></b> <!--Testo che indica il copyrignt del sito con l'anno corrente -->
  </footer>
  </html>
</template>

<script>
import { computed } from 'vue'

export default {
  setup () {
    const year = computed(() => new Date().getFullYear()) /* Questo codice permette di ottenere l'anno corrente in cui ci si trova */
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
