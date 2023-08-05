const articles = document.getElementsByClassName('article');
const articleTemplate = document.getElementById('article-preview-template');
const articleList = document.getElementById('article-preview-list');

const addNewArticleButton = document.getElementsByClassName('new-article-button')[0];

let lastTenPosts;
let content;
let contentImageUrl;


addNewArticleFunctionIndex(); //Falls der USer angemeldet ist, wird hier ein "New Button" angezeigt mit dem neue Posts erstellt werden können

getPosts().then((res)=>{
    lastTenPosts = res;
    console.log(lastTenPosts[0]);
    for(let j=0; j<lastTenPosts.length; j++){
        const clone = articleTemplate.content.cloneNode(true);
        clone.querySelector('.article-wrapper');
        articleList.appendChild(clone);
        for(let i=0; i<lastTenPosts[j].content.length; i++){
            if(lastTenPosts[j].content[i].data){
                content = lastTenPosts[0]?.content[i]?.data;

            }else{
                contentImageUrl = lastTenPosts[0]?.content[i]?.url;

            }
        }
        setArticlepreview(j, lastTenPosts); //Hier werden die Platzhalter alle ELemente des Artikel-Previews durch die von der API erhaltenen Daten ersetzt
    }

    for (let i = 0; i < articles.length; i++) {
    articles[i]?.addEventListener('click', function() {
        articleFunction(i, lastTenPosts);
    });
}
    
    
}).catch(error => {
    console.error(error);
});
//



function addNewArticleFunctionIndex(){
    if(sessionStorage.getItem('isUserSignedIn')==='true'){
        addNewArticleButton?.addEventListener('click', () =>{window.open("../NewArticle/newArticle.html","_self");});
    }else{
        addNewArticleButton?.classList.add('hidden');
    }
}

