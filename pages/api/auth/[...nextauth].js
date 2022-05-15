import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDB } from 'utils/database';
import { checkPassword } from 'utils/tools';

export default NextAuth({
   session: {
      jwt: true,
   },
   providers: [
      Providers.Credentials({
         async authorize(credentials) {
            const mongoClient = await connectToDB();
            // valid

            /// user check
            const user = await mongoClient.db().collection('users').findOne({
               email: credentials.email,
            });
            if (!user) {
               mongoClient.close();
               throw new Error('Invalid email or password. Please try again.');
            }

            /// check password
            const validPassword = await checkPassword(
               credentials.password,
               user.password
            );
            if (!validPassword) {
               mongoClient.close();
               throw new Error(
                  'Invalid password. Please try again or reset your password.'
               );
            }

            mongoClient.close();
            return { email: user.email };
         },
      }),
   ],
});
