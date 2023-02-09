function getPosts() {
    $.getJSON('/api/posts', function (jd) {
        const mainZone = $('#main_zone')
        mainZone.html('<table id="table"><tr><th>Title</th><th>Id</th><th>User</th><th>Description</th><th>Summary</th><th>Picture</th><th>Date</th></tr>');
        for (var i = 0; i < jd.length; i++) {
            $('#table').append('<tr>' +
                '<td>' + jd[i].title + '</td>' +
                '<td>' + jd[i]._id + '</td>' +
                '<td>' + jd[i].user + '</td>' +
                '<td>' + jd[i].post + '</td>' +
                '<td>' + jd[i].post_summary + '</td>' +
                '<td>' + jd[i].photos + '</td>' +
                '<td>' + jd[i].date + '</td>' +
                '</tr>');
        }
        mainZone.append('<form enctype="multipart/form-data"><label for="title">Title:</label><br><input type="text" name="title" id="title" placeholder="title" /><br>');
        mainZone.append('<label for="description">Description:</label><br><input type="text" name="description" id="description" placeholder="description"/><br>');
        mainZone.append('<label for="picture">Picture:</label><br><input type="file" value="Choose your photos" name="picture" id="files" multiple /><br>');
        mainZone.append('<input id="submit_add" type="button" value="SUBMIT!" onclick="createPost()" /></form>');
        mainZone.append('<br>');
        mainZone.append('<form id="new_serv"><label for="title1">ID of the post to remove</label><br><input type="text" id="title1" name="title1"><br>');
        mainZone.append('<button id="submit_delete" type="button" onclick="deletePost()">DELETE!</button></form>');

    });
};

async function createPost() {
    axios
        .post("/api/posts", {
            title: document.getElementById("title").value,
            post: document.getElementById("description").value,
        })
        .then((res) => {
            let images = document.querySelector("#files");
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
                        params: {id: id},
                    },
                    {
                        headers: {"Content-Type": "multipart/form-data"},
                    }
                );
        });
}

function deletePost() {
    axios.delete('/api/posts?id=' + document.getElementById('title1').value);
};

module.exports = {getPosts}