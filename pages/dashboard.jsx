import { getSession } from 'next-auth/client';

const Dashboard = () => {
   return (
      <div>
         <h1>Dashboard</h1>
      </div>
   );
};

export const getServerSideProps = async ({ req }) => {
   const session = await getSession({ req });

   if (!session) {
      return {
         redirect: {
            destination: 'sign_in',
            permanent: false,
         },
      };
   }

   return {
      props: {
         isAuthenticated: session,
      },
   };
};

export default Dashboard;
