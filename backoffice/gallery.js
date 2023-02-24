async function getGallery() {
  const login = await axios.get("/auth/isAuthenticated");
  if (login.data != "") {
    $.getJSON("/api/gallery", function (jd) {
      const mainZone = $("#main_zone");
      mainZone.html(
        '<table id="table"><tr><th>Title</th><th>Id</th><th>Photographer name</th><th>Photographer url</th>' +
          "<th>Username</th><th>Average vote</th></tr>"
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
            jd[i].photographer.name +
            "</td>" +
            "<td>" +
            jd[i].photographer.url +
            "</td>" +
            "<td>" +
            jd[i].username +
            "</td>" +
            "<td>" +
            jd[i].averageVote +
            "</td>" +
            "</tr>"
        );
      }
      mainZone.append(
        '<form id="new_gall"><label for="title">Title:</label><br><input type="text" id="title" name="title" placeholder="title"><br>'
      );
      mainZone.append(
        '<label for="filename">Picture:</label><br><input type="file" id="filename" name="filename" multiple><br>'
      );
      mainZone.append(
        '<label for="name">Photographer name:</label><br><input type="text" id="name" name="name" placeholder="photographer name"><br>'
      );
      mainZone.append(
        '<label for="url">Photographer url:</label><br><input type="text" id="url" name="url" placeholder="photographer url"><br>'
      );
      mainZone.append(
        '<label for="location">Location:</label><br><input type="text" id="location" name="location" placeholder="location"><br>'
      );
      mainZone.append(
        '<button id="submit_add1" type="button" onclick="addImage()">ADD IMAGE</button></form>'
      );
      mainZone.append(
        '<form id="new_serv"><label for="del_id">ID of the item to delete:</label><br><input type="text" id="del_id" name="delete id" placeholder="id">'
      );
      mainZone.append(
        '<button id="submit_rem" type="submit" onclick="deleteImage()">REMOVE PRODUCT</button></form>'
      );
    });
  }
}

function addImage() {
  axios
    .post("/api/gallery", {
      title: document.getElementById("title").value,
      location: document.getElementById("location").value,
      photographer: {
        name: document.getElementById("name").value,
        url: document.getElementById("url").value,
      },
    })
    .then((res) => {
      let id = res.data._id;
      let image = document.querySelector("#filename");
      const formData = new FormData();
      formData.append("image", image.files[0]);
      axios.post(
        "/api/images/gallery",
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

function deleteImage() {
  axios.delete("/api/gallery?id=" + document.getElementById("del_id").value);
}

module.exports = { getGallery };
