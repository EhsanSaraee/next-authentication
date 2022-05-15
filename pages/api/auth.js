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

   const mongoClient = await connectToDB();

   try {
      const db = mongoClient.db();
      const hashedPassword = await hashPassword(password);
      await db.collection('users').insertOne({
         email,
         password: hashedPassword,
      });
      res.status(200).json({ message: 'User created' });
   } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
   }

   mongoClient.close();
};

export default handler;
