const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const signInButton = document.getElementById('signInButton');
const registerButton = document.getElementById('registerButton');
const profileButton = document.getElementById('profileButton');
const profileToggleDiv = document.getElementById('profileToggleDiv');
let isSearchInputOpen = false;
let isUserSignedIn = false; //statischer Input, ob User angemeldet ist


searchButton.addEventListener('click', addAnimation);

if(isUserSignedIn){
    profileButton.addEventListener('click', () =>{profileToggleDiv.classList.toggle('hidden');});
    signInButton.classList.add('hidden');
    registerButton.classList.add('hidden');
}else{
    signInButton.addEventListener('click', () =>{window.open("../Login/login.html","_self");});
    registerButton.addEventListener('click', () =>{window.open("../Register/register.html","_self");});
    profileButton.classList.add('hidden');
}
function addAnimation(){
    console.log("function");
    event.stopPropagation();
    if(!isSearchInputOpen){
        searchInput.classList.remove('searchInputNarrow');
        searchInput.classList.add('searchInputAnimation');
        searchInput.focus();
        setTimeout(() => {
            searchInput.classList.remove('searchInputAnimation');
            searchInput.classList.add('searchInputExtended');
            searchInput.addEventListener('blur', addAnimation);
            }, 400);
        isSearchInputOpen = true;
    }else{
        if(searchInput.value){
            search();
        }else{
            searchInput.classList.remove('searchInputExtended');
            searchInput.classList.add('searchInputAnimationRev');
            searchInput.blur();
            setTimeout(() => {
                searchInput.classList.remove('searchInputAnimationRev');
                searchInput.classList.add('searchInputNarrow');
            }, 400);
            isSearchInputOpen = false;
        }
    }
}

function search(){
    console.log("Hier jetzt Suche");
}