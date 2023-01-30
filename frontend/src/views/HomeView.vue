<template lang="en">
<HomeHeaderVue />
  <section class="body">
    <nav class="Images" aria-labelledby="Gallery">
    <p id="imagestext">Do you want to see other pics? <router-link :to="{name: 'gallery'}" class="routerlink">Go to our Gallery!</router-link></p>
    <div class="overflow-auto" id="photodiv">
      <img v-if="gallery[0]" :src="gallery[0].filename" class="ImageShow" alt="" />
      <img v-else src="@/assets/Photo-Unavailable.jpg" class="ImageShow" alt=""/>
      <img v-if="gallery[1]" :src="gallery[1].filename" class="ImageShow" alt="" />
      <img v-else src="@/assets/Photo-Unavailable.jpg" class="ImageShow" alt=""/>
      <img v-if="gallery[2]" :src="gallery[2].filename" class="ImageShow" alt="" />
      <img v-else src="@/assets/Photo-Unavailable.jpg" class="ImageShow" alt=""/>
      <img v-if="gallery[3]" :src="gallery[3].filename" class="ImageShow" alt="" />
      <img v-else src="@/assets/Photo-Unavailable.jpg" class="ImageShow" alt=""/>
      <img v-if="gallery[4]" :src="gallery[4].filename" class="ImageShow" alt="" />
      <img v-else src="@/assets/Photo-Unavailable.jpg" class="ImageShow" alt=""/>
    </div>
    </nav>
    <nav class="TopPosts" aria-labelledby="Forum">
      <p id="poststext">Do you want to see other posts from our community? <router-link :to="{name: 'forum'}" class="routerlink">Go to the community Forum!</router-link></p>
      <br>
      <div class="container d-flex flex-wrap">
        <div class="card h-100" id="card1" >
          <div class="card-body">
            <h5 class="card-title"><b>{{ posts[0].title }}</b> by {{ posts[0].user }}:</h5>
            <p class="card-text">{{ posts[0].post_summary }}</p>
            <p class="card-text"><small class="text-muted">{{ posts[0].date }}</small></p>
          </div>
        </div>
        <div class="card h-100" id="card2">
          <div class="card-body">
            <h5 class="card-title"><b>{{ posts[1].title }}</b> by {{ posts[1].user }}:</h5>
            <p class="card-text">{{ posts[1].post_summary }}</p>
            <p class="card-text"><small class="text-muted">{{ posts[1].date }}</small></p>
          </div>
        </div>
        <div class="card h-100" id="card3">
          <div class="card-body">
            <h5 class="card-title"><b>{{ posts[2].title }}</b> by {{ posts[2].user }}:</h5>
            <p class="card-text">{{ posts[2].post_summary }}</p>
            <p class="card-text"><small class="text-muted">{{ posts[2].date }}</small></p>
          </div>
        </div>
      </div>
    </nav>
    <nav class="ADS" aria-labelledby="Shop">
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
                <img v-if="products[0]" :src="products[0].mainPhoto" class="d-block w-100" alt="" id="carousel-image1"/>
                <img v-else src="@/assets/Photo-Unavailable.jpg" class="d-block w-100" alt="" id="carousel-image1"/>
              </div>
              <div class="carousel-item">
                <img v-if="products[1]" :src="products[1].mainPhoto" class="d-block w-100" alt="" id="carousel-image2"/>
                <img v-else src="@/assets/Photo-Unavailable.jpg" class="d-block w-100" alt="" id="carousel-image2"/>
              </div>
              <div class="carousel-item">
                <img v-if="products[2]" :src="products[2].mainPhoto" class="d-block w-100" alt="" id="carousel-image3"/>
                <img v-else src="@/assets/Photo-Unavailable.jpg" class="d-block w-100" alt="" id="carousel-image3"/>
              </div>
              <div class="carousel-item">
                <img v-if="products[3]" :src="products[3].mainPhoto" class="d-block w-100" alt="" id="carousel-image4"/>
                <img v-else src="@/assets/Photo-Unavailable.jpg" class="d-block w-100" alt="" id="carousel-image4"/>
              </div>
              <div class="carousel-item">
                <img v-if="products[4]" :src="products[4].mainPhoto" class="d-block w-100" alt="" id="carousel-image5"/>
                <img v-else src="@/assets/Photo-Unavailable.jpg" class="d-block w-100" alt="" id="carousel-image5"/>
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
</template>

<script>
import HomeHeaderVue from '@/components/headers/HomeHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  mounted () {
    axios.get('/api/products')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i])
          if (i < 5) {
            this.products.push(response.data[i])
          }
        }
      })
    axios.get('/api/posts')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i])
          if (i < 3) {
            this.posts.push(response.data[i])
          }
        }
      })
    axios.get('/api/gallery')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i])
          if (i < 5) {
            this.gallery.push(response.data[i])
          }
        }
      })
  },
  components: { HomeHeaderVue, SiteFooterVue },
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
  background-image: url("../assets/istockphoto-517188688-612x612.jpg");
  background-size: cover;
  padding: 20px;
  .ImageShow{
   width: 90%;
   border-radius: 0.75rem;
   object-fit: cover;
  }
}
.TopPosts {
  float: right;
  text-align: center;
  width: 30%;
  height:100%;
  object-fit: cover;
  background-image: url("../assets/istockphoto-517188688-612x612.jpg");
  background-size: cover;
  padding: 20px;
  #card1, #card2, #card3{
    width: 90%;
    border-radius: 0.75rem;
    object-fit: cover;
  }
}

.ADS {
  margin: auto;
  text-align: center;
  width: 40%;
  height:100%;
  background-image: url("../assets/Desktop-hd-wallpaper-nature-1080p.jpg");
  background-size: cover;
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
#shoptext, #imagestext, #poststext{
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
#carousel-image1, #carousel-image2, #carousel-image3, #carousel-image4, #carousel-image5{
  height: 500px;
  width: 680px;
  object-fit: cover;
}
</style>
