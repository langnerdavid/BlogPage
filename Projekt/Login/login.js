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
    let username = usernameInput.value;
    let pswd = passwordInput.value;
    let rememberMe = rememberMeInput.checked;
    console.log(rememberMe)
    loginUser(username, pswd, rememberMe).then((res)=>{
        console.log(res);
        if(res){
            loginSuccesful(res);
        }else{
            loginError();
        }
    }, (err)=>{
        alert("falsches pswd");
    });
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
    sessionStorage.setItem('isUserSignedIn', false);
}

function loginErrorRemove(){
    loginErrorDiv.classList.add('hidden');
    passwordInput.classList.remove('password-input-animation');
}

function loginSuccesful(res){
    sessionStorage.setItem('isUserSignedIn', true);
    localStorage.setItem('userData', JSON.stringify(res));
    let json = JSON.parse(localStorage.getItem('userData'));
    console.log(json.password);
    window.open('../index/index.html', '_self');
}