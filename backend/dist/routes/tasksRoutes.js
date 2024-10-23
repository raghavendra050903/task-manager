"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _taskController = require("../controllers/task/taskController.js");
var _authMiddleware = require("../middleware/authMiddleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/task/create", _authMiddleware.protect, _taskController.createTask);
router.get("/tasks", _authMiddleware.protect, _taskController.getTasks);
router.get("/task/:id", _authMiddleware.protect, _taskController.getTask);
router.patch("/task/:id", _authMiddleware.protect, _taskController.updateTask);
router["delete"]("/task/:id", _authMiddleware.protect, _taskController.deleteTask);
var _default = exports["default"] = router;