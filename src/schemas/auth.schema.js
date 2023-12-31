import Joi from "joi"

export const schemaSignUp = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(), //min? max? alphanum?//
	picture: Joi.string().required(), //uri
	password: Joi.string().required(),
    confirmPassword: Joi.string().required()
});

export const schemaSignIn = Joi.object({
    email: Joi.string().email().required(),
	password: Joi.string().required(),
});