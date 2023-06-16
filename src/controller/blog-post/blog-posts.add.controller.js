const blogPostSchema = require("../../schema/blogPost.schema");
const { status, message } = require("../../validator/utils");
const { getResponseStructure } = require("../../constants/response.structure");

exports.createBlogPost = async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const blogPost = new blogPostSchema({ title, date, description });
        await blogPost.save();
        return res
            .status(status.successCreated)
            .send(
                getResponseStructure(
                    status.successCreated,
                    `User ${message.successCreated}`,
                    {
                        _id: blogPost._id,
                        title: blogPost.title,
                        date: blogPost.date,
                        description: blogPost.description,
                    }
                )
            );

    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};
