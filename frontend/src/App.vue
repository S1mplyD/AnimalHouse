<template lang="en">
<!-- Qui si gestisce il router, che permette di cambiare le schermate del sito rimanendo su una stessa pagina. Vue fa uso di un sistema
basato su Single Page Applications, quindi non fa altro che aggiornare l'unica pagina-->
  <router-view/>
</template>
<!--Qui non c'è molto da dire: si da un nome all'app -->
<script>
</script>
<!--Definisco lo stile che sarà visibile nella maggior parte degli elementi della app, come font e colore dei link. Stili precisi vengono poi definiti nei singoli componenti e nelle singole view -->
<style lang="scss">
#app{
  @import url('https://fonts.googleapis.com/css?family=Roboto');
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
.bodymain{
  background-color: rgb(60, 121, 150);
}
header {
  top: 10px;
  right: 10px;
}
</style>
