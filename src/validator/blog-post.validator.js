const validate = require('./schema/blog-post.schema');

exports.blogPostRegister = (req, res, next) => {
    try {
        const { value, error } = validate.addBlogPost.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() });
        }
        req.body = value;
        next();
    } catch (e) {
        return res.send({ error: e.message.toString() });
    }
};

exports.blogPostUpdate = (req, res, next) => {
    try {
        const { value, error } = validate.updateBlogPost.validate(req.body);
        if (error) {
            return res.send({ error: error.message.toString() });
        }
        req.body = value;
        next();
    } catch (e) {
        return res.send({ error: e.message.toString() });
    }
};