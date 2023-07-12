const apiKey = "fmkmna4j";
let groupKey = apiKey;

console.log(getUsers());

/*const testUser ={
    username: "testUser",
    password: "testUser12",
    profile:{
        displayName: "testUser",
        description: "lorem Ipsum"
    }
}

loginUser("testUser", "testUser12");*/

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

async function loginUser(user, pswd) {
    let encoded = btoa(`${user}:${pswd}`);
    let authHeader = `Basic ${encoded}`;
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
        return response.ok;
        
    } catch (error) {
        console.error(error);
        return response.status;
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

async function patchUsers(user) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/users/' + user.username,
            {
                method: 'PATCH',
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
        console.log(data);
        
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

async function getOnePost(post) {
    try {
        const response = await fetch(
            'https://lukas.rip/api/posts',
            {
                method: 'POST',
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