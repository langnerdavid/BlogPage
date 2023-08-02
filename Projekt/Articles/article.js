const readingTimeP = document.getElementById('reading-time');
const mainSectionDiv = document.getElementById('main-section-div');
const mainContentDiv = document.getElementById('main-content-div');
const articleHeading = document.getElementById('article-heading');
const publishingDetails = document.getElementById('publishing-details');
const publishingDetailsP = publishingDetails.getElementsByTagName('p');
const sectionTemplate = document.getElementById('section-template');
const articlePicture = document.getElementsByClassName('article-picture');
const contentWrapper = document.getElementById('content-wrapper');
const contentText = contentWrapper.getElementsByTagName('p')[0];

const heading = mainSectionDiv.getElementsByTagName('h2');
const content = mainSectionDiv.getElementsByTagName('p');
const img = mainSectionDiv.getElementsByTagName('img');

let mainTextDivP;
let mainTextDivH2;

let wordCount = 0;
const wordsPerMinute = 250;
sessionStorage.getItem('clickedPost');

getOnePost(sessionStorage.getItem('clickedPost')).then((res)=>{
    let onePost = res;
    console.log(onePost);
    articleHeading.textContent = onePost.title;
    publishingDetailsP[0].textContent = onePost.username;
    publishingDetailsP[1].textContent = formatTimeSinceCreation(onePost.createdAt);
    if(onePost?.content[0]?.url){
        articlePicture[0].src = onePost?.content[0]?.url;
        articlePicture[0].alt = onePost?.content[0]?.caption;
    }else if (onePost?.content[1]?.url){
        contentText.textContent = onePost?.content[0]?.data;
        articlePicture[0].src = onePost?.content[1]?.url;
        articlePicture[0].alt = onePost?.content[1]?.caption;
    }
    
    else{
        articlePicture[0].classList.add('hidden');
        contentText.textContent = onePost?.content[0]?.data;
    }

    for(i=0; i<onePost.sections.length; i++){
        const clone = sectionTemplate.content.cloneNode(true);
        mainSectionDiv.appendChild(clone);
        console.log(onePost?.sections[i]?.content);
        heading[i].textContent = onePost?.sections[i]?.sectionTitle;

        //nur img, kein TextContent
        if(onePost?.sections[i]?.content[0]?.url){
            img[i].src = onePost?.sections[i]?.content[0].url;
            img[i].alt = onePost?.sections[i]?.content[0].caption;
        }
        //sowohl TextContent als auch ImageContent
        else if (onePost?.sections[i]?.content[1]?.url){
            img[i].src = onePost?.sections[i]?.content[1].url;
            img[i].alt = onePost?.sections[i]?.content[1].caption;
            content[i].textContent = onePost?.sections[i]?.content[0]?.data;
        }
        // nur TextContent
        else{
            content[i].textContent = onePost?.sections[i]?.content[0]?.data;
        }

    }

    mainTextDivP = mainContentDiv.getElementsByTagName('p');
    mainTextDivH2 = mainContentDiv.getElementsByTagName('h2');
    countWordElements(mainTextDivP, mainTextDivH2);
    readingTimeP.innerHTML= calcReadingTime();
    
}).catch(error => {
    console.log(error);
  });



function countWords(str) {
    return str.trim().split(/\s+/).length;
}

function countWordElements(ps, h2){
    console.log(ps);
    console.log(h2);
    for(i=4; i<ps.length; i++){
        wordCount+=countWords(ps[i].innerHTML);
    }
    for(i=0; i<h2.length; i++){
        wordCount+=countWords(h2[i].innerHTML);
    }
}

function calcReadingTime(){
    let readingTime = Math.round(wordCount/wordsPerMinute);
    if(readingTime<1){
        return "<1 Minute";
    }else if(readingTime===1){
        return  "1 Minute";
    }else{
        return readingTime + " Minuten";
    }
}
