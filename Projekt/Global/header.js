const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
let signInButton;
let registerButton;
let profileButton;
let logOutButton;
let profileToggleDiv;
let profileButtonLink;
let hamburgerMenuMobile;
if(window.screen.width>600){
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
//let isUserSignedIn = false; //statischer Input, ob User angemeldet ist
let isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
let userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
console.log(userDataLocalStorage)

searchButton.addEventListener('click', addAnimation);
profileButtonLink.addEventListener('click', () =>{
    window.open('../profile/profile.html', '_self');
});
checkUserSignedIn();

function checkUserSignedIn(){
    isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
    userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
    console.log(userDataLocalStorage.rememberMe==='true');
    if(userDataLocalStorage.rememberMe==='true'){
        console.log('if 1')
        if((isUserSignedIn==='false' || isUserSignedIn==null)){
            console.log("if 2")
            loginUser(userDataLocalStorage.username, userDataLocalStorage.password, userDataLocalStorage.rememberMe).then(()=>{sessionStorage.setItem('isUserSignedIn', 'true'); testSignedIn();});
        }else{
            testSignedIn();
        }
    }
    else{
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
    const searchRequest = searchInput.value.toLowerCase();
    getUsers().then((res)=>{
        console.log(res);
        let foundUsers={
            searchRequest : searchRequest,
            users:[

            ]
        };
        let j = 0;
        for(i=0; i<res.length; i++){
            let displayName = res[i].profile.displayName.toLowerCase();
            let usernameLowercase = res[i].username.toLowerCase();
            if((displayName.includes(searchRequest)||usernameLowercase.includes(searchRequest)) && !(usernameLowercase == JSON.stringify(userDataLocalStorage.username).toLowerCase())){
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

function testSignedIn(){
    isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
    if(isUserSignedIn==='true'){
        profileButton.addEventListener('click', () =>{profileToggleDiv.classList.toggle('hidden');});
        logOutButton.addEventListener('click', logOut);
        
        signInButton.classList.add('hidden');
        registerButton.classList.add('hidden');
        hamburgerMenuMobile?.classList.add('hidden');
    }else if(window.screen.height>=600){
        signInButton.addEventListener('click', () =>{window.open("../Login/login.html","_self");});
        registerButton.addEventListener('click', () =>{window.open("../Register/register.html","_self");});
        profileButton.classList.add('hidden');
        
    }
}


function formatTimeSinceCreation(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const timeDiff = now - createdDate;

  // Anzahl der vergangenen Minuten berechnen
  const minutes = Math.floor(timeDiff / (1000 * 60));

  if (minutes < 60) {
    return 'Vor ' + minutes + (minutes === 1 ? ' Minute' : ' Minuten');
  }

  // Anzahl der vergangenen Stunden berechnen
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));

  if (hours < 24) {
    return 'Vor ' + hours + (hours === 1 ? ' Stunde' : ' Stunden');
  }

  // Anzahl der vergangenen Tage berechnen
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return 'Vor ' + days + (days === 1 ? ' Tag' : ' Tagen');
}