let argon2 = require("argon2");
let userSchema = require("../../schema/user.schema");
let { status, message } = require("../../validator/utils");
let { getResponseStructure } = require("../../constants/response.structure");

exports.createUser = async (req, res) => {
  try {
    const user = new userSchema({
      name: req.body.name,
      user_name: req.body.user_name,
      email: req.body.email,
      password: await argon2.hash(req.body.password),
      mobileNumber: req.body.mobileNumber,
    });
    const findUserByEmail = await userSchema.find({
      $or: [{ email: user["email"] }, { mobileNumber: user["mobileNumber"] }],
    });
    if (findUserByEmail["length"] !== 0) {
      return res
        .status(status.conflict)
        .send(
          getResponseStructure(status.conflict, `Provided email or mobile number` + message.alreadyExist)
        );
    }
    const findUserByUserName = await userSchema.find({
      user_name: user["user_name"],
    });
    if (findUserByUserName["length"] !== 0) {
      return res
        .status(status.conflict)
        .send(
          getResponseStructure(status.conflict, `Provided user_name: ${user["user_name"]}` + message.alreadyExist)
        );
    }
    await user
      .save()
      .then((user) => {
        return res
          .status(status.successCreated)
          .send(
            getResponseStructure(
              status.successCreated,
              `User ${message.successCreated}`,
              {
                _id: user._id,
                name: user.name,
                user_name: user.user_name,
                email: user.email,
                mobileNumber: user.mobileNumber,
              }
            )
          );
      })
      .catch(() => {
        return res
          .status(status.badRequest)
          .send(getResponseStructure(status.badRequest, message.badRequest));
      });
  } catch (error) {
    return res
      .status(status.success)
      .send(getResponseStructure(status.notfound, error.message.toString()));
  }
};
