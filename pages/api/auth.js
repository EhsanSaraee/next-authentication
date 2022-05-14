import { connectToDB } from 'utils/database';

const handler = async (req, res) => {
   const { email, password } = req.body;

   const mongoClient = await connectToDB();

   try {
      const db = mongoClient.db();
      await db.collection('users').insertOne({
         email,
         password,
      });
      res.status(200).json({ message: 'User created' });
   } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
   }

   mongoClient.close();
};

export default handler;
