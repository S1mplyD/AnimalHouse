//Funzionanti

const axios = require("axios");

async function setAvatar() {
  let avatar = document.querySelector("#avatar");
  console.log(avatar.files);
  let formData = new FormData();
  formData.append("image", avatar.files[0]);
  fetch("/api/images/user", {
    method: "post",
    body: formData,
  });
}
async function addPets() {
  axios
    .post("/api/pets", {
      name: document.getElementById("petname").value,
    })
    .then((res) => {
      console.log(res);
      let id = res.data.ownedAnimals[res.data.ownedAnimals.length - 1];
      let formData = new FormData();
      let images = document.querySelector("#petimages");
      for (let i = 0; i < images.files.length; i++) {
        formData.append("images", images.files[i]);
      }
      axios
        .post(
          "/api/images/pets",
          formData,
          { params: { id: id } },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          console.log(res);
        });
    });
}
async function user() {
  axios.get("/auth/isAuthenticated").then((response) => {
    console.log(response);
    let user = [];
    user.push(response.data);
    console.log(user);
    document.getElementById("logStatus").innerText =
      "Hello " + user[0].username;
  });
}
async function createProducts() {
  axios
    .post("/api/products", {
      title: document.getElementById("title").value,
      info: document.getElementById("prodinfo").value,
      price: document.getElementById("price").value,
      discountedPrice: document.getElementById("disprice").value,
    })
    .then((res) => {
      console.log(res);
      let id = res.data._id;
      console.log(id);
      let images = document.querySelector("#prodphotos");
      const formData = new FormData();
      for (let i = 0; i < images.files.length; i++) {
        formData.append("images", images.files[i]);
      }
      axios
        .post(
          "/api/images/products",
          formData,
          {
            params: { id: id },
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          console.log(res);
        });
    });
}
async function createPost() {
  axios
    .post("/api/posts", {
      title: document.getElementById("posttitle").value,
      post: document.getElementById("post").value,
    })
    .then((res) => {
      let images = document.querySelector("#postimages");
      const formData = new FormData();
      for (let i = 0; i < images.files.length; i++) {
        formData.append("images", images.files[i]);
      }
      let id = res.data._id;
      axios
        .post(
          "/api/images/posts",
          formData,
          {
            params: { id: id },
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          console.log(res);
        });
    });
}

async function createService() {
  axios
    .post("/api/services", {
      name: document.getElementById("sername").value,
      location: document.getElementById("serloc").value,
      coordinate: document.getElementById("sercoor").value,
      openDays: document.getElementById("seropdays").value,
      openTime: document.getElementById("seroptime").value,
      closeTime: document.getElementById("sercltime").value,
      type: document.getElementById("sertype").value,
      online: document.getElementById("seronline").checked,
      info: document.getElementById("serinfo").value,
    })
    .then((res) => {
      let images = document.querySelector("#serimages");
      const formData = new FormData();
      for (let i = 0; i < images.files.length; i++) {
        formData.append("images", images.files[i]);
      }
      let id = res.data._id;
      axios
        .post(
          "/api/images/services",
          formData,
          {
            params: { id: id },
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          console.log(res);
        });
    });
}

async function createGallery() {
  axios
    .post("/api/gallery", {
      title: document.getElementById("galtitle").value,
      location: document.getElementById("gallocation").value,
      photographer: {
        name: document.getElementById("galphoname").value,
        url: document.getElementById("galphourl").value,
      },
      filename: "placeholder",
    })
    .then((res) => {
      let image = document.querySelector("#galphoto");
      const formData = new FormData();
      console.log(image.files[0]);
      formData.append("image", image.files[0]);
      let id = res.data._id;
      axios
        .post(
          "/api/images/gallery",
          formData,
          {
            params: { id: id },
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          console.log(res);
        });
    });
}
async function login() {
  const data = {
    username: document.getElementById("mail").value,
    password: document.getElementById("pass").value,
  };
  fetch("/auth/login", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log(res);
  });
}
async function signUp() {
  axios
    .post("/auth/register", {
      name: document.getElementById("regname").value,
      username: document.getElementById("regusername").value,
      mail: document.getElementById("regmail").value,
      password: document.getElementById("regpassword").value,
    })
    .then((res) => {
      console.log(res);
    });
}
async function getAllProducts() {
  axios.get("/api/products").then((res) => {
    console.log(res);
  });
}
async function postProfilePicture() {
  axios.post("/api/images/user", formData);
}
