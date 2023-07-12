const formInputs = (document.getElementById('login-form')).getElementsByTagName('input');
const passwordLogin = document.getElementById('password-input');
const loginErrorDiv = document.getElementById('login-error-div');
const usernameInput = formInputs[0];
const passwordInput = formInputs[1];


(document.getElementById('login-form')).addEventListener('submit', (event)=> {
    event.preventDefault();
    loginErrorDiv.classList.add('hidden');
    passwordInput.classList.remove('password-input-animation');
    username = usernameInput.value;
    pswd = passwordInput.value;
    console.log(loginUser(username, pswd));
    let returnLogin = loginUser(username, pswd);
    console.log(returnLogin);
    loginUser(username, pswd).then((res)=>{
        if(res){
            alert("eingelogt");
        }else{
            passwordInput.classList.add('password-input-animation');
            loginErrorDiv.classList.remove('hidden');
        }
    }, (err)=>{
        alert("falsches pswd");
    })
    //Hier muss noch die WEiterleitung nach erfolgreicher Registrierung/ Fehlermeldung hin


});