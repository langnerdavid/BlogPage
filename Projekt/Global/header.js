const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const signInButton = document.getElementById('sign-in-button');
const registerButton = document.getElementById('register-button');
const profileButton = document.getElementById('profile-button');
const logOutButton = document.getElementById('log-out-button');
const profileToggleDiv = document.getElementById('profile-toggle-div');
let isSearchInputOpen = false;
//let isUserSignedIn = false; //statischer Input, ob User angemeldet ist
let isUserSignedIn = sessionStorage.getItem('isUserSignedIn');

searchButton.addEventListener('click', addAnimation);
checkUserSignedIn();

function checkUserSignedIn(){
    isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
    console.log(isUserSignedIn);
    if(isUserSignedIn==='true'){
        console.log("if true")
        profileButton.addEventListener('click', () =>{profileToggleDiv.classList.toggle('hidden');});
        logOutButton.addEventListener('click', logOut);
        signInButton.classList.add('hidden');
        registerButton.classList.add('hidden');
    }else{
        console.log("if false");
        signInButton.addEventListener('click', () =>{window.open("../Login/login.html","_self");});
        registerButton.addEventListener('click', () =>{window.open("../Register/register.html","_self");});
        profileButton.classList.add('hidden');
    }
}

function addAnimation(){
    console.log("function");
    event.stopPropagation();
    if(!isSearchInputOpen){
        searchInput.classList.remove('search-input-narrow');
        searchInput.classList.add('search-input-animation');
        searchInput.focus();
        setTimeout(() => {
            searchInput.classList.remove('search-input-animation');
            searchInput.classList.add('search-input-extended');
            searchInput.addEventListener('blur', addAnimation);
            }, 400);
        isSearchInputOpen = true;
    }else{
        if(searchInput.value){
            search();
        }else{
            searchInput.classList.remove('search-input-extended');
            searchInput.classList.add('search-input-animation-rev');
            searchInput.blur();
            setTimeout(() => {
                searchInput.classList.remove('search-input-animation-rev');
                searchInput.classList.add('search-input-narrow');
            }, 400);
            isSearchInputOpen = false;
        }
    }
}

function search(){
    console.log("Hier jetzt Suche");
}

function logOut(){
    sessionStorage.setItem('isUserSignedIn', 'false');
    window.open('index.html', '_self');
}