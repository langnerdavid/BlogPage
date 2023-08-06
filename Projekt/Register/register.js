const formInputs = document.getElementById('register-form').getElementsByTagName('input');
const usernameInput = formInputs[0];
const passwordInput = formInputs[1];
const displayNameInput = formInputs[2];
const descriptionInput = document.getElementById('description');
const eyeShowPassword = document.getElementById('eye-show-password');

function validateTextarea() {
    const input = descriptionInput.value.trim();
    const maxLength = 300;
    if (input.length > maxLength) {
        // Wenn die Länge des Textes größer als das Maximum ist, ist es ungültig
        descriptionInput.setCustomValidity(`Der Text darf nicht länger als ${maxLength} Zeichen sein.`);
        return false;
    } else {
        // Andernfalls ist es gültig
        descriptionInput.setCustomValidity("");
        return true;
    }
}

document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateTextarea()) {
        let userPost = {
            username: usernameInput.value,
            password: passwordInput.value,
            profile:{
                displayName: displayNameInput.value,
                description: descriptionInput.value
            }
        }
        postUsers(userPost).then((res) => {
            if (res === null) {
                window.alert('Der Username wird bereits verwendet');
            } else {
                sessionStorage.setItem('isUserSignedIn', 'true');
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
            }
        }).catch(error => {
            console.error(error);
        });
    }
});


passwordInput.addEventListener('keydown', (event) => {
    if(passwordInput.value){
        eyeShowPassword.style.visibility='visible';
        //Hier wird das Password bei Bedarf angezeigt
        eyeShowPassword.addEventListener("click", ()=>{
            event.stopPropagation();
            eyeShowPassword.classList.toggle("fa-eye-slash")
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
            passwordInput.setAttribute("type", type)
        });
    }else{
        eyeShowPassword.style.visibility='hidden';
    }
    });