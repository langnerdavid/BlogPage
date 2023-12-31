const addSectionButton = document.getElementById('add-section-button');
const sectionList = document.getElementById('section-list');
const sectionTemplate = document.getElementById('section-template');

const blogpostTitle = document.getElementById('blogpost-title');
const blogpostImage = document.getElementsByClassName('image-content')[0];
const blogpostImageTitle = document.getElementsByClassName('image-title')[0];
const blogpostText = document.getElementsByClassName('text-content')[0];
const form = document.getElementById("blogpost-form");


form.addEventListener("submit", getPost);

articleAddSectionButton(addSectionButton); //Funktionalität für den "add Section"-Button


function getPost(){
    const sectionList = document.getElementsByClassName('section-wrapper');
    e.preventDefault();
    let newPost

    //ABfragebblock, der den Post je nach verwendetetn Elementen richtig anpasst
    if(sectionNumbers==0){
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
            newPost ={
                title: blogpostTitle.value,
                content: [textContent, imageContent]
            }

        }else if(!blogpostImage?.value){
            let textContent = {
                __type: "text",
                data:blogpostText.value
            }
            newPost ={
                title: blogpostTitle.value,
                content: [textContent]
            }
        }else{
            let imageContent = {
                __type: "img",
                url: blogpostImage.value,
                caption: blogpostImageTitle.value
            }
            newPost ={
                title: blogpostTitle.value,
                content: [imageContent]
            }
        }
    }else{
        if(!blogpostImage?.value && !blogpostText?.value){
            newPost ={
                title: blogpostTitle.value,
                sections: getSections(sectionList)
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
                newPost ={
                    title: blogpostTitle.value,
                    content: [textContent, imageContent],
                    sections: getSections(sectionList)
                }
            }else if(blogpostText?.value){
                let textContent = {
                    __type: "text",
                    data:blogpostText.value
                }
                newPost ={
                    title: blogpostTitle.value,
                    content: [textContent],
                    sections: getSections(sectionList)
                }
            }else{
                let imageContent = {
                    __type: "img",
                    url: blogpostImage.value,
                    caption: blogpostImageTitle.value
                }
                newPost ={
                    title: blogpostTitle.value,
                    content: [imageContent],
                    sections: getSections(sectionList)
                }
            }
        }
    }
    let test = JSON.parse(localStorage.getItem('userData'));
    const encode = btoa(test.username+':'+test.password);
    const authHeader = `Basic ${encode}`;
    postPost(newPost, authHeader).then(()=>{
        window.history.back();
    }).catch(()=>{
        alert("irgendwas hat nicht geklappt");
    });

};



//Überprüfung, ob der Post nach Vorgaben gefüllt wurde
function validateForm() {
    const textContent = blogpostText.value.trim();
    const imageTitle = blogpostImageTitle.value.trim();
    const imageContent = blogpostImage.value.trim();
    const sectionWrappers = document.getElementsByClassName('section-wrapper');

    const hasTextContent = textContent !== '';
    const hasImageContent = imageTitle !== '' && imageContent !== '';
    let hasSectionContent = false;

    for (let i = 0; i < sectionWrappers.length; i++) {
        const sectionTextContent = sectionWrappers[i].getElementsByClassName('section-text-content-class')[0].value.trim();
        const sectionImageTitle = sectionWrappers[i].getElementsByClassName('image-title')[0].value.trim();
        const sectionImageContent = sectionWrappers[i].getElementsByClassName('image-content')[0].value.trim();

        const sectionTextContentFilled = sectionTextContent !== '';
        const sectionImageContentFilled = sectionImageTitle !== '' && sectionImageContent !== '';

        if (!sectionTextContentFilled && !sectionImageContentFilled) {
            alert("One section must fill at least one field: 'Section Text Content' or 'Section Image Title' and 'Section Image Link'.");
            return false;
        }

        if (sectionTextContentFilled || sectionImageContentFilled) {
            hasSectionContent = true;
            break;
        }
    }

    if (!hasTextContent && !hasImageContent && !hasSectionContent) {
        alert("You must fill at least one content field: 'Text Content' or 'Image Title' and 'Image Link' or at least one section content.");
        return false;
    }

    return true;
}