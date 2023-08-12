import Joi from "joi"

export const schemaModel = Joi.object({
    url: Joi.string().uri().required()
})