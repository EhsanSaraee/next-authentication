import { MongoClient } from 'mongodb';

export const connectToDB = async () =>
   await MongoClient.connect(
      'mongodb+srv://Griffin:U2sOs12n7tT9f2LQ@cluster0.ymmpf.mongodb.net/next-db?retryWrites=true&w=majority'
   );
