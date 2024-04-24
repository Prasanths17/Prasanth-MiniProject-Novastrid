const { insert_body_schema, update_body_schema } = require("../../Validations/CRUD_validation/crud.joiSchema")

module.exports.crudInsertValidation = (req,res,next) => {
    const payload = {
        full_name: req.body.user_name,
        gender: req.body.gender,
        email: req.body.email,
        job_title:req.body.job_title,
        salary: req.body.salary,
        profile_path : req.file.path,
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
          password: req.body.password,
          role: req.body.role
        }
    }

    const {error} = insert_body_schema.validate(payload);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}

module.exports.crudUpdateValidation = (req,res,next) => {
    const {error} = update_body_schema.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}