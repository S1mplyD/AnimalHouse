import axios from "axios";

export async function getAds(specie, name, gender, age, medicalCondition) {
  let data = await axios.get("http://localhost:8000/api/ads", {
    params: {
      specie: specie,
      name: name,
      gender: gender,
      age: age,
      medicalCondition: medicalCondition,
    },
  });
  if (data != null) {
    for (let i = data.data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data.data[i], data.data[j]] = [data.data[j], data.data[i]];
    }
    return data;
  }
}

export async function getServices() {
  let data = await axios.get("http://localhost:8000/api/services");
  for (let i = data.data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data.data[i], data.data[j]] = [data.data[j], data.data[i]];
  }
  return data;
}

export async function getWords() {
  let data = await axios.get("http://localhost:8000/api/animals/hangman");
  return data.data.replace(" ", "");
}

export async function getImages() {
  const data = await axios.get("http://localhost:8000/api/animals/memory");
  let memoryImages = [];
  data.data.map((i, index) => {
    memoryImages.push({
      id: index,
      image: i.image,
      state: "",
      name: i.name,
    });
    memoryImages.push({
      id: index,
      image: i.image,
      state: "",
      name: i.name,
    });
  });
  memoryImages.sort(() => Math.random() - 0.5);
  return memoryImages;
}

export async function getQuestions() {
  const rawData = await axios.get("http://localhost:8000/api/getTrivia");
  return rawData;
}

export async function getProduct(id) {
  const rawData = await axios.get(`http://localhost:8000/api/products/${id}`);
  return rawData;
}

export async function addToCart(id, quantity) {
  await axios.post("http://localhost:8000/api/carts", null, {
    params: { productid: id },
  });
}

export async function login(mail, password) {
  await axios.post("http://localhost:8000/auth/login", {
    username: mail,
    password: password,
  });
}

export async function isAuthenticated() {
  const user = await axios.get("http://localhost:8000/auth/isAuthenticated");
  return user;
}

export async function getService(id) {
  const rawData = await axios.get(
    `http://localhost:8000/api/services/service/${id}`
  );
  return rawData;
}

export async function bookService(id) {
  await axios.post("http://localhost:8000/api/services/book", null, {
    params: { id: id },
  });
}

export async function getFunFact(name, specie) {
  console.log(name, specie);
  let rawData;
  if (name != null && specie != null) {
    rawData = await axios.get("http://localhost:8000/api/animals/funfact", {
      params: { name: name, specie: specie },
    });
  } else if (specie != null && name == null) {
    rawData = await axios.get("http://localhost:8000/api/animals/funfact", {
      params: { name: "", specie: specie },
    });
  } else if (specie == null && name != null) {
    rawData = await axios.get("http://localhost:8000/api/animals/funfact", {
      params: { name: name, specie: "" },
    });
  } else {
    rawData = await axios.get("http://localhost:8000/api/animals/funfact", {
      params: { name: "", specie: "" },
    });
  }

  return rawData;
}
