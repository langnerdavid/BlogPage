const formInputs = (document.getElementById('register-form')).getElementsByTagName('input');
const usernameInput = formInputs[0];
const passwordInput = formInputs[1];
const displayNameInput = formInputs[2];
const descrpitionInput = formInputs[3];


(document.getElementById('register-form')).addEventListener('submit', (event)=> {
    event.preventDefault();
    localStorage.setItem('password', pswd);
    let userPost = {
        username: usernameInput.value,
        password: passwordInput.value,
        profile:{
            displayName: displayNameInput.value,
            description: descrpitionInput.value
        }
    }
    postUsers(userPost).then(()=>{
        sessionStorage.setItem('isUserSignedIn', true);
        localStorage.setItem('userData', JSON.stringify(userPost));
        window.open('../index/index.html', '_self');
    });


});