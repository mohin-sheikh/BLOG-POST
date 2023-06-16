let argon2 = require("argon2");
let userSchema = require("../../schema/user.schema");
let { status, message } = require("../../validator/utils");
let { getResponseStructure } = require("../../constants/response.structure");
let { getJWTToken } = require("../../security/jwt");

exports.loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        const user = await userSchema.findOne({
            $or: [{ email: emailOrUsername }, { user_name: emailOrUsername }],
        });

        if (!user) {
            return res.status(status.notFound).send(
                getResponseStructure(
                    status.notFound,
                    `User with email or username ${emailOrUsername} not found`
                )
            );
        }

        const passwordMatched = await argon2.verify(user.password, password);
        if (!passwordMatched) {
            return res.status(status.unauthorized).send(
                getResponseStructure(status.unauthorized, message.notMatchPassword)
            );
        }

        const token = getJWTToken({ _id: user._id });

        return res.status(status.success).send(
            getResponseStructure(status.success, message.succeedLogin, { token })
        );
    } catch (error) {
        return res.status(status.badRequest).send(
            getResponseStructure(status.badRequest, message.badRequest)
        );
    }
};
