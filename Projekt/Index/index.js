const article1 = document.getElementById('article-1');
const articles = document.getElementsByClassName('article');

article1.addEventListener('click', ()=>{window.open("../Articles/article.html", "_self");});
let lastTenPosts;
let content;
let contentImgaeUrl;

getPosts().then((res)=>{
    lastTenPosts = res;
    console.log(lastTenPosts[0]);
    for(i=0; i<lastTenPosts[0].content.length; i++){
        if(lastTenPosts[0].content[i].data){
            content = lastTenPosts[0].content[i].data;
            continue;
        }else{
            contentImgaeUrl = lastTenPosts[0].content[i].url;
            continue;
        }
    }
    setArticlepreview(0);
    
}).catch(error => {
    console.error(error);
  });

//

function setArticlepreview(i){
    articles[i].getElementsByTagName('h2')[0].innerHTML = lastTenPosts[i].title;
    articles[i].getElementsByClassName('article-publishing-date')[0].innerHTML = formatTimeSinceCreation(lastTenPosts[i].createdAt);
    articles[i].getElementsByClassName('article-publisher')[0].innerHTML = lastTenPosts[i].username;  
    articles[i].getElementsByClassName('article-sub-text-p')[0].innerHTML = content;  
    articles[i].getElementsByTagName('img')[0].src = contentImgaeUrl;    
}