const app = require("express");
const router = app.Router();
const { register, registerValidations } = require("../controllers/userController");
router.post("/register", registerValidations, register); // ye register imrt howa usercontroler se
//router.post("/login", login);
module.exports = router;