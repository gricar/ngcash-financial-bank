import Joi from 'joi';

const userLogin = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]+$/).min(8).required(),
});

export default userLogin;
