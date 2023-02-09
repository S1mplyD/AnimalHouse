function getUsers(){
    $.getJSON('/api/users', function(jd) {
        const mainZone = $("#main_zone")
        mainZone.html('<table id="table"><tr><th>Name</th><th>Username</th><th>Id</th><th>Mail</th><th>Service ID</th><th>Password</th><th>Pets</th><th>Profile Picture</th><th>Is_Admin</th></tr>');
        for (var i = 0; i < jd.length; i++ ) {
            $('#table').append('<tr>' +
                '<td>' + jd[i].name + '</td>' +
                '<td>' + jd[i].username + '</td>' +
                '<td>' + jd[i]._id + '</td>' +
                '<td>' + jd[i].mail + '</td>' +
                '<td>' + jd[i].serviceId + '</td>' +
                '<td>' + jd[i].password + '</td>'+
                '<td>' + jd[i].ownedAnimals + '</td>' +
                '<td>' + jd[i].profilePicture + '</td>' +
                '<td>' + jd[i].admin + '</td>' +
                '</tr>');
        }
        mainZone.append('<form id="new_serv"><label for="id0">ID of the person to ban:</label><br><input type="text" id="id0" name="id0"><br>');
        mainZone.append('<button id="submit_ban" type="submit" onclick="submitBan()">BAN!</button></form>');
        mainZone.append('<br>');
        mainZone.append('<form id="new_serv"><label for="id1">ID of the person to make admin:</label><br><input type="text" id="id1" name="id1"><br>');
        mainZone.append('<button id="submit_admin" type="button" onclick="submitAdmin()">MAKE ADMIN!</button></form>');
        mainZone.append('<br>');
        mainZone.append('<form id="new_serv"><label for="id2">ID of the person to revoke admin privileges:</label><br><input type="text" id="id2" name="id2"><br>');
        mainZone.append('<button id="submit_revoke" type="button" onclick="submitRevoke()">REVOKE ADMIN STATUS!</button></form>');

    });
};

function submitBan(){
    axios.delete('/api/users?id=' + document.getElementById('id0').value);
}

function submitAdmin(){
    console.log(document.getElementById('id1').value);
    axios.patch('/api/users/grantPermission?id=' + document.getElementById('id1').value);
};
function submitRevoke(){
    axios.patch( '/api/users/revokePermission?id=' + document.getElementById('id2').value);
};

module.exports = {getUsers}