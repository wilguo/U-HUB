import { parsePost, parsePosts } from './parser';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const createPost = async (postInfo) => {
    const { 
        type, 
        topic, 
        title, 
        description, 
        media, 
        date, 
        location 
    } = postInfo;

    const form = new FormData();
    form.append('title', title);
    form.append('topic', topic);
    form.append('type', type);
    form.append('description', description);
    if(type === 'event') {
        form.append('media', media);
        form.append('date', date);
        form.append('location', location);
    }

    const response = await fetch('/api/post/', {
        method: 'POST',
        body: form,
    })


    const json = await response.json()
    if (!response.ok) {
        console.log(json);
        let message = 'Unkown post creation error';

        throw new Error(message);
    }

    return parsePost(json);
}

const getPost = async (postId) => {
    const response = await fetch(`/api/post/${postId}`, {
        method: 'GET',
        headers: headers,
    });

    const json = await response.json();
    if (!response.ok) {
        let message = 'Unknown post get error';

        throw new Error(message);
    }

    return parsePost(json);
}

const setGoing = async (postId, going) => {
    const response = await fetch(`/api/post/${postId}/${going ? 'going' : 'ungoing'}`, {
        method: going ? 'POST' : 'PATCH',
        headers: headers,
    });

    const json = await response.json();
    if (!response.ok) {
        console.log(json);
        let message = 'Unknown going error';

        throw new Error(message);
    }

    return {user: json.user, post: parsePost(json.post)}
}

const getComments = async (postId) => {
    const response = await fetch(`/api/post/${postId}/comments`, {
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

const addComment = async (postId, content) => {
    const response = await fetch(`/api/post/${postId}/comment`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            content: content
        })
    })

    const json = await response.json();
    if (!response.ok) {
        console.log(json);
        let message = 'Unknown comments error';

        if (json.name === 'ValidationError') {
            message = json.message;
        }

        throw new Error(message);
    }

    return json;
}

const getSubscriptions = async () => {
    const response = await fetch('/api/topic/subscriptions', {
        method: 'GET',
        headers: headers
    })

    const json = await response.json();
    if(!response.ok) {
        console.log(json);

        let message = 'unknown posts error';

        throw new Error(message);
    }

    return parsePosts(json);
}

const getAllPosts = async () => {
    const response = await fetch('/api/topic/all', {
        method: 'GET',
        headers: headers
    })

    const json = await response.json();
    if(!response.ok) {
        console.log(json);

        let message = 'unknown posts error';

        throw new Error(message);
    }

    return parsePosts(json);
}

const getUpcoming = async () => {
    const response = await fetch('/api/post/upcoming', {
        method: 'GET',
        headers: headers,
    })

    const json = await response.json();
    if(!response.ok) {
        console.log(json);

        let message = 'unknown upcoming error';

        throw new Error(message);
    }

    return parsePosts(json);
}

export { createPost, getPost, setGoing, getComments, addComment, getSubscriptions, getAllPosts, getUpcoming };