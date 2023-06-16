const blogPostSchema = require("../../schema/blogPost.schema");
const { status, message } = require("../../validator/utils");
const { getResponseStructure } = require("../../constants/response.structure");

exports.fetchSingleBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const blogPost = await blogPostSchema.findOne({ _id: id, isDeleted: false }, {
            _id: 1,
            title: 1,
            date: 1,
            description: 1,
        });
        if (!blogPost) {
            return res
                .status(status.notfound)
                .send(
                    getResponseStructure(status.notfound, `BlogPost not found`)
                );
        }
        return res
            .status(status.found)
            .send(
                getResponseStructure(
                    status.found,
                    message.successFetched,
                    blogPost
                )
            );

    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};
