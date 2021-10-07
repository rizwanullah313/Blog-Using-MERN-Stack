const app = require("express");
const router = app.Router();
router.post("/register", (req,res)=>{
    res.send("sucessfully send data using post man post");
});

module.exports = router;