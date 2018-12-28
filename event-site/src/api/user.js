const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const subscribeToTopic = async (topic) => {
    const response = await fetch(`/api/topic/${topic}/subscribe`, {
        method: 'POST',
        headers: headers,
    });

    const json = await response.json();
    if(!response.ok) {
        let message = 'Unknown subscribe erro';

        throw new Error(message);
    }

    return json;
}

const unsubscribeFromTopic = async (topic) => {
    const response = await fetch(`/api/topic/${topic}/unsubscribe`, {
        method: 'POST',
        headers: headers,
    });

    const json = await response.json();
    if(!response.ok) {
        let message = 'Unknown unsubscribe erro';

        throw new Error(message);
    }

    return json;
}

const getUser = async (user) => {
    const response = await fetch(`/api/user/${user}`, {
        method: 'GET',
        headers: headers,
    });

    const json = await response.json();
    if(!response.ok) {
        let message = 'Unknown getUser error';

        throw new Error(message);
    }

    return json;
}

const updateUserPosts = async (user, post) => {
    const response = await fetch(`/api/user/${user}/${post}`, {
        method: 'PATCH',
        headers: headers,
    });

    const json = await response.json();
    if(!response.ok) {
        console.log(json);
        let message = 'Unknown updateUserPosts error';

        throw new Error(message);
    }

    return json;
}


export { subscribeToTopic, unsubscribeFromTopic, getUser, updateUserPosts}
