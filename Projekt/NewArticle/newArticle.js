const addSectionButton = document.getElementById('add-section-button');
const sectionList = document.getElementById('section-list');
const sectionTemplate = document.getElementById('section-template');

const blogpostTitle = document.getElementById('blogpost-title');
const blogpostImage = document.getElementsByClassName('image-content')[0];
const blogpostText = document.getElementsByClassName('text-content')[0];

let sectionNumbers = 0;

const form = document.getElementById("blogpost-form");
form.addEventListener("submit", getPost);

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


function getPost(e){
    e.preventDefault();
    let textContent = {
        __type: "text",
        data:blogpostText.value
    }
    const imageContent = {
        __type: "img",
        url: blogpostImage.value,
        caption: "Ein Test Bild"
    }
    let testPost
    if(sectionNumbers==0){
        testPost ={
            title: blogpostTitle.value,
            content: [textContent, imageContent]
        }
    }else{
        testPost ={
            title: blogpostTitle.value,
            content: [textContent, imageContent],
            sections: getSections()
        }
    }
    let test = JSON.parse(localStorage.getItem('userData'));
    console.log(test.password);
    const encode = btoa(test.username+':'+test.password);
    const authHeader = `Basic ${encode}`;
    console.log(testPost);
    postPost(testPost, authHeader).then(()=>{
        window.open('../index/index.html', '_self');
    }).catch(()=>{
        alert("irgendwas hat nicht geklappt");
    });

};

function getSections(){
    const sectionList = document.getElementsByClassName('section-wrapper');
    console.log(sectionList);
    let sections = new Array(sectionList.length);
    for (let i = 0; i < sectionList.length; i++) {
        let imageContent={
            __type: "img",
            url: sectionList[i].getElementsByClassName('image-content')[0].value,
            caption: "Ein Test Bild"
        }
        let textContent = {
            __type: "text",
            data: sectionList[i].getElementsByClassName('section-text-content-class')[0].value
        }
        sections[i] ={
            sectionTitle: sectionList[i].getElementsByClassName('section-title-class')[0].value,
            content: [textContent, imageContent]
        }
        console.log(i);
    }

    return sections;
}
