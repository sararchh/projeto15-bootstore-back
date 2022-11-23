import bcrypt from 'bcrypt';
import mongoConection from '../database/mongo.js';
import { ObjectId } from 'mongodb';
import { generateToken } from '../utils/jwt.js';

let dbMongo = await mongoConection();

export default {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const userExists = await dbMongo.collection('users').findOne({ email });

      if (userExists) {
        return res.status(400).send({ message: 'Existe usuário com mesmo email cadastrado' })
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      const { insertedId } = await dbMongo.collection('users').insertOne({ name, email, password: passwordHash });

      const userCreated = await dbMongo.collection('users').findOne({ "_id": insertedId });

      const token = generateToken({
        id: userCreated._id,
      })

      return res.status(201).send({ message: 'Usuário cadastrado com sucesso!', data: userCreated, token: token });
    } catch (error) {
      return res.status(400).send({ message: "Falha ao cadastrar, verifique e tente novamente." });
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      const userExists = await dbMongo.collection('users').findOne({ email });

      if (!userExists) {
        return res.status(404).send({ message: 'Usuário não existe!' });
      }

      const validPass = bcrypt.compareSync(password, userExists.password);

      if (!validPass) {
        return res.status(401).send({ message: "Senha inválida, verifique!" });
      }

      delete userExists.password;

      const token = generateToken({
        id: userExists._id,
      });

      return res.status(200).send({ message: 'Login feito com sucesso!', data: userExists, token: token });
    } catch (error) {
      return res.status(404).send({ message: 'Erro ao logar!' })
    }
  }
}