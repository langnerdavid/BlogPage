const formInputs = (document.getElementById('login-form')).getElementsByTagName('input');
const passwordLogin = document.getElementById('password-input');
const loginErrorDiv = document.getElementById('login-error-div');
const eyeShowPassword = document.getElementById('eye-show-password');
const usernameInput = formInputs[0];
const passwordInput = formInputs[1];
const rememberMeInput = formInputs[2];


(document.getElementById('login-form')).addEventListener('submit', (event)=> {
    event.preventDefault();
    loginErrorRemove();
    username = usernameInput.value;
    pswd = passwordInput.value;
    console.log(loginUser(username, pswd));
    let returnLogin = loginUser(username, pswd);
    console.log(returnLogin);
    loginUser(username, pswd).then((res)=>{
        if(res){
            loginSuccesful();
        }else{
            loginError();
        }
    }, (err)=>{
        alert("falsches pswd");
    })
    //Hier muss noch die WEiterleitung nach erfolgreicher Registrierung/ Fehlermeldung hin


});

eyeShowPassword.addEventListener("click", ()=>{
  eyeShowPassword.classList.toggle("fa-eye-slash")
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
  passwordInput.setAttribute("type", type)
})

function loginError(){
    passwordInput.classList.add('password-input-animation');
    loginErrorDiv.classList.remove('hidden');
}

function loginErrorRemove(){
    loginErrorDiv.classList.add('hidden');
    passwordInput.classList.remove('password-input-animation');
}

function loginSuccesful(){
    sessionStorage.setItem('isUserSignedIn', 'true');
    window.open('../index/index.html', '_self');
}