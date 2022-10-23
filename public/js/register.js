function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const warning = document.getElementById("warning-label");
    const warning2 = document.getElementById("warning-label2");
    const warning3 = document.getElementById("warning-label3");
    var ok = 1;
    warning.textContent = ""
    warning2.textContent = ""
    warning3.textContent = ""
    warning.classList.add("hide");
    warning2.classList.add("hide");
    warning3.classList.add("hide");
    fetch('http://localhost:3000/dataLogIn')
        .then(resp1 => resp1.json())
        .then(resp1 => {
            let findedUser = resp1.find(user => user.username == username)
            if (username.length == "" || password.length == "") {
                warning.classList.remove("hide");
                warning.textContent = "Username or password missing. Please try again!"
                warning.style.color = "#b30000";
                ok = 0
            }
            if (findedUser !== undefined) {
                warning2.classList.remove("hide");
                warning2.textContent = "Username already taken. Please try again!"
                warning2.style.color = "#b30000";
                ok = 0
            }
            if (password.length < 6) {
                warning3.classList.remove("hide");
                warning3.textContent = "Short Password. Please choose a longer password"
                warning3.style.color = "#b30000";
                ok = 0
            }
            if (ok == 1) {
                fetch('http://localhost:3000/checkregister/' + username + "/" + password)
                    .then(resp => resp.json())
                    .then(resp => {
                    })

                fetch('http://localhost:3000/searchUser/' + username)
                    .then(resp => resp.json())
                    .then(resp => {
                        var playerlevel = 1
                        var experiencecap = 100
                        var experience = 0
                        var hintcount = 5
                        console.log(resp[0].idUser)
                        fetch('http://localhost:3000/insertDataPlayer/' + playerlevel + "/" + experiencecap + "/" + experience + "/" + resp[0].idUser)
                            .then(resp3 => resp3.json())
                            .then(resp3 => {
                            })
                        fetch('http://localhost:3000/insertDataHintButton/' + resp[0].idUser  + "/" + hintcount )
                        
                            .then(resp4 => resp4.json())
                            .then(resp4 => {
                            })
                    })
                alert("account created!")
            }
        })



}