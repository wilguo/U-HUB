const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const getComment = async (commentId) => {
    const response = await fetch(`/api/comment/${commentId}`, {
        method: 'GET',
        headers: headers,
    });

    const json = await response.json();
    if (!response.ok) {
        console.log(json);
        let message = 'Unknown comments error';

        throw new Error(message);
    }

    return json;
}


const addToLikes = async (commentId) => {

    const response = await fetch(`/api/comment/${commentId}/like`, {
        method: 'POST',
        headers: headers,
    });

    const json = await response.json();
    if(!response.ok) {
        console.log(json);
        let message = 'unknown addToLikes error'

        if(json.error !== undefined) {
            message = json.error
        }

        throw new Error(message);
    }

    return json;
}

const removeFromLikes = async (commentId, body) => {

    const response = await fetch(`/api/comment/${commentId}/unlike`, {
        method: 'PATCH',
        headers: headers,
    });

    const json = await response.json();
    if(!response.ok) {
        console.log(json);
        let message = 'unknown removeFromLikes error'

        if(json.error !== undefined) {
            message = json.error
        }

        throw new Error(message);
    }

    return json;
}

const addToDislikes = async (commentId) => {

    const response = await fetch(`/api/comment/${commentId}/dislike`, {
        method: 'POST',
        headers: headers,
    });

    const json = await response.json();
    if(!response.ok) {
        console.log(json);
        let message = 'unknown addToDisikes error'

        if(json.error !== undefined) {
            message = json.error
        }

        throw new Error(message);
    }

    return json;
}

const removeFromDislikes = async (commentId) => {

    const response = await fetch(`/api/comment/${commentId}/undislike`, {
        method: 'PATCH',
        headers: headers,
    });

    const json = await response.json();
    if(!response.ok) {
        console.log(json);
        let message = 'unknown removeFromDislikes error'

        if(json.error !== undefined) {
            message = json.error
        }

        throw new Error(message);
    }

    return json;
}


export {getComment, addToLikes, addToDislikes, removeFromLikes, removeFromDislikes}
