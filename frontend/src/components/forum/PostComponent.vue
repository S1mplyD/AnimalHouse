<template lang="en">
    <div v-for="post in posts" class="lightbox" @click.self="closeLightbox">
      <div class="lightbox-info">
       <div class="card text-center" style="width: 700px; min-height:260px; max-height: 700px">
        <div class="card-body">
            <h5 v-if="post.title && post.user" class="card-title"><b>{{ post.title }} by {{ post.user }}</b></h5>
            <p v-if="post.post" class="card-text">{{ post.post }}</p>
            <p v-if="post.date" class="card-text"><small class="text-muted">{{ post.date }}</small></p>
            <div class="overflow-auto" id="image">
              <div class="container d-flex flex-wrap">
                <div class="row">
                  <div class="col">
                    <img :src="post.photos[0]" alt="...">
                  </div>
                  <div class="col">
                    <img :src="post.photos[1]" alt="...">
                  </div>
                  <div class="col">
                    <img :src="post.photos[2]" alt="...">
                  </div>
              </div>
            </div>
            </div>
            <div class="overflow-auto" id="comms">
              <ul class="list-group list-group-flush">
                <li v-for="comment in comments" class="list-group-item">
                    <p class="card-text"><b>{{ comment.user }}</b> commented: {{ comment.comment }}</p>
                    <div class="btn-group btn-group-sm" role="group">
                      <button type="button" class="btn btn-secondary" id="replier" @click="addtag(comment.user, comment._id)">Reply to this comment</button>
                      <button type="button" class="btn btn-secondary" id="nevermind" @click="nevermind()" disabled>Nevermind...</button>
                    </div>
                    <div v-for="reply in answers">
                        <div v-for="id in comment.replies">
                          <p v-if="reply._id === id" class="card-text"><small><b>{{ reply.user }}</b> replied: {{ reply.comment }}</small></p>
                        </div>
                    </div>
                </li>
              </ul>
            </div>
            <form>
              <div class="mb-3">
                <label for="textcomment" class="form-label">Do you want post a comment?</label>
                <textarea type="text" id="textcomment" class="form-control" aria-describedby="textComment" placeholder="Write your comment here..." cols="50" rows="3" style="resize:none;"></textarea>
              </div>
              <button type="button" class="btn btn-primary" id="comment" @click="comment()">Submit your comment</button>
              <button type="button" class="btn btn-secondary" id="reply" @click="reply()" disabled>Submit your reply</button>
            </form>
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
      answers: [],
      commentId: '',
      userName: ''
    }
  },
  methods: {
    closeLightbox () {
      this.$router.push('/forum')
    },
    comment: async function () {
      axios.post('/api/comments', { comment: document.getElementById('textcomment').value }, { params: { id: this.posts[0]._id } }).then((res) => {
        console.log(res)
        location.reload()
      })
    },
    addtag: function (user, id) {
      document.getElementById('textcomment').innerHTML += '@' + user + ' '
      this.userName = user
      this.commentId = id
      document.getElementById('replier').disabled = true
      document.getElementById('comment').disabled = true
      document.getElementById('reply').disabled = false
      document.getElementById('nevermind').disabled = false
    },
    nevermind: function () {
      document.getElementById('textcomment').innerHTML = ''
      document.getElementById('replier').disabled = false
      document.getElementById('reply').disabled = true
      document.getElementById('comment').disabled = false
      document.getElementById('nevermind').disabled = true
    },
    reply: async function () {
      axios.post('/api/comments/reply', { comment: document.getElementById('textcomment').value }, { params: { id: this.commentId, user: this.userName } }).then((res) => {
        console.log(res)
        location.reload()
      })
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
    #comms {
      max-height: 200px;
      -ms-overflow-style: none; /* for Internet Explorer, Edge */
      scrollbar-width: none; /* for Firefox */
      border-style: none;
    }
    #image {
      max-height: 200px;
      -ms-overflow-style: none; /* for Internet Explorer, Edge */
      scrollbar-width: none; /* for Firefox */
      border-style: none;
    }

    #comms::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
    #image::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
    .lightbox-info {
      margin: auto 2rem auto 0;
      position: fixed;
      top: 5%;
      left: 33%;
    }

  </style>
