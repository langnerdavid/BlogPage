const readingTimeP = document.getElementById('reading-time');
const mainTextDiv= document.getElementById('main-text-div');
const mainTextDivP = mainTextDiv.getElementsByTagName('p');
const mainTextDivH2 = mainTextDiv.getElementsByTagName('h2');
let wordCount = 0;
const wordsPerMinute = 250;

countWordElements(mainTextDivP, mainTextDivH2);
readingTimeP.innerHTML= calcReadingTime();

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
