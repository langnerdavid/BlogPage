const readingTimeP = document.getElementById('reading-time');
const mainSectionDiv = document.getElementById('main-section-div');
const articleHeading = document.getElementById('article-heading');
const publishingDetails = document.getElementById('publishing-details');
const publishingDetailsP = publishingDetails.getElementsByTagName('p');
const sectionTemplate = document.getElementById('section-template');
const sectionWrapper = document.querySelector('.section-wrapper');
const articlePicture = document.getElementsByClassName('article-picture');

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
    articlePicture[0].src = onePost.content[1].url;

    for(i=0; i<onePost.content.length; i++){
        const clone = sectionTemplate.content.cloneNode(true);
        const heading = clone.querySelector('h2');
        const content = clone.querySelector('p');
        heading.textContent = onePost?.sections[i]?.sectionTitle;
        if(onePost?.content[i]?.data){
            content.textContent = onePost.content[i].data;
        }else{
            contentImgaeUrl = onePost.content[i].url;
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
