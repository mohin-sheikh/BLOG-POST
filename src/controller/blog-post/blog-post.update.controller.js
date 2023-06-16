const blogPostSchema = require("../../schema/blogPost.schema");
const { status, message } = require("../../validator/utils");
const { getResponseStructure } = require("../../constants/response.structure");

exports.updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, description } = req.body;
        const blogPost = await blogPostSchema.findById({ _id: id, isDeleted: false });
        if (!blogPost) {
            return res
                .status(status.notfound)
                .send(
                    getResponseStructure(status.notfound, `BlogPost not found`)
                );
        }

        await blogPostSchema.updateOne({ _id: blogPost._id }, {
            title, date, description
        });

        return res
            .status(status.success)
            .send(
                getResponseStructure(
                    status.success,
                    message.updateSuccess,
                    {}
                )
            );

    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};
