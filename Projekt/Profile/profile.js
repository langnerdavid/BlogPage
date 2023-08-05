userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
let encoded = btoa(`${userDataLocalStorage.username}:${userDataLocalStorage.password}`);
let authHeader = `Basic ${encoded}`;
let displayName;
let password;
let description;
const deleteConfirmButton = document.getElementById('delete-confirm-button');
const deleteCancelButton = document.getElementById('delete-cancel-button');
const deleteToggleButton = document.getElementById('delete-toggle-button');
const deleteToggleDiv = document.getElementsByClassName('delete-toggle-div')[0];
const articleTemplate = document.getElementById('article-preview-template');
const articleList = document.getElementById('article-preview-list');
const articles = document.getElementsByClassName('article');
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,12}$/; 

const deleteArticleButtons  = document.getElementsByClassName('delete-article-button');
const deleteArticleToggleDivs = document.getElementsByClassName('delete-toggle-div-article');


let addNewArticleButton = document.getElementsByClassName('new-article-button');
addNewArticleFunction(addNewArticleButton); //der add new Article Button wird angezeigt, falls der User angemeldet ist


//Wenn delete werden soll, muss das bestätigt werden, damit das nicht versehentlich passiert
deleteToggleButton.addEventListener('click', () => {
  deleteToggleDiv.classList.remove('hidden');
});

deleteCancelButton.addEventListener('click', () => {
  deleteToggleDiv.classList.add('hidden');
});

deleteConfirmButton.addEventListener('click', () => {
  deleteUserButton();
});

getUser(userDataLocalStorage.username).then((res)=>{
  userDataLocalStorage.profile.displayName = res.profile.displayName;
  userDataLocalStorage.profile.description = res.profile.description;
  localStorage.setItem('userData', JSON.stringify(userDataLocalStorage));
  setInputValues();
}).catch(error => {
  console.error(error);
});


//Hier wird die Bearbeitung des users eingestellt
function toggleEdit() {
  let fields = document.querySelectorAll('[contenteditable]');
  let editButton = document.querySelector('.edit-button');

  if (editButton.innerText === 'Edit Fields') {
    editButton.innerText = 'Save Fields';
    fields.forEach(function(field) {
      field.contentEditable = 'true';
      field.classList.add('focused');
    });
  } else {
    displayName = document.getElementById('display-name').innerText;
    password = document.getElementById('password').innerText;
    description = document.getElementById('description').textContent;


    if (displayName.length < 4 || displayName.length > 30) {
      alert('Displayname must be between 4-30 characters!');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('Password needs to be between 4 and 12 characters long, at least one number and one digit must be provided.');
      return;
    }

    if (description.length > 300) {
      alert('Description has a maximum of 300 characters.');
      return;
    }

    saveData();

    editButton.innerText = 'Edit Fields';
    fields.forEach(function(field) {
      field.contentEditable = 'false';
      field.classList.remove('focused');
    });
    
  }
}

//Die geänderten Userdaten werden hier gespeichert
function saveData() {
  let userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
  let encoded = btoa(`${userDataLocalStorage.username}:${userDataLocalStorage.password}`);
  let authHeader = `Basic ${encoded}`;
  let userData = {
    username: userDataLocalStorage.username,
    password: password,
    profile:{
        displayName: displayName,
        description: description
    }  
  }
  patchUser(userData, authHeader).then(()=>{
    localStorage.setItem('userData', JSON.stringify(userData));
  }).catch(error => {
    console.error(error);
});
}

//Hier werden die Profil-daten des Users angezeigt
function setInputValues(){
  let userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
  displayName = userDataLocalStorage.profile.displayName;
  password = userDataLocalStorage.password;
  description = userDataLocalStorage.profile.description;
  document.getElementById('display-name').innerText = displayName;
  document.getElementById('password').innerText = password;
  document.getElementById('description').innerText = description;
  document.getElementById('username').innerText = userDataLocalStorage.username;
}


function deleteUserButton(){
  let userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
  encoded = btoa(`${userDataLocalStorage.username}:${userDataLocalStorage.password}`);
  authHeader = `Basic ${encoded}`;
  deleteUsers(userDataLocalStorage.username, authHeader).then((res)=>{
    sessionStorage.setItem('isUserSignedIn', 'false');
    localStorage.setItem('userData', JSON.stringify(res));
    window.open('../index/index.html', '_self');
  }).catch(error => {
    console.error(error);
  });
}

getUserPosts(userDataLocalStorage.username).then((res)=>{
  setWrittenArticles(res);
  for(let i=0; i<res.length; i++){
    deleteArticleButtons[i].addEventListener('click', (e)=>{
      e.stopPropagation();
      confirmDeleteArticle(i, res);
    });
  }
}).catch(error => {
    console.error(error);
});
//  


//Soll ein Artikel gelöscht werden, muss das hier bestätigt werden
function confirmDeleteArticle(num, userPosts){
  deleteArticleToggleDivs[num].classList.remove('hidden');
  let deleteArticleCancelButton = deleteArticleToggleDivs[num].getElementsByClassName('delete-cancel-button-article')[0];
  let deleteArticleConfirmButton = deleteArticleToggleDivs[num].getElementsByClassName('delete-confirm-button-article')[0];

  deleteArticleCancelButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteArticleToggleDivs[num].classList.add('hidden');
  });

  deleteArticleConfirmButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteArticle(num, userPosts);
  });

}

function deleteArticle(num, userPosts){
  deletePost(userPosts[num].id, authHeader).then(()=>{
    console.log("gelöscht?");
    window.location.reload();
  });
}