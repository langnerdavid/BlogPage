const apiKey = "fmkmna4j";
let groupKey = apiKey;

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
        const data = await response.json();
        return data;
        
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
        let data = await response.json();

        if(response.ok){
            return data;
        }else{
            return null;
        }
        
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
        return JSON.parse(data);
        
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
        if(response.ok){
            return userData;
        }else{
            return null;
        }
        
    } catch (error) {
        console.error(error);
        return null;
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
        if(response.ok){
            return data;
        }else{
            return null;
        }
        
        
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
        return;
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function deleteUsers(username,authHeader) {
    let userData ={
        username: "",
        password: "",
        rememberMe: "false",
        profile:{
            displayName:"",
            description:""
        }
    }
    try {
        const response = await fetch(
            'https://lukas.rip/api/users/' + username,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': authHeader,
                    'group-key': groupKey
                }
            }
        );
        return userData;
        
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
        const jsonData = JSON.parse(data);
        return jsonData;
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function postPost(post, authHeader) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/posts',
            {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json',
                    'group-key': groupKey
                },
                body: JSON.stringify(post)
            }
        );
        const data = await response.text();
        return data;
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function putPost(post, postid, authHeader) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/posts/'+postid,
            {
                method: 'PUT',
                headers: {  
                    'Authorization': authHeader,
                    'Content-Type': 'application/json',
                    'group-key': groupKey
                },
                body: JSON.stringify(post)
            }
        );
        const data = await response.text();
        return data;
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function deletePost(postID, authHeader) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/posts/'+postID,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': authHeader,
                    'group-key': groupKey
                }
            }
        );
        const data = await response.text();
        return data;
        
    } catch (error) {
        console.error(error);
        return;
    }
}