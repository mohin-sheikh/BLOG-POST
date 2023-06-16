const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../middleware/middleware');
const validator = require('../validator/user.validator');
const blogPostValidator = require('../validator/blog-post.validator');
const userController = require('../controller/index');
const blogPostController = require('../controller/index');

module.exports = (app) => {
  // USER
  router.post('/user/register', validator.userRegister, userController.register);
  router.post('/user/login', userController.login);

  // BLOG POST
  router.post('/blog-post/register', verifyToken, blogPostValidator.blogPostRegister, blogPostController.registerBlogPost);
  router.get('/blog-post/all', blogPostController.fetchAllBlogPost);
  router.get('/blog-post/single/:id', blogPostController.fetchSingleBlogPost);
  router.put('/blog-post/update/:id', verifyToken, blogPostValidator.blogPostUpdate, blogPostController.updateBlogPost);
  router.delete('/blog-post/remove/:id', verifyToken, blogPostController.removeBlogPost);

  // API VERSION
  app.use('/api/v1', router);
};
