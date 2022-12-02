<template>
    <div class="shop-page">
        <div class="shop-section">
            <div v-for="(item, index) in products" :key="index" class="outer-card">
                <router-link :to="{
                    name: 'ProductDetails',
                    params: {category: item.categories, id: item._id }
                    }"
                    class="card"
                >
                <img class="card-image" :src="item.mainPhoto"/>
                <div class="card-bottom">
                    <div class="card-text">
                        <p class="item-title">{{ item.title }}</p>
                        <p class="item-seller">Sold by {{ item.seller }}</p>
                        <p class="item-description">{{ item.info }}</p>
                    </div>
                </div>
                </router-link>
                <div class="card-under">
                    <p class="item-price">${{ item.price }}</p>
                    <p v-show="item.price >= item.discountedPrice" class="item-dicount">${{ item.discountedPrice }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: 'ShopMainComponent'
}
</script>

<style scoped>
.shop-page {
    position: absolute;
}
.shop-section {
    display:grid;
    grid-template-columns: repeat(auto-fill, 20m);
    grid-gap: 0.4em;
    justify-content: center;
    height: fit-content;
    width: 100vw;
    padding: 0.5em 0em 5em 0em;
    background-color: rgba(60, 121, 150);
}
.outer-card {
    position: relative;
    transition: transform 0.6s;
    cursor: pointer;
    border: 0px solid rgba(56, 56, 56, 0);
    overflow: hidden;
    width: 20em;
}
.card {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 20em;
    height: 26em;
    background: rgb(255, 255, 255);
    cursor: pointer;
    border: none;
    border-bottom: inherit;
    overflow: hidden;
    transition: transform 0.6s;
    justify-content: flex-end;
    align-items: center;
    background-color: aquamarine;
    text-decoration: none;
}
.outer-card:hover {
    transform: translateY(-0.5em);
}
.outer-card:hover > .card >.card-bottom {
    opacity: 1;
}
.card-image {
    position: absolute;
    width: inherit;
    height: inherit;
    object-fit: cover;
    display: block;
    transition: transform 0.6s;
    filter: brightness(80%);
}
.outer-card:hover > .card >.card-image {
    transform: scale(1.1);
}
.card-bottom {
    display: flex;
    flex-direction: column;
    justify-self: center;
    position: relative;
    background: rgba(60, 121, 150);
    bottom: 0;
    left: 0;
    margin: 0;
    width: 20em;
    height: 11em;
    z-index: 1;
    opacity: 0;
    transition: opacity 1s;
    justify-content: center;
}
.card-text {
    padding: 1em 2em 1em 2em;
    font-size: 1rem;
    word-wrap: break-word;
    text-align: left;
    align-self: center;
}
.card-text > item-title {
    font-size: 1.1rem;
    font-weight: 800;
    padding-bottom: 0.1em;
    color: black;
}
.card-text > .item-seller {
    font-size: 0.9rem;
    padding-bottom: 0.7em;
    color: black;
}
.card-text > .item-description {
    font-size: 0.7rem;
    color: black;
}
.card-under {
    padding: 0.5em 6.55em;
    display: flex;
    justify-content: center;
    font-size: 0.8rem;
    width: 12em;
    background-color: aquamarine;
    border: none;
    border-top: none;
    transition: background-color 0.5s, all 1s;
    color: black;
}
.outer-card:hover > .card-under {
    background-color: aqua;
    color: blue;
    border-bottom-right-radius: 2em;
    border-bottom-left-radius: 2em;
}
.card-under > item-price  {
    display: flex;
    font-size: 0.8rem;
    padding-bottom: 0.1em;
    opacity: 0.8;
    margin-left: 0.5;
}
.card-under > item-discount  {
    display: flex;
    font-size: 0.8rem;
    padding-bottom: 0.1em;
    opacity: 0.8;
    margin-left: 0.5;
}
</style>
