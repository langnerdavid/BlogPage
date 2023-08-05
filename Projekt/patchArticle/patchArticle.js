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

const form = document.getElementById("blogpost-form");


//Hier werden die bereits gefüllten angaben des zu bearbeitenden Posts angezeigt
getOnePost(sessionStorage.getItem('patchedPost')).then((res)=>{
    blogpostTitle.value = res.title;
    if(res?.content[0]?.data){
        blogpostText.value = res?.content[0]?.data;
    }if(res?.content[1]?.url){
        blogpostImage.value = res?.content[1]?.url;
        blogpostImageTitle.value = res?.content[1]?.caption;
    }
    for(let i=0; i<res.sections.length; i++){
        const clone = sectionTemplate.content.cloneNode(true);
        clone.querySelector('.section-wrapper');
        sectionList.appendChild(clone);
        sectionNumbers+=1;
        if(res?.sections[i]?.content[0]?.data){
            blogpostSectionTexts[i].value = res.sections[i].content[0].data;
        }if(res?.sections[i]?.content[1]?.url){
            blogpostSectionImages[i+1].value = res.sections[i].content[1].url;
            blogpostSectionImageTitles[i+1].value = res.sections[i].content[1].caption;
        }if(res?.sections[i]?.content[0]?.url){
            blogpostSectionImages[i+1].value = res.sections[i].content[0].url;
            blogpostSectionImageTitles[i+1].value = res.sections[i].content[0].caption;
        }
        blogpostSectionTitles[i].value = res.sections[i].sectionTitle;
    }
}).catch(error => {
    console.error(error);
});


form.addEventListener("submit", getPost);

articleAddSectionButton(addSectionButton); //Funktionalität des "add-Section"-Buttons


function getPost(e){
    e.preventDefault();
    let patchedPost
    if(sectionNumbers===0){
        if(blogpostImage?.value && blogpostText?.value){
            let imageContent = {
                __type: "img",
                url: blogpostImage.value,
                caption: blogpostImageTitle.value
            }
            let textContent = {
                __type: "text",
                data:blogpostText.value
            }
            patchedPost ={
                title: blogpostTitle.value,
                content: [textContent, imageContent]
            }

        }else if(!blogpostImage?.value){
            let textContent = {
                __type: "text",
                data:blogpostText.value
            }
            patchedPost ={
                title: blogpostTitle.value,
                content: [textContent]
            }
        }else{
            let imageContent = {
                __type: "img",
                url: blogpostImage.value,
                caption: blogpostImageTitle.value
            }
            patchedPost ={
                title: blogpostTitle.value,
                content: [imageContent]
            }
        }
    }else{
        if(!blogpostImage?.value && !blogpostText?.value){
            patchedPost ={
                title: blogpostTitle.value,
                sections: getSections(sectionList.getElementsByClassName('section-wrapper'))
            }
        }else{
            if(blogpostImage?.value && blogpostText?.value){
                let imageContent = {
                    __type: "img",
                    url: blogpostImage.value,
                    caption: blogpostImageTitle.value
                }
                let textContent = {
                    __type: "text",
                    data:blogpostText.value
                }
                patchedPost ={
                    title: blogpostTitle.value,
                    content: [textContent, imageContent],
                    sections: getSections(sectionList.getElementsByClassName('section-wrapper'))
                }
            }else if(blogpostText?.value){
                let textContent = {
                    __type: "text",
                    data:blogpostText.value
                }
                patchedPost ={
                    title: blogpostTitle.value,
                    content: [textContent],
                    sections: getSections(sectionList.getElementsByClassName('section-wrapper'))
                }
            }else{
                let imageContent = {
                    __type: "img",
                    url: blogpostImage.value,
                    caption: blogpostImageTitle.value
                }
                patchedPost ={
                    title: blogpostTitle.value,
                    content: [imageContent],
                    sections: getSections(sectionList.getElementsByClassName('section-wrapper'))
                }
            }
        }
    }
    let test = JSON.parse(localStorage.getItem('userData'));
    const encode = btoa(test.username+':'+test.password);
    const authHeader = `Basic ${encode}`;
    putPost(patchedPost, sessionStorage.getItem('patchedPost'), authHeader).then(()=>{
        window.history.back();
        setTimeout(() => {
            window.location.reload();
          }, 100);
    }).catch(()=>{
       alert("irgendwas hat nicht geklappt");
    });

}