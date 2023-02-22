async function getProducts() {
  const login = await axios.get("/auth/isAuthenticated");
  if (login.data != "") {
    $.getJSON("/api/products", function (jd) {
      const mainZone = $("#main_zone");
      mainZone.html(
        '<table id="table"><tr><th>Name of the product</th><th>Id</th><th>Image</th><th>Price</th><th>Info</th><th>Categories</th></tr>'
      );
      for (var i = 0; i < jd.length; i++) {
        $("#table").append(
          "<tr>" +
            "<td>" +
            jd[i].title +
            "</td>" +
            "<td>" +
            jd[i]._id +
            "</td>" +
            "<td>" +
            jd[i].photos +
            "</td>" +
            "<td>" +
            jd[i].price +
            "</td>" +
            "<td>" +
            jd[i].info +
            "</td>" +
            "<td>" +
            jd[i].categories +
            "</td>" +
            "</tr>"
        );
      }
      mainZone.append(
        '<form id="new_serv"><label for="title">Name:</label><br><input type="text" id="title" name="title" placeholder="title"><br>'
      );
      mainZone.append(
        '<label for="filename">Picture:</label><br><input type="file" id="filename" name="filename" multiple><br>'
      );
      mainZone.append(
        '<label for="price">Price:</label><br><input type="text" id="price" name="price" placeholder="price"><br>'
      );
      mainZone.append(
        '<label for="info">Infos:</label><br><input type="text" id="info" name="info" placeholder="info"><br>'
      );
      mainZone.append(
        '<label for="cat">Categories:</label><br><input type="text" id="cat" name="cat" placeholder="categories (separated by , )"><br>'
      );
      mainZone.append(
        '<button id="submit_add1" type="button" onclick="addProduct()">ADD PRODUCT</button></form>'
      );
      mainZone.append(
        '<form id="new_serv"><label for="title">ID of the item to delete:</label><br><input type="text" id="title" name="title" placeholder="id">'
      );
      mainZone.append(
        '<button id="submit_rem" type="submit" onclick="deleteProduct()">REMOVE PRODUCT</button></form>'
      );
      mainZone.append(
        '<form id="new_serv"><label for="newPrice">ID of the product to put on sale:</label><br><input type="text" id="newPrice" name="new price" placeholder="id"><br>'
      );
      mainZone.append(
        '<label for="priceup">Price on sale:</label><br><input type="text" id="priceup" name="priceup" placeholder="price on sale"><br>'
      );
      mainZone.append(
        '<button id="submit_up" type="button" onclick="updateProduct()">PUT NEW PRICE ON SALE </button></form>'
      );
    });
  }
}
function updateProduct() {
  axios.patch("/api/products?id=" + document.getElementById("newPrice").value, {
    params: { discountedPrice: document.getElementById("priceup").value },
  });
}

function deleteProduct() {
  axios.delete("/api/products?id=" + document.getElementById("title").value);
}

function addProduct() {
  axios
    .post("/api/products", {
      title: document.getElementById("title").value,
      info: document.getElementById("info").value,
      price: document.getElementById("price").value,
      categories: document.getElementById("cat").value,
    })
    .then((res) => {
      let id = res.data._id;
      let images = document.querySelector("#filename");
      const formData = new FormData();
      for (let i = 0; i < images.files.length; i++) {
        formData.append("images", images.files[i]);
      }
      axios.post(
        "/api/images/products",
        formData,
        {
          params: { id: id },
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    });
}

module.exports = { getProducts };
