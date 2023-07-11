const apiKey = "fmkmna4j";

const user={
    username: "Test",
    password: "Test12",
    profile:{
        displayName: "Test",
        description: "Test"
    }
}

let authHeader = apiKey;
postUsers();
loginUser('Test', 'Test12');
init();


async function init() {
    try {
        const response = await fetch(
            'https://lukas.rip/api/users',
            {
                method: 'GET',
                headers: {
                    'group-key': authHeader
                },
            }
        );
        const data = await response.text();
        console.log(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function getUsers() {
    try {
        const response = await fetch(
            'https://lukas.rip/api/users',
            {
                method: 'GET',
                headers: {
                    'group-key': authHeader
                },
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
                    'group-key': authHeader
                },
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
                    'group-key': authHeader
                },
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
    let credentials = user + ':' +pswd;
    let encoded = btoa(credentials);
    let OAuthHeader = `Basic ${encoded}`;
    try {
        const response = await fetch(
            'https://lukas.rip/api/users/'+user+'/posts',
            {
                method: 'GET',
                headers: {
                    'Authorization': OAuthHeader,
                    'group-key': authHeader
                },
            }
        );
        const data = await response.text();
        console.log(data);
        
    } catch (error) {
        console.error(error);
        return;
    }
}

async function postUsers() {
    try {
        const response = await fetch(
            'https://lukas.rip/api/users',
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'group-key': authHeader
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

window.init = init;