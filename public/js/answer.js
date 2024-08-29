document.querySelector("#submitAnswer").addEventListener("click", displayResult);

async function displayResult(){
  let username = document.querySelector("#username").value;
  let question_id = document.querySelector("#question_id").value;
  if(document.querySelector('input[name=answer]:checked') != null){
    let answer = document.querySelector('input[name=answer]:checked').value;
    let url = `/api/grade/${username}&${question_id}&${answer}`;
    let response = await fetch(url);
    let data = await response.json();
    let status = data.status;
    let messsage = "There was a problem submitting your answer. Please try again.";
    if(status == "correct"){
      message = "You are correct!";
    }
    else if (status == "incorrect"){
      message = "Sorry.  You are incorect!";
    }
    else if (status == "repeat"){
      message = "You are correct but it will not change your score because you have already answered this question.";
    }
    document.querySelector("#submitAnswer").innerHTML = message;

  }
  else{
    document.querySelector("#result").innerHTML = "Please select an answer";
  }

}

