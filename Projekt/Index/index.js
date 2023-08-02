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
        setArticlepreview(j, lastTenPosts);
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


function articleFunction(num){
    sessionStorage.setItem('clickedPost', lastTenPosts[num].id);
    window.open("../Articles/article.html", "_self");
}

function patchArticle(num){
    sessionStorage.setItem('patchedPost', lastTenPosts[num].id);
    window.open("../patchArticle/patchArticle", "_self");
}