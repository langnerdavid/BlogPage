const apiKey = "fmkmna4j";
let groupKey = apiKey;

//console.log(getUsers());

/*const testUser ={
    username: "testUser", test
    password: "testUser12",test12
    profile:{
        displayName: "testUser",
        description: "lorem Ipsum"
    }
}

loginUser("testUser", "testUser12");*/
const encodeTest = btoa('testUser:testUser12');
const authHeaderTest = `Basic ${encodeTest}`;


let sectionTitle1 = "This is 1. test section";

const textContent = {
    __type: "text",
    data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati adipisci saepe neque atque labore repellat asperiores voluptate corrupti consectetur ab! At, culpa quas optio quam ducimus libero repudiandae facere minima?",
           
}
const imageContent = {
    __type: "img",
    url: "https://images4.alphacoders.com/115/thumb-1920-115716.jpg",
    caption: "Ein Test Bild"
}
const objSection1 = {
    sectionTitle: sectionTitle1,
    content: [textContent, imageContent]
}
const testPost ={
    title: "This is a test post",
    content: [textContent, imageContent],
    sections: [objSection1]
}



//postPost(testPost);
//console.log(getOnePost('c461c844-890e-48f6-b7f8-9facc71f81cc'));


async function getUsers() {
    try {
        const response = await fetch(
            'https://lukas.rip/api/users',
            {
                method: 'GET',
                headers: {
                    'group-key': groupKey
                }
            }
        );
        const data = await response.text();
        console.log(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function getUser(user) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/users/'+user,
            {
                method: 'GET',
                headers: {
                    'group-key': groupKey
                }
            }
        );
        const data = await response.text();
        console.log(data);
        return JSON.parse(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function getUserPosts(user) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/users/'+user+'/posts',
            {
                method: 'GET',
                headers: {
                    'group-key': groupKey
                }
            }
        );
        const data = await response.text();
        console.log(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function loginUser(user, pswd, rememberMe) {
    let encoded = btoa(`${user}:${pswd}`);
    let authHeader = `Basic ${encoded}`;
    let userData ={
        username: user,
        password: pswd,
        rememberMe: rememberMe,
        profile:{
            displayName:"",
            description:""
        }
    }
    try {
        const response = await fetch(
            'https://lukas.rip/api/users/login',
            {
                method: 'GET',
                headers: {
                    'Authorization': authHeader,
                    'group-key': groupKey
                }
            }
        );
        return userData;
        
    } catch (error) {
        console.error(error);
        return userData;
    }
}

async function postUsers(user) {
    console.log("postUser");
    console.log(user);
    try {
        const response = await fetch(
            'https://lukas.rip/api/users',
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'group-key': groupKey
                },

                body: JSON.stringify(user)
            }
        );
        const data = await response.text();
        console.log(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function patchUser(user, authHeader) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/users/' + user.username,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': authHeader,
                    'group-key': groupKey
                },

                body: JSON.stringify(user)
            }
        );
        const data = await response.text();
        console.log(data);
        return;
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function deleteUsers(username) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/users/' + username,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json',
                    'group-key': groupKey
                }
            }
        );
        const data = await response.text();
        console.log(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function getPosts() {
    try {
        const response = await fetch(
            'https://lukas.rip/api/posts',
            {
                method: 'GET',
                headers: {
                    'group-key': groupKey
                }
            }
        );
        const data = await response.text();
        const jsonData = JSON.parse(data);
        return jsonData;
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function getOnePost(postid) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/posts/'+postid,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'group-key': groupKey
                }
            }
        );
        const data = await response.text();
        console.log(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function postPost(post) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/posts',
            {
                method: 'POST',
                headers: {
                    'Authorization': authHeaderTest,
                    'Content-Type': 'application/json',
                    'group-key': groupKey
                },
                body: JSON.stringify(post)
            }
        );
        const data = await response.text();
        console.log(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function putPost(post) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/posts/'+post.postid,
            {
                method: 'PUT',
                headers: {  
                    'group-key': groupKey
                },
                body: JSON.stringify(post)
            }
        );
        const data = await response.text();
        console.log(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function deletePost(postID) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/posts/'+postID,
            {
                method: 'DELETE',
                headers: {
                    'group-key': groupKey
                }
            }
        );
        const data = await response.text();
        console.log(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}