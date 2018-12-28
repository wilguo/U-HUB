const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const register = async (userInfo) => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(userInfo),
    });

    const json = await response.json();
    if(!response.ok) {
        let message = 'Unknown registration error';
        if(json.name === 'MongoError') {
            if(json.code === 11000) {
                message = 'User already exists';
            }
        } else if(json.name === 'ValidationError') {
            message = json.message
        }
        throw new Error(message);
    }

    return json;
}

const login = async (username, password) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const json = await response.json();
    if(!response.ok) {
        throw new Error(json.error);
    }

    return json;
}

const logout = async () => {
    const response = await fetch('/api/auth/logout');
    const json = await response.json();

    if(!response.ok) {
        throw new Error(json);
    }

    return json;
}

const authenticate = async () => {
    const response = await fetch('/api/auth/isAuthenticated');
    const json = await response.json();

    if(!response.ok) {
        throw new Error(json)
    }

    return json;
}

export { login, authenticate, logout, register }