const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const req = require('express/lib/request');




const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'songokussj2',
    database: 'Quizz'
})

db.connect((error) => {
    if (error) throw error;
    console.log("My sql Connected!")
})

app.use(express.static('public'));
app.use("/public",express.static('public'));

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/html/paginaPrincipala.html")

});
app.get("/paginaprincipala", (_, res) => {
    res.sendFile(__dirname + "/html/paginaPrincipala.html")

});
app.get("/login",(_, res) => {
    res.sendFile(__dirname + "/html/logIn.html")
});
app.get("/register",(_, res) => {
    res.sendFile(__dirname + "/html/register.html")
});
app.get("/userpage",(_, res) => {
    res.sendFile(__dirname + "/html/userPage.html")
});
app.get("/quizz",(_, res) => {
    res.sendFile(__dirname + "/html/quizz.html")
});
app.get("/history",(_, res) => {
    res.sendFile(__dirname + "/html/history.html")
});
app.get("/profil",(_, res) => {
    res.sendFile(__dirname + "/html/profil.html")
});
app.get("/editareprofil",(_, res) => {
    res.sendFile(__dirname + "/html/editareprofil.html")
});


app.get('/searchUser/:username', (req, res) => {
    let search = `select idUser as idUser from USERS where username='${req.params.username}';`
    db.query(search, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

app.get("/datacategorii",(_, res) => {
    let categorie = `select categoryName as categoryName from CATEGORIES`
    db.query(categorie, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);})
});
app.get("/dataLogIn",(_, res) => {
    let useri = `select * from USERS`
    db.query(useri, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);})
});

app.get("/dataLogIn2/:idUser",(req, res) => {
    let useri = `select * from PLAYERS where idUser = '${req.params.idUser}' `
    db.query(useri, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);})
});

app.get("/dataHintButton/:idPlayer",(req,res)=>{
    let hint = `select h.hintCount as hintcount from HINTBUTTONS h, PLAYERS p WHERE h.idPlayer = p.idPlayer and p.idPlayer = '${req.params.idPlayer}' `
    db.query(hint, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);})
})

app.get("/insertDataHintButton/:idPlayer/:hintCount",(req, res)=> {
    let data = `insert into HINTBUTTONS(idPlayer,hintCount) values ('${req.params.idPlayer}', '${req.params.hintCount}');`;
    db.query(data, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })   
})
app.put("/updatedataHintButton/:hintCount/:idPlayer",(req, res) => {
    let update = `UPDATE HINTBUTTONS
    SET  hintCount = '${req.params.hintCount}'
    WHERE idPlayer = '${req.params.idPlayer}';`
    db.query(update, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);})
})
app.get("/dataPlayer/:idPlayer",(req, res) => {
    let data = `select * from PLAYERS where idPlayer ='${req.params.idPlayer}'`
    db.query(data, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);})
});

// app.get("/updatedataPlayer/:PlayerLevel/:ExperienceCap/:Experience/:idPlayer",(req, res) => {
//     let update = `UPDATE PLAYERS
//     SET  PlayerLevel = '${req.params.PlayerLevel}', ExperienceCap= '${req.params.ExperienceCap}', Experience ='${req.params.Experience}'
//     WHERE idPlayer = '${req.params.idPlayer}';`
//     db.query(update, (error, result) => {
//         error ? res.send({message: "Something went wrong..."}) : res.send(result);})
// });
app.put("/updatedataPlayer/:PlayerLevel/:ExperienceCap/:Experience/:idPlayer",(req, res) => {
    let update = `UPDATE PLAYERS
    SET  PlayerLevel = '${req.params.PlayerLevel}', ExperienceCap= '${req.params.ExperienceCap}', Experience ='${req.params.Experience}'
    WHERE idPlayer = '${req.params.idPlayer}';`
    db.query(update, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);})
})



app.get("/checkregister/:username/:password",(req, res)=> {
    let register = `insert into users(userName,password) values ('${req.params.username}','${req.params.password}')`;
    db.query(register, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })   
})

app.get("/insertDataPlayer/:PlayerLevel/:ExperienceCap/:Experience/:idUser",(req, res)=> {
    let data = `insert into PLAYERS(PlayerLevel,ExperienceCap,Experience,idUser) values ('${req.params.PlayerLevel}','${req.params.ExperienceCap}', '${req.params.Experience}', '${req.params.idUser}');`;
    db.query(data, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })   
})

app.get("/dataquizz/:Category/:Dificulty",(req, res) => {
    let quizz = `select question as question, answer as answer, RightOrWrong as correct from QUESTIONS q,ANSWERS a, CATEGORIES c  where q.idQuestion = a.idQuestion and c.Idcategory = q.Idcategory and c.categoryName = '${req.params.Category}' and q.dificulty = '${req.params.Dificulty}';`
    db.query(quizz, (error, result) => {
        let v = [];
        for(let i = 0; i < result.length; i+= 4)
        {
            v.push({
                question: result[i].question,
                answers:  [{
                text: result[i].answer, correct: result[i].correct
                }, {
                text: result[i+1].answer, correct: result[i+1].correct
                }, {
                text: result[i+2].answer, correct: result[i+2].correct
                }, {
                text: result[i+3].answer, correct: result[i+3].correct
                }]
                })
        }

        error ? res.send({message: "Something went wrong..."}) : res.send(v);})
});

app.get("/dataDailyQuizz",(req, res) => {
    let quizz = `select question as question, answer as answer, RightOrWrong as correct from QUESTIONS q,ANSWERS a, CATEGORIES c  where q.idQuestion = a.idQuestion and c.Idcategory = q.Idcategory;`
    db.query(quizz, (error, result) => {
        let v = [];
        for(let i = 0; i < result.length; i+= 4)
        {
            v.push({
                question: result[i].question,
                answers:  [{
                text: result[i].answer, correct: result[i].correct
                }, {
                text: result[i+1].answer, correct: result[i+1].correct
                }, {
                text: result[i+2].answer, correct: result[i+2].correct
                }, {
                text: result[i+3].answer, correct: result[i+3].correct
                }]
                })
        }

        error ? res.send({message: "Something went wrong..."}) : res.send(v);})
});

app.put("/updateHistory/:QDate/:QTime/:QCorrect/:QNumber/:CTitle",(req,res)=>{
    let update = `insert into HISTORIES(QDate,QTime,QCorrect,QNumber,CTitle)  values ('${req.params.QDate}','${req.params.QTime}','${req.params.QCorrect}','${req.params.QNumber}','${req.params.CTitle}')`
    db.query(update, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

app.get("/dataHistory/:QDate/:QTime",(req,res)=>{
    let data = `select * from HISTORIES where QDate = '${req.params.QDate}' and QTime='${req.params.QTime}'`
    db.query(data, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

app.put("/updateStatistics/:idPlayer/:idHistory",(req,res)=>{
    let update = `insert into STATISTICS(idPlayer,idHistory)  values ('${req.params.idPlayer}','${req.params.idHistory}')`
    db.query(update, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})


app.get("/dataHistoryPlayer/:idPlayer",(req,res)=>{
    let data = `select h.QDate as QDate, h.QTime as QTime, h.QCorrect as QCorrect, h.QNumber as QNumber, h.CTitle as CTitle from PLAYERS p, STATISTICS s, HISTORIES h where p.idPlayer = s.idPlayer and h.idHistory = s.idHistory and p.idPlayer = '${req.params.idPlayer}' order by QDate,Qtime desc`
    db.query(data, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})


app.put("/updateReviews/:review/:RDate/:RTime",(req,res)=>{
    let update = `insert into REVIEWS(review,RDate,RTime)  values ('${req.params.review}','${req.params.RDate}','${req.params.RTime}')`
    db.query(update, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

app.get("/dataReviews/:RDate/:RTime",(req,res)=>{
    let data = `select * from REVIEWS where RDate = '${req.params.RDate}' and RTime='${req.params.RTime}'`
    db.query(data, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

app.put("/updateComments/:idPlayer/:idReview",(req,res)=>{
    let update = `insert into COMMENTS(idPlayer,idReview)  values ('${req.params.idPlayer}','${req.params.idReview}')`
    db.query(update, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

app.get("/dataReviewzone",(req,res)=>{
    let data = `select username,review,RDate,RTime  from PLAYERS p, COMMENTS c, REVIEWS r, USERS u where p.idPlayer = c.idPlayer and r.idReview = c.idReview and u.idUser = p.idUser order by RDate,RTime desc;`
    db.query(data, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

app.get("/countQuestionary/:idPlayer",(req,res)=>{
    let count = `select COUNT(h.idHistory) as nrchestionare from Histories h, Players p, Statistics s where p.idPlayer=s.idPlayer and h.idHistory=s.idHistory  and p.idPlayer='${req.params.idPlayer}';`
    db.query(count, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

app.get("/sumCorrectAnswers/:idPlayer",(req,res)=>{
    let sum = `select sum(h.Qcorrect) as nrCorect from Histories h, Players p, Statistics s where p.idPlayer=s.idPlayer and h.idHistory=s.idHistory  and p.idPlayer='${req.params.idPlayer}';`
    db.query(sum, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

app.get("/sumTotalAnswers/:idPlayer",(req,res)=>{
    let sum = `select sum(h.Qnumber) as nrQuestions from Histories h, Players p, Statistics s where p.idPlayer=s.idPlayer and h.idHistory=s.idHistory  and p.idPlayer='${req.params.idPlayer}';`
    db.query(sum, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})
app.get("/fullCorectCategory/:idPlayer",(req,res)=>{
    let sum = `select COUNT(h.idHistory) as nrfullchestionare from Histories h, Players p, Statistics s where p.idPlayer=s.idPlayer and h.idHistory=s.idHistory  and p.idPlayer='${req.params.idPlayer}' and h.QCorrect = h.QNumber;`
    db.query(sum, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

app.get("/oftenCategory/:idPlayer",(req,res)=>{
    let often = `select h.Ctitle as oftencategory, count(h.Ctitle) from Histories h, Players p, Statistics s where p.idPlayer=s.idPlayer and h.idHistory=s.idHistory and p.idPlayer='${req.params.idPlayer}' group by h.Ctitle order by count(h.Ctitle) desc;`
    db.query(often, (error, result) => {
        error ? res.send({message: "Something went wrong..."}) : res.send(result);
    })
})

// select h.Ctitle as oftencategory, count(h.Ctitle) from Histories h, Players p, Statistics s where p.idPlayer=s.idPlayer and h.idHistory=s.idHistory and p.idPlayer=1 group by h.Ctitle order by count(h.Ctitle) desc;

app.get("/*",(_, res) => {
    res.sendFile(__dirname + "/html/Error404.html")
});
// let register = `insert into users(userName,password) values ('${val1}','${val2}')`
app.listen(3000, () => console.log("It runs"));