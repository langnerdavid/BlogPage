const article1 = document.getElementById('article-1');
const articles = document.getElementsByClassName('article');
const articleTemplate = document.getElementById('article-preview-template');
const articleList = document.getElementById('article-preview-list');

let lastTenPosts;
let content;
let contentImgaeUrl;



getPosts().then((res)=>{
    lastTenPosts = res;
    console.log(lastTenPosts[0]);
    for(j=0; j<lastTenPosts.length; j++){
        const clone = articleTemplate.content.cloneNode(true);
        const articleWrapper = clone.querySelector('.article-wrapper');
        articleList.appendChild(clone);
        for(i=0; i<lastTenPosts[j].content.length; i++){
            if(lastTenPosts[j].content[i].data){
                content = lastTenPosts[0]?.content[i]?.data;
                continue;
            }else{
                contentImgaeUrl = lastTenPosts[0]?.content[i]?.url;
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
    
    
}).catch(error => {
    console.error(error);
});
//

function setArticlepreview(i){
    articles[i].getElementsByTagName('h2')[0].innerHTML = lastTenPosts[i].title;
    articles[i].getElementsByClassName('article-publishing-date')[0].innerHTML = formatTimeSinceCreation(lastTenPosts[i].createdAt);
    articles[i].getElementsByClassName('article-publisher')[0].innerHTML = lastTenPosts[i].username;  
    const textElement = articles[i].getElementsByClassName('article-sub-text-p')[0];
    const newText = lastTenPosts[i]?.content[0]?.data;
    if (newText) {
        textElement.innerHTML = newText;
    }
    const imgElement = articles[i].getElementsByTagName('img')[0];
    const newUrl = lastTenPosts[i]?.content[1]?.url;
    if (newUrl) {
        imgElement.src = newUrl;
    }
    let userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));   
    isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
    if(lastTenPosts[i].username===userDataLocalStorage?.username?.toLowerCase() && isUserSignedIn){
        articles[i].getElementsByClassName('change-article-button')[0].classList.remove('hidden');
        articles[i].getElementsByClassName('change-article-button')[0].addEventListener('click', function(e) {
            e.stopPropagation();
            patchArticle(i);
            
        });
    } 
}

function articleFunction(num){
    sessionStorage.setItem('clickedPost', lastTenPosts[num].id);
    window.open("../Articles/article.html", "_self");
}

function patchArticle(num){
    sessionStorage.setItem('patchedPost', lastTenPosts[num].id);
    window.open("../patchArticle/patchArticle", "_self");
}