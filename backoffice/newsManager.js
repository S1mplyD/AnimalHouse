async function getNews() {
  const login = await axios.get("/auth/isAuthenticated");
  if (login.data != "") {
    $.getJSON("/api/news", function (jd) {
      const mainZone = $("#main_zone");
      mainZone.html(
        '<table id="table"><tr><th>Title</th><th>Id</th><th>User</th><th>Description</th><th>Summary</th><th>Date</th></tr>'
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
            jd[i].user +
            "</td>" +
            "<td>" +
            jd[i].post +
            "</td>" +
            "<td>" +
            jd[i].post_summary +
            "</td>" +
            "<td>" +
            jd[i].date +
            "</td>" +
            "</tr>"
        );
      }
      mainZone.append(
        '<form enctype="multipart/form-data"><label for="title">Title:</label><br><input type="text" name="title" id="title" placeholder="title" /><br>'
      );
      mainZone.append(
        '<label for="description">Description:</label><br><input type="text" name="description" id="description" placeholder="description"/><br>'
      );
      mainZone.append(
        '<label for="picture">Picture:</label><br><input type="file" value="Choose your photos" name="picture" id="files" /><br>'
      );
      mainZone.append(
        '<input id="submit_add" type="button" value="SUBMIT!" onclick="createNews()" /></form>'
      );
      mainZone.append("<br>");
      mainZone.append(
        '<form id="new_serv"><label for="title1">ID of the news to remove</label><br><input type="text" id="title1" name="title1" placeholder="id"><br>'
      );
      mainZone.append(
        '<button id="submit_delete" type="button" onclick="deleteNews()">DELETE!</button></form>'
      );
    });
  }
}

async function createNews() {
  axios
    .post("/api/news", {
      title: document.getElementById("title").value,
      post: document.getElementById("description").value,
    })
    .then((res) => {
      let images = document.querySelector("#files");
      const formData = new FormData();
      for (let i = 0; i < images.files.length; i++) {
        formData.append("image", images.files[i]);
      }
      let id = res.data._id;
      axios.post(
        "/api/images/news",
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

function deleteNews() {
  axios.delete("/api/news?id=" + document.getElementById("title1").value);
}

module.exports = { getNews };
