function login(){
    fetch("http://localhost:3000/dataLogIn")
    .then(resp => resp.json())
    .then(resp => {
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const warning = document.getElementById("warning-label")
        var ok = false;
        let findedUser = resp.find(user => user.username == username.value && user.password == password.value)
        // console.log(username.value,password.value,findedUser);
        // alert(resp[0].idUser);
        if (findedUser !== undefined)
            {   
                sessionStorage.setItem('loggedUser', JSON.stringify({loggedId: findedUser.idUser, loggedName: findedUser.username}))
                ok = true;
                location.replace("/userpage");
            }
        else
        {
            warning.classList.remove("hide");
            warning.textContent = "Invalid username or password. Please try again!"
            warning.style.color="#b30000";
            username.value = ""
            password.value = "" 
            // alert("Login failed. Probabil nu ai scris bine numele de utilizator sau parola");
        } 
    })}