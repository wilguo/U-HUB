import { parsePost } from './parser';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}


const getUser = async (userId) => {
    const response = await fetch(`/api/profile/${userId}`, {
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


const setAttributes = async (userId, body) => {
    const response = await fetch(`/api/profile/${userId}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body)
    });
    const json = await response.json();
    if (!response.ok) {
        console.log(json);
        let message = 'Unknown going error';
        throw new Error(message);
    }
    return parsePost(json);
}
export { getUser, setAttributes };