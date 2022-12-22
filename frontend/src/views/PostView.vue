<template lang="en">
<body class="bodymain">
 <div>
  <ForumComponent />
  <PostComponent />
 </div>
 </body>
</template>

<script>
import PostComponent from '../components/forum/PostComponent.vue'
import ForumComponent from '../components/forum/ForumComponent.vue'

export default {
  name: 'PostView',
  components: {
    ForumComponent,
    PostComponent
  }
}
</script>
