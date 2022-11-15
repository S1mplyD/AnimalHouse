<template lang="en">
<body class="bodymain">
<HomeHeaderVue />
  <section class="body">
    <nav class="Images">
    <p id="shoptext">Do you want to see other pics? <router-link :to="{name: 'gallery'}" class="routerlink">Go to our Gallery!</router-link></p>
    <div class="overflow-auto" id="photodiv">
    <ul>
      <li v-for="photo in gallery" :key="photo">
        <img class="Imageshow1" :src="'https://site212211.tw.cs.unibo.it/' + photo.filename"/>
      </li>
    </ul>
    </div>
    </nav>
    <nav class="TopPosts" >
      <p id="shoptext">Do you want to see other posts from our community? <router-link :to="{name: 'forum'}" class="routerlink">Go to the community Forum!</router-link></p>
      <br>
      <ul>
      <li v-for="post in posts" :key="post" id="postObj">
        <div class="card h-100" id="card" >
          <div class="card-body">
            <h5 class="card-title"><b>{{ post.title }}</b> by {{ post.user }}:</h5>
            <p class="card-text">{{ post.post_summary }}</p>
            <p class="card-text"><small class="text-muted">{{ post.date }}</small></p>
          </div>
        </div>
      </li>
      <br>
      </ul>
    </nav>
    <nav class="ADS">
      <div id="carousel" class="carousel carousel- slide carousel-fade" data-bs-ride="carousel">
         <div class="carousel-indicators">
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner" style="border-radius: 25px">
              <div class="carousel-item active">
                <img :src="'https://site212211.tw.cs.unibo.it/' + products[0].mainPhoto" class="d-block w-100" alt="" id="carousel-image"/>
              </div>
              <div class="carousel-item">
                <img :src="'https://site212211.tw.cs.unibo.it/' + products[1].mainPhoto" class="d-block w-100" alt="" id="carousel-image"/>
              </div>
              <div class="carousel-item">
                <img :src="'https://site212211.tw.cs.unibo.it/' + products[2].mainPhoto" class="d-block w-100" alt="" id="carousel-image"/>
              </div>
              <div class="carousel-item">
                <img :src="'https://site212211.tw.cs.unibo.it/' + products[3].mainPhoto" class="d-block w-100" alt="" id="carousel-image"/>
              </div>
              <div class="carousel-item">
                <img :src="'https://site212211.tw.cs.unibo.it/' + products[4].mainPhoto" class="d-block w-100" alt="" id="carousel-image"/>
              </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <p id="shoptext">Do you want to see other items? <router-link :to="{name: 'shop'}" class="routerlink">Go to our shop</router-link> to see every products!</p>
    </nav>
  </section>
  <SiteFooterVue/>
  </body>
</template>

<script>
import HomeHeaderVue from '@/components/headers/HomeHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
import CarouselMain from '@/components/carousel/CarouselMain.vue'
import SlideImage from '@/components/carousel/SlideImage.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  mounted () {
    axios.get('https://site212211.tw.cs.unibo.it/api/products')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i])
          if (i < 5) {
            this.products.push(response.data[i])
          }
        }
      })
    axios.get('https://site212211.tw.cs.unibo.it/api/posts')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i])
          if (i < 3) {
            this.posts.push(response.data[i])
          }
        }
      })

    axios.get('https://site212211.tw.cs.unibo.it/api/gallery')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i])
          if (i < 5) {
            this.gallery.push(response.data[i])
          }
        }
      })
  },
  components: { HomeHeaderVue, SiteFooterVue, CarouselMain, SlideImage },
  data () {
    return {
      gallery: [],
      posts: [],
      products: []
    }
  },
  setup () {
    const carouselSlides = ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5']
    return { carouselSlides }
  },
  methods: {
    goToShop () {
      return this.$router.push('/shop')
    }
  }
}
</script>

<style lang="scss">
  .home {
    display: flex;
    border-bottom: 1px solid rgb(3, 3, 3);
    padding: .5rem 1rem;
    p {
      margin-left: 1rem;
    }
  }
  .loginsection {
    margin-left: auto;
    ul {
      list-style: none;
    }
    ul li {
      display: inline-flex;
      margin-left: 1rem;
    }
  }
  .body{
    height: 800px;
    border: 1px solid #333;
  }
  .Images {
  float: left;
  text-align: center;
  width: 30%;
  height:100%;
  object-fit: cover;
  background: rgb(60, 121, 150);
  padding: 20px;
  .Imageshow1{
   width: 90%;
   border-radius: 0.75rem;
  }
  .Imageshow2{
   width: 90%;
   height: 55%;
   border-radius: 0.75rem;
  }
   .Imageshow3{
   width: 90%;
   height: 55%;
   border-radius: 0.75rem;
  }
}
.TopPosts {
  float: right;
  text-align: center;
  width: 30%;
  height:100%;
  background: rgb(60, 121, 150);
  padding: 20px;
}
#card{
  width: 450px;
  height: 450px;
}

.ADS {
  margin: auto;
  text-align: center;
  width: 40%;
  height:100%;
  background: rgb(47, 39, 148);
  padding: 20px;
}
.carousel{
  position: relative;
}
.slide-info{
  position: absolute;
  width: 500px;
  height:500px;
  padding: 20px;
}
.slidebody{
  float:center;
  width: 680px;
  border-radius: 0.75rem;
  height: 500px;
  padding: 20px;
  border: 3px solid rgb(0, 0, 0);
  background: rgb(39, 192, 103);
  .image{
   margin-right: 3px;
   width: 638px;
   height: 390px;
  }
}
#shoptext{
  color: white;
}
 #photodiv{
    max-height: 700px;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    border-style: none;
  }
#photodiv::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
#carousel-image{
  height: 500px;
  width: 680px;
  object-fit: cover;
}
</style>
