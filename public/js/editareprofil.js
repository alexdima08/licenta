if (sessionStorage.getItem("loggedUser") == undefined)
        location.replace("/*") 
function Actualizare(){
    var x = document.getElementById("datanasterii")
    var x2 = document.getElementById("tara")
    var x3 = document.getElementById("email")
    var x4 = document.getElementById("hobby")
    localStorage.setItem('actualizare'+ String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId), JSON.stringify({datanasterii: x.value, tara: x2.value, email: x3.value, hobby: x4.value}))
    alert("datele au fost acutalizate");
    // console.log(localStorage.getItem('actualizare'+ String(JSON.parse(sessionStorage.getItem("loggedUser")).loggedId)))
    location.replace("profil")
}

