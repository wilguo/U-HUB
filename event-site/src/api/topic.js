const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const getPostsFromTopic = async (topicId) => {
    const response = await fetch(`/api/topic/${topicId}`,{
        method: 'GET',
        headers: headers,
    });

    const json = await response.json();
    if(!response.ok) {
        let message = 'Unknown topic fetch error';

        throw new Error(message);
    }

    return json;
}

const getPopular = async () => {
    const response = await fetch('/api/topic/popular', {
        method: 'GET',
        headers: headers
    });

    const json = await response.json();
    if(!response.ok) {
        let message = 'Unknown topic fetch error';

        throw new Error(message);
    }

    return json;
}

export { getPostsFromTopic, getPopular }