const Joi = require('joi');

const MentorValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        profile_picture: Joi.string().required(),
        designation: Joi.string().required(),
        experience: Joi.string(),
        tech_stack: Joi.array().items(Joi.string()).min(1).required(),
        rating: Joi.number(),
        reviews: Joi.array().items(Joi.object({
            user: Joi.string().required(),
            rating: Joi.number().required(),
            comment: Joi.string().required()
        })),
        availability: Joi.object({
            isAvailable: Joi.boolean().required(),
            availableDays: Joi.array().items(Joi.string()),
            availableTimes: Joi.object({
                start: Joi.string(),
                end: Joi.string()
            })
        }).required(),
        contact_information: Joi.object({
            email: Joi.string().email(),
            phone: Joi.string(),
            website: Joi.string().uri()
        }),
        location: Joi.object({
            city: Joi.string(),
            country: Joi.string()
        }),
        social_media_links: Joi.object({
            linkedin: Joi.string(),
            twitter: Joi.string(),
            github: Joi.string()
        }),
        expertise_areas: Joi.array().items(Joi.string()).min(1).required(),
        bio: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad Request', error });
    }
    next();
}

module.exports = MentorValidation;
