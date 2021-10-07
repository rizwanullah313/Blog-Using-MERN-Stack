const { body, validationResult } = require("express-validator");
const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()



// code for validation
// npm install --save express-validator
// npm i bcrypt
// npm ijsonwebtoken
module.exports.registerValidations = [
    body("name").not().isEmpty().trim().withMessage("Name is Required"),
    body("email").not().isEmpty().trim().withMessage("Email is Required"),
    body("password").isLength({ min: 8 }).withMessage('Password must be eight character Long'),
];
// trim() extra spaces ko remove karega


// ye yaha export hraha hy our routes/userroutes may imort hoga
module.exports.register = async (req, res) => {
	const { name, email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const checkUser = await User.findOne({ email });
		if (checkUser) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Email is already taken' }] });
		}
    
       // Hash password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		try {
			const user = await User.create({
				name,
				email,
				password: hash,
			});
			const token = jwt.sign({user}, process.env.SECRET,{
                expiresIn: '7d'
            });
			return res
				.status(200)
				.json({ msg: 'Your account has been created', token });
		} catch (error) {
			return res.status(500).json({ errors: "error h" });
		}


    }

    catch (error) {
        return res.status(500).json({ errors: "one" });
    }
    // 5000 server internal error
}


module.exports.login = (req, res)=>{
    
}