function setArticlepreview(i, posts){
    articles[i].getElementsByTagName('h2')[0].innerHTML = posts[i].title;
    articles[i].getElementsByClassName('article-publishing-date')[0].innerHTML = formatTimeSinceCreation(posts[i].createdAt);
    articles[i].getElementsByClassName('article-publisher')[0].innerHTML = posts[i].username;  
    const textElement = articles[i].getElementsByClassName('article-sub-text-p')[0];
    const newText = posts[i]?.content[0]?.data;
    if (newText) {
        textElement.innerHTML = newText;
    }else if(posts[i]?.sections){
        for(let j = 0; j< posts[i].sections.length; j++){
            if(posts[i].sections[j]?.content[0]?.data){
                textElement.innerHTML = posts[i].sections[j]?.content[0]?.data;
                break;
            }
        }
    }

    const imgElement = articles[i].getElementsByTagName('img')[0];
    const newUrl = posts[i]?.content[1]?.url;
    if (newUrl) {
        imgElement.src = newUrl;
        imgElement.alt = posts[i]?.content[1]?.caption;
    }else if(posts[i]?.content[0]?.url){
        imgElement.src = posts[i]?.content[0]?.url;
        imgElement.alt = posts[i]?.content[0]?.caption;
    }
    else if(posts[i]?.sections){
        for(let j = 0; j< posts[i].sections.length; j++){
            if(posts[i].sections[j]?.content[0]?.url){
                imgElement.src = posts[i].sections[j]?.content[0]?.url;
                imgElement.alt = posts[i].sections[j]?.content[0]?.caption;
                break;
            }else if(posts[i].sections[j]?.content[1]?.url){
                imgElement.src = posts[i].sections[j]?.content[1]?.url;
                imgElement.alt = posts[i].sections[j]?.content[1]?.caption;
                break;
            }
        }
    }
    let userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));   
    isUserSignedIn = sessionStorage.getItem('isUserSignedIn');
    if(posts[i].username===userDataLocalStorage?.username?.toLowerCase() && isUserSignedIn){
        articles[i].getElementsByClassName('change-article-button')[0].classList.remove('hidden');
        articles[i].getElementsByClassName('change-article-button')[0].addEventListener('click', function(e) {
            e.stopPropagation();
            patchArticle(i);
            
        });
    } 
}