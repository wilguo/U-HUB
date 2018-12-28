import { parsePost } from './parser';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const getUsers = async () => {
    const response = await fetch('/api/admin/users', {
        method: 'GET',
        headers: headers
    });

    const json = await response.json();
    if(!response.ok) {
        console.log(json);

        let message = 'Unknown admin getUsers erro';

        if(json.error !== undefined) {
            message = json.error;
        }

        throw new Error(message);
    }

    return json;
}

const updateUser = async (userId, info) => {
    const response = await fetch(`/api/admin/updateUser/?id=${userId}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(info),
    });

    const json = await response.json();
    if(!response.ok) {
        console.log(json);

        let message = 'Unknown updateUser erro';
        if(json.error !== undefined) {
            message = json.error;
        } else if(json.name === 'ValidationError') {
            message = json.message;
        }

        throw new Error(message);
    }

    return json;
}

const getPosts = async () => {
    const response = await fetch(`/api/admin/posts`, {
        method: 'GET',
        headers: headers
    });

    const json = await response.json();
    if(!response.ok) {
        console.log(json);

        let message = 'Unknown updateUser erro';
        if(json.error !== undefined) {
            message = json.error;
        }

        throw new Error(message);
    }
    json.forEach((post) => {
        parsePost(post.post);
    })
    return json;
}

const updatePost = async (postId, body) => {
    console.log(body);

    const response = await fetch(`/api/admin/updatePost/?id=${postId}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body)
    });

    const json = await response.json();
    if(!response.ok) {
        console.log(json);
        let message = 'unknown updatePost error'

        if(json.error !== undefined) {
            message = json.error
        }

        throw new Error(message);
    }

    return parsePost(json);
}

const deletePost = async (postId) => {
    const response = await fetch(`/api/admin/deletePost/?id=${postId}`, {
        method: 'DELETE',
        headers: headers,
    })

    const json = await response.json();
    if(!response.ok) {
        console.log(json);
        let message = 'unknown updatePost error'

        if(json.error !== undefined) {
            message = json.error
        }

        throw new Error(message);
    }

    return parsePost(json);
}

const deleteComment = async (postId) => {
    const response = await fetch(`/api/admin/deleteComment/?id=${postId}`, {
        method: 'DELETE',
        headers: headers,
    })

    const json = await response.json();
    if(!response.ok) {
        console.log(json);
        let message = 'unknown deleteComment error'

        if(json.error !== undefined) {
            message = json.error
        }

        throw new Error(message);
    }

    return parsePost(json);
}

const getStats = async () => {
    const response = await fetch('/api/admin/stats', {
        method: 'GET',
        headers: headers
    })

    const json = await response.json();
    if(!response.ok) {
        let message = 'unknown getStats error'

        if(json.error !== undefined) {
            message = json.error
        }

        throw new Error(message);
    }

    return json;
}

export { getUsers, updateUser, getPosts, updatePost, deletePost, deleteComment, getStats }