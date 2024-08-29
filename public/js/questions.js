document.querySelector("#category").addEventListener("change", displayQuestions);

async function displayQuestions(){
  let categoryid = document.querySelector("#category").value;
  let url = "https://opentdb.com/api.php?amount=5&category="+categoryid+"&difficulty=easy&type=multiple";
  let response = await fetch(url);
  let data = await response.json();
  let responseCode = data.response_code;
  console.log(responseCode);
  document.querySelector("#questions").innerHTMl = "";
  if(responseCode == 0){
    
    for (let i = 0; i < 5; i++){
      let question = data.results[i].question;
      let incorrectAnswer = data.results[i].incorrect_answers;
      let correctAnswer = data.results[i].correct_answer;
      document.querySelector("#questions").innerHTML += "<input type='checkbox' checked name=q" + i + ">";
      document.querySelector("#questions").innerHTML += 
        "<input type=text size=100 name='qText" + i + "' value='"+question+"' id='qText" + i + "'> <br>";
      document.querySelector("#questions").innerHTML += 
        "<input type=text name='correct" + i + "' value='"+correctAnswer+"' id='correctAnswer" + i + "'> (correct)<br>";
      document.querySelector("#questions").innerHTML += 
        "<input type=text name='incorrectA" + i + "' value='"+incorrectAnswer[0]+"' id='incorrectA" + i + "'> (incorrect)<br>";
      document.querySelector("#questions").innerHTML += 
        "<input type=text name='incorrectB" + i + "' value='"+incorrectAnswer[1]+"' id='incorrectB" + i + "'> (incorrect)<br>";
      document.querySelector("#questions").innerHTML += 
        "<input type=text name='incorrectC" + i + "' value='"+incorrectAnswer[2]+"' id='incorrectC" + i + "'> (incorrect)<br>";
      
      //console.log(answer);
    }
    document.querySelector("#questions").innerHTML += 
      "<input type=hidden name=category value='"+categoryid+"'>"
    document.querySelector("#questions").innerHTML += "<button>Submit</button>";
    
  }

  document.querySelector("input[name='qText4']").addEventListener("change", checkQuestion4);
  document.querySelector("input[name='qText0']").addEventListener("change", checkQuestion0);
  document.querySelector("input[name='qText1']").addEventListener("change", checkQuestion1);
  document.querySelector("input[name='qText2']").addEventListener("change", checkQuestion2);
  document.querySelector("input[name='qText3']").addEventListener("change", checkQuestion3);

  /*
  document.querySelector("#correctAnswer0").addEventListener("change", checkCorrectAnswer(0));
  document.querySelector("#correctAnswer1").addEventListener("change", checkCorrectAnswer(1));
  document.querySelector("#correctAnswer2").addEventListener("change", checkCorrectAnswer(2));
  document.querySelector("#correctAnswer3").addEventListener("change", checkCorrectAnswer(3));
  document.querySelector("#correctAnswer4").addEventListener("change", checkCorrectAnswer(4));
*/
  
}

function checkCorrectAnswer(id) {
  let answer = document.querySelector("#correctAnswer" + id).value;
  if (answer.length < 1){
    document.querySelector("#correctAnswer" + id).style.borderColor = "red";
    document.querySelector("#correctAnswer" + id).style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "Correct answer may not be blank!";
  }
  else {
    document.querySelector("#correctAnswer" + id).style.borderColor = "green";
    document.querySelector("#correctAnswer" + id).style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "";
  }
}

function checkQuestion(id){
  console.log("checkQuestion " + id);
  let question = document.querySelector("#qText" + id).value;
  if (question.length < 1){
    document.querySelector("#qText" + id).style.borderColor = "red";
    document.querySelector("#qText" + id).style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "Question may not be blank!";
  }
  else {
    document.querySelector("#qText" + id).style.borderColor = "green";
    document.querySelector("#qText" + id).style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "";
  }
}

function checkQuestion4(){
  console.log("checkQuestion4");
  let question = document.querySelector("#qText4").value;
  if (question.length < 1){
    document.querySelector("#qText4").style.borderColor = "red";
    document.querySelector("#qText4").style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "Question may not be blank!";
  }
  else {
    document.querySelector("#qText4").style.borderColor = "green";
    document.querySelector("#qText4").style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "";
  }
}

function checkQuestion3(){
  console.log("checkQuestion3");
  let question = document.querySelector("#qText3").value;
  if (question.length < 1){
    document.querySelector("#qText3").style.borderColor = "red";
    document.querySelector("#qText3").style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "Question may not be blank!";
  }
  else {
    document.querySelector("#qText3").style.borderColor = "green";
    document.querySelector("#qText3").style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "";
  }
}

function checkQuestion2(){
  console.log("checkQuestion2");
  let question = document.querySelector("#qText2").value;
  if (question.length < 1){
    document.querySelector("#qText2").style.borderColor = "red";
    document.querySelector("#qText2").style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "Question may not be blank!";
  }
  else {
    document.querySelector("#qText2").style.borderColor = "green";
    document.querySelector("#qText2").style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "";
  }
}

function checkQuestion1(){
  console.log("checkQuestion1");
  let question = document.querySelector("#qText1").value;
  if (question.length < 1){
    document.querySelector("#qText1").style.borderColor = "red";
    document.querySelector("#qText1").style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "Question may not be blank!";
  }
  else {
    document.querySelector("#qText1").style.borderColor = "green";
    document.querySelector("#qText1").style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "";
  }
}

function checkQuestion0(){
  console.log("checkQuestion0");
  let question = document.querySelector("#qText0").value;
  if (question.length < 1){
    document.querySelector("#qText0").style.borderColor = "red";
    document.querySelector("#qText0").style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "Question may not be blank!";
  }
  else {
    document.querySelector("#qText0").style.borderColor = "green";
    document.querySelector("#qText0").style.borderWidth = "2px";
    document.querySelector("#qMessage").innerHTML = "";
  }
}