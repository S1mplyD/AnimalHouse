<template lang="en">
  <html lang="en">
  <LeaderBoardHeader /> <!--Per i commenti sull'header, si vada nel file .vue dell'header stesso -->
  <div id="mainBody">
    <div class="overflow-auto" id="leaderdiv">
      <div class="table-responsive" aria-label="Label of the quiz game">
        <h1>Quiz Leaderboard</h1> <!--Qui di seguito è presente la tabella dei punteggi del quiz (trovabile nella sezione Games del sito) -->
        <table class="table table-bordered table-hover table-success">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
             <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in quiz">
              <th scope="row">{{ this.quiz.indexOf(user) + 1 }}</th>
              <td>{{ user.playerName }}</td>
              <td>{{ user.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    <div class="table-responsive" aria-label="Label of the memory game">
      <h1>Memory Leaderboard</h1> <!--Qui di seguito è presente la tabella dei punteggi del memory (trovabile nella sezione Games del sito) -->
      <table class="table table-bordered table-hover table-success">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in memory">
            <th scope="row">{{ this.memory.indexOf(user) + 1 }}</th>
            <td>{{ user.playerName }}</td>
            <td>{{ user.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-responsive" aria-label="Label of the HAnged Man game">
      <h1>Hanged Man Leaderboard</h1> <!--Qui di seguito è presente la tabella dei punteggi del gioco dell'impiccato (trovabile nella sezione Games del sito) -->
      <table class="table table-bordered table-hover table-success">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in hangman">
            <th scope="row">{{ this.hangman.indexOf(user) + 1 }}</th>
            <td>{{ user.playerName }}</td>
            <td>{{ user.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
  <SiteFooterVue />
  </html>
</template>
<script>
import LeaderBoardHeader from '@/components/headers/LeaderBoardHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
import axios from 'axios'

export default {
  name: 'LeaderBoardPage',
  components: {
    LeaderBoardHeader,
    SiteFooterVue
  },
  data () {
    return {
      quiz: [],
      memory: [],
      hangman: []
    }
  },
  mounted () {
    axios.get('/api/leaderboard') /* Chiamata API per ottenere i punteggi da inserire nella Leaderboard, fatta mediante axios */
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].game === 'quiz') {
            this.quiz.push(response.data[i])
          } else if (response.data[i].game === 'hangman') {
            this.hangman.push(response.data[i])
          } else if (response.data[i].game === 'memory') {
            this.memory.push(response.data[i])
          }
        }
      })
  }
}
</script>
<style lang="scss">
#mainBody {
  text-align: left;
  background-image: url("../assets/istockphoto-517188688-612x612.jpg");
  min-height: 800px;
  background-size: cover;
  border: 1px solid #333;
}
#leaderdiv{
    max-height: 700px;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    border-style: none;
  }
#leaderdiv::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
</style>
