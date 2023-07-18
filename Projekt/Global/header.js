const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const signInButton = document.getElementById('sign-in-button');
const registerButton = document.getElementById('register-button');
const profileButton = document.getElementById('profile-button');
const logOutButton = document.getElementById('log-out-button');
const profileToggleDiv = document.getElementById('profile-toggle-div');
const profileButtonLink = document.getElementById('profile-button-link');
const addNewArticle = document.getElementById('new-article-button');
let isSearchInputOpen = false;
//let isUserSignedIn = false; //statischer Input, ob User angemeldet ist
let isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
let userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));

searchButton.addEventListener('click', addAnimation);
profileButtonLink.addEventListener('click', () =>{
    window.open('../profile/profile.html', '_self');
});
checkUserSignedIn();

function checkUserSignedIn(){
    isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
    console.log(isUserSignedIn);
    userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
    
    if(userDataLocalStorage?.rememberMe && (isUserSignedIn==='false' || isUserSignedIn==null)){
        console.log("yes");
        loginUser(userDataLocalStorage.username, userDataLocalStorage.password, userDataLocalStorage.rememberMe).then(()=>{sessionStorage.setItem('isUserSignedIn', 'true');testSignedIn();});
    }
    else{
        console.log(isUserSignedIn);
        testSignedIn();
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
    let userData={
        username: userDataLocalStorage.username,
        password: userDataLocalStorage.password,
        rememberMe: 'false'
    }
    sessionStorage.setItem('isUserSignedIn', 'false');
    localStorage.setItem('userData', JSON.stringify('userData'));
    window.open('index.html', '_self');
}

function testSignedIn(){
    if(isUserSignedIn==='true'){
        console.log("if true")
        profileButton.addEventListener('click', () =>{profileToggleDiv.classList.toggle('hidden');});
        logOutButton.addEventListener('click', logOut);
        addNewArticle.addEventListener('click', () =>{window.open("../NewArticle/newArticle.html","_self");});
        
        signInButton.classList.add('hidden');
        registerButton.classList.add('hidden');
    }else{
        console.log("if false");
        signInButton.addEventListener('click', () =>{window.open("../Login/login.html","_self");});
        registerButton.addEventListener('click', () =>{window.open("../Register/register.html","_self");});
        profileButton.classList.add('hidden');
        addNewArticle.classList.add('hidden');
        
    }
}