const express = require("express");
const session = require('express-session');
const mysql = require("mysql");
const bcrypt = require("bcrypt");
//const fetch = require("node-fetch");
const pool = require("./dbPool.js");
const { rmSync } = require("fs");

const saltRounds = 10;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "sessionSecret!",
    resave: true,
    saveUninitalized: true,
  }),
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
// check to see if the username is already in the database
  // or if there are other problems inserting the record.
  // if record is inserted correcly or successfully, then set "success":true.
  // Otherwise "success":false
  let username = req.body.username;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let isAdmin = req.body.isAdmin ? 1 : 0; 
  let sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
  let params = [username];

  let success = true;

  try {
    let rows = await executeSQL(sql, params);
    if (username == "" || password == "" || firstName == "" || lastName == "") {
      success = false;
    } else if (rows.length > 0) {
      success = false;
    } else {
      bcrypt.hash(password, saltRounds, async function(err, hash) {
        if (err) {
          console.log(`Hashing error: ${err}`);
          success = false;
        } else {
          sql =
            "INSERT INTO users (username, password, first_name, last_name, is_admin, total_score) VALUES (?, ?, ?, ?, ?, ?)";
          params = [username, hash, firstName, lastName, isAdmin, 0];
          rows = await executeSQL(sql, params);
          if (rows.affectedRows === 0) {
            success = false;
          }
        }

        res.render("register", { success: success });
      });
      return; 
    }
  } catch (e) {
    console.log(`DB Error: ${e}`);
    success = false;
  }

  res.render("register", { success: success });
});

app.post("/welcome", async (req, res) => {
  let username = req.body.username;
  let plainPassword = req.body.password;
  let success = true; // set to true if login ID and password match
  let remainingQuestions = 10; // number of questions user has not answered CORRECTLY
  let sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
  let rows;
  try {
    let params = [username];
    rows = await executeSQL(sql, params);
    if (rows.length > 0) {
      let passwordMatch = await bcrypt.compare(plainPassword, rows[0].password);
      if (!passwordMatch) {
        console.log(`Login failed for ${username}, bad password!`)
        success = false;
      } else {
        // added a user session, do we want to use this session for the rest of the routes?
        req.session.authenticated = true;
      }
    } else {
      console.log(`No such user: ${username}`);
      success = false;
      res.redirect("/home");
      return;
    }
  } catch (e) {
    success = false;
  }

  console.log(`Welcome: ${JSON.stringify(rows)}`)
  res.render("welcome", {
    success: success,
    users: rows,
    remainingQuestions: remainingQuestions,
  });
});

app.get("/modify", checkAuth, async (req, res) => {
  let username = req.query.username;
  console.log(`Modifying ${username}`)
  let sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
  let params = [username];
  let rows = await executeSQL(sql, params)
  res.render("modify", { users: rows });
});

app.post("/modify", checkAuth, async (req, res) => {
  let username = req.body.username;
  let oldpassword = req.body.oldpassword;
  let newpassword = req.body.newpassword;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let isAdmin = req.body.isAdmin ? 1 : 0;
  let success = true;
  let sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
  let params = [username];
  let user = await executeSQL(sql, params);

  if (user.length > 0) {
    if (await bcrypt.compare(oldpassword, user[0].password)) { 
      bcrypt.hash(newpassword, saltRounds, async function(err, hash) { 
        if (err) {
          console.log(`Hashing error: ${err}`);
          success = false;
        } else {
          sql = "UPDATE users SET password = ?, first_name = ?, last_name = ?, is_admin = ? WHERE username = ?";
          params = [hash, firstName, lastName, isAdmin, username];
          let rows = await executeSQL(sql, params);

          sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
          params = [username];
          user = await executeSQL(sql, params);

          res.render("modify", { success: success, users: user });
        }
      });
    } else {
      success = false;
      res.render("modify", { success: success, users: user });
    }
  } else {
    console.log(`Can't modify ${username}! No user found!`);
    success = false;
    res.render("modify", { success: success, users: user });
  }
});



//  Calculate remaining questions for the user which is the number of records in the questions table minus the number of records in the correct_answers table where username = username
//  Add db query to replace let question statement below, it should draw a random question that the user has not answered correctly according to correct_answers table.
//  Add code to create answers array where the answers are randomly arranged.
app.get("/answer", checkAuth, async (req, res) => {
  let username = req.query.username;
  let success = true; // True if username exists and remaining questions is greater than 0
  let sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
  let params = [username];
  let user = await executeSQL(sql, params);
  console.log("user = "+user[0].username);
  sql = "SELECT * FROM questions ORDER BY RAND() LIMIT 1";
  let question = await executeSQL(sql);
  // fake question for debugging
  // question = [{question_id: 10, category_id: 1, question_text: "What is the capital of France?", correct_answer: "Paris", incorrect_answer1: "London", incorrect_answer2: "Berlin", incorrect_answer3: "Madrid"} ];
  
  console.log(`Questions: ${JSON.stringify(question)}`)
  // be sure that question was not already answered correctly by user
  let unansweredQuestions = [];
  let answers = [];
  for (const currQuestion of question) {
    let sql = "SELECT * FROM correct_answers WHERE username = ? AND question_id = ? LIMIT 1";
    let params = [username, currQuestion.id];
    let answeredQuestion = await executeSQL(sql, params);
    if (answeredQuestion.length == 0) {
      let shuffledAnswers = shuffle([
        {answer: currQuestion.correct_answer}, 
        {answer: currQuestion.incorrect_answer1}, 
        {answer: currQuestion.incorrect_answer2}, 
        {answer: currQuestion.incorrect_answer3}
      ]);
      answers.push(shuffledAnswers);
      unansweredQuestions.push(currQuestion);
    }
  }
  res.render("answer", { success: success, users: user, question: question, answers: answers});
});

app.get('/api/score/:username', checkAuth, async function(req, res) {
  let username = req.params.username;
  let sql = "SELECT COUNT(*) AS score FROM correct_answers WHERE username = ?";
  let params = [username];
  let rows = await executeSQL(sql, params);
  let score = rows[0].score;
  res.send(`{"score": ${rows[0].score}}`);
});

app.get('/api/grade/:username&:qID&:answer', checkAuth, async function(req, res) {
  let username = req.params.username; 
  let question_id = req.params.qID;
  let answer = req.params.answer; 
  let status = "correct";

  // Do a query to see if answer is correct for that question_id and assign either
  // "correct" or "incorrect" to the status variable.
  let sql = "SELECT * FROM questions WHERE question_id = ?";
  let params = [question_id];
  let question = await executeSQL(sql, params);
  if (question.length > 0) {
    console.log("submited answer = "+answer);
    // If status is correct, check to see if question_id and username pair are already
    // in correct_answers table.  If it is, chnage status to "repeat"
    // if it isn't, then add the pair to the correct_answers table.
    if (question[0].correct_answer === answer) {
      console.log(`${username} answered question ${question_id} correctly!`)
      
      sql = "SELECT * FROM correct_answers WHERE username = ? AND question_id = ?";
      params = [username, question_id];
      let correctAnswer = await executeSQL(sql, params);
      if (correctAnswer.length == 0) {
        status = {status:"correct"};
        sql = "INSERT INTO correct_answers (username, question_id) VALUES (?, ?)";
        let result = await executeSQL(sql, params);
      } else {
        status = {status:"repeat"};
      }
    } else {
      console.log(`${username} answered question ${question_id} incorrectly!`)
      status = {status:"incorrect"};
    }
  } else {
    status = {status:"error"};
  }
  res.send(status);
});

app.get("/addQuestions", checkAuth, async (req, res) => {
  let sql = "SELECT * FROM categories";
  let categories = await executeSQL(sql);
  res.render("addQuestions", { categories: categories });
});

// db insert to add questions submitted by form
app.post("/addQuestions", checkAuth, async (req, res) => {
  let category_id = req.body.category;
  let sql = "SELECT * FROM categories";
  let categories = await executeSQL(sql);
  let questionsToAdd = [];

  // for i = 0 to 4, insert a question if qi is checked. See js/questions.js for parameter names
  for (let i = 0; i < 5; i++){
    let addQuestion = req.body[`q${i}`];
    if (addQuestion) {
      questionsToAdd.push({
        question_text: req.body[`qText${i}`],
        correct_answer: req.body[`correct${i}`],
        incorrect_answer1: req.body[`incorrectA${i}`],
        incorrect_answer2: req.body[`incorrectB${i}`],
        incorrect_answer3: req.body[`incorrectC${i}`]
      });
    }
  }
  console.log(`Questions to add: ${JSON.stringify(questionsToAdd)}`);

  questionsToAdd.forEach( async (newQuestion) => {
   sql = "INSERT INTO questions (question_text, category, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3) VALUES (?, ?, ?, ?, ?, ?)";
    let params = [newQuestion.question_text, category_id, newQuestion.correct_answer, newQuestion.incorrect_answer1, newQuestion.incorrect_answer2, newQuestion.incorrect_answer3];
    let result = await executeSQL(sql, params);
  });
  res.render("addQuestions", { categories: categories });
});

app.get("/logout", checkAuth, async (req, res) => {
  req.session.destroy();
  res.redirect("/home");
});

//functions
async function executeSQL(sql, params) {
  return new Promise(function (resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    });
  });
} //executeSQL

function checkAuth(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect("/home");
  }
}

function checkNotAuth(req, res, next) {
  if (!req.session.authenticated) {
    next();
  } else {
    res.redirect("/home");
  }
}

function shuffle (answers)  { 
  for (let i = answers.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [answers[i], answers[j]] = [answers[j], answers[i]]; 
  } 
  return answers; 
}; 

app.listen(3000, () => {
  console.log("server started");
});
