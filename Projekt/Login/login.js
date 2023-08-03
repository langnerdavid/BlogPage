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
    let rememberMe;
    if(rememberMeInput.checked){
        rememberMe='true';
    }else{
        rememberMe='false';
    }
    loginUser(username, pswd, rememberMe).then((res)=>{
        console.log(res);
        if(res){
            loginSuccesful(res);
            getUser(username).then((res)=>{
                console.log(res);
            });
        }else{
            loginError();
        }
    }, (err)=>{
        alert("falsches pswd");
    });


});

eyeShowPassword.addEventListener("click", ()=>{
  eyeShowPassword.classList.toggle("fa-eye-slash")
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
  passwordInput.setAttribute("type", type)
});

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
    window.open('../index/index.html', '_self');
}