import Joi from "joi"

export const schemaModel = Joi.object({
    name: Joi.string().required(),
    picture: Joi.string().uri().required(),
    species: Joi.string().required(),
    race: Joi.string().required(),
    age: Joi.number().required(),
    description: Joi.string(), 
    pricePerHour: Joi.number().required()
})