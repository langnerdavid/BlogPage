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


const deleteArticleToggleDivs = document.getElementsByClassName('delete-toggle-div-article');



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
  console.log(userDataLocalStorage.username);
  userDataLocalStorage.profile.displayName = res.profile.displayName;
  userDataLocalStorage.profile.description = res.profile.description;
  localStorage.setItem('userData', JSON.stringify(userDataLocalStorage));
  setInputValues();
});

function toggleEdit() {
  var fields = document.querySelectorAll('[contenteditable]');
  var editButton = document.querySelector('.edit-button');

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
      alert('Dispalyname must be between 4-30 characters!');
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


function saveData() {
  userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
  let encoded = btoa(`${userDataLocalStorage.username}:${userDataLocalStorage.password}`);
  let authHeader = `Basic ${encoded}`;
  displayName = userDataLocalStorage.profile?.displayName;
  password = userDataLocalStorage.password;
  description = userDataLocalStorage.profile?.description;
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
  });
}


function setInputValues(){
  userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
  displayName = userDataLocalStorage.profile.displayName;
  password = userDataLocalStorage.password;
  description = userDataLocalStorage.profile.description;
  document.getElementById('display-name').innerText = displayName;
  document.getElementById('password').innerText = password;
  document.getElementById('description').innerText = description;
  document.getElementById('username').innerText = userDataLocalStorage.username;
}


function deleteUserButton(){
  userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
  console.log(userDataLocalStorage.password);
  encoded = btoa(`${userDataLocalStorage.username}:${userDataLocalStorage.password}`);
  authHeader = `Basic ${encoded}`;
  deleteUsers(userDataLocalStorage.username, authHeader).then((res)=>{
    sessionStorage.setItem('isUserSignedIn', false);
    localStorage.setItem('userData', JSON.stringify(res));
    window.open('../index/index.html', '_self');
  });
}

getUserPosts(userDataLocalStorage.username).then((res)=>{
    userPosts = res;
    console.log(userPosts[0]);
    if(res.length === 0){
      articleList.getElementsByTagName('p')[0].classList.remove('hidden');
    }else{
      articleList.getElementsByTagName('p')[0].classList.add('hidden');
      for(j=0; j<userPosts.length; j++){
          const clone = articleTemplate.content.cloneNode(true);
          const articleWrapper = clone.querySelector('.article-wrapper');
          articleList.appendChild(clone);
          for(i=0; i<userPosts[j].content.length; i++){
              if(userPosts[j].content[i].data){
                  content = userPosts[0].content[i].data;
                  continue;
              }else{
                  contentImgaeUrl = userPosts[0].content[i].url;
                  continue;
              }
          }
          setArticlepreview(j);
      }

      for (let i = 0; i < articles.length; i++) {
      articles[i]?.addEventListener('click', function() {
          articleFunction(i);
      });
    }
  }
}
    
    
}).catch(error => {
    console.error(error);
});
//

function setArticlepreview(i){
    articles[i].getElementsByTagName('h2')[0].innerHTML = userPosts[i].title;
    articles[i].getElementsByClassName('article-publishing-date')[0].innerHTML = formatTimeSinceCreation(userPosts[i].createdAt);
    articles[i].getElementsByClassName('article-publisher')[0].innerHTML = userPosts[i].username;  
    articles[i].getElementsByClassName('article-sub-text-p')[0].innerHTML = userPosts[i].content[0].data;  
    articles[i].getElementsByTagName('img')[0].src = userPosts[i].content[1].url;
    let userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));   
    articles[i].getElementsByClassName('change-article-button')[0].addEventListener('click', function(e) {
        e.stopPropagation();
        patchArticle(i);
        
    });
    articles[i].getElementsByClassName('delete-article-button')[0].addEventListener('click', function(e) {
        e.stopPropagation();
        confirmDeleteArticle(i);
        
    });
}

function articleFunction(num){
    sessionStorage.setItem('clickedPost', userPosts[num].id);
    window.open("../Articles/article.html", "_self");
}

function patchArticle(num){
    sessionStorage.setItem('patchedPost', userPosts[num].id);
    window.open("../patchArticle/patchArticle.html", "_self");
}

function confirmDeleteArticle(num){
  deleteArticleToggleDivs[num].classList.remove('hidden');
  let deleteArticleCancelButton = deleteArticleToggleDivs[num].getElementsByClassName('delete-cancel-button-article')[0];
  let deleteArticleConfirmButton = deleteArticleToggleDivs[num].getElementsByClassName('delete-confirm-button-article')[0];

  deleteArticleCancelButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteArticleToggleDivs[num].classList.add('hidden');
  });

  deleteArticleConfirmButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteArticle(num);
  });

}

function deleteArticle(num){
  deletePost(userPosts[num].id, authHeader).then(()=>{
    console.log("gelöscht?");
    window.location.reload();
  });
}