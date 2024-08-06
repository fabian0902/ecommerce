const router = require("express").Router();
const userCtrl = require("../controllers/users.controller");
const auth = require("../middlewares/auth");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/refresh_token", userCtrl.refreshtoken);
router.get("/infor", auth, userCtrl.getUser);

module.exports = router;