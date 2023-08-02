const addSectionButton = document.getElementById('add-section-button');
const sectionList = document.getElementById('section-list');
const sectionTemplate = document.getElementById('section-template');

const blogpostTitle = document.getElementById('blogpost-title');
const blogpostImage = document.getElementsByClassName('image-content')[0];
const blogpostImageTitle = document.getElementsByClassName('image-title')[0];
const blogpostText = document.getElementsByClassName('text-content')[0];

const blogpostSectionImages = document.getElementsByClassName('image-content');
const blogpostSectionImageTitles = document.getElementsByClassName('image-title');
const blogpostSectionTexts = document.getElementsByClassName('section-text-content-class');
const blogpostSectionTitles = document.getElementsByClassName('section-title-class');


let sectionNumbers = 0;


getOnePost(sessionStorage.getItem('patchedPost')).then((res)=>{
    blogpostTitle.value = res.title;
    console.log(res);
    blogpostText.value = res.content[0].data;
    blogpostImage.value = res.content[1].url;
    blogpostImageTitle.value = res.content[1].caption;
    for(let i=0; i<res.sections.length; i++){
        const clone = sectionTemplate.content.cloneNode(true);
        const sectionWrapper = clone.querySelector('.section-wrapper');
        sectionList.appendChild(clone);
        sectionNumbers+=1;
        blogpostSectionImages[i+1].value = res.sections[i].content[1].url;
        blogpostSectionImageTitles[i+1].value = res.sections[i].content[1].caption;
        blogpostSectionTexts[i].value = res.sections[i].content[0].data;
        blogpostSectionTitles[i].value = res.sections[i].sectionTitle;
    }
});

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
    let testPost
    if(sectionNumbers==0){
        if(blogpostImage.value && blogpostText.value){
            let imageContent = {
                __type: "img",
                url: blogpostImage.value,
                caption: blogpostImageTitle.value
            }
            let textContent = {
                __type: "text",
                data:blogpostText.value
            }
            testPost ={
                title: blogpostTitle.value,
                content: [textContent, imageContent]
            }

        }else if(!blogpostImage.value){
            let textContent = {
                __type: "text",
                data:blogpostText.value
            }
            testPost ={
                title: blogpostTitle.value,
                content: [textContent]
            }
        }else{
            let imageContent = {
                __type: "img",
                url: blogpostImage.value,
                caption: blogpostImageTitle.value
            }
            testPost ={
                title: blogpostTitle.value,
                content: [imageContent]
            }
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
        //window.open('../index/index.html', '_self');
    }).catch(()=>{
        alert("irgendwas hat nicht geklappt");
    });

};

function getSections(){
    const sectionList = document.getElementsByClassName('section-wrapper');
    console.log(sectionList);
    let sections = new Array(sectionList.length);
    for (let i = 0; i < sectionList.length; i++) {
        if(blogpostImage.value && blogpostText.value){
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

        }else if(!blogpostImage.value){
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
