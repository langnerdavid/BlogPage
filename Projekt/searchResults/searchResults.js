const ResultTemplate = document.getElementById('user-results-template');
const ResultWrapper = document.getElementById('search-results-wrapper');
const userDescriptions = document.getElementsByClassName('description');
const userNames = document.getElementsByClassName('username');
const userDisplayNames = document.getElementsByClassName('display-name');
const searchResultsH2 = document.getElementsByTagName('h2')[0];
const nothingFound = document.getElementById('nothing-found');

const userResults = document.getElementsByClassName('user-result-div');

let foundUsers = JSON.parse(localStorage.getItem('foundUsers'));
searchResultsH2.innerHTML = 'Ergebnisse zu '+foundUsers.searchRequest;

if(foundUsers.users.length===0){
    nothingFound.classList.remove('hidden');
}else{
    nothingFound.classList.add('hidden');
    for(let i = 0; i<foundUsers.users.length; i++){
        console.log(i);
        const clone = ResultTemplate.content.cloneNode(true);
        ResultWrapper.appendChild(clone);   
        getUser(foundUsers.users[i]).then((res)=>{
            userDisplayNames[i].innerHTML = res.profile.displayName;
            userNames[i].innerHTML = res.username;
            userDescriptions[i].innerHTML = res.profile.description; 
        });
    }   
    for (let i = 0; i < userResults.length; i++) {
        userResults[i]?.addEventListener('click', function(e) {
            sessionStorage.setItem('clickedUser', userNames[i].innerHTML);
            window.open("../ProfileOtherUsers/ProfileOtherUsers.html", "_self");
        });
    }   
}

