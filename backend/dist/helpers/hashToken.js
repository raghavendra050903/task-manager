"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodeCrypto = _interopRequireDefault(require("node:crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var hashToken = function hashToken(token) {
  // hash the token using sha256
  return _nodeCrypto["default"].createHash("sha256").update(token.toString()).digest("hex");
};
var _default = exports["default"] = hashToken;