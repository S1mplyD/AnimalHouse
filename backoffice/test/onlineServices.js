function getOnlineServices() {
    $.getJSON('/api/services', function (jd) {
        const mainZone = $("#main_zone")
        mainZone.html('<table id="table"><tr><th>Name</th><th>Id</th><th>Location</th><th>Time of opening/th><th>Type</th><th>Info</th></tr>');
        for (var i = 0; i < jd.length; i++) {
            if (jd[i].online === true) {
                $('#table').append('<tr>' +
                    '<td>' + jd[i].name + '</td>' +
                    '<td>' + jd[i]._id + '</td>' +
                    '<td>' + jd[i].location + '</td>' +
                    '<td>' + jd[i].openDays + '</td>' +
                    '<td>' + jd[i].openTime + '</td>' +
                    '<td>' + jd[i].type + '</td>' +
                    '<td>' + jd[i].info + '</td>' +
                    '<td>' + jd[i].mail + '</td>' +
                    '<td>' + jd[i].phone + '</td>' +
                    '</tr>');
            }
        }
        mainZone.append('<form id="new_serv"><label for="name">Name:</label><br><input type="text" id="name" name="name"><br>');
        mainZone.append('<label for="location">Location:</label><br><input type="text" id="location" name="location"><br>');
        mainZone.append('<label for="days">Open days (separated by a comma):</label><br><input type="text" id="days" name="days"><br>');
        mainZone.append('<label for="time">Open time:</label><br><input type="text" id="time" name="time"><br>');
        mainZone.append('<label for="type">Type:</label><br><input type="text" id="type" name="type"><br>');
        mainZone.append('<label for="info">Info:</label><br><input type="text" id="info" name="info"><br>');
        mainZone.append('<label for="mail">Mail:</label><br><input type="text" id="mail" name="mail"><br>');
        mainZone.append('<label for="phone">Phone:</label><br><input type="text" id="phone" name="phone"><br>');
        mainZone.append('<label for="servImage">Images:</label><br><input type="file" id="servImage" name="servImage" multiple><br>');
        mainZone.append('<button id="submit_buton" type="button" onclick="createOnlineService()">SUBMIT</button></form>');
        mainZone.append('<form id="new_serv"><label for="title">ID of the service to delete:</label><br><input type="text" id="title" name="title">');
        mainZone.append('<button id="submit_remon" type="button" onclick="deleteOnlineService()">REMOVE SERVICE</button></form>');
        mainZone.append('<form id="new_serv"><label for="uptitle">ID of the service to update:</label><br><input type="text" id="uptitle" name="uptitle"><br>');
        mainZone.append('<label for="upname">Name:</label><br><input type="text" id="upname" name="upname"><br>');
        mainZone.append('<label for="uplocation">Location:</label><br><input type="text" id="uplocation" name="uplocation"><br>');
        mainZone.append('<label for="updays">Open days (separated by a comma):</label><br><input type="text" id="updays" name="updays"><br>');
        mainZone.append('<label for="uptime">Open time:</label><br><input type="text" id="uptime" name="uptime"><br>');
        mainZone.append('<label for="uptype">Type:</label><br><input type="text" id="uptype" name="uptype"><br>');
        mainZone.append('<label for="upinfo">Info:</label><br><input type="text" id="upinfo" name="upinfo"><br>');
        mainZone.append('<label for="upmail">Mail:</label><br><input type="text" id="upmail" name="upmail"><br>');
        mainZone.append('<label for="upphone">Phone:</label><br><input type="text" id="upphone" name="upphone"><br>');
        mainZone.append('<label for="upservImage">Images:</label><br><input type="file" id="upservImage" name="upservImage" multiple><br>');
        mainZone.append('<button id="update_buton" type="button" onclick="updateOnlineService()">UPDATE</button></form>');

    });
};

function deleteOnlineService() {
    axios.delete('/api/services?id=' + document.getElementById('title').value)
        .then((result) => {
            console.log(result);
        })
};

function createOnlineService() {
    axios.post('/api/services', {
        name: document.getElementById('name').value,
        location: document.getElementById('location').value,
        openDays: document.getElementById('days').value,
        openTime: document.getElementById('time').value,
        type: document.getElementById('type').value,
        info: document.getElementById('info').value,
        mail: document.getElementById('mail').value,
        phone: document.getElementById('phone').value,
        online: true
    })
        .then((result) => {
            console.log(result);
            let formData = new FormData();
            let files = document.querySelector('#servImage');
            for (let i = 0; i < files.files.length; i++) {
                formData.append('images', files.files[i]);
            }
            axios.post("/api/images/services", formData, {params: {id: result.data._id}}, {headers: {"Content-Type": "multipart/form-data"}})
                .then((res) => {
                    console.log(res);
                })
        })
};

function updateOnlineService() {
    const files = document.querySelector("#upservImage");
    console.log(files.files)
    if(files.files.length <= 2) {
        const id = document.getElementById('uptitle').value
        axios.patch('/api/services?id=' + id,
            {
                name: document.getElementById('upname').value,
                location: document.getElementById('uplocation').value,
                openDays: document.getElementById('updays').value,
                openTime: document.getElementById('uptime').value,
                type: document.getElementById('uptype').value,
                info: document.getElementById('upinfo').value,
                mail: document.getElementById('upmail').value,
                phone: document.getElementById('upphone').value,
                online: true
            })
            .then(() => {
                const formData = new FormData();
                for (let i = 0; i < files.files.length; i++) {
                    console.log(files.files[i])
                    formData.append("images", files.files[i]);
                }
                axios.patch("/api/images/services", formData,{params: {id: id}} ,{headers: { "Content-Type": "multipart/form-data" }})
            })
    } else {
        alert("Too many files. (Max number of images is 2!)")
    }
}

module.exports = {getOnlineServices}