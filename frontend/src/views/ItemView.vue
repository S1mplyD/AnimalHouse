<template lang="it">
<body class="bodymain">
 <div>
  <ShopComponent />
  <ItemComponent />
 </div>
 </body>
</template>

<script>
import ShopComponent from '../components/shop/ShopComponent.vue'
import ItemComponent from '../components/shop/ItemComponent.vue'

export default {
  name: 'PostView',
  components: {
    ShopComponent,
    ItemComponent
  }
}
</script>
