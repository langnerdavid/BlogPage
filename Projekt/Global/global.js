let sectionNumbers = 0;


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
            patchArticle(i, posts);
            
        });
    } 
}


function getSections(image, text){
    const sectionList = document.getElementsByClassName('section-wrapper');
    let sections = new Array(sectionList.length);
    for (let i = 0; i < sectionList.length; i++) {
        if(image.value && text.value){
            let imageContent = {
                __type: "img",
                url: sectionList[i].getElementsByClassName('image-content')[0].value,
                caption: sectionList[i].getElementsByClassName('image-title')[0].value
            }
            let textContent = {
                __type: "text",
                data: sectionList[i].getElementsByClassName('section-text-content-class')[0].value
            }
            sections[i] ={
                sectionTitle: sectionList[i].getElementsByClassName('section-title-class')[0].value,
                content: [textContent, imageContent]
            }
        }else if(!image.value){
            let textContent = {
                __type: "text",
                data: sectionList[i].getElementsByClassName('section-text-content-class')[0].value
            }
            sections[i] ={
                sectionTitle: sectionList[i].getElementsByClassName('section-title-class')[0].value,
                content: [textContent]
            }
        }else{
            let imageContent = {
                __type: "img",
                url: sectionList[i].getElementsByClassName('image-content')[0].value,
                caption: sectionList[i].getElementsByClassName('image-title')[0].value
            }
            sections[i] ={
                sectionTitle: sectionList[i].getElementsByClassName('section-title-class')[0].value,
                content: [imageContent]
            }
        }
    }
    return sections;
}


function articleAddSectionButton(addSectionButton){
    addSectionButton.addEventListener('click', () => {
    const clone = sectionTemplate.content.cloneNode(true);
    const sectionWrapper = clone.querySelector('.section-wrapper');

    sectionList.appendChild(clone);
    sectionNumbers+=1;

    const removeSectionButton = sectionWrapper.querySelector('.remove-section-button');
    removeSectionButton.addEventListener('click', function() {
        sectionWrapper.remove();
        sectionNumbers-=1;

    });
});
}


function setWrittenArticles(userPosts){
    if(userPosts.length === 0){
      articleList.getElementsByTagName('p')[0].classList.remove('hidden');
    }else{
        articleList.getElementsByTagName('p')[0].classList.add('hidden');
        for(j=0; j<userPosts.length; j++){
            const clone = articleTemplate.content.cloneNode(true);
            const articleWrapper = clone.querySelector('.article-wrapper');
            articleList.appendChild(clone);
            for(i=0; i<userPosts[j].content.length; i++){
                if(userPosts[j].content[i].data){
                    content = userPosts[0]?.content[i]?.data;
                    continue;
                }else{
                    contentImgaeUrl = userPosts[0]?.content[i]?.url;
                    continue;
                }
            }
            setArticlepreview(j, userPosts);
        }

        for (let i = 0; i < articles.length; i++) {
        articles[i]?.addEventListener('click', function() {
            articleFunction(i, userPosts);
        });
        }
    }
}

function articleFunction(num, userPosts){
    sessionStorage.setItem('clickedPost', userPosts[num].id);
    window.open("../Articles/article.html", "_self");
}

function patchArticle(num, userPosts){
    sessionStorage.setItem('patchedPost', userPosts[num].id);
    window.open("../patchArticle/patchArticle.html", "_self");
}