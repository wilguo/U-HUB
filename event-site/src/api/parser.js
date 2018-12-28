const parsePost = (postJson) => {
    if(postJson.eventBody != null) {
        postJson.eventBody.date = new Date(postJson.eventBody.date)
    }

    return postJson;
}

const parsePosts = (postsJsonArray) => {
    postsJsonArray.forEach((postJson) => {
        parsePost(postJson);
    });

    return postsJsonArray;
} 

export { parsePost, parsePosts };