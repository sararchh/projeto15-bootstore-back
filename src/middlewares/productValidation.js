import productSchema from '../entities/product.js';

export const validateProduct = async (req, res, next) => {
  let errorsSchema;
  await productSchema.validate(req.body, { abortEarly: false }).catch((errors) => {
    errorsSchema = errors;
  });

  if (errorsSchema) {
    return res.status(422).send({ message: errorsSchema });
  }

  next();
}

export default validateProduct;