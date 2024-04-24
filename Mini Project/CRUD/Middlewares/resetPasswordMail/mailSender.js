const nodemailer = require('nodemailer');

module.exports.sendResetPasswordEmail = async (email , resetToken) => {
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'prasanth1709001@gmail.com',
            pass : 'vcca sdfz ylyy hlvj'
        }
    });

    const mailOption = {
        from : 'prasanth1709001@gmail.com',
        to : 'prass1709001@gmail.com',
        subject: 'Reset Your Password',
        html: `
            <p>Hi,</p>
            <p>You have requested to reset your password.</p>
            <p>This is your secret resetToken : <b>${resetToken}</b></p>
            <p>If you did not request this, please ignore this email.</p> `
    }

    try{
        await transporter.sendMail(mailOption);
        console.log('Mail Successfully sended');
    }catch(err){
        console.error(`error in sending mail` , err);
        throw err;
    }
}