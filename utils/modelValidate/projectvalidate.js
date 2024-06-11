const Joi = require('joi');

// Define Joi schema for project validation
const projectSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    difficulty: Joi.string().required(),
    duration: Joi.string().required(),
    mode: Joi.string().required(),
    mentors: Joi.array().items(Joi.string()).required(),
    tech_stack: Joi.array().items(Joi.string()).required(),
    project_scope: Joi.string().required(),
    project_objective: Joi.string().required()
});

// Validation middleware function
const ProjectValidation = (req, res, next) => {
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad Request', error });
    }
    next();
};

module.exports = ProjectValidation;
