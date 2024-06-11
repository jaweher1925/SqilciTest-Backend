const Joi = require('joi');

const ProjectProgressValidation = (req, res, next) => {
    const schema = Joi.object({
        project: Joi.string().required(),
        progress: Joi.object({
            completed: Joi.boolean().required(),
            completionDate: Joi.date().iso(),
            mentorFeedback: Joi.string().allow('')
        }).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad Request', error });
    }
    next();
}

module.exports = ProjectProgressValidation;
