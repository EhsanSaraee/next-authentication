import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDB } from 'utils/database';
import { checkPassword } from 'utils/tools';

export default NextAuth({
   session: {
      token: true,
   },
   providers: [
      Providers.Credentials({
         authorize: async (credentials) => {
            // connect to db
            const mongoClient = await connectToDB();

            // check if user exists
            const existUser = await mongoClient
               .db()
               .collection('users')
               .findOne({
                  email: credentials.email,
               });

            if (!user) {
               mongoClient.close();
               throw new Error('User does not exist. Please register first.');
            }

            // check if password is correct
            const validPassword = await checkPassword(
               credentials.password,
               user.password
            );

            if (!validPassword) {
               mongoClient.close();
               throw new Error(
                  'The password you entered is incorrect. Please try again.'
               );
            }

            // close db connection
            mongoClient.close();
            return { email: user.email };
         },
      }),
   ],
});
