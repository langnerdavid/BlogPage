const readingTimeP = document.getElementById('reading-time');
const mainSectionDiv = document.getElementById('main-section-div');
const articleHeading = document.getElementById('article-heading');
const publishingDetails = document.getElementById('publishing-details');
const publishingDetailsP = publishingDetails.getElementsByTagName('p');
const sectionTemplate = document.getElementById('section-template');
const sectionWrapper = document.querySelector('.section-wrapper');

let mainTextDivP;
let mainTextDivH2;

let wordCount = 0;
const wordsPerMinute = 250;

getPosts().then((res)=>{
    let lastTenPosts = res;
    console.log(lastTenPosts[0]);
    articleHeading.textContent = lastTenPosts[0].title;
    publishingDetailsP[0].textContent = lastTenPosts[0].username;
    publishingDetailsP[1].textContent = formatTimeSinceCreation(lastTenPosts[0].createdAt);


    for(i=0; i<lastTenPosts[0].content.length; i++){
        const clone = sectionTemplate.content.cloneNode(true);
        const heading = clone.querySelector('h2');
        const content = clone.querySelector('p');
        heading.textContent = lastTenPosts[0]?.sections[i]?.sectionTitle;
        if(lastTenPosts[0]?.content[i]?.data){
            content.textContent = lastTenPosts[0].content[i].data;
        }else{
            contentImgaeUrl = lastTenPosts[0].content[i].url;
            continue;
        }
        mainSectionDiv.appendChild(clone);
    }

    mainTextDivP = mainSectionDiv.getElementsByTagName('p');
    mainTextDivH2 = mainSectionDiv.getElementsByTagName('h2');
    countWordElements(mainTextDivP, mainTextDivH2);
    readingTimeP.innerHTML= calcReadingTime();
    
}).catch(error => {
    console.log(error);
  });



function countWords(str) {
    return str.trim().split(/\s+/).length;
}

function countWordElements(ps, h2){
    for(i=0; i<ps.length; i++){
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
