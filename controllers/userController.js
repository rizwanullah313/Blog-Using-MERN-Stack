// ye yaha export hraha hy our routes/userroutes may imort hoga
module.exports.register = (req,res)=>{
        // res.json(req.body);
        const {name, email, password}= req.body;
        res.send(password);
}
