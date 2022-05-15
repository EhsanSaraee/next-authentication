import { connectToDB } from 'utils/database';
import { hashPassword } from 'utils/tools';
import { authSchema } from 'utils/validations';

const handler = async (req, res) => {
   const { email, password } = req.body;

   // validation
   try {
      await authSchema.validate({ email, password }, { abortEarly: false });
   } catch (error) {
      return res.status(500).json({ message: 'Something went wrong', error });
   }
   // connect to db
   const mongoClient = await connectToDB();

   // check if user exists
   const existUser = await mongoClient
      .db()
      .collection('users')
      .findOne({ email });

   if (existUser) {
      return res.status(400).json({ message: 'User already exist' });
   }

   // hash password
   try {
      const db = mongoClient.db();
      const hashedPassword = await hashPassword(password);
      await db.collection('users').insertOne({
         email,
         password: hashedPassword,
      });
      res.status(200).json({ message: 'User created' });
   } catch (error) {
      return res.status(500).json({ message: 'Error creating user' });
   }

   // close db connection
   mongoClient.close();
};

export default handler;
