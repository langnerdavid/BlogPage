const formInputs = (document.getElementById('register-form')).getElementsByTagName('input');
const usernameInput = formInputs[0];
const passwordInput = formInputs[1];
const displayNameInput = formInputs[2];
const descriptionInput = (document.getElementById('register-form')).getElementsByTagName('textarea')[0];


(document.getElementById('register-form')).addEventListener('submit', (event)=> {
    event.preventDefault();
    let userPost = {
        username: usernameInput.value,
        password: passwordInput.value,
        profile:{
            displayName: displayNameInput.value,
            description: descriptionInput.value
        }
    }
    postUsers(userPost).then(()=>{
        sessionStorage.setItem('isUserSignedIn', true);
        userPost = {
            username: usernameInput.value,
            password: passwordInput.value,
            profile:{
                displayName: displayNameInput.value,
                description: descriptionInput.value
            },
            rememberMe: 'false'
        }
        localStorage.setItem('userData', JSON.stringify(userPost));
        window.open('../index/index.html', '_self');
    });


});