<template>
<HomeHeaderVue />
  <section class="body">
    <nav class="Images">
    <ul>
      <li class="gallery">
         <p>Vuoi vedere altre immagini? <router-link :to="{name: 'gallery'}" class="routerlink">Entra nella Galleria!</router-link></p>
      </li>
    </ul>
    </nav>
    <nav class="TopPosts">
    <ul>
      <li>
         <p>Vuoi vedere altre news e post dal forum? <router-link :to="{name: 'forum'}" class="routerlink">Entra nel Forum della comunità!</router-link></p>
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
                    <p>Oggetto numero {{currentSlide}}</p>
                  </li>
                  <li>
                   <router-link :to="{path: '/shop'}" class="routerlink">=> VAI ALLO SHOP</router-link>
                  </li>
                </ul>
              </nav>
            </section>
          </div>
        </SlideImage>
      </CarouselMain>
    </nav>
  </section>
  <SiteFooterVue/>
</template>

<script>
import HomeHeaderVue from '@/components/headers/HomeHeader.vue'
import SiteFooterVue from '@/components/SiteFooter.vue'
import CarouselMain from '@/components/carousel/CarouselMain.vue'
import SlideImage from '@/components/carousel/SlideImage.vue'
export default {
  name: 'HomeView',
  components: { HomeHeaderVue, SiteFooterVue, CarouselMain, SlideImage },
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
  background: rgb(60, 121, 150);
  padding: 20px;
}
.TopPosts {
  float: right;
  text-align: center;
  width: 30%;
  height:100%;
  background: rgb(60, 121, 150);
  padding: 20px;
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
