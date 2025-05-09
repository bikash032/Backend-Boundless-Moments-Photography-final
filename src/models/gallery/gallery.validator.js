const Joi = require("joi");

const GalleryCreateDTO = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  status: Joi.string().regex(/^(active|inactive)$/).default('inactive'),
  category:Joi.string().regex(/^(landscape|urban|nature|wildlife|weeding)$/),
  description:Joi.string(),
  image:Joi.string(),
  tags:Joi.string()
}).unknown()

const GalleryUpdateDTO = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  status: Joi.string().regex(/^(active|inactive)$/).default('inactive'),
  category:Joi.string().regex(/^(landscape|urban|nature|wildlife|weeding)$/),
  description:Joi.string(),
  image:Joi.string(),
  tags:Joi.string()
})

module.exports = {
  GalleryCreateDTO,
  GalleryUpdateDTO,
};