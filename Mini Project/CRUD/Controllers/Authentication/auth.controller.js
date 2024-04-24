const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../../Models/user');
const userAuthentication = require('../../Models/userAuthentication');
const passwordResetToken = require('../../Models/passwordResetToken');
const { sendResetPasswordEmail } = require('../../Middlewares/resetPasswordMail/mailSender');
const userAddress = require('../../Models/userAddress');
const userFamily = require('../../Models/userFamily');

module.exports.register = async (req,res) => {
    try{
        console.log(req.body.user_name);

        const profilePath = req.file.path;
        
         
        console.log(req.body);
        
      
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(`${password}`, 10);

        
        
        await user.create({
            full_name: req.body.user_name,
            gender: req.body.gender,
            email: req.body.email,
            job_title:req.body.job_title,
            salary: req.body.salary,
            profile_path : profilePath,
            userAddress: {
              address: req.body.address,
              district:req.body.district,
              town: req.body.town,
              pincode: req.body.pincode
            },
            userFamily: req.body.familyDetails,
            userAuthentication: {
              full_name: req.body.user_name,
              email: req.body.email,
              password: hashedPassword,
              role: req.body.role
            }
          }, {
            include: [{model : userAddress , as : 'userAddress'}, {model : userFamily , as : 'userFamily'}, {model : userAuthentication , as : 'userAuthentication'}]
          });

          res.send(`User successfully Register`);
    }catch(err){
        res.status(500).json(err);
        console.error(err);
    }
}


module.exports.loginUser = async (req,res,next) => {
    try{
        const {email,password} = req.body;
        const userData = await userAuthentication.findOne({where : {email : email}});

        if(!userData) return res.status(400).json({message : 'Invalid Credentials'});

        const isPasswordValid = await bcrypt.compare(password , userData.password);

        if(!isPasswordValid){
            return res.status(400).json({message : 'Invalid Password'});
        }

        const token = jwt.sign({user_id : userData.user_id , email , role : userData.role} , process.env.ACCESS_TOKEN_SECRET);

        const userDetails = {
            ...userData.dataValues,
            token : token
        }

        return res.status(200).json(userDetails);

    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.forgotPassword = async (req,res,next) => {
    try{
        const {email} = req.body;

        const userDetails = await userAuthentication.findOne({where : {email}});

        if(!userDetails){
            res.status(404).json({message : `Invalid credentials`});
        }

        const resetToken = jwt.sign({user_id : userDetails.user_id} , process.env.RESET_TOKEN_SECRET , {expiresIn : '1h'});

        await passwordResetToken.create({user_id : userDetails.user_id , resetToken : resetToken , expiresAt : new Date(Date.now() + 3600000) });

        sendResetPasswordEmail(email , resetToken);

        return res.status(200).json({ message: 'Password reset email sent successfully' });

    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}


module.exports.resetPassword = async (req,res) => {
    console.log(req.tokenData);  
    const {user_id} = req.tokenData;
    const {password} = req.body;

    const resetTokenData = await passwordResetToken.findOne({where : {user_id}});

    if(!resetTokenData) return res.status(400).json({message : `invalid Token`});

    if(new Date() > resetTokenData.expiresAt){
        return res.status(400).json({message : `Token is expired`});
    }

    const userData = await userAuthentication.findByPk(resetTokenData.user_id);

    if(!userData) return res.status(400).json({message : `user not found`});

    const hashedPassword =await bcrypt.hash(password , 10);

    userData.password = hashedPassword;

    userData.save();

    await resetTokenData.destroy();

    res.status(200).json({message : 'Password reseted Successfully'});

}