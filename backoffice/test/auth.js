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
    });
}

module.exports = {login}