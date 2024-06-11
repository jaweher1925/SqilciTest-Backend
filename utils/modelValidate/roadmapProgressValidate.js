const Joi = require('joi');

const RoadmapProgressValidation = (req, res, next) => {
    const schema = Joi.object({
        roadmap: Joi.string().required(),
        progress: Joi.array().items(
            Joi.object({
                weekNumber: Joi.number().required(),
                completedTopics: Joi.array().items(Joi.string()).required(),
                completedPractices: Joi.array().items(Joi.string()).required()
            })
        ).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad Request', error });
    }
    next();
}

module.exports = RoadmapProgressValidation;
