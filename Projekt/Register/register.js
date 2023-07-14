const formInputs = (document.getElementById('register-form')).getElementsByTagName('input');
const usernameInput = formInputs[0];
const passwordInput = formInputs[1];
const displayNameInput = formInputs[2];
const descrpitionInput = formInputs[3];


(document.getElementById('register-form')).addEventListener('submit', (event)=> {
    event.preventDefault();
    let userPost = {
        username: usernameInput.value,
        password: passwordInput.value,
        profile:{
            displayName: displayNameInput.value,
            description: descrpitionInput.value
        }
    }
    console.log(userPost.username);
    //postUsers(userPost);
    //Hier muss noch die WEiterleitung nach erfolgreicher Registrierung/ Fehlermeldung hin


});