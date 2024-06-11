const Joi = require('joi');

const TestimonialValidation = (req, res, next) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        content: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad Request', error });
    }
    next();
}

module.exports = TestimonialValidation;
