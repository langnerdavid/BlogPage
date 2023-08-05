let clickedUser = sessionStorage.getItem('clickedUser');

let password;
let description;

const articleTemplate = document.getElementById('article-preview-template');
const articleList = document.getElementById('article-preview-list');
const articles = document.getElementsByClassName('article');




getUser(clickedUser).then((res)=>{
  document.getElementById('display-name').innerText = res.profile.displayName;
  document.getElementById('description').innerText = res.profile.description;
  document.getElementById('username').innerText = res.username;
});


getUserPosts(clickedUser).then((res)=>{
    setWrittenArticles(res);
    
    
}).catch(error => {
    console.error(error);
});
//
