const Joi = require('joi');

const MentorshipRequestValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        message: Joi.string().required(),
        roadmap: Joi.string().allow(null)
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad Request', error });
    }
    next();
}

module.exports = MentorshipRequestValidation;
