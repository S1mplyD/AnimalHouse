<template lang="en">
<body class="bodymain">
<HomeHeaderVue />
  <section class="body">
    <nav class="Images">
    <p id="shoptext">Do you want to see other pics? <router-link :to="{name: 'gallery'}" class="routerlink">Go to our Gallery!</router-link></p>
    <div class="overflow-auto" id="photodiv">
    <ul>
      <li v-for="photo in gallery" :key="photo">
        <img class="Imageshow1" :src="photo.filename"/>
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
      <div class="productsCarousel">
        <div class="innerCarousel">
          <div class="productImage" v-for="product in products" :key="product">
            <img :src="product.mainPhoto">
          </div>
        </div>
      </div>
      <button class="btn btn-dark btn-lg btn-block" id="buttonPrev" @click="prev()">Prev</button>
      <button class="btn btn-dark btn-lg btn-block" id="buttonNext" @click="next()">Next</button>
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
    this.setStep()
    this.resetTranslate()
  },
  components: { HomeHeaderVue, SiteFooterVue, CarouselMain, SlideImage },
  data () {
    return {
      gallery: [],
      posts: [],
      products: [],
      transitioning: false
    }
  },
  setup () {
    const carouselSlides = ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5']
    return { carouselSlides }
  },
  methods: {
    goToShop () {
      return this.$router.push('/shop')
    },
    setStep () {
      const innerWidth = this.$refs.inner.scrollWidth
      const totalProds = this.products.length
      this.step = `${innerWidth / totalProds}px`
    },
    next () {
      if (this.transitioning) return
      this.transitioning = true
      this.moveLeft()
      this.afterTransition(() => {
        const prod = this.products.shift()
        this.products.push(prod)
        this.resetTranslate()
        this.transitioning = false
      })
    },
    resetTranslate () {
      this.innerStyles = {
        transition: 'none',
        transform: `translateX(-${this.step})`
      }
    },
    prev () {
      if (this.transitioning) return
      this.transitioning = true
      this.moveRight()
      this.afterTransition(() => {
        const prod = this.products.shift()
        this.products.push(prod)
        this.resetTranslate()
        this.transitioning = false
      })
    },

    afterTransition (callback) {
      const listener = () => {
        callback()
        this.$refs.inner.removeEventListener('transitionend', listener)
      }
      if (this.$refs.inner) {
        this.$refs.inner.addEventListener('transitionend', listener)
      }
    },

    moveLeft () {
      this.innerStyles = {
        transform: `translateX(-${this.step})
                    translateX(-${this.step})`
      }
    },
    moveRight () {
      this.innerStyles = {
        transform: `translateX(${this.step})
                    translateX(-${this.step})`
      }
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
.productsCarousel{
  width: 100%;
  overflow: hidden;
}
.innerCarousel{
  white-space: nowrap;
  transition: transform 0.2s;
}
.productImage{
  width: 50%;
  margin-right: 10px;
  display: inline-flex;
}
#buttonPrev, #buttonNext{
  margin-right: 5px;
  margin-top: 10px;
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
