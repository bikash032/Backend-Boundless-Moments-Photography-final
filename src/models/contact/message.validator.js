const Joi=require("joi")
const messageCreateDTO=Joi.object({
    name:Joi.string().min(3).max(255).required(),
    email:Joi.string().email().required(),
    subject:Joi.string(),
    inqueryType:Joi.string().regex(/^(general|booking|collaboration|pricing\other)$/),
    message:Joi.string()
})
module.exports=messageCreateDTO