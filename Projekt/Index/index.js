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
  return 'Vor ' + days + (days === 1 ? ' Tag' : ' Tage');
}