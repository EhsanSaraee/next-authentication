const { getSession } = require('next-auth/client');

const handler = async (req, res) => {
   const session = await getSession({ req });

   if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
   }

   res.status(200).json({ message: 'OK' });
};

export default handler;
