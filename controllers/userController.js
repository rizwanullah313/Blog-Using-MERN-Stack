const {body, validationResult} = require("express-validator");
const User = require("../models/User")


// code for validation
// npm install --save express-validator
module.exports.registerValidations = [
    body("name").not().isEmpty().trim().withMessage("Name is Required"),
    body("email").not().isEmpty().trim().withMessage("Email is Required"),
    body("password").isLength({min: 8}).withMessage('Password must be eight character Long')
];
// trim() extra spaces ko remove karega


// ye yaha export hraha hy our routes/userroutes may imort hoga
module.exports.register = async (req,res)=>{
        // res.json(req.body);
        const {name, email, password}= req.body;
        // res.send(password);
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            res.status(400).json({errors: errors.array()})
        }
        // else{
        //     res.json("You have done! thankYou")
        // }

        try{
             const checkUser = await User.findOne({email})
             if(checkUser){
                 return res.status(400).json({errors: [{msg: 'This Email Is Already Exist'}]});
             }
        }
        catch(error){
           return res.status(500).json({errors: error});
        }
        // 5000 server internal error
}
