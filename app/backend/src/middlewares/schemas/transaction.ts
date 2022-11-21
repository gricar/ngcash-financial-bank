import Joi from 'joi';

const transaction = Joi.object({
  usernameRecipient: Joi.string().min(3).required(),
  amount: Joi.number().positive().required(),
});

export default transaction;
