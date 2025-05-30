const { UserRole } = require("../../config/constant");
const {
    loginCheck,
    checkPermission,
} = require("../../middleware/auth.middleware");
const { bodyValidator } = require("../../middleware/request.validator");
const { uploader } = require("../../middleware/uploader.moddleware");
const userCtrl = require("./user.controller");
const {
    UserRegistrationDTO,
    UserLoginDTO,
    ForgetPasswordDTO,
    ChangePasswordDTO,
    ResetPasswordDTO,
} = require("./user.validator");

const userRouter = require("express").Router();

userRouter.post(
    "/register",
    uploader().single("image"),
    bodyValidator(UserRegistrationDTO),
    userCtrl.createUser
);
userRouter.get("/activate/:token", userCtrl.userActivate);
userRouter.post("/login", bodyValidator(UserLoginDTO), userCtrl.login);
userRouter.get(
    "/me",
    loginCheck,
    checkPermission(["admin"]),
    userCtrl.getUserLoggedIn
);
userRouter.post(
    "/forget-password",
    bodyValidator(ForgetPasswordDTO),
    userCtrl.forgetPassword
);
userRouter.get(
    "/verify-forget-token/:token",
    userCtrl.verifyForgetPasswordToken
);
userRouter.post(
    "/reset-password",
    bodyValidator(ResetPasswordDTO),
    userCtrl.resetPassword
);
userRouter.get("/users/list/",loginCheck,checkPermission(["admin"]),userCtrl.userList)
userRouter.post(
    "/change-passoword",
    loginCheck,
    bodyValidator(ChangePasswordDTO),
    userCtrl.updatePasswordForLoggedInUser
);
userRouter.delete("/users/delete/",loginCheck, checkPermission(["admin"]),userCtrl.deleteById)
module.exports = userRouter;
