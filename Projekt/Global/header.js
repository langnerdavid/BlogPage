const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
let signInButton;
let registerButton;
let profileButton;
let logOutButton;
let profileToggleDiv;
let profileButtonLink;
let hamburgerMenuMobile;

//Alle Elemente bei kleinen screens
if(window.innerWidth>=600){
    profileButton = document.getElementsByClassName('profile-button')[0];
    logOutButton = document.getElementsByClassName('log-out-button')[0];
    profileToggleDiv = document.getElementsByClassName('profile-toggle-div')[0];
    profileButtonLink = document.getElementsByClassName('profile-button-link')[0];
    signInButton = document.getElementById('sign-in-button');
    registerButton = document.getElementById('register-button');
}else{
    profileButton = document.getElementsByClassName('profile-button')[1];    
    logOutButton = document.getElementsByClassName('log-out-button')[1];
    profileToggleDiv = document.getElementsByClassName('profile-toggle-div')[1];
    profileButtonLink = document.getElementsByClassName('profile-button-link')[1];
    hamburgerMenuMobile = document.getElementById('hamburger-menu');
}

let isSearchInputOpen = false;
let isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
let userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));

searchButton.addEventListener('click', addAnimation);
profileButtonLink.addEventListener('click', () =>{
    window.open('../profile/profile.html', '_self');
});

checkUserSignedIn(); //hier wird überprüft, ob aktuell jemand angemeldet ist, um dann den Header anzupassen


//Hier wird überprüft ob der User angemeldet werden muss (wenn er remember me gesetzt hat)
function checkUserSignedIn(){
    isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
    userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
    if(userDataLocalStorage.rememberMe==='true'){
        if((isUserSignedIn==='false' || isUserSignedIn==null)){ //falls der user remember me aktiviert hat und aktuell nicht angemeldet ist, soll er angemeldet werden
            loginUser(userDataLocalStorage.username, userDataLocalStorage.password, userDataLocalStorage.rememberMe).then(()=>{sessionStorage.setItem('isUserSignedIn', 'true'); testSignedIn();});
        }else{
            testSignedIn();
        }
    }
    else{
        testSignedIn();
    }
}


//Hier wird der Header angepasst, wenn der User angemeldet ist
function testSignedIn(){
    isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
    if(isUserSignedIn==='true'){
        profileButton.addEventListener('click', () =>{profileToggleDiv.classList.toggle('hidden');});
        logOutButton.addEventListener('click', logOut);
        
        signInButton?.classList.add('hidden');
        registerButton?.classList.add('hidden');
        hamburgerMenuMobile?.classList.add('hidden');
    }else if(window.innerWidth>=600){
        signInButton.addEventListener('click', () =>{window.open("../Login/login.html","_self");});
        registerButton.addEventListener('click', () =>{window.open("../Register/register.html","_self");});
        profileButton.classList.add('hidden');
        
    }else{
        profileButton.classList.add('hidden');
    }
}


//Hier wird der Suchinput animiert und die Suche gestartet
function addAnimation(){
    console.log("function");
    event.stopPropagation();
    document.addEventListener(
        'keydown', (event) => {
          if (event.keyCode === 13 && searchInput.value){
            search();           
          }
        });
    if(!isSearchInputOpen){
        searchInput.classList.remove('search-input-narrow');
        searchInput.classList.add('search-input-animation');
        searchInput.focus();
        setTimeout(() => {
            searchInput.classList.remove('search-input-animation');
            searchInput.classList.add('search-input-extended');
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

//Hier wird die Suche vorverarbeitet, um dann auf searchResults.html angezeigt werden zu können
function search(){
    const searchRequest = searchInput.value.toLowerCase();
    getUsers().then((res)=>{
        console.log(res);
        let foundUsers={
            searchRequest : searchRequest,
            users:[

            ]
        };
        let j = 0;
        for(let i=0; i<res.length; i++){
            let displayName = res[i].profile.displayName.toLowerCase();
            let usernameLowercase = res[i].username.toLowerCase();
            if((displayName.includes(searchRequest)||usernameLowercase.includes(searchRequest)) && !(usernameLowercase === JSON.stringify(userDataLocalStorage.username).toLowerCase())){
                foundUsers.users[i] = usernameLowercase;
                j++;
            }
        }
        localStorage.setItem('foundUsers', JSON.stringify(foundUsers));
        window.open("../searchResults/searchResults.html","_self");
    
    });
}

function logOut(){
    let userData={
        username: userDataLocalStorage.username,
        password: userDataLocalStorage.password,
        rememberMe: 'false'
    }
    sessionStorage.setItem('isUserSignedIn', 'false');
    localStorage.setItem('userData', JSON.stringify(userData));
    window.open('../Index/index.html', '_self');
}