const routeNames = {
    signup: "/api/v1/signup",
    login: "/api/v1/login",
    addPost: "/api/v1/posts/add",
    getPosts: '/api/v1/posts',
    getPost: '/api/v1/posts/:postId',
    validatePost: '/api/v1/posts/:postId/validate',
   
    generateApiKey: '/api/v1/apiKey/generate',
    getApiKeys: '/api/v1/apiKey/',
    getPostsByApi: '/api/v1/apiKey/:apiKey/posts',
    getPostByApi: '/api/v1/apiKey/:apiKey/posts/:postId',
};

module.exports = routeNames;