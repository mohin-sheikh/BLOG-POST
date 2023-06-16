const blogPostSchema = require("../../schema/blogPost.schema");
const { status, message } = require("../../validator/utils");
const { getResponseStructure } = require("../../constants/response.structure");

exports.fetchAllBlogPost = async (req, res) => {
    try {
        const blogPosts = await blogPostSchema.find({ isDeleted: false }, {
            _id: 1,
            title: 1,
            date: 1,
            description: 1,
        });
        if (blogPosts["length"] === 0) {
            return res
                .status(status.notfound)
                .send(
                    getResponseStructure(status.notfound, `blogPosts not found`)
                );
        }
        return res
            .status(status.found)
            .send(
                getResponseStructure(
                    status.found,
                    message.successFetched,
                    blogPosts
                )
            );

    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};
