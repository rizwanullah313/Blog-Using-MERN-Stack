const app = require("express");
const router = app.Router();
const {register} = require("../controllers/userController");
router.post("/register", register); // ye register imrt howa usercontroler se

module.exports = router;