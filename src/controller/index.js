const registerController = require('./user/user.register');
const loginController = require('./user/user.login');

const registerBlogPost = require('./blog-post/blog-posts.add.controller');
const fetchAllBlogPost = require('./blog-post/blog-post.fetch.controller');
const fetchSingleBlogPost = require('./blog-post/blog-post.single.controller');
const updateBlogPost = require('./blog-post/blog-post.update.controller');
const removeBlogPost = require('./blog-post/blog-post.delete.controller');



module.exports = {
    register: registerController.createUser,
    login: loginController.loginUser,
    registerBlogPost: registerBlogPost.createBlogPost,
    fetchAllBlogPost: fetchAllBlogPost.fetchAllBlogPost,
    fetchSingleBlogPost: fetchSingleBlogPost.fetchSingleBlogPost,
    updateBlogPost: updateBlogPost.updateBlogPost,
    removeBlogPost: removeBlogPost.deleteBlogPost,
};
