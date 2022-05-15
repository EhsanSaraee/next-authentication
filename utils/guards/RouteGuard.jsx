import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const RouteGuard = ({ children }) => {
   const router = useRouter();
   const [loading, setLoading] = useState(true);

   const checkSession = async () => {
      const session = await getSession();
      !session ? router.push('/sign_in') : setLoading(false);
   };

   useEffect(() => {
      checkSession();
   }, []);

   return loading ? <div>Loading...</div> : children;
};

export default RouteGuard;
