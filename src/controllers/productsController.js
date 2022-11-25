import mongoConection from '../database/mongo.js';

let dbMongo = await mongoConection();

export default {
  store: async (req, res) => {
    try {
      const { name, image, description, price, category } = req.body
      const { userId } = req;

      await dbMongo.collection('products').insertOne({
        name,
        image,
        description,
        price,
        category
      });

      res.sendStatus(201);
    } catch (error) {
      res.status(404).send({ message: 'Não foi possivel listar os produtos!' })
    }
  },
  find: async (req, res) => {
    try {
      const products = await dbMongo.collection('products').find({}).toArray();

      res.status(200).send({ data: products });
    } catch (error) {
      res.status(404).send({ message: 'Não foi possivel listar os produtos!' })
    }
  },
  storeCart: async (req, res) => {
    const cart = req.body;

    if (!cart) {
      return res.status(400).send({ message: 'Verifique os dados!' })
    }

    await dbMongo.collection('cart').insertMany(cart);
    res.sendStatus(201);
  }
}