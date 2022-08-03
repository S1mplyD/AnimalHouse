<template lang="it">
<body class="bodymain">
<HomeHeaderVue />
  <section class="body">
    <nav class="Images">
    <ul>
      <li class="gallery">
         <p>Do you want to see other pics? <router-link :to="{name: 'gallery'}" class="routerlink">Go to our Gallery!</router-link></p>
      </li>
      <li v-for="photo in photos" :key="photo" >
        <img class="Imageshow1" v-if="photo.id==0" :src="thumbUrl(photo.filename)"/>
      </li>
      <li v-for="photo in photos" :key="photo" >
        <img class="Imageshow2" v-if="photo.id==1" :src="thumbUrl(photo.filename)"/>
      </li>
    </ul>
    </nav>
    <nav class="TopPosts">
    <ul>
      <li><p>Do you want to see other posts from our community? <router-link :to="{name: 'forum'}" class="routerlink">Go to the community Forum!</router-link></p></li>
      <li class="Postshow1" >
        <div v-for="post in posts" :key="post"  >
         <p  v-if="post.id==0"><b>{{post.title}}</b> by {{post.user}}: </p>
         <p  v-if="post.id==0">{{post.date}}</p>
         <p  v-if="post.id==0">{{post.post_summary}}</p>
        </div>
      </li>
      <li class="Postshow2">
        <div v-for="post in posts" :key="post">
         <p  v-if="post.id==1"><b>{{post.title}}</b> by {{post.user}}: </p>
         <p v-if="post.id==1">{{post.date}}</p>
         <p v-if="post.id==1">{{post.post_summary}}</p>
        </div>
      </li>
      <li class="Postshow3">
        <div v-for="post in posts" :key="post">
         <p  v-if="post.id==2"><b>{{post.title}}</b> by {{post.user}}: </p>
         <p v-if="post.id==2">{{post.date}}</p>
         <p v-if="post.id==2">{{post.post_summary}}</p>
        </div>
      </li>
    </ul>
    </nav>
    <nav class="ADS">
      <CarouselMain
        navigation="true"
        :pagination="true"
        :startAutoPlay="false"
        :timeout="5000"
        class="carousel"
        v-slot="{ currentSlide }"
      >
        <SlideImage v-for="(slide, index) in carouselSlides" :key="index">
          <div v-show="currentSlide === index + 1" class="slide-info">
            <section class="slidebody">
              <img :src="require(`../assets/${slide}.jpg`)" alt="" class="image" />
              <nav class="shoplink">
                <ul>
                  <li>
                    <p>Item number {{currentSlide}}</p>
                  </li>
                </ul>
              </nav>
              <p>Do you want to see other items? <router-link :to="{name: 'shop'}" class="routerlink">Go to our shop</router-link> to see every products!</p>
            </section>
          </div>
        </SlideImage>
      </CarouselMain>
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
import photos from '@/photos.json'
import posts from '@/posts.json'
export default {
  name: 'HomeView',
  components: { HomeHeaderVue, SiteFooterVue, CarouselMain, SlideImage },
  data () {
    return {
      photos,
      posts
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
    thumbUrl (filename) {
      return require(`@/assets/images/thumbnails/${filename}`)
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
  background: rgb(60, 121, 150);
  padding: 20px;
  .gallery{
    transform: translateY(-100%);
  }
  .Imageshow1{
   width: 55%;
   height: 55%;
   object-fit: cover;
   transform: translate(40%, -40%);
   border-radius: 0.75rem;
  }
  .Imageshow2{
   width: 55%;
   height: 55%;
   object-fit: cover;
   transform: translate(40%, -40%);
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
  .Postshow1{
    display: flex;
   border: 1px solid rgb(3, 3, 3);
  font-size: 150%;
  background-color: rgb(117, 117, 117);
  padding: .5rem 1rem;
  border-radius: 0.75rem;
  }
  .Postshow2{
  display: flex;
  border: 1px solid rgb(3, 3, 3);
  font-size: 150%;
  background-color: rgb(117, 117, 117);
  padding: .5rem 1rem;
  border-radius: 0.75rem;
  }
  .Postshow3{
  display: flex;
  border: 1px solid rgb(3, 3, 3);
  font-size: 150%;
  background-color: rgb(117, 117, 117);
  padding: .5rem 1rem;
  border-radius: 0.75rem;
  }
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
</style>
