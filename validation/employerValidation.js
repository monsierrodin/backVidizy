/*import Joi from "joi";

const employeValidation=(body)=>{
   const EmployeSchema= Joi.object({
        nom:Joi.string().min(5).max(100).trim().required(), 
        prenom:Joi.string().min(5).max(100).trim().required(),
        matricule:Joi.string().min(3).required(),
        cin:Joi.string().min(12).max(12).required(),
        dateNaissance:Joi.date().required(),
        email:Joi.string().email().required(),
    });
    return EmployeSchema.validate(body);
};

export default employeValidation;*/