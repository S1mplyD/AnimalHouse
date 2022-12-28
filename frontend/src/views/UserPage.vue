<template lang="en">
  <header>
    <div id="titlepart">
      <h1 class="title">Welcome to your personal User Area, <br> {{user[0].name}}!</h1>
      <button @click="this.$router.back()" class="btn btn-dark btn-lg btn-block" id="goBack">Go Back</button>
    </div>
  </header>
  <section class="mainUser">
    <div class="card" id="usercard">
      <div class="card-body">
        <h2 class="card-title">Personal Data:</h2>
        <p class="card-text" id="userinfo">
          <b>Name:</b> {{user[0].name}} <br>
          <b>Username:</b> {{user[0].username}} <br>
          <b>Mail address:</b> {{user[0].mail}} <br>
          <b>List of pets:</b>
            <ul v-for="pet in pets" style="list-style: none;">
              <li>
                <div class="card mb-3">
                  <div class="card-header text-end">
                    <a type="button" class="btn-close" aria-label="Close" @click="removePets(pet._id)"></a>
                  </div>
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img :src="pet.pictures[0]" class="img-fluid rounded-start" alt="" style="max-height: 100px; object-fit:cover;"/>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">Name: {{ pet.name }}</h5>
                        <p class="card-text">Race: {{ pet.race }}</p>
                        <p class="card-text">Age: {{ pet.age }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
        </p>
        <label for="petname">Name of the pet to add</label>
        <input id="petname" type="text" class="form-control form-control-lg" />
        <label for="petrace">Race of the pet to add</label>
        <input id="petrace" type="text" class="form-control form-control-lg" />
        <label for="petage">Age of the pet to add</label>
        <input id="petage" type="text" class="form-control form-control-lg" />
        <label for="petimg">Image of the pet to add</label>
        <input id="petimg" type="file" class="form-control form-control-lg" multiple/>
        <br>
        <button type="button" class="btn btn-dark btn-lg btn-block" id="addpets" @click="addPets()">Add a new pet</button>

      </div>
    </div>
  </section>
  <SiteFooterVue/>
</template>

<script>
import axios from 'axios'
import SiteFooterVue from '@/components/SiteFooter.vue'
import Swal from 'sweetalert2'

export default {
  name: 'UserPage',
  mounted () {
    axios.get('/auth/isAuthenticated')
      .then((response) => {
        this.user.push(response.data)
        console.log(this.user.length)
      })
    axios.get('/api/users/userPets')
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.pets.push(response.data[i])
          console.log(this.pets.length)
        }
      })
  },
  components: { SiteFooterVue },
  data () {
    return {
      user: [],
      pets: []
    }
  },
  methods: {
    addPets: async function () {
      const pet = {
        name: document.getElementById('petname').value,
        race: document.getElementById('petrace').value,
        age: document.getElementById('petage').value
      }
      fetch('/api/pets', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(pet)
      })
        .then((response) => response.json())
        .then((data) => {
          const id = data.ownedAnimals[data.ownedAnimals.length - 1]
          const formData = new FormData()
          const images = document.querySelector('#petimg')
          for (let i = 0; i <= images.files.length; i++) {
            formData.append('images', images.files[i])
          }
          axios
            .post(
              '/api/images/pets',
              formData,
              {
                params: {
                  id: id
                }
              },
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
            )
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'You added the pet successfully!',
            showConfirmButton: true
          })
            .then((response) => {
              if (response.isConfirmed) location.reload()
            })
        })
    },
    removePets: async function (id) {
      Swal.fire({
        title: 'Do you want to remove this pet from the list?',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((res) => {
        if (res.isConfirmed) {
          console.log(document.getElementById('petname').value)
          fetch('/api/pets?pet=' + id, {
            method: 'delete',
            headers: {
              'Content-type': 'application/json'
            }
          })
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'You removed the pet successfully!',
                showConfirmButton: true
              })
                .then((response) => {
                  if (response.isConfirmed) location.reload()
                })
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
header{
  width: 100%;
  border-bottom: 1px solid rgb(3, 3, 3);
  background-color: rgb(0, 68, 40);
  padding: .5rem 1rem;
}
#titlepart {
  text-align: center;
}
.mainUser {
  text-align: left;
  background-image: url("../assets/istockphoto-517188688-612x612.jpg");
  height: 800px;
  background-size: cover;
  border: 1px solid #333;
}
#usercard {
  background-color: aquamarine;
}
#goBack {
  margin-right: auto;
}
</style>
