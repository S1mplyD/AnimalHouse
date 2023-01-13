<template lang="en">
    <div  v-for="post in posts" class="lightbox" @click.self="closeLightbox">
      <div class="lightbox-info">
       <div class="card text-center" style="width: 700px; min-height:260px">
        <div class="card-body">
            <h5 v-if="post.title && post.user" class="card-title"><b>{{ post.title }} by {{ post.user }}</b></h5>
            <p v-if="post.post" class="card-text">{{ post.post }}</p>
            <p v-if="post.date" class="card-text"><small class="text-muted">{{ post.date }}</small></p>
            <ul class="list-group list-group-flush">
                <li v-for="comment in comments" class="list-group-item">
                    <p class="card-text"><b>{{ comment.user }}</b> commented: {{ comment.comment }}</p>
                    <div v-for="reply in answers">
                        <p class="card-text"><small><b>{{ reply.user }}</b> replied: {{ reply.comment }}</small></p>
                    </div>
                </li>
            </ul>
        </div>
       </div>
      </div>

    </div>
  </template>
<script>
import axios from 'axios'
export default {
  name: 'PostComponent',
  mounted () {
    axios.get('/api/posts')
      .then((response) => {
        console.log(this.$route.params.id)
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]._id === this.$route.params.id) {
            this.posts.push(response.data[i])
          }
        }
      })
      .then(() => {
        axios.get('/api/comments', { params: { id: this.posts[0]._id } })
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              this.comments.push(response.data[i])
            }
          })
          .then(() => {
            for (let i = 0; i < this.comments.length; i++) {
              axios.get('/api/comments/reply', { params: { id: this.comments[i]._id } })
                .then((response) => {
                  for (let i = 0; i < response.data.length; i++) {
                    this.answers.push(response.data[i])
                  }
                })
            }
          })
      })
  },
  data () {
    return {
      posts: [],
      comments: [],
      answers: []
    }
  },
  methods: {
    closeLightbox () {
      this.$router.push('/forum')
    }
  }
}
</script>

  <style>
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 2rem;
    }
    .lightbox-info {
      margin: auto 2rem auto 0;
      position: fixed;
      top: 33%;
      left: 33%;
    }

  </style>
