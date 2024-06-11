const Joi = require('joi');

const RoadmapValidation = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        title: Joi.string().required(),
        image: Joi.string().required(),
        videoUrl: Joi.string().allow(null),
        rating: Joi.number().required(),
        pageContent: Joi.object({
            duration: Joi.string().required(),
            title: Joi.string().required(),
            mainLine: Joi.string().required(),
            points: Joi.array().items(Joi.string()).required()
        }).required(),
        techStack: Joi.array().items(
            Joi.object({
                title: Joi.string().required(),
                image: Joi.string().required()
            })
        ).required(),
        weekWiseDetails: Joi.array().items(
            Joi.object({
                weekNumber: Joi.number().required(),
                title: Joi.string().required(),
                description: Joi.string().required(),
                subtasks: Joi.array().items(
                    Joi.object({
                        topic: Joi.string().required(),
                        learn: Joi.array().items(Joi.string()).required(),
                        practice: Joi.array().items(Joi.string()).required()
                    })
                ).required()
            })
        ).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad Request', error });
    }
    next();
}

module.exports = RoadmapValidation;
