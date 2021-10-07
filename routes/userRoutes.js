const app = require("express");
const router = app.Router();
const { register, registerValidations, login , loginValiations} = require("../controllers/userController");
router.post("/register", registerValidations,  register); // ye register imrt howa usercontroler se
router.post("/login", loginValiations, login);
module.exports = router;