const { body, validationResult } = require("express-validator");
const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const createToken = (user)=>{
    return jwt.sign({user}, process.env.SECRET,{
        expiresIn: '7d'
    });
}

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
            const token = createToken(user);
			// const token = jwt.sign({user}, process.env.SECRET,{
            //     expiresIn: '7d'
            // });
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

module.exports.loginValiations = [
	body('email').not().isEmpty().trim().withMessage('Email is required'),
	body('password').not().isEmpty().withMessage('Password is required'),
];
module.exports.login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const matched = await bcrypt.compare(password, user.password);
			if (matched) {
				const token = createToken(user);
				return res
					.status(200)
					.json({ msg: 'You have login successfully', token });
			} else {
				return res
					.status(401)
					.json({ errors: [{ msg: 'Password is not correct' }] });
			}
		} else {
			return res.status(404).json({ errors: [{ msg: 'Email not found' }] });
		}
	} catch (error) {
		return res.status(500).json({ errors: error });
	}
};

// module.exports.login = async (req, res)=>{
//     const errors =  validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()});
//     }
//     const {email, password} = req.body;
//    try{
//        const user = await User.findOne({email});

//     if(user){
//         const matched =  await bcrypt.compare(password, user.password);
//    if(matched){
//       const user = createtoken(user);
//       return res.status(200).json({msg: " You have login successfully", token})
//    }
//     else{
//         return res.status(401).json({errors: [{msg: 'Password is not correct'}]})
//     }
// }
//     else{
//       return res.status(404).json({errors: [{msg: 'Email Not Found'}]})
//     }}
//     catch(error)
//     {
//         return res.status(500).json({errors: error})
//     }
// };