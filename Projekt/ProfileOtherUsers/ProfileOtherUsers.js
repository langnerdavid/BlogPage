let clickedUser = sessionStorage.getItem('clickedUser');

let displayName;
let password;
let description;

const articleTemplate = document.getElementById('article-preview-template');
const articleList = document.getElementById('article-preview-list');
const articles = document.getElementsByClassName('article');
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,12}$/; 




getUser(clickedUser).then((res)=>{
  console.log(res);
  document.getElementById('display-name').innerText = res.profile.displayName;
  document.getElementById('description').innerText = res.profile.description;
  document.getElementById('username').innerText = res.username;
});


getUserPosts(clickedUser).then((res)=>{
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
        setArticlepreview(j, userPosts);
      }

    for (let i = 0; i < articles.length; i++) {
      articles[i]?.addEventListener('click', function() {
        articleFunction(i);
      });
    }
  }
    
    
}).catch(error => {
    console.error(error);
});
//

function articleFunction(num){
    sessionStorage.setItem('clickedPost', userPosts[num].id);
    window.open("../Articles/article.html", "_self");
}

function patchArticle(num){
    sessionStorage.setItem('patchedPost', userPosts[num].id);
    window.open("../patchArticle/patchArticle.html", "_self");
}
