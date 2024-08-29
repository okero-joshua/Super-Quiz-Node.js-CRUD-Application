document.querySelector("#password2").addEventListener("change", checkPassword2);
document.querySelector("#password").addEventListener("change", checkPassword);
document.querySelector("#newpassword").addEventListener("change", checkNewPassword);
document.querySelector("#newpassword2").addEventListener("change", checkNewPassword2);



function checkPassword2(){
  let password = document.querySelector("#password").value;
  let password2 = document.querySelector("#password2").value;
  if(password != password2){
    document.querySelector("#password2").style.backgroundColor = "red";
    document.querySelector("#errorMessage").innerHTML = "Passwords do not match";
  } else {
    document.querySelector("#password2").style.backgroundColor = "green";
    document.querySelector("#errorMessage").innerHTML = "";
  }
}

function checkPassword(){
  let password = document.querySelector("#password").value;
  if (password.length < 6){
    document.querySelector("#password").style.border = "2px solid red";
    document.querySelector("#errorMessage").innerHTML = "Password must be at least 6 characters long";
  }
  else {
    document.querySelector("#password").style.border = "2px solid green";
    document.querySelector("#errorMessage").innerHTML = "";
  }
}

function checkNewPassword2(){
  let password = document.querySelector("#newpassword").value;
  let password2 = document.querySelector("#newpassword2").value;
  if(password != password2){
    document.querySelector("#newpassword2").style.backgroundColor = "red";
    document.querySelector("#errorMessage").innerHTML = "Passwords do not match";
  } else {
    document.querySelector("#newpassword2").style.backgroundColor = "green";
    document.querySelector("#errorMessage").innerHTML = "";
  }
}

function checkNewPassword(){
  let password = document.querySelector("#newpassword").value;
  if (password.length < 6){
    document.querySelector("#newpassword").style.border = "2px solid red";
    document.querySelector("#errorMessage").innerHTML = "New password must be at least 6 characters long";
  }
  else {
    document.querySelector("#newpassword").style.border = "2px solid green";
    document.querySelector("#errorMessage").innerHTML = "";
  }
}

function checkCategory(){
  let code = document.querySelector("#codes").value;
  if(code == -1){
    document.querySelector("#select_message").innerHTML = "Please select a category";
  }
  else{
    window.location = "index2.html?code="+code;
  }
}

