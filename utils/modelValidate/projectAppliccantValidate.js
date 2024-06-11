const Joi = require('joi');


const projectApplicantValidate = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    resume: Joi.string().required(),
    project: Joi.string().required()
});


const ProjectApplicantValidate = (req, res, next) => {
    const { error, value } = projectApplicantValidate.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad Request', error });
    }
    next();
}

module.exports = ProjectApplicantValidate;
