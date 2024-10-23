"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/auth/userController.js");
var _authMiddleware = require("../middleware/authMiddleware.js");
var _adminController = require("../controllers/auth/adminController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/register", _userController.registerUser);
router.post("/login", _userController.loginUser);
router.get("/logout", _userController.logoutUser);
router.get("/user", _authMiddleware.protect, _userController.getUser);
router.patch("/user", _authMiddleware.protect, _userController.updateUser);

// admin route
router["delete"]("/admin/users/:id", _authMiddleware.protect, _authMiddleware.adminMiddleware, _adminController.deleteUser);

// get all users
router.get("/admin/users", _authMiddleware.protect, _authMiddleware.creatorMiddleware, _adminController.getAllUsers);

// login status
router.get("/login-status", _userController.userLoginStatus);

// email verification
router.post("/verify-email", _authMiddleware.protect, _userController.verifyEmail);

// veriify user --> email verification
router.post("/verify-user/:verificationToken", _userController.verifyUser);

// forgot password
router.post("/forgot-password", _userController.forgotPassword);

//reset password
router.post("/reset-password/:resetPasswordToken", _userController.resetPassword);

// change password ---> user must be logged in
router.patch("/change-password", _authMiddleware.protect, _userController.changePassword);
var _default = exports["default"] = router;