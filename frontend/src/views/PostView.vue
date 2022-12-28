<template lang="en">
 <div>
  <ForumComponent />
  <PostComponent />
 </div>
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
