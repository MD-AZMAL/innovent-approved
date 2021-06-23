const baseUrl = "http://localhost:8080";

const endpoints = {
  login: {
    method: "POST",
    url: `${baseUrl}/api/v1/login`,
  },
  signup: {
    method: "POST",
    url: `${baseUrl}/api/v1/signup`,
  },
  addPost: {
    method: "POST",
    url: `${baseUrl}/api/v1/posts/add`,
  },
  getPosts: {
    method: "GET",
    url: `${baseUrl}/api/v1/posts`,
  },
  getPost: {
    method: "GET",
    url: `${baseUrl}/api/v1/posts/:postId`,
  },
  verifyPost: {
    method: "POST",
    url: `${baseUrl}/api/v1/posts/:postId/validate`,
  },
};

export default endpoints;
